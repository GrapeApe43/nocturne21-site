import requests
import os
import re
import html
from datetime import datetime, timezone
from email.utils import format_datetime
import pytumblr

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


def build_tags(title):
    base_tags = ["nocturne21", "webcomic", "indiecomic", "comicupdate"]
    title_lower = title.lower()

    if "chapter" in title_lower:
        base_tags.append("chapterupdate")
    if "kai" in title_lower:
        base_tags.append("kai")
    if "olivia" in title_lower:
        base_tags.append("olivia")

    return list(dict.fromkeys(base_tags))


def build_bluesky_caption(title, page_url):
    tags = " ".join(f"#{tag}" for tag in build_tags(title)[:4])
    return f"New Nocturne 21 update ✨\n\n{title}\n{page_url}\n\n{tags}"


def build_tumblr_caption(title, page_url):
    return f"""
<p>🆕 <b>New Nocturne 21 Update!</b></p>
<p><b>{title}</b></p>
<p><a href="{page_url}">Read on the site →</a></p>
""".strip()


def post_to_bluesky(title, page_url, image_url, alt_text=""):
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

    img_resp = requests.get(image_url, timeout=20)
    img_resp.raise_for_status()
    img_bytes = img_resp.content

    if len(img_bytes) > 1_000_000:
        raise ValueError(f"Image is too large for Bluesky: {len(img_bytes)} bytes")

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
                "text": build_bluesky_caption(title, page_url),
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

    print("Bluesky response:", post_resp.status_code, post_resp.text)
    post_resp.raise_for_status()
    print("Posted to Bluesky.")


def post_to_tumblr(title, page_url, image_url):
    client = pytumblr.TumblrRestClient(
        TUMBLR_CONSUMER_KEY,
        TUMBLR_CONSUMER_SECRET,
        TUMBLR_OAUTH_TOKEN,
        TUMBLR_OAUTH_SECRET,
    )

    client.create_photo(
        TUMBLR_BLOG,
        state="published",
        caption=build_tumblr_caption(title, page_url),
        source=image_url,
        tags=build_tags(title),
    )

    print("Posted to Tumblr.")


with open(SETTINGS_FILE, "r", encoding="utf-8") as f:
    js_text = f.read()

entries = split_entries(get_pgdata_block(js_text))
items = []

for entry in entries:
    pg = extract_number_field(entry, "pgNum")
    if not pg:
        continue

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
      <link>{html.escape(page_url)}</link>
      <guid>{html.escape(page_url)}</guid>
      <pubDate>{html.escape(pub_date)}</pubDate>
      <description><![CDATA[
        <p>{html.escape(description)}</p>
        <img src="{html.escape(thumb_url)}" alt="{html.escape(alt)}">
      ]]></description>
    </item>
    """)

rss = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>{html.escape(SITE_TITLE)}</title>
<link>{html.escape(SITE_URL)}</link>
<description>{html.escape(SITE_DESCRIPTION)}</description>
{''.join(items)}
</channel>
</rss>"""

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(rss)

print(f"rss.xml generated successfully with {len(items)} items.")

latest_live_entry = None

for entry in reversed(entries):
    pg = extract_number_field(entry, "pgNum")
    if not pg:
        continue

    image_url = f"{SITE_URL}/img/comics/pg{pg}.jpg"
    preview_url = f"{SITE_URL}/img/preview/pg{pg}.png"

    image_ok = False
    preview_ok = False

    try:
        image_ok = requests.head(image_url, timeout=10).status_code == 200
    except requests.RequestException:
        pass

    try:
        preview_ok = requests.head(preview_url, timeout=10).status_code == 200
    except requests.RequestException:
        pass

    if image_ok:
        if not preview_ok:
            print(f"⚠️ Preview missing for pg{pg}, continuing anyway.")
        latest_live_entry = entry
        break


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
        with open(LAST_POST_FILE, "r", encoding="utf-8") as f:
            last_posted = f.read().strip()

    if last_posted != str(pg):
        if not WEBHOOK_URL:
            print("Skipping social posting (auto deploy).")
        else:
            res = requests.post(WEBHOOK_URL, json={
                "content": f"🆕 **New Nocturne 21 Update!**\n\n**{title}**\n{page_url}",
                "embeds": [{"title": title, "url": page_url, "image": {"url": preview_url}}],
            })

            print("Discord response:", res.status_code)

            if res.status_code in (200, 204):
                with open(LAST_POST_FILE, "w", encoding="utf-8") as f:
                    f.write(str(pg))
                print("Posted to Discord.")

                if BLUESKY_HANDLE and BLUESKY_APP_PASSWORD:
                    try:
                        post_to_bluesky(title, page_url, preview_url, alt)
                    except Exception as e:
                        print("Bluesky failed:", e)
                else:
                    print("Skipping Bluesky: missing credentials.")

                if all([
                    TUMBLR_CONSUMER_KEY,
                    TUMBLR_CONSUMER_SECRET,
                    TUMBLR_OAUTH_TOKEN,
                    TUMBLR_OAUTH_SECRET,
                ]):
                    try:
                        post_to_tumblr(title, page_url, preview_url)
                    except Exception as e:
                        print("Tumblr failed:", e)
                else:
                    print("Skipping Tumblr: missing credentials.")

            else:
                print("Discord failed.")
    else:
        print("Already posted. Skipping.")

else:
    print("No valid live page found.")
