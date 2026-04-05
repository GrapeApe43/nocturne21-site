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
SITE_TITLE = "Nocturne 21 Journal"
SITE_DESCRIPTION = "Journal entries, comic updates, behind-the-scenes notes, and extra thoughts from Nocturne 21."

DEFAULT_IMAGE_URL = f"{SITE_URL}/img/promo-art.jpg"

WEBHOOK_URL = os.environ["WEBHOOK_URL"]
BLUESKY_HANDLE = os.environ["BLUESKY_HANDLE"]
BLUESKY_APP_PASSWORD = os.environ["BLUESKY_APP_PASSWORD"]

TUMBLR_CONSUMER_KEY = os.environ["TUMBLR_CONSUMER_KEY"]
TUMBLR_CONSUMER_SECRET = os.environ["TUMBLR_CONSUMER_SECRET"]
TUMBLR_OAUTH_TOKEN = os.environ["TUMBLR_OAUTH_TOKEN"]
TUMBLR_OAUTH_SECRET = os.environ["TUMBLR_OAUTH_SECRET"]
TUMBLR_BLOG = os.environ.get("TUMBLR_BLOG", "nocturne-21.tumblr.com")


# =========================
# HELPERS
# =========================

def strip_html(text: str) -> str:
    return re.sub(r"<[^>]+>", "", text or "").strip()


def format_rfc2822(dt: datetime) -> str:
    return dt.strftime("%a, %d %b %Y %H:%M:%S +0000")


def parse_js_date(date_text: str):
    """Accepts YYYY-MM-DD only."""
    if not date_text:
        return None
    try:
        return datetime.strptime(date_text.strip(), "%Y-%m-%d").replace(tzinfo=timezone.utc)
    except ValueError:
        return None


def get_posts_block(js_text: str) -> str:
    start_marker = "const N21_JOURNAL_POSTS = ["
    start = js_text.find(start_marker)
    if start == -1:
        raise ValueError("Could not find const N21_JOURNAL_POSTS = [ in n21-journal-data.js")

    start += len(start_marker)
    end = js_text.find("\n];", start)
    if end == -1:
        end = js_text.find("];", start)
    if end == -1:
        raise ValueError("Could not find the end of N21_JOURNAL_POSTS in n21-journal-data.js")

    return js_text[start:end]


def split_entries(block_text: str):
    entries = []
    current = []
    depth = 0
    inside = False

    for line in block_text.splitlines():
        stripped = line.strip()

        if stripped.startswith("{") and not inside:
            inside = True
            depth = 1
            current = [line]
            continue

        if inside:
            current.append(line)
            depth += line.count("{")
            depth -= line.count("}")

            if depth == 0:
                entries.append("\n".join(current))
                inside = False
                current = []

    return entries


def extract_quoted_field(entry: str, field_name: str):
    patterns = [
        rf"{field_name}\s*:\s*`(.*?)`",
        rf'{field_name}\s*:\s*"(.*?)"',
        rf"{field_name}\s*:\s*'(.*?)'",
    ]
    for pattern in patterns:
        match = re.search(pattern, entry, re.S)
        if match:
            return match.group(1).strip()
    return None


def extract_array_field(entry: str, field_name: str):
    match = re.search(rf"{field_name}\s*:\s*\[(.*?)\]", entry, re.S)
    if not match:
        return []
    raw = match.group(1)
    tags = re.findall(r'"(.*?)"|\'(.*?)\'', raw)
    cleaned = []
    for a, b in tags:
      value = a or b
      if value:
          cleaned.append(value.strip())
    return cleaned


def extract_bool_field(entry: str, field_name: str):
    match = re.search(rf"{field_name}\s*:\s*(true|false)", entry)
    if not match:
        return None
    return match.group(1) == "true"


def normalize_image_url(path: str | None) -> str:
    if not path:
        return DEFAULT_IMAGE_URL
    path = path.strip()
    if path.startswith("http://") or path.startswith("https://"):
        return path
    if not path.startswith("/"):
        path = "/" + path
    return SITE_URL + path


