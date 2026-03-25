import requests
import os
import re
import html
from datetime import datetime, timezone
from email.utils import format_datetime
import pytumblr

WEBHOOK_URL = "https://discord.com/api/webhooks/1486109531963658261/Qh7pEq9anvUCVjRp2zOpRoc3HbnlHauekZIXvbkzGAEXA8ZS7NypzzRkrQpkIK8FgFPd"
LAST_POST_FILE = ".last_discord_post.txt"
BLUESKY_HANDLE = "grape-ape.bsky.social"
BLUESKY_APP_PASSWORD = "Zythos13!"

TUMBLR_CONSUMER_KEY = "wGJ9ZOaKsB1EMlMO67YmSgE4kRQSGZO83bfFloH5T131JyTlut"
TUMBLR_CONSUMER_SECRET = "h5rlk8ZfIHNvXQiwvgiJfQa5CYEOQNjAZDcBfbQ0yChPXeYIzK"
TUMBLR_OAUTH_TOKEN = "PbbOXP8l516DzT8CqTyS8fPm8b2vFPKkieSfroQDJFrYEBLZyE"
TUMBLR_OAUTH_SECRET = "XXsyPuXVw04HiJTCUorpKIMeBtqbI4MgMso6mxP3z8W2gcX1GR"

TUMBLR_BLOG = "nocturne-21.tumblr.com"


SITE_URL = "https://nocturne21.com"
SITE_TITLE = "Nocturne 21"
SITE_DESCRIPTION = "A dark atmospheric webcomic"

SETTINGS_FILE = "js/comic_settings.js"
OUTPUT_FILE = "rss.xml"


def strip_html(text):
    return re.sub(r"<[^>]+>", "", text or "").strip()


def parse_write_date(date_text):
    if not date_text:
        return None
    match = re.search(r"writeDate\((\d+),\s*(\d+),\s*(\d+)\)", date_text)
    if not match:
        return None
    year, month, day = map(int, match.groups())
    return datetime(year, month, day, tzinfo=timezone.utc)


def get_pgdata_block(js_text):
    start_marker = "const pgData = ["
    start = js_text.find(start_marker)
    if start == -1:
        raise ValueError("Could not find const pgData = [ in comic_settings.js")

    start += len(start_marker)
    end = js_text.find("\n];", start)
    if end == -1:
        end = js_text.find("];", start)
    if end == -1:
        raise ValueError("Could not find the end of pgData in comic_settings.js")

    return js_text[start:end]


def split_entries(pgdata_text):
    entries = []
    current = []
    depth = 0
    inside = False

    for line in pgdata_text.splitlines():
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


def extract_quoted_field(entry, field_name):
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


def extract_number_field(entry, field_name):
    match = re.search(rf"{field_name}\s*:\s*(\d+)", entry)
    return match.group(1) if match else None


def extract_date_field(entry):
    match = re.search(r"date\s*:\s*(writeDate\(\d+,\s*\d+,\s*\d+\))", entry)
    return match.group(1) if match else None

def build_tags(title, extra_tags=None):
    base_tags = [
        "nocturne21",
        "webcomic",
        "indiecomic",
        "comicupdate",
    ]

    title_lower = title.lower()
    auto_tags = []

    # 🔹 Story structure
    if "chapter" in title_lower:
        auto_tags.append("chapterupdate")
    if "volume" in title_lower:
        auto_tags.append("newarc")

    # 🔹 Character tags
    if "kai" in title_lower:
        auto_tags.append("kai")
    if "olivia" in title_lower:
        auto_tags.append("olivia")

    # 🔹 Mood / theme tags
    if "dream" in title_lower:
        auto_tags.append("dream")
    if "memory" in title_lower:
        auto_tags.append("memory")
    if "night" in title_lower:
        auto_tags.append("darkfantasy")

    combined = base_tags + auto_tags

    if extra_tags:
        combined += extra_tags

    return list(dict.fromkeys(combined))

def build_discord_caption(title, page_url):
    return f"🆕 **New Nocturne 21 Update!**\n\n**{title}**\n{page_url}"


def build_bluesky_caption(title, page_url):
    tags = build_tags(title)
    hashtag_text = " ".join(f"#{tag}" for tag in tags[:4])
    return f"New Nocturne 21 update ✨\n\n{title}\n{page_url}\n\n{hashtag_text}"


def build_tumblr_caption(title, page_url):
    return f"""
<p>🆕 <b>New Nocturne 21 Update!</b></p>
<p><b>{title}</b></p>
<p><a href="{page_url}">Read on the site →</a></p>
""".strip()    


