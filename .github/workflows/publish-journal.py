import os
import re
import html
from datetime import datetime, timezone

import requests
import pytumblr

# =========================
# CONFIG
# =========================

SITE_URL = "https://nocturne21.com"
JOURNAL_DATA_FILE = "n21-journal-data.js"
LAST_JOURNAL_POST_FILE = ".last_journal_post.txt"

OUTPUT_FILE = "journal-rss.xml"
DEFAULT_IMAGE_URL = f"{SITE_URL}/img/promo-art.jpg"

WEBHOOK_URL = os.environ["WEBHOOK_URL"]
BLUESKY_HANDLE = os.environ["BLUESKY_HANDLE"]
BLUESKY_APP_PASSWORD = os.environ["BLUESKY_APP_PASSWORD"]

TUMBLR_CONSUMER_KEY = os.environ["TUMBLR_CONSUMER_KEY"]
TUMBLR_CONSUMER_SECRET = os.environ["TUMBLR_CONSUMER_SECRET"]
TUMBLR_OAUTH_TOKEN = os.environ["TUMBLR_OAUTH_TOKEN"]
TUMBLR_OAUTH_SECRET = os.environ["TUMBLR_OAUTH_SECRET"]

TUMBLR_BLOG = "nocturne-21.tumblr.com"

# =========================
# HELPERS
# =========================

def strip_html(text):
    return re.sub(r"<[^>]+>", "", text or "").strip()

def format_rfc2822(dt):
    return dt.strftime("%a, %d %b %Y %H:%M:%S +0000")

def parse_js_date(date_text):
    return datetime.strptime(date_text, "%Y-%m-%d").replace(tzinfo=timezone.utc)

def extract_field(entry, field):
    match = re.search(rf'{field}\s*:\s*"(.*?)"', entry, re.S)
    return match.group(1).strip() if match else None

def extract_content(entry):
    match = re.search(r'content\s*:\s*`(.*?)`', entry, re.S)
    return match.group(1).strip() if match else ""

def extract_tags(entry):
    match = re.search(r'tags\s*:\s*\[(.*?)\]', entry, re.S)
    if not match:
        return []
    return re.findall(r'"(.*?)"', match.group(1))

def extract_comic_page(entry):
    match = re.search(r'comicPage\s*:\s*(\d+)', entry)
    return int(match.group(1)) if match else None

def build_entry_url(post_id):
    return f"{SITE_URL}/n21-entry-page?id={post_id}"

def get_image(post):
    # Priority:
    # 1. explicit thumb (future)
    # 2. comicPage preview
    # 3. fallback promo image

    if post["comicPage"]:
        return f"{SITE_URL}/img/preview/pg{post['comicPage']}.png"

    return DEFAULT_IMAGE_URL

# =========================
# LOAD POSTS
# =========================

with open(JOURNAL_DATA_FILE, "r", encoding="utf-8") as f:
    text = f.read()

entries = re.findall(r'\{(.*?)\}', text, re.S)

posts = []

for entry in entries:
    post_id = extract_field(entry, "id")
    title = extract_field(entry, "title")
    date_raw = extract_field(entry, "date")
    excerpt = extract_field(entry, "excerpt")
    content = extract_content(entry)
    tags = extract_tags(entry)
    comic_page = extract_comic_page(entry)

    if not post_id or not title or not date_raw:
        continue

    dt = parse_js_date(date_raw)

    description = excerpt or strip_html(content) or title

    posts.append({
        "id": post_id,
        "title": title,
        "date": dt,
        "description": description,
        "tags": tags,
        "comicPage": comic_page,
        "url": build_entry_url(post_id),
    })

posts.sort(key=lambda x: x["date"], reverse=True)

if not posts:
    raise ValueError("No journal posts found")

latest = posts[0]
image_url = get_image(latest)

# =========================
# DISCORD
# =========================

discord_data = {
    "content": f"📝 **New Journal Post!**\n\n**{latest['title']}**\n{latest['url']}",
    "embeds": [{
        "title": latest["title"],
        "url": latest["url"],
        "description": latest["description"][:200],
        "image": {"url": image_url}
    }]
}

response = requests.post(WEBHOOK_URL, json=discord_data)
print("Discord:", response.status_code)

if response.status_code not in (200, 204):
    raise Exception("Discord failed")

# =========================
# BLUESKY
# =========================

session = requests.post(
    "https://bsky.social/xrpc/com.atproto.server.createSession",
    json={
        "identifier": BLUESKY_HANDLE,
        "password": BLUESKY_APP_PASSWORD,
    }
).json()

jwt = session["accessJwt"]
did = session["did"]

img = requests.get(image_url).content

upload = requests.post(
    "https://bsky.social/xrpc/com.atproto.repo.uploadBlob",
    headers={
        "Authorization": f"Bearer {jwt}",
        "Content-Type": "image/png"
    },
    data=img
).json()

requests.post(
    "https://bsky.social/xrpc/com.atproto.repo.createRecord",
    headers={"Authorization": f"Bearer {jwt}"},
    json={
        "repo": did,
        "collection": "app.bsky.feed.post",
        "record": {
            "$type": "app.bsky.feed.post",
            "text": f"📝 {latest['title']}\n\n{latest['url']}",
            "createdAt": datetime.now(timezone.utc).isoformat(),
            "embed": {
                "$type": "app.bsky.embed.images",
                "images": [{
                    "alt": latest["title"],
                    "image": upload["blob"]
                }]
            }
        }
    }
)

print("Bluesky posted")

# =========================
# TUMBLR
# =========================

client = pytumblr.TumblrRestClient(
    TUMBLR_CONSUMER_KEY,
    TUMBLR_CONSUMER_SECRET,
    TUMBLR_OAUTH_TOKEN,
    TUMBLR_OAUTH_SECRET
)

client.create_photo(
    TUMBLR_BLOG,
    state="published",
    caption=f"<p><b>{latest['title']}</b></p><p><a href='{latest['url']}'>Read here</a></p>",
    source=image_url,
    tags=latest["tags"]
)

print("Tumblr posted")

# =========================
# SAVE LAST POST
# =========================

with open(LAST_JOURNAL_POST_FILE, "w") as f:
    f.write(latest["id"])
