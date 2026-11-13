/* NOCTURNE 21 — FLOATING SHARE BAR */
(function () {
  "use strict";
  const STORAGE_KEY = "n21-desktop-share-collapsed";
  const desktop = () => window.matchMedia("(min-width: 801px) and (pointer: fine)").matches;
  const currentPageUrl = () => window.location.href.split("#")[0];

  function copyLink() {
    const url = currentPageUrl();
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(url);
    const input = document.createElement("textarea");
    input.value = url;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    return copied ? Promise.resolve() : Promise.reject(new Error("Copy failed"));
  }
  window.copyLink = copyLink;

  function updateToggle(bar) {
    const toggle = bar.querySelector(".share-toggle");
    if (!toggle) return;
    const expanded = desktop() ? !bar.classList.contains("desktop-collapsed") : bar.classList.contains("open");
    toggle.setAttribute("aria-expanded", String(expanded));
    toggle.setAttribute("aria-label", expanded ? "Collapse share menu" : "Expand share menu");
    toggle.textContent = expanded && desktop() ? "Hide" : "Share";
  }

  window.toggleShare = function (event) {
    if (event) event.preventDefault();
    const bar = document.getElementById("shareBar");
    if (!bar) return;
    if (desktop()) {
      const collapsed = bar.classList.toggle("desktop-collapsed");
      try { localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0"); } catch (_) {}
    } else {
      bar.classList.toggle("open");
    }
    updateToggle(bar);
  };

  function icon(path) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + path + '"></path></svg>';
  }

  function createShareBar() {
    if (document.getElementById("shareBar")) return;
    const bar = document.createElement("div");
    bar.className = "floating-share";
    bar.id = "shareBar";
    bar.innerHTML = `
      <button class="share-toggle" type="button" aria-expanded="false" onclick="toggleShare(event)">Share</button>
      <a href="/rss.html" title="Subscribe" aria-label="Subscribe to RSS">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="18" r="2"></circle><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path></svg>
      </a>
      <a href="#" data-platform="bluesky" title="Share on Bluesky" aria-label="Share on Bluesky"><img src="/img/bluesky.png" alt=""></a>
      <a href="#" data-platform="discord" title="Copy link for Discord" aria-label="Copy link for Discord">${icon("M20 4.5A19 19 0 0 0 15.5 3l-.3.6a17 17 0 0 0-6.4 0L8.5 3A19 19 0 0 0 4 4.5C1.8 8 1.2 11.4 1.5 14.7c2.5 1.8 4.9 2.9 7.2 3.6l.9-1.3c-.8-.3-1.5-.7-2.2-1.1.2-.2.3-.3.5-.5 4.2 2 8.7 2 12.9 0 .2.2.3.5.5-.7.4-1.4.8-2.2 1.1l.9 1.3c2.3-.7 4.7-1.8 7.2-3.6.4-3.8-.7-7.2-2.8-10.2z")}</a>
      <a href="#" data-platform="tumblr" title="Share on Tumblr" aria-label="Share on Tumblr">${icon("M10 2v6h4v3h-4v5c0 2 1 3 3 3h1v3h-2c-4 0-6-2-6-6v-5H4V8c3-1 5-3 6-6z")}</a>
      <a href="#" data-platform="instagram" title="Copy link for Instagram" aria-label="Copy link for Instagram">${icon("M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-1a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z")}</a>
      <a href="#" data-platform="reddit" title="Share on Reddit" aria-label="Share on Reddit">${icon("M24 12c0 6.6-5.4 12-12 12S0 18.6 0 12 5.4 0 12 0s12 5.4 12 12zm-5-1.5c0-1-.8-1.8-1.8-1.8-.5 0-1 .2-1.3.6-1.3-.9-3-1.5-4.9-1.6l1-3.1 2.6.6c0 .8.7 1.5 1.5 1.5.8 0 1.5-.7 1.5-1.5S16.9 4 16.1 4c-.6 0-1.2.4-1.4 1l-3-.7c-.3-.1-.6.1-.7.4l-1.2 3.7c-1.9.1-3.6.7-4.9 1.6-.3-.4-.8-.6-1.3-.6-1 0-1.8.8-1.8 1.8 0 .7.4 1.3 1 1.6 0 .2-.1.5-.1.7 0 3.2 3.8 5.8 8.5 5.8s8.5-2.6 8.5-5.8c0-.2 0-.5-.1-.7.6-.3 1-1 1-1.6z")}</a>
      <a href="#" data-platform="twitter" title="Share on X" aria-label="Share on X">${icon("M18 2h3l-7 8 8 12h-6l-5-8-7 8H1l8-9L2 2h6l4 7 6-7z")}</a>`;
    document.body.prepend(bar);
  }

  function initializeShareBar() {
    createShareBar();
    const bar = document.getElementById("shareBar");
    if (!bar) return;
    try { if (localStorage.getItem(STORAGE_KEY) === "1") bar.classList.add("desktop-collapsed"); } catch (_) {}
    updateToggle(bar);
    window.addEventListener("resize", () => updateToggle(bar));
    const pageUrl = currentPageUrl();
    const encodedUrl = encodeURIComponent(pageUrl);
    const shareText = "Check out Nocturne 21!";
    const encodedText = encodeURIComponent(shareText);
    const links = {
      bluesky: "https://bsky.app/intent/compose?text=" + encodeURIComponent(shareText + " " + pageUrl),
      tumblr: "https://www.tumblr.com/widgets/share/tool?canonicalUrl=" + encodedUrl,
      reddit: "https://www.reddit.com/submit?url=" + encodedUrl + "&title=" + encodedText,
      twitter: "https://twitter.com/intent/tweet?url=" + encodedUrl + "&text=" + encodedText
    };
    Object.keys(links).forEach(function (platform) {
      const link = bar.querySelector('[data-platform="' + platform + '"]');
      if (!link) return;
      link.href = links[platform];
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("onclick");
    });
    ["discord", "instagram"].forEach(function (platform) {
      const link = bar.querySelector('[data-platform="' + platform + '"]');
      if (!link) return;
      link.href = "#";
      link.removeAttribute("onclick");
      link.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
          await copyLink();
          alert(platform === "discord" ? "Link copied! Paste into Discord ✧" : "Link copied! Open Instagram to share ✧");
        } catch (error) {
          window.prompt("Copy this link:", currentPageUrl());
        }
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      if (desktop()) {
        bar.classList.add("desktop-collapsed");
        try { localStorage.setItem(STORAGE_KEY, "1"); } catch (_) {}
      } else {
        bar.classList.remove("open");
      }
      updateToggle(bar);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initializeShareBar);
  else initializeShareBar();
})();
