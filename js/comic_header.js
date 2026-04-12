document.querySelector(".writeHeader").innerHTML = `
  <header class="site-header">
  
  <div class="jumpring">
    <a href="https://spelledeg.wixsite.com/ontenterhook"><img src="https://i.imgur.com/CJfTY8s.png" target="_blank" title="Ontenterhook: Thrillerish webcomic collective"></a>
    <a href="http://hereilieawake.webcomic.ws/"><img src="https://i.imgur.com/YGMLp6o.png" target="_blank" title="Here I Lie Awake"></a>
    <a href="http://polaris.webcomic.ws/"><img src="https://i.imgur.com/MxNtgV2.png" target="_blank" title="Polaris"></a>
    <a href="http://kordinar.the-comic.org/"><img src="https://i.imgur.com/DhpYBjs.png" target="_blank" title="Kordinar 25000"></a>
    <a href="https://www.emergencycoven.com/"><img src="https://i.imgur.com/5l3fCdK.jpg" target="_blank" title="The Emergency Coven"></a>
    <a href="http://mksjekyllandhyde.thecomicseries.com/"><img src="https://i.imgur.com/4K9Ivo3.png" target="_blank" title="MK's The Strange Case of Dr. Jekkyl & Mr. Hyde"></a>
    <a href="http://nowhiring.cfw.me/"><img src="https://i.imgur.com/Xz97tZn.png" target="_blank" title="Now Hiring"></a>
    <a href="http://playground-cryptida.thecomicseries.com/"><img src="https://i.imgur.com/l2eu15L.png" target="_blank" title="Playground"></a>
    <a href="http://sunstrikeandbluemist.thecomicseries.com/"><img src="https://i.imgur.com/glD7zrE.png" target="_blank" title="Sunstrike & Bluemist: An Origin Story"></a>
    <a href="http://aceofthespades.thecomicseries.com/"><img src="https://i.imgur.com/xO9zrnq.png" target="_blank" title="The Ace of the Spades"></a>
    <a href="http://strippedwebcomic.webcomic.ws/"><img src="https://i.imgur.com/ArfMUti.png" target="_blank" title="STRIPPED: A War Story"></a>
    <a href="http://trevor.the-comic.org/"><img src="https://i.imgur.com/4IvJSUR.png" target="_blank" title="TREVOR"></a>
  </div>
  
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

  <div class="socialicons">
    <a href="https://discord.gg/FCkUWf7awk" target="_blank"><img src="img/social/discord.png"></a>
    <a href="https://bsky.app/profile/grape-ape.bsky.social" target="_blank"><img src="img/social/bluesky.png"></a>
    <a href="https://cara.app/grapeape" target="_blank"><img src="img/social/cara.png"></a>
    <a href="https://www.tumblr.com/nocturne-21" target="_blank"><img src="img/social/tumblr.png"></a>
    <a href="https://instagram.com/aprilferreroart" target="_blank"><img src="img/social/instagram.png"></a>
    <a href="https://www.patreon.com/nocturne21" target="_blank"><img src="img/social/patreon.png"></a>
    <a href="https://www.tiktok.com/@aprilferrero?_t=8p1tFELZj6X&_r=1" target="_blank"><img src="img/social/tiktok.png"></a>
    <br><br>
  </div>
  </header>
`;

(function () {
  const navLinks = document.querySelectorAll("#nav a");

  // get current path cleanly
  let currentPath = window.location.pathname.split("/").pop() || "index.html";

  // strip query/hash just in case
  currentPath = currentPath.split("?")[0].split("#")[0];

  // normalize paths like "about" -> "about.html"
  function normalizePath(path) {
    path = (path || "").split("?")[0].split("#")[0].trim();

    if (path === "" || path === "/" || path === "index") return "index.html";

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
    const homeLink = document.querySelector('#nav a[href="index.html"]');
    if (homeLink) homeLink.classList.add("current");
  }
})();















