
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = process.cwd();
const site = 'https://nocturne21.com';

const source = fs.readFileSync(
  path.join(root, 'js/comic_settings.js'),
  'utf8'
);

const context = vm.createContext({
  location: { search: '' },
  console
});

vm.runInContext(source, context, {
  filename: 'comic_settings.js',
  timeout: 3000
});

const pages = vm.runInContext('pgData', context);
const maxPage = vm.runInContext('maxpg', context);

const testOnly = process.argv.includes('--test');

const selected = testOnly
  ? pages.filter(p => Number(p.pgNum) === 2)
  : pages;

if (pages.length !== maxPage || selected.length === 0) {
  throw new Error('Page data is incomplete.');
}

const escapeHtml = value =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function getPreviewImage(num) {
  const candidates = [
    `img/preview/pg${num}.png`,
    `img/thumbs/pg${num}.png`,
    'img/promo-art.jpg'
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(root, candidate))) {
      return `${site}/${candidate}`;
    }
  }

  throw new Error(`No preview image available for page ${num}`);
}

const output = path.join(root, 'share');
fs.mkdirSync(output, { recursive: true });

for (const p of selected) {
  const num = Number(p.pgNum);

  if (
    !Number.isSafeInteger(num) ||
    num < 1 ||
    num > maxPage
  ) {
    throw new Error('Invalid page number');
  }

  const url = `${site}/?pg=${num}`;
  const shareUrl = `${site}/share/${num}.html`;

  const title = `Nocturne 21 — ${p.title || `Page ${num}`}`;

  const description =
    p.description &&
    !/^Page \d+ of Nocturne 21$/.test(p.description)
      ? p.description
      : (
          p.altText ||
          `Read ${p.title || `Page ${num}`} of Nocturne 21, a sci-fi drama webcomic.`
        );

  const image = getPreviewImage(num);

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">

<meta name="robots" content="noindex,follow">
<link rel="canonical" href="${url}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="Nocturne 21">
<meta property="og:url" content="${shareUrl}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:image" content="${image}">
<meta property="og:image:alt" content="${escapeHtml(title)}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(title)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${image}">

<script>
  window.location.replace(${JSON.stringify(url)});
</script>

<noscript>
  <meta http-equiv="refresh" content="0;url=${url}">
</noscript>

</head>
<body>
<main>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
  <p>
    <a href="${url}">Read this comic page on Nocturne 21 →</a>
  </p>
</main>
</body>
</html>
`;

  fs.writeFileSync(
    path.join(output, `${num}.html`),
    html
  );
}

console.log(`Generated ${selected.length} share page(s).`);