def post_to_bluesky(title, page_url, thumb_url, alt_text=""):
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

    text = build_bluesky_caption(title, page_url)

    img_resp = requests.get(thumb_url, timeout=20)
    img_resp.raise_for_status()
    img_bytes = img_resp.content

    if len(img_bytes) > 1_000_000:
        raise ValueError(f"Thumbnail is too large for Bluesky: {len(img_bytes)} bytes")

    upload_resp = requests.post(
        "https://bsky.social/xrpc/com.atproto.repo.uploadBlob",
        headers={
            "Authorization": f"Bearer {access_jwt}",
            "Content-Type": "image/png",
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
    print("Posted to Bluesky with image.")

def post_to_tumblr(title, page_url, image_url):
    client = pytumblr.TumblrRestClient(
        TUMBLR_CONSUMER_KEY,
        TUMBLR_CONSUMER_SECRET,
        TUMBLR_OAUTH_TOKEN,
        TUMBLR_OAUTH_SECRET
    )

    caption = build_tumblr_caption(title, page_url)

    client.create_photo(
        TUMBLR_BLOG,
        state="published",
        caption=caption,
        source=image_url,
        tags=build_tags(title)
    )

    print("Posted to Tumblr.")


with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
    js_text = f.read()

pgdata_text = get_pgdata_block(js_text)
entries = split_entries(pgdata_text)

items = []

for entry in entries:
    pg_num_raw = extract_number_field(entry, "pgNum")
    title = extract_quoted_field(entry, "title")
    alt_text = extract_quoted_field(entry, "altText")
    notes = extract_quoted_field(entry, "authorNotes")
    date_raw = extract_date_field(entry)

    if not pg_num_raw:
        continue

    pg_num = int(pg_num_raw)
    if not title:
        title = f"Page {pg_num}"

    dt = parse_write_date(date_raw)
    pub_date = format_datetime(dt) if dt else None

    page_url = f"{SITE_URL}/?pg={pg_num}#showComic"
    thumb_url = f"{SITE_URL}/img/thumbs/pg{pg_num}.png"

    clean_notes = strip_html(notes or "")
    description = clean_notes if clean_notes else title

    item_lines = [
        "    <item>",
        f"      <title>{html.escape(title)}</title>",
        f"      <link>{html.escape(page_url)}</link>",
        f"      <guid>{html.escape(page_url)}</guid>",
    ]

    if pub_date:
        item_lines.append(f"      <pubDate>{html.escape(pub_date)}</pubDate>")

    item_lines.append("      <description><![CDATA[")
    item_lines.append(f"        <p>{html.escape(description)}</p>")
    item_lines.append(f'        <p><img src="{html.escape(thumb_url)}" alt="{html.escape(alt_text or title)}"></p>')
    item_lines.append("      ]]></description>")
    item_lines.append("    </item>")

    items.append("\n".join(item_lines))

last_build = format_datetime(datetime.now(timezone.utc))

rss = "\n".join([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '  <channel>',
    f'    <title>{html.escape(SITE_TITLE)}</title>',
    f'    <link>{html.escape(SITE_URL)}</link>',
    f'    <description>{html.escape(SITE_DESCRIPTION)}</description>',
    '    <language>en-us</language>',
    f'    <lastBuildDate>{html.escape(last_build)}</lastBuildDate>',
    *items,
    '  </channel>',
    '</rss>',
])

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(rss)

print(f"rss.xml generated successfully with {len(items)} items.")

# find the newest page that actually exists on the live site
latest_live_entry = None

for entry in reversed(entries):
    pg_num_raw = extract_number_field(entry, "pgNum")
    if not pg_num_raw:
        continue

    pg_num = int(pg_num_raw)
    image_url = f"{SITE_URL}/img/comics/pg{pg_num}.jpg"
    preview_url = f"{SITE_URL}/img/preview/pg{pg_num}.png"

    try:
        image_response = requests.head(image_url, timeout=10)
        preview_response = requests.head(preview_url, timeout=10)

        if image_response.status_code == 200 and preview_response.status_code == 200:
            latest_live_entry = entry
            break
    except requests.RequestException:
        pass

if latest_live_entry:
    pg_num_raw = extract_number_field(latest_live_entry, "pgNum")
    title = extract_quoted_field(latest_live_entry, "title")
    alt_text = extract_quoted_field(latest_live_entry, "altText")

    pg_num = int(pg_num_raw)
    if not title:
        title = f"Page {pg_num}"

    page_url = f"{SITE_URL}/?pg={pg_num}#showComic"
    preview_url = f"{SITE_URL}/img/preview/pg{pg_num}.png"

    last_posted = None
    if os.path.exists(LAST_POST_FILE):
        with open(LAST_POST_FILE, "r", encoding="utf-8") as f:
            last_posted = f.read().strip()

    # ✅ MUST BE INDENTED
    if last_posted != str(pg_num):
        message = {
            "content": build_discord_caption(title, page_url)
        }

        embed = {
            "title": title,
            "url": page_url,
            "image": {
                "url": preview_url
            }
        }

        response = requests.post(WEBHOOK_URL, json={
            "content": message["content"],
            "embeds": [embed]
        })

        print("Discord response:", response.status_code)

        if response.status_code in (200, 204):
            with open(LAST_POST_FILE, "w", encoding="utf-8") as f:
                f.write(str(pg_num))
            print(f"Posted page {pg_num} to Discord.")

            post_to_bluesky(title, page_url, preview_url, alt_text or title)
            post_to_tumblr(title, page_url, preview_url)

        else:
            print("Discord post failed.")
    else:
        print(f"Page {pg_num} was already posted to Discord. Skipping.")

else:
    print("No live comic image/preview found on the site, so posting was skipped.")    
    
    
    
    
    
    
    
    
    
    
    
 