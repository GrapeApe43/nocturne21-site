#!/usr/bin/env python3

import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path

SCHEDULE_FILE = Path("scheduled-comic-releases.json")
SETTINGS_FILE = Path("js/comic_settings.js")

COMIC_FOLDER = Path("img/comics")
THUMB_FOLDER = Path("img/thumbs")
PREVIEW_FOLDER = Path("img/preview")


def fail(message):
    raise SystemExit(f"ERROR: {message}")


def write_output(name, value):
    output_file = os.environ.get("GITHUB_OUTPUT")
    if output_file:
        with open(output_file, "a", encoding="utf-8") as f:
            f.write(f"{name}={value}\n")
    else:
        print(f"{name}={value}")


def parse_publish_time(value):
    try:
        dt = datetime.fromisoformat(value)
    except ValueError:
        fail(
            f"Invalid publish_at value: {value!r}. "
            "Use ISO format with an offset, for example "
            "'2026-08-17T12:00:00-04:00'."
        )

    if dt.tzinfo is None:
        fail(
            f"publish_at must include a timezone offset: {value!r}. "
            "Example: '2026-08-17T12:00:00-04:00'."
        )

    return dt


def get_current_maxpg(js_text):
    match = re.search(r"\bconst\s+maxpg\s*=\s*(\d+)\s*;", js_text)
    if not match:
        fail("Could not find 'const maxpg = ...;' in js/comic_settings.js.")
    return int(match.group(1))


def set_maxpg(js_text, new_maxpg):
    updated, count = re.subn(
        r"(\bconst\s+maxpg\s*=\s*)\d+(\s*;)",
        rf"\g<1>{new_maxpg}\g<2>",
        js_text,
        count=1,
    )
    if count != 1:
        fail("Could not update maxpg in js/comic_settings.js.")
    return updated


def page_already_exists(js_text, page_num):
    return re.search(rf"\bpgNum\s*:\s*{page_num}\b", js_text) is not None


def js_string(value):
    # JSON strings are valid JavaScript strings and safely escape quotes/newlines.
    return json.dumps(value or "", ensure_ascii=False)


def make_pgdata_entry(release):
    page_num = int(release["pgNum"])
    title = release.get("title") or f"Page {page_num}"
    alt_text = release.get("altText", "")
    author_notes = release.get("authorNotes", "")
    image_files = int(release.get("imageFiles", 1))

    local_dt = parse_publish_time(release["publish_at"])
    year = local_dt.year
    month = local_dt.month
    day = local_dt.day

    return (
        "    {\n"
        f"        pgNum: {page_num},\n"
        f"        title: {js_string(title)},\n"
        f"        date: writeDate({year}, {month}, {day}),\n"
        f"        altText: {js_string(alt_text)},\n"
        f"        imageFiles: {image_files},\n"
        f"        authorNotes: {js_string(author_notes)}\n"
        "    },\n"
    )


def append_pgdata_entry(js_text, entry_text):
    array_start = js_text.find("const pgData = [")
    if array_start == -1:
        fail("Could not find 'const pgData = [' in js/comic_settings.js.")

    # Rarebit's pgData array ends before this helper-function comment.
    helper_marker = js_text.find("//below is a function", array_start)
    search_end = helper_marker if helper_marker != -1 else len(js_text)

    array_end = js_text.rfind("];", array_start, search_end)
    if array_end == -1:
        fail("Could not find the end of the pgData array.")

    before = js_text[:array_end].rstrip()
    after = js_text[array_end:]

    return before + "\n\n" + entry_text + "\n" + after


def required_assets(page_num):
    return [
        COMIC_FOLDER / f"pg{page_num}.jpg",
        THUMB_FOLDER / f"pg{page_num}.png",
        PREVIEW_FOLDER / f"pg{page_num}.png",
    ]


def validate_assets(page_num):
    missing = [str(path) for path in required_assets(page_num) if not path.exists()]
    if missing:
        fail(
            f"Page {page_num} is due, but these required files are missing:\n  - "
            + "\n  - ".join(missing)
        )


def main():
    if not SCHEDULE_FILE.exists():
        fail(f"Missing {SCHEDULE_FILE}.")
    if not SETTINGS_FILE.exists():
        fail(f"Missing {SETTINGS_FILE}.")

    schedule = json.loads(SCHEDULE_FILE.read_text(encoding="utf-8"))
    releases = schedule.get("releases", [])

    now = datetime.now(timezone.utc)

    due = []
    for release in releases:
        if not release.get("enabled", True):
            continue
        if release.get("status", "pending") != "pending":
            continue

        publish_dt = parse_publish_time(release["publish_at"])
        if publish_dt.astimezone(timezone.utc) <= now:
            due.append((publish_dt.astimezone(timezone.utc), release))

    due.sort(key=lambda item: (item[0], int(item[1]["pgNum"])))

    if not due:
        print("No scheduled comic pages are due.")
        write_output("released", "false")
        write_output("pages", "")
        return

    js_text = SETTINGS_FILE.read_text(encoding="utf-8")
    current_max = get_current_maxpg(js_text)
    released_pages = []

    for _, release in due:
        page_num = int(release["pgNum"])

        # If it was already inserted manually, mark the schedule item complete
        # rather than inserting a duplicate.
        if page_already_exists(js_text, page_num):
            if page_num > current_max:
                js_text = set_maxpg(js_text, page_num)
                current_max = page_num

            release["status"] = "published"
            release["published_at"] = now.isoformat().replace("+00:00", "Z")
            released_pages.append(page_num)
            print(f"Page {page_num} already exists in pgData; marking it published.")
            continue

        expected_page = current_max + 1
        if page_num != expected_page:
            fail(
                f"Page {page_num} is due, but current maxpg is {current_max}. "
                f"The next publishable page must be {expected_page}. "
                "This guard prevents accidental gaps or out-of-order releases."
            )

        validate_assets(page_num)

        entry = make_pgdata_entry(release)
        js_text = append_pgdata_entry(js_text, entry)
        js_text = set_maxpg(js_text, page_num)
        current_max = page_num

        release["status"] = "published"
        release["published_at"] = now.isoformat().replace("+00:00", "Z")
        released_pages.append(page_num)

        print(f"Released page {page_num} into comic_settings.js.")

    SETTINGS_FILE.write_text(js_text, encoding="utf-8")
    SCHEDULE_FILE.write_text(
        json.dumps(schedule, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    write_output("released", "true")
    write_output("pages", ",".join(str(p) for p in released_pages))


if __name__ == "__main__":
    main()
