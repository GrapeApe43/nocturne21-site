// The footer is handled here so it can be reused across the site.
// Put an empty <div class="writeFooter"></div> near the bottom of each page.

document.querySelector(".writeFooter").innerHTML = `

<hr>

<footer class="site-footer">

  <!-- Social icons + mini navigation -->
  <div class="footer-top-row">

    <div class="socialicons footer-socialicons">
      <a href="https://discord.gg/FCkUWf7awk" target="_blank" rel="noopener noreferrer">
        <img src="img/social/discord.png" alt="Discord">
      </a>

      <a href="https://bsky.app/profile/grape-ape.bsky.social" target="_blank" rel="noopener noreferrer">
        <img src="img/social/bluesky.png" alt="Bluesky">
      </a>

      <a href="https://cara.app/grapeape" target="_blank" rel="noopener noreferrer">
        <img src="img/social/cara.png" alt="Cara">
      </a>

      <a href="https://www.tumblr.com/nocturne-21" target="_blank" rel="noopener noreferrer">
        <img src="img/social/tumblr.png" alt="Tumblr">
      </a>

      <a href="https://instagram.com/aprilferreroart" target="_blank" rel="noopener noreferrer">
        <img src="img/social/instagram.png" alt="Instagram">
      </a>

      <a href="https://www.patreon.com/nocturne21" target="_blank" rel="noopener noreferrer">
        <img src="img/social/patreon.png" alt="Patreon">
      </a>

      <a href="https://www.tiktok.com/@aprilferrero?_t=8p1tFELZj6X&_r=1" target="_blank" rel="noopener noreferrer">
        <img src="img/social/tiktok.png" alt="TikTok">
      </a>
    </div>

    <div class="footer-nav" id="footerNav">
      <a href="index.html">HOME</a> |
      <a href="archive.html">ARCHIVE</a> |
      <a href="about.html">ABOUT</a> |
      <a href="cast.html">CAST</a> |
      <a href="n21-journal.html">BLOG</a> |
      <a href="extras.html">EXTRAS</a> |
      <a href="support.html">SUPPORT</a>
    </div>

  </div>

  <div class="footer-lower" align="center">

    <script
      type="text/javascript"
      src="https://www.comicad.net/r/Q4qCNYu30R/"
      width="100%">
    </script>

    <p>Copyright 2026 April Ferrero</p>

    <p><strong>Powered by</strong></p>

    <a href="https://rarebit.neocities.org">
      <img
        src="img/rarebitlogo_small.png"
        height="30"
        alt="Rarebit">
    </a>

  </div>

</footer>
`;


/* ========================================
   FOOTER LAYOUT
   ======================================== */

const footerStyle = document.createElement("style");

footerStyle.textContent = `

  .site-footer {
    width: 100%;
    box-sizing: border-box;
  }




  /* Social icons + navigation centered as one footer row */

  .footer-top-row {
    width: 100%;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 28px;
    padding: 8px 12px 14px;
  }


  .footer-socialicons {
    flex: 0 0 auto;

    margin: 0 !important;
    padding: 0 !important;
  }


  .footer-nav {
    flex: 0 1 auto;

    text-align: center;
    white-space: normal;
  }


  /* Restore social icon hover effect */

  .footer-socialicons a img {
    transition:
      filter 0.2s ease,
      transform 0.2s ease !important;
  }


  .footer-socialicons a:hover img {
    filter:
      brightness(0)
      saturate(100%)
      invert(47%)
      sepia(19%)
      saturate(1187%)
      hue-rotate(199deg)
      brightness(87%)
      contrast(85%) !important;

    transform: translateY(-2px) !important;
  }

`;

document.head.appendChild(footerStyle);
