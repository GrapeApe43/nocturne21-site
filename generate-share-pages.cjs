const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = process.cwd();
const source = fs.readFileSync(path.join(root, 'js/comic_settings.js'), 'utf8');
const context = vm.createContext({ location: { search: '' }, console });
vm.runInContext(source, context, { filename: 'comic_settings.js', timeout: 3000 });
const pages = vm.runInContext('pgData', context);
const maxPage = vm.runInContext('maxpg', context);
const testOnly = process.argv.includes('--test');
const selected = testOnly ? pages.filter(p => p.pgNum === 2) : pages;
if (pages.length !== maxPage || selected.length === 0) throw new Error('Page data is incomplete.');
const escapeHtml = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const output = path.join(root, 'share');
fs.mkdirSync(output, { recursive: true });
for (const p of selected) {
  const num = Number(p.pgNum);
  if (!Number.isSafeInteger(num) || num < 1 || num > maxPage) throw new Error('Invalid page number');
  const url = `https://nocturne21.com/?pg=${num}`;
  const shareUrl = `https://nocturne21.com/share/${num}.html`;
  const title = `Nocturne 21 — ${p.title || `Page ${num}`}`;
  const description = p.description && !/^Page \d+ of Nocturne 21$/.test(p.description)
    ? p.description
    : (p.altText || `Read ${p.title || `Page ${num}`} of Nocturne 21, a sci-fi drama webcomic by April Ferrero.`);
  const image = `https://nocturne21.com/img/preview/pg${num}.png`;
  const html = `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${escapeHtml(title)}</title>\n<meta name="description" content="${escapeHtml(description)}">\n<meta name="robots" content="noindex,follow">\n<link rel="canonical" href="${url}">\n<meta property="og:type" content="website">\n<meta property="og:site_name" content="Nocturne 21">\n<meta property="og:url" content="${shareUrl}">\n<meta property="og:title" content="${escapeHtml(title)}">\n<meta property="og:description" content="${escapeHtml(description)}">\n<meta property="og:image" content="${image}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${escapeHtml(title)}">\n<meta name="twitter:description" content="${escapeHtml(description)}">\n<meta name="twitter:image" content="${image}">\n<meta http-equiv="refresh" content="4;url=${url}">\n</head>\n<body>\n<main><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p><p><a href="${url}">Read this comic page on Nocturne 21 →</a></p></main>\n</body>\n</html>\n`;
  fs.writeFileSync(path.join(output, `${num}.html`), html);
}
console.log(`Generated ${selected.length} share page(s).`);
