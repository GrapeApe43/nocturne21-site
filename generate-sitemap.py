import re
from pathlib import Path
from xml.sax.saxutils import escape

SITE_URL = "https://nocturne21.com"
SETTINGS_FILE = "js/comic_settings.js"
OUTPUT_FILE = "sitemap.xml"

# Permanent site pages we want Google to discover.
STATIC_URLS = [
    f"{SITE_URL}/",
    f"{SITE_URL}/archive.html",
]


def get_pgdata_block(js_text):
    start_marker = "const pgData = ["
    start = js_text.find(start_marker)

    if start == -1:
        raise ValueError("Could not find const pgData")

    start += len(start_marker)
    end = js_text.find("];", start)

    if end == -1:
        raise ValueError("Could not find end of pgData")

    return js_text[start:end]


def split_entries(pgdata_text):
    entries = []
    current = []
    depth = 0
    inside = False

    for line in pgdata_text.splitlines():
        if "{" in line and not inside:
            inside = True
            depth = 1
            current = [line]
            continue

        if inside:
            current.append(line)
            depth += line.count("{") - line.count("}")

            if depth == 0:
                entries.append("\n".join(current))
                inside = False
                current = []

    return entries


def extract_number_field(entry, field):
    match = re.search(rf"{field}\s*:\s*(\d+)", entry)
    return int(match.group(1)) if match else None


js_text = Path(SETTINGS_FILE).read_text(encoding="utf-8")

entries = split_entries(get_pgdata_block(js_text))

comic_pages = []

for entry in entries:
    pg = extract_number_field(entry, "pgNum")

    if pg is not None:
        comic_pages.append(pg)


# Remove duplicates while preserving order.
comic_pages = list(dict.fromkeys(comic_pages))


urls = list(STATIC_URLS)

for pg in comic_pages:
    urls.append(f"{SITE_URL}/?pg={pg}")


xml_entries = []

for url in urls:
    xml_entries.append(
        f"""  <url>
    <loc>{escape(url)}</loc>
  </url>"""
    )


sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(xml_entries)}
</urlset>
"""


Path(OUTPUT_FILE).write_text(sitemap, encoding="utf-8")

print(
    f"sitemap.xml generated successfully with "
    f"{len(urls)} URLs ({len(comic_pages)} comic pages)."
)
