import os
import re
import json
import html
import mimetypes
from io import BytesIO
from PIL import Image, ImageOps
from pathlib import Path
from datetime import datetime, timezone
from email.utils import format_datetime
from urllib.parse import quote

import requests
import pytumblr

SITE_URL = 'https://nocturne21.com'
DATA_FILE = Path('n21-journal-data.js')
RSS_FILE = Path('journal-rss.xml')
TRACKER_FILE = Path('.last_journal_post.txt')
STATE_FILE = Path('.journal_publish_state.json')
DEFAULT_IMAGE = f'{SITE_URL}/img/promo-art.jpg'
TIMEOUT = 25


def objects_from_array(source):
    match = re.search(r'\bconst\s+N21_JOURNAL_POSTS\s*=\s*\[', source)
    if not match:
        raise ValueError('Cannot find N21_JOURNAL_POSTS array')
    i = match.end()
    depth = 0
    start = None
    quote_char = None
    escaped = False
    line_comment = False
    block_comment = False
    result = []
    while i < len(source):
        c = source[i]
        nxt = source[i + 1] if i + 1 < len(source) else ''
        if line_comment:
            if c == '\n':
                line_comment = False
            i += 1
            continue
        if block_comment:
            if c == '*' and nxt == '/':
                block_comment = False
                i += 2
            else:
                i += 1
            continue
        if quote_char:
            if escaped:
                escaped = False
            elif c == '\\':
                escaped = True
            elif c == quote_char:
                quote_char = None
            i += 1
            continue
        if c == '/' and nxt == '/':
            line_comment = True
            i += 2
            continue
        if c == '/' and nxt == '*':
            block_comment = True
            i += 2
            continue
        if c in ('"', "'", '`'):
            quote_char = c
            i += 1
            continue
        if c == ']' and depth == 0:
            if start is not None:
                raise ValueError('Unclosed journal post object')
            return result
        elif c == '{':
            if start is None:
                start = i
            depth += 1
        elif c == '}':
            depth -= 1
            if start is not None and depth == 0:
                result.append(source[start:i + 1])
                start = None
        i += 1
    raise ValueError('Journal array is not closed')


def string_field(block, name):
    m = re.search(r'\b' + re.escape(name) + r'\s*:\s*([\"\'])(.*?)\1', block, re.S)
    return m.group(2) if m else None


def content_field(block):
    m = re.search(r'\bcontent\s*:\s*`((?:\\.|[^`])*)`', block, re.S)
    return m.group(1) if m else ''


def tags_field(block):
    m = re.search(r'\btags\s*:\s*\[([^\]]*)\]', block, re.S)
    return re.findall(r'[\"\']([^\"\']+)[\"\']', m.group(1)) if m else []


def strip_markup(value):
    return html.unescape(re.sub(r'<[^>]*>', ' ', value or '')).strip()


def absolute_image(path):
    if not path:
        return DEFAULT_IMAGE
    if path.startswith(('https://', 'http://')):
        return path
    return SITE_URL + '/' + path.lstrip('/')


def load_posts():
    blocks = objects_from_array(DATA_FILE.read_text(encoding='utf-8'))
    posts = []
    for block in blocks:
        ident = string_field(block, 'id')
        title = string_field(block, 'title')
        date = string_field(block, 'date')
        if not all((ident, title, date)):
            continue
        dt = datetime.strptime(date, '%Y-%m-%d').replace(tzinfo=timezone.utc)
        excerpt = string_field(block, 'excerpt')
        content = content_field(block)
        thumbnail = string_field(block, 'thumbnail')
        comic_match = re.search(r'\bcomicPage\s*:\s*(\d+)', block)
        comic_page = int(comic_match.group(1)) if comic_match else None
        image = absolute_image(thumbnail) if thumbnail else (f'{SITE_URL}/img/preview/pg{comic_page}.png' if comic_page else DEFAULT_IMAGE)
        posts.append({
            'id': ident, 'title': title, 'date': dt,
            'description': excerpt or strip_markup(content) or title,
            'tags': tags_field(block), 'image': image,
            'url': f'{SITE_URL}/n21-entry-page?id={quote(ident)}',
        })
    if not posts:
        raise ValueError('No journal posts found')
    return sorted(posts, key=lambda p: p['date'], reverse=True)


def generate_rss(posts):
    items = []
    for p in posts:
        items.append(f'''<item><title>{html.escape(p['title'])}</title>
<link>{html.escape(p['url'])}</link><guid isPermaLink="true">{html.escape(p['url'])}</guid>
<pubDate>{format_datetime(p['date'])}</pubDate>
<description>{html.escape(p['description'])}</description></item>''')
    rss = f'''<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Nocturne 21 Journal</title>
<link>{SITE_URL}</link><description>News and updates from Nocturne 21</description>
{''.join(items)}</channel></rss>'''
    RSS_FILE.write_text(rss, encoding='utf-8')
    print(f'Generated {RSS_FILE} with {len(posts)} posts.')


def require(name):
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f'Missing GitHub Actions secret: {name}')
    return value


def discord(p):
    res = requests.post(require('WEBHOOK_URL'), json={
        'content': f"📝 **New Journal Post!**\n\n**{p['title']}**\n{p['url']}",
        'embeds': [{'title': p['title'], 'url': p['url'], 'description': p['description'][:200], 'image': {'url': p['image']}}],
    }, timeout=TIMEOUT)
    res.raise_for_status()
    if res.status_code not in (200, 204):
        raise RuntimeError(f'Discord unexpected status {res.status_code}')


