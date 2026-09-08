/* ========================================
   NOCTURNE 21 — SITE HEADER
   ======================================== */

// Chapter 6 production progress
const CHAPTER_NUMBER = "06";
const CHAPTER_COMPLETED = 1;
const CHAPTER_TOTAL = 35;

const chapterPercent = Math.min(
  100,
  Math.round((CHAPTER_COMPLETED / CHAPTER_TOTAL) * 1000) / 10
);

document.querySelector(".writeHeader").innerHTML = `
  <header class="site-header">

    <a href="index.html" class="site-banner-link">
      <img src="./img/logo.png" alt="Nocturne 21" class="site-banner" />
    </a>

    <div id="nav">
      <a href="index.html" data-page="index.html">HOME</a>
      <a href="archive.html" data-page="archive.html">ARCHIVE</a>
      <a href="about.html" data-page="about.html">ABOUT</a>
      <a href="cast.html" data-page="cast.html">CAST</a>
      <a href="n21-journal.html" data-page="n21-journal.html">BLOG</a>
      <a href="extras.html" data-page="extras.html">EXTRAS</a>
      <a href="support.html" data-page="support.html">SUPPORT</a>
    </div>

    <div class="chapter-status" aria-label="Chapter 6 production progress">

      <div class="chapter-status-header">
        <span class="chapter-status-title">
          CHAPTER ${CHAPTER_NUMBER} // PRODUCTION STATUS
        </span>

        <span class="chapter-status-percent">
          ${chapterPercent}%
        </span>
      </div>

      <div class="chapter-status-info">
        <span>${String(CHAPTER_COMPLETED).padStart(2, "0")} / ${String(CHAPTER_TOTAL).padStart(2, "0")} PAGES COMPLETE</span>
      </div>

      <div class="chapter-progress-track">
        <div
          class="chapter-progress-fill"
          style="width: ${chapterPercent}%"
        ></div>
      </div>

    </div>

    <div class="socialicons">
      <a href="https://discord.gg/FCkUWf7awk" target="_blank">
        <img src="img/social/discord.png">
      </a>

      <a href="https://bsky.app/profile/grape-ape.bsky.social" target="_blank">
        <img src="img/social/bluesky.png">
      </a>

      <a href="https://cara.app/grapeape" target="_blank">
        <img src="img/social/cara.png">
      </a>

      <a href="https://www.tumblr.com/nocturne-21" target="_blank">
        <img src="img/social/tumblr.png">
      </a>

      <a href="https://instagram.com/aprilferreroart" target="_blank">
        <img src="img/social/instagram.png">
      </a>

      <a href="https://www.patreon.com/nocturne21" target="_blank">
        <img src="img/social/patreon.png">
      </a>

      <a href="https://www.tiktok.com/@aprilferrero?_t=8p1tFELZj6X&_r=1" target="_blank">
        <img src="img/social/tiktok.png">
      </a>

      <br><br>
    </div>

  </header>
`;


(function () {
  const navLinks = document.querySelectorAll("#nav a");

  // get current path cleanly
  let currentPath =
    window.location.pathname.split("/").pop() || "index.html";

  // strip query/hash just in case
  currentPath = currentPath.split("?")[0].split("#")[0];

  // normalize paths like "about" -> "about.html"
  function normalizePath(path) {
    path = (path || "")
      .split("?")[0]
      .split("#")[0]
      .trim();

    if (path === "" || path === "/" || path === "index") {
      return "index.html";
    }

    // if no file extension, assume .html
    if (!path.includes(".") && path !== "") {
      return path + ".html";
    }

    return path;
  }

  currentPath = normalizePath(currentPath);

  navLinks.forEach(link => {
    const href = normalizePath(link.getAttribute("href"));

    if (href === currentPath) {
      link.classList.add("current");
    }
  });

  // extra homepage fallback
  if (
    window.location.pathname === "/" ||
    window.location.pathname.endsWith("/index") ||
    window.location.pathname.endsWith("/index.html")
  ) {
    const homeLink =
      document.querySelector('#nav a[href="index.html"]');

    if (homeLink) {
      homeLink.classList.add("current");
    }
  }
})();
