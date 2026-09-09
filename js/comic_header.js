/* ========================================
   NOCTURNE 21 — SITE HEADER
   ======================================== */

const CHAPTER_NUMBER = "06";
const CHAPTER_COMPLETED = 1;
const CHAPTER_TOTAL = 35;

const chapterPercent =
  Math.round((CHAPTER_COMPLETED / CHAPTER_TOTAL) * 1000) / 10;

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


    <!-- CHAPTER 06 PRODUCTION STATUS -->

    <div
      class="chapter-status"
      aria-label="Chapter 6 production progress"
      style="
        display: block;
        width: 100%;
        box-sizing: border-box;
        position: relative;
        z-index: 20;
        margin: 0;
        padding: 10px 14px 12px;
        background: linear-gradient(
          to bottom,
          rgba(36, 16, 22, 0.98),
          rgba(20, 10, 14, 0.98)
        );
        border-top: 1px solid rgba(238, 71, 87, 0.28);
        border-bottom: 1px solid rgba(238, 71, 87, 0.28);
        line-height: normal;
        text-align: left;
        font-family: 'Courier New', Courier, monospace;
      "
    >

      <div
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin: 0 0 4px;
          padding: 0;
          line-height: 1.3;
        "
      >
        <span
          style="
            color: #ffd6dc;
            font-size: 0.72rem;
            font-weight: bold;
            letter-spacing: 0.12em;
          "
        >
          CHAPTER ${CHAPTER_NUMBER} // PRODUCTION STATUS
        </span>

        <span
          style="
            color: #ff9aa5;
            font-size: 0.72rem;
            font-weight: bold;
            letter-spacing: 0.06em;
            white-space: nowrap;
          "
        >
          ${chapterPercent}%
        </span>
      </div>


      <div
        style="
          width: 100%;
          margin: 0 0 6px;
          padding: 0;
          color: rgba(255,255,255,0.66);
          font-size: 0.66rem;
          letter-spacing: 0.10em;
          line-height: 1.3;
        "
      >
        ${String(CHAPTER_COMPLETED).padStart(2, "0")} /
        ${String(CHAPTER_TOTAL).padStart(2, "0")}
        PAGES COMPLETE
      </div>


      <div
        style="
          width: 100%;
          height: 7px;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          background: rgba(0,0,0,0.55);
          border: 1px solid rgba(238,71,87,0.28);
          overflow: hidden;
          line-height: 0;
        "
      >
        <div
          style="
            width: ${chapterPercent}%;
            height: 100%;
            min-width: 3px;
            margin: 0;
            padding: 0;
            background: linear-gradient(
              to right,
              #9a2736,
              #ee4757,
              #ff8c9a
            );
            box-shadow:
              0 0 7px rgba(238,71,87,0.42),
              0 0 14px rgba(238,71,87,0.16);
          "
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

  let currentPath =
    window.location.pathname.split("/").pop() || "index.html";

  currentPath = currentPath.split("?")[0].split("#")[0];


  function normalizePath(path) {
    path = (path || "")
      .split("?")[0]
      .split("#")[0]
      .trim();

    if (path === "" || path === "/" || path === "index") {
      return "index.html";
    }

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