def bluesky(p):
    session = requests.post('https://bsky.social/xrpc/com.atproto.server.createSession', json={
        'identifier': require('BLUESKY_HANDLE'), 'password': require('BLUESKY_APP_PASSWORD')
    }, timeout=TIMEOUT)
    session.raise_for_status()
    data = session.json()
    image_res = requests.get(p['image'], timeout=TIMEOUT)
    image_res.raise_for_status()
    image_bytes = image_res.content
    mime = image_res.headers.get('Content-Type', '').split(';')[0]
    if mime not in ('image/jpeg', 'image/png', 'image/webp'):
        mime = mimetypes.guess_type(p['image'])[0] or 'image/jpeg'
    if len(image_bytes) > 1_000_000:
        print(f'Bluesky thumbnail is {len(image_bytes):,} bytes; optimizing automatically.')
        with Image.open(BytesIO(image_bytes)) as original:
            original = ImageOps.exif_transpose(original)
            # JPEG is widely supported by Bluesky. Flatten transparent artwork on white.
            if original.mode in ('RGBA', 'LA') or 'transparency' in original.info:
                rgba = original.convert('RGBA')
                background = Image.new('RGB', rgba.size, 'white')
                background.paste(rgba, mask=rgba.getchannel('A'))
                optimized = background
            else:
                optimized = original.convert('RGB')
            optimized.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            for max_dimension in (1600, 1200, 900, 700, 500):
                optimized.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)
                for quality in (85, 75, 65, 50):
                    output = BytesIO()
                    optimized.save(output, format='JPEG', quality=quality, optimize=True)
                    if output.tell() <= 950_000:
                        image_bytes = output.getvalue()
                        mime = 'image/jpeg'
                        break
                if len(image_bytes) <= 950_000:
                    break
            else:
                raise RuntimeError('Unable to optimize Bluesky image below 1 MB')
        print(f'Optimized Bluesky thumbnail to {len(image_bytes):,} bytes.')
    upload = requests.post('https://bsky.social/xrpc/com.atproto.repo.uploadBlob',
        headers={'Authorization': f"Bearer {data['accessJwt']}", 'Content-Type': mime},
        data=image_bytes, timeout=TIMEOUT)
    upload.raise_for_status()
    record = {
        '$type': 'app.bsky.feed.post',
        'text': f"📝 {p['title']}\n\n{p['url']}",
        'createdAt': datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
        'embed': {'$type': 'app.bsky.embed.images', 'images': [{'alt': p['title'], 'image': upload.json()['blob']}]}
    }
    response = requests.post('https://bsky.social/xrpc/com.atproto.repo.createRecord',
        headers={'Authorization': f"Bearer {data['accessJwt']}"},
        json={'repo': data['did'], 'collection': 'app.bsky.feed.post', 'record': record}, timeout=TIMEOUT)
    response.raise_for_status()


def tumblr(p):
    client = pytumblr.TumblrRestClient(
        require('TUMBLR_CONSUMER_KEY'), require('TUMBLR_CONSUMER_SECRET'),
        require('TUMBLR_OAUTH_TOKEN'), require('TUMBLR_OAUTH_SECRET'))
    response = client.create_photo('nocturne-21.tumblr.com', state='published',
        caption=f"<p><b>{html.escape(p['title'])}</b></p><p><a href='{html.escape(p['url'], quote=True)}'>Read here</a></p>",
        source=p['image'], tags=p['tags'])
    if not isinstance(response, dict) or ('id' not in response and 'id_string' not in response):
        raise RuntimeError(f'Tumblr did not confirm post creation: {response}')


def main():
    posts = load_posts()
    generate_rss(posts)
    if os.getenv('PUBLISH_JOURNAL') != 'true':
        print('RSS-only mode; social posting skipped.')
        return
    latest = posts[0]
    print(f"Selected journal: {latest['id']} ({latest['title']})")
    state = {}
    if STATE_FILE.exists():
        state = json.loads(STATE_FILE.read_text(encoding='utf-8'))
    if not isinstance(state, dict):
        raise RuntimeError('Invalid journal publish state')
    # Honor the legacy tracker for older successful runs.
    if TRACKER_FILE.exists() and TRACKER_FILE.read_text(encoding='utf-8').strip() == latest['id']:
        print('Journal already marked published by legacy tracker; skipping.')
        return
    completed = set(state.get(latest['id'], []))
    failures = []
    for name, fn in [('discord', discord), ('bluesky', bluesky), ('tumblr', tumblr)]:
        if name in completed:
            print(f'{name}: already posted; skipping.')
            continue
        try:
            fn(latest)
            completed.add(name)
            state[latest['id']] = sorted(completed)
            STATE_FILE.write_text(json.dumps(state, indent=2) + '\n', encoding='utf-8')
            print(f'{name}: posted.')
        except Exception as exc:
            failures.append(f'{name}: {exc}')
            print(f'{name}: FAILED: {exc}')
    if len(completed) == 3:
        TRACKER_FILE.write_text(latest['id'], encoding='utf-8')
        print('Journal published to all three platforms.')
    if failures:
        raise RuntimeError('Some social posts failed: ' + '; '.join(failures))


if __name__ == '__main__':
    main()
