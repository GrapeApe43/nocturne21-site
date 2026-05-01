```python
import requests
import os
import re
import html
from datetime import datetime, timezone
from email.utils import format_datetime
import pytumblr

# ✅ Safe environment variables (won’t crash on push)
WEBHOOK_URL = os.environ.get("WEBHOOK_URL")
BLUESKY_HANDLE = os.environ.get("BLUESKY_HANDLE")
BLUESKY_APP_PASSWORD = os.environ.get("BLUESKY_APP_PASSWORD")

TUMBLR_CONSUMER_KEY = os.environ.get("TUMBLR_CONSUMER_KEY")
TUMBLR_CONSUMER_SECRET = os.environ.get("TUMBLR_CONSUMER_SECRET")
TUMBLR_OAUTH_TOKEN = os.environ.get("TUMBLR_OAUTH_TOKEN")
TUMBLR_OAUTH_SECRET = os.environ.get("TUMBLR_OAUTH_SECRET")

TUMBLR_BLOG = "nocturne-21.tumblr.com"
LAST_POST_FILE = ".last_discord_post.txt"

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
        raise ValueError("Could not find const pgData")
    start += len(start_marker)
    end = js_text.find("];", start)
    return js_text[start:end]

def split_entries(pgdata_text):
    entries, current, depth, inside = [], [], 0, False
    for line in pgdata_text.splitlines():
        if "{" in line and not inside:
            inside, depth, current = True, 1, [line]
            continue
        if inside:
            current.append(line)
            depth += line.count("{") - line.count("}")
            if depth == 0:
                entries.append("\n".join(current))
                inside, current = False, []
    return entries

def extract_quoted_field(entry, field):
    match = re.search(rf"{field}\s*:\s*`(.*?)`", entry, re.S)
    return match.group(1).strip() if match else None

def extract_number_field(entry, field):
    match = re.search(rf"{field}\s*:\s*(\d+)", entry)
    return match.group(1) if match else None

def extract_date_field(entry):
    match = re.search(r"writeDate\(\d+,\s*\d+,\s*\d+\)", entry)
    return match.group(0) if match else None

# =========================
# RSS GENERATION
# =========================

with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
    js_text = f.read()

entries = split_entries(get_pgdata_block(js_text))
items = []

for entry in entries:
    pg = extract_number_field(entry, "pgNum")
    title = extract_quoted_field(entry, "title") or f"Page {pg}"
    notes = extract_quoted_field(entry, "authorNotes")
    alt = extract_quoted_field(entry, "altText") or title
    date = parse_write_date(extract_date_field(entry))

    page_url = f"{SITE_URL}/?pg={pg}#showComic"
    thumb_url = f"{SITE_URL}/img/thumbs/pg{pg}.png"

    description = strip_html(notes) or title
    pub_date = format_datetime(date) if date else ""

    items.append(f"""
    <item>
      <title>{html.escape(title)}</title>
      <link>{page_url}</link>
      <guid>{page_url}</guid>
      <pubDate>{pub_date}</pubDate>
      <description><![CDATA[
        <p>{description}</p>
        <img src="{thumb_url}" alt="{alt}">
      ]]></description>
    </item>
    """)

rss = f"""<?xml version="1.0"?>
<rss version="2.0">
<channel>
<title>{SITE_TITLE}</title>
<link>{SITE_URL}</link>
<description>{SITE_DESCRIPTION}</description>
{''.join(items)}
</channel>
</rss>"""

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(rss)

print(f"rss.xml generated successfully with {len(items)} items.")

# =========================
# FIND LATEST LIVE PAGE (FIXED)
# =========================

latest_live_entry = None

for entry in reversed(entries):
    pg = extract_number_field(entry, "pgNum")
    image_url = f"{SITE_URL}/img/comics/pg{pg}.jpg"
    preview_url = f"{SITE_URL}/img/preview/pg{pg}.png"

    image_ok = False
    preview_ok = False

    try:
        image_ok = requests.head(image_url, timeout=10).status_code == 200
    except:
        pass

    try:
        preview_ok = requests.head(preview_url, timeout=10).status_code == 200
    except:
        pass

    if image_ok:
        if not preview_ok:
            print(f"⚠️ Preview missing for pg{pg}, continuing anyway.")

        latest_live_entry = entry
        break

# =========================
# POSTING
# =========================

if latest_live_entry:
    pg = extract_number_field(latest_live_entry, "pgNum")
    title = extract_quoted_field(latest_live_entry, "title") or f"Page {pg}"
    alt = extract_quoted_field(latest_live_entry, "altText") or title

    page_url = f"{SITE_URL}/?pg={pg}#showComic"
    preview_url = f"{SITE_URL}/img/preview/pg{pg}.png"

    print(f"Selected page: {pg}")
    print(f"Using preview: {preview_url}")

    last_posted = None
    if os.path.exists(LAST_POST_FILE):
        last_posted = open(LAST_POST_FILE).read().strip()

    if last_posted != str(pg):
        if not WEBHOOK_URL:
            print("Skipping social posting (auto deploy).")
        else:
            # Discord
            res = requests.post(WEBHOOK_URL, json={
                "content": f"🆕 {title}\n{page_url}",
                "embeds": [{"image": {"url": preview_url}}]
            })

            if res.status_code in (200, 204):
                open(LAST_POST_FILE, "w").write(str(pg))
                print("Posted to Discord.")

                # Bluesky
                if BLUESKY_HANDLE and BLUESKY_APP_PASSWORD:
                    print("Posting to Bluesky...")

                # Tumblr
                if all([TUMBLR_CONSUMER_KEY, TUMBLR_CONSUMER_SECRET,
                        TUMBLR_OAUTH_TOKEN, TUMBLR_OAUTH_SECRET]):
                    print("Posting to Tumblr...")
            else:
                print("Discord failed.")

    else:
        print("Already posted. Skipping.")

else:
    print("No valid live page found.")
```