def build_entry_url(post_id: str) -> str:
    return f"{SITE_URL}/n21-entry-page?id={requests.utils.quote(post_id)}"


def build_discord_caption(title: str, url: str) -> str:
    return f"📝 **New Nocturne 21 Journal Post!**\n\n**{title}**\n{url}"


def build_bluesky_caption(title: str, url: str) -> str:
    return f"📝 New Nocturne 21 journal post!\n\n{title}\n{url}"


def build_tumblr_caption(title: str, url: str) -> str:
    return f"<p><b>New Nocturne 21 journal post:</b></p><p><a href=\"{html.escape(url)}\">{html.escape(title)}</a></p>"


def build_tags(title: str, tags: list[str]) -> list[str]:
    base = ["Nocturne 21", "webcomic", "journal", "indie comic"]
    return base + tags[:6]


# =========================
# SOCIAL POSTING
# =========================

def post_to_bluesky(title: str, entry_url: str, image_url: str, alt_text: str = ""):
    session_resp = requests.post(
        "https://bsky.social/xrpc/com.atproto.server.createSession",
        json={
            "identifier": BLUESKY_HANDLE,
            "password": BLUESKY_APP_PASSWORD,
        },
        timeout=15,
    )
    session_resp.raise_for_status()
    session = session_resp.json()

    access_jwt = session["accessJwt"]
    did = session["did"]

    text = build_bluesky_caption(title, entry_url)

    img_resp = requests.get(image_url, timeout=20)
    img_resp.raise_for_status()
    img_bytes = img_resp.content

    if len(img_bytes) > 1_000_000:
        raise ValueError(f"Image is too large for Bluesky: {len(img_bytes)} bytes")

    content_type = img_resp.headers.get("Content-Type", "image/jpeg")

    upload_resp = requests.post(
        "https://bsky.social/xrpc/com.atproto.repo.uploadBlob",
        headers={
            "Authorization": f"Bearer {access_jwt}",
            "Content-Type": content_type,
        },
        data=img_bytes,
        timeout=20,
    )
    upload_resp.raise_for_status()
    blob = upload_resp.json()["blob"]

    post_resp = requests.post(
        "https://bsky.social/xrpc/com.atproto.repo.createRecord",
        headers={
            "Authorization": f"Bearer {access_jwt}",
            "Content-Type": "application/json",
        },
        json={
            "repo": did,
            "collection": "app.bsky.feed.post",
            "record": {
                "$type": "app.bsky.feed.post",
                "text": text,
                "createdAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
                "embed": {
                    "$type": "app.bsky.embed.images",
                    "images": [
                        {
                            "alt": alt_text or title,
                            "image": blob,
                        }
                    ],
                },
            },
        },
        timeout=20,
    )
    print("Bluesky createRecord status:", post_resp.status_code)
    print("Bluesky response:", post_resp.text)
    post_resp.raise_for_status()
    print("Posted journal entry to Bluesky.")


def post_to_tumblr(title: str, entry_url: str, image_url: str, tags: list[str]):
    client = pytumblr.TumblrRestClient(
        TUMBLR_CONSUMER_KEY,
        TUMBLR_CONSUMER_SECRET,
        TUMBLR_OAUTH_TOKEN,
        TUMBLR_OAUTH_SECRET
    )

    caption = build_tumblr_caption(title, entry_url)

    client.create_photo(
        TUMBLR_BLOG,
        state="published",
        caption=caption,
        source=image_url,
        tags=build_tags(title, tags)
    )

    print("Posted journal entry to Tumblr.")


# =========================
# LOAD + PARSE
# =========================

with open(JOURNAL_DATA_FILE, "r", encoding="utf-8") as f:
    js_text = f.read()

posts_block = get_posts_block(js_text)
entries = split_entries(posts_block)

posts = []

for entry in entries:
    post_id = extract_quoted_field(entry, "id")
    title = extract_quoted_field(entry, "title")
    date_raw = extract_quoted_field(entry, "date")
    excerpt = extract_quoted_field(entry, "excerpt")
    content = extract_quoted_field(entry, "content")
    thumb = extract_quoted_field(entry, "thumb")
    tags = extract_array_field(entry, "tags")
    show_social = extract_bool_field(entry, "showSocial")

    if not post_id or not title:
        continue

    dt = parse_js_date(date_raw)
    if not dt:
        continue

    description = excerpt or strip_html(content or "") or title
    image_url = normalize_image_url(thumb)

    posts.append({
        "id": post_id,
        "title": title,
        "date": dt,
        "description": description,
        "image_url": image_url,
        "tags": tags,
        "show_social": True if show_social is None else show_social,
        "entry_url": build_entry_url(post_id),
    })

posts.sort(key=lambda p: p["date"], reverse=True)

if not posts:
    raise ValueError("No valid journal posts were found in n21-journal-data.js")


# =========================
# RSS OUTPUT
# =========================

items = []

for post in posts:
    item_lines = [
        "    <item>",
        f"      <title>{html.escape(post['title'])}</title>",
        f"      <link>{html.escape(post['entry_url'])}</link>",
        f"      <guid>{html.escape(post['entry_url'])}</guid>",
        f"      <pubDate>{html.escape(format_rfc2822(post['date']))}</pubDate>",
        "      <description><![CDATA[",
        f"        <p>{html.escape(post['description'])}</p>",
        f'        <p><img src="{html.escape(post["image_url"])}" alt="{html.escape(post["title"])}"></p>',
        "      ]]></description>",
        "    </item>",
    ]
    items.append("\n".join(item_lines))

rss = "\n".join([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    f'    <title>{html.escape(SITE_TITLE)}</title>',
    f'    <link>{html.escape(SITE_URL + "/n21-journal")}</link>',
    f'    <description>{html.escape(SITE_DESCRIPTION)}</description>',
    '    <language>en-us</language>',
    f'    <lastBuildDate>{html.escape(format_rfc2822(datetime.now(timezone.utc)))}</lastBuildDate>',
    *items,
    '  </channel>',
    '</rss>',
])

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(rss)

print(f"{OUTPUT_FILE} generated successfully with {len(items)} items.")


# =========================
# POST NEWEST JOURNAL ENTRY
# =========================

latest_post = None
for post in posts:
    if post["show_social"]:
        latest_post = post
        break

if not latest_post:
    print("No journal post is marked for social posting. Skipping.")
    raise SystemExit(0)

last_posted = None
if os.path.exists(LAST_JOURNAL_POST_FILE):
    with open(LAST_JOURNAL_POST_FILE, "r", encoding="utf-8") as f:
        last_posted = f.read().strip()

if last_posted == latest_post["id"]:
    print(f'Journal post "{latest_post["id"]}" was already posted. Skipping.')
    raise SystemExit(0)

message = {
    "content": build_discord_caption(latest_post["title"], latest_post["entry_url"])
}

embed = {
    "title": latest_post["title"],
    "url": latest_post["entry_url"],
    "description": latest_post["description"][:240],
    "image": {
        "url": latest_post["image_url"]
    }
}

response = requests.post(WEBHOOK_URL, json={
    "content": message["content"],
    "embeds": [embed]
})

print("Discord response:", response.status_code)

if response.status_code in (200, 204):
    with open(LAST_JOURNAL_POST_FILE, "w", encoding="utf-8") as f:
        f.write(latest_post["id"])

    print(f'Posted journal entry "{latest_post["id"]}" to Discord.')

    post_to_bluesky(
        latest_post["title"],
        latest_post["entry_url"],
        latest_post["image_url"],
        latest_post["title"]
    )

    post_to_tumblr(
        latest_post["title"],
        latest_post["entry_url"],
        latest_post["image_url"],
        latest_post["tags"]
    )
else:
    print("Discord journal post failed.")
