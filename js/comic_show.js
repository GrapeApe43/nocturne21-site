```javascript
//comic_show.js was created by geno7, with much needed assistance from Dannarchy
//
//this is the script that actually displays the comics, nav and comic title on the page.
//below are what's called some "function calls", each one is responsible for making an element of the page.
//to get something to actually show up on the page, all you'd need to do is make a div with a class that has the same name as the function call.
//i.e. writeNav shows comic navigation, to show it on a page you'd use <div class="writeNav"></div> wherever you want it to be.
//you can even put multiple divs with that same class name and it'll display multiple instances of the navigation.
//
//a couple of the function calls have toggles too.


// ============================================================
// DYNAMIC SEO METADATA
// ============================================================

function updateComicSEO() {
  // Make sure pgData is available and the current page exists.
  if (!pgData || pgData.length < pg) return;

  const pageData = pgData[pg - 1];

  // Printed page title, e.g. "Page 188"
  const pageTitle = pageData.title || `Page ${pg}`;

  // Use the printed page number when available.
  // This keeps the SEO title tied to the actual comic page number,
  // rather than the internal pgNum used by the site.
  const seoTitle = `Nocturne 21 — ${pageTitle} | Dark Sci-Fi Mystery Webcomic`;

  // Use author notes as additional contextual text when available.
  // Strip HTML so the meta description contains plain text.
  const cleanNotes = (pageData.authorNotes || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const baseDescription =
    `Read ${pageTitle} of Nocturne 21, a dark sci-fi mystery webcomic by April Ferrero.`;

  const description = cleanNotes
    ? `${baseDescription} ${cleanNotes}`
    : baseDescription;

  // Canonical URL intentionally does NOT include #showComic.
  const canonicalURL =
    `${window.location.origin}${window.location.pathname}?pg=${pg}`;

  // Use the preview image for social sharing.
  const previewImage =
    `${window.location.origin}/img/preview/pg${pg}.png`;


  // ------------------------------------------------------------
  // <title>
  // ------------------------------------------------------------

  document.title = seoTitle;


  // ------------------------------------------------------------
  // Helper for creating/updating <meta> tags
  // ------------------------------------------------------------

  function setMeta(attribute, value, content) {
    let tag = document.head.querySelector(`meta[${attribute}="${value}"]`);

    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute(attribute, value);
      document.head.appendChild(tag);
    }

    tag.setAttribute("content", content);
  }


  // ------------------------------------------------------------
  // Meta description
  // ------------------------------------------------------------

  setMeta("name", "description", description);


  // ------------------------------------------------------------
  // Canonical URL
  // ------------------------------------------------------------

  let canonical = document.head.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", canonicalURL);


  // ------------------------------------------------------------
  // Open Graph metadata
  // ------------------------------------------------------------

  setMeta("property", "og:title", seoTitle);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", canonicalURL);
  setMeta("property", "og:type", "article");
  setMeta("property", "og:image", previewImage);
  setMeta("property", "og:image:alt", `Nocturne 21 — ${pageTitle}`);


  // ------------------------------------------------------------
  // Twitter/X metadata
  // ------------------------------------------------------------

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", seoTitle);
  setMeta("name", "twitter:description", description);
  setMeta("name", "twitter:image", previewImage);
  setMeta("name", "twitter:image:alt", `Nocturne 21 — ${pageTitle}`);


  // ------------------------------------------------------------
  // Helpful semantic page information
  // ------------------------------------------------------------

  const seoDescription = document.querySelector(".comic-seo-description");

  if (seoDescription) {
    seoDescription.innerHTML = `
      <strong>Nocturne 21 — ${pageTitle}</strong>
      <span>Dark sci-fi mystery webcomic by April Ferrero.</span>
    `;
  }

  console.log("Comic SEO updated:", {
    title: seoTitle,
    description: description,
    canonical: canonicalURL,
    image: previewImage
  });
}


// ============================================================
// COMIC DISPLAY
// ============================================================

writeNav(true);

//debug
console.log(pg);

writePageTitle(".writePageTitle", false, " - ");

writePageClickable(".writePageClickable", true);

writeAuthorNotes(".writeAuthorNotes");

renderCommentBoxForPage();

keyNav();


// ============================================================
// COMMENTS
// ============================================================

function renderCommentBoxForPage() {
  const commentWrap = document.getElementById("commentsWrap");
  if (!commentWrap) return;

  commentWrap.innerHTML = `
    <h2 class="comments-title">Join the Conversation</h2>
    <p class="comment-prompt">What did you think of this page? 👀</p>
    <div class="commentbox"></div>
  `;

  if (typeof commentBox === "function") {
    commentBox("5725326164361216-proj", {
      defaultBoxId: "nocturne21-page-" + pg,
      backgroundColor: "#111827",
      textColor: "#e8ecf4",
      subtextColor: "#b8c2d1"
    });
  }
}


// ============================================================
// SHOW COMIC PAGE, WITH CLICKABLE LINK
// ============================================================

function writePageClickable(div, clickable) {
  if (!clickable) {
    document.querySelector(div).innerHTML =
      `<div class="comicPage">${writePage()}</div>`;
  } else if (pg < maxpg) {
    document.querySelector(div).innerHTML =
      `<div class="comicPage"><a href="?pg=${pg + 1}${navScrollTo}">${writePage()}</a></div>`;
  } else {
    document.querySelector(div).innerHTML =
      `<div class="comicPage">${writePage()}</div>`;
  }
}


// ============================================================
// PAGE TITLE
// ============================================================

function writePageTitle(div, toggleNum, char) {
  if (pgData.length >= pg) {
    //display title of current page
    document.querySelector(div).innerHTML =
      `<h1>${pgData[pg - 1].title}</h1>`;

    if (toggleNum) {
      //toggle whether you want to display the page number
      document.querySelector(div).innerHTML =
        `<h1>${pgData[pg - 1].pgNum + char + pgData[pg - 1].title}</h1>`;
    }
  }
}


// ============================================================
// AUTHOR NOTES
// ============================================================

function writeAuthorNotes(div) {
  if (pgData.length >= pg) {
    return document.querySelector(div).innerHTML =
      `${pgData[pg - 1].authorNotes}`;
  }
}


// ============================================================
// COMIC IMAGE
// ============================================================

//function used to split pages into multiple images if needed, and add alt text
function writePage() {
  let partExtension = "";
  let altText = "";

  let path =
    (folder != "" ? folder + "/" : "") +
    image +
    pg +
    partExtension +
    "." +
    ext;

  let page = ``;

  if (pgData.length < pg) {

    // Fallback alt text for pages without a pgData entry.
    altText = `Nocturne 21 webcomic — Page ${pg}`;

    page =
      `<img alt="${altText}" title="${altText}" src="${path}" />`;

    return page;

  } else if (pgData.length >= pg) {

    // Use the author's supplied alt text when available.
    altText = pgData[pg - 1].altText;

    // If no alt text was supplied, create a useful fallback.
    if (!altText || !altText.trim()) {
      altText =
        `Nocturne 21 webcomic — ${pgData[pg - 1].title || `Page ${pg}`}`;
    }

    if (pgData[pg - 1].imageFiles > 1) {

      for (
        let i = 1;
        i < pgData[pg - 1].imageFiles + 1;
        i++
      ) {

        partExtension = imgPart + i.toString();

        path =
          (folder != "" ? folder + "/" : "") +
          image +
          pg +
          partExtension +
          "." +
          ext;

        if (i > 1) {
          page += `<br/>`;
        }

        page +=
          `<img alt="${altText}" title="${altText}" src="${path}" />`;
      }

    } else {

      page =
        `<img alt="${altText}" title="${altText}" src="${path}" />`;
    }

    //debug
    console.log("page code to insert - " + page);
    console.log("alt text to print - " + altText);

    return page;
  }
}


// ============================================================
// DEBUG
// ============================================================

console.log(
  "array blank/not long enough? " +
  (pgData.length < pg)
);

console.log("array length - " + pgData.length);
console.log("current page - " + pg);

console.log(
  "number of page segments - " +
  pgData[pg - 1].imageFiles
);

console.log(
  "alt text - " +
  `"${pgData[pg - 1].altText}"`
);

console.log("nav text - " + navText);
console.log("nav image file extension - " + navExt);


// ============================================================
// NAVIGATION
// ============================================================

function imgOrText(setImg, navTextSet) {

  if (setImg) {

    return `
      <img
        src="${navFolder}/nav_${navText[navTextSet].toLowerCase()}.${navExt}"
        alt="${navText[navTextSet]}"
      />
    `;

  } else {

    return navText[navTextSet];
  }
}


function writeNav(imageToggle) {

  let writeNavDiv =
    document.querySelectorAll(".writeNav");

  writeNavDiv.forEach(function(element) {

    element.innerHTML = `
      <div class="comicNav">
        ${firstButton()}
        ${divider()}
        ${prevButton()}
        ${divider()}
        ${nextButton()}
        ${divider()}
        ${lastButton()}
      </div>
    `;
  });


  function firstButton() {

    if (pg > 1) {

      return `
        <a href="?pg=${1}${navScrollTo}">
          ${imgOrText(imageToggle, 0)}
        </a>
      `;

    } else {

      if (!imageToggle) {
        return imgOrText(imageToggle, 0);
      } else {
        return ``;
      }
    }
  }


  function divider() {

    if (!imageToggle) {
      return ` | `;
    }

    return ``;
  }


  function prevButton() {

    if (pg > 1) {

      return `
        <a href="?pg=${pg - 1}${navScrollTo}">
          ${imgOrText(imageToggle, 1)}
        </a>
      `;

    } else {

      if (!imageToggle) {
        return imgOrText(imageToggle, 1);
      } else {
        return ``;
      }
    }
  }


  function nextButton() {

    if (pg < maxpg) {

      return `
        <a href="?pg=${pg + 1}${navScrollTo}">
          ${imgOrText(imageToggle, 2)}
        </a>
      `;

    } else {

      if (!imageToggle) {
        return imgOrText(imageToggle, 2);
      } else {
        return ``;
      }
    }
  }


  function lastButton() {

    if (pg < maxpg) {

      return `
        <a href="?pg=${maxpg}${navScrollTo}">
          ${imgOrText(imageToggle, 3)}
        </a>
      `;

    } else {

      if (!imageToggle) {
        return imgOrText(imageToggle, 3);
      } else {
        return ``;
      }
    }
  }
}


// ============================================================
// KEYBOARD NAVIGATION
// ============================================================

function keyNav() {

  document.addEventListener("keydown", (e) => {

    if (
      (e.key == "ArrowRight" ||
       e.key.toLowerCase() == "d") &&
      pg < maxpg
    ) {

      window.location.href =
        "?pg=" + (pg + 1) + navScrollTo;

    } else if (
      (e.key == "ArrowLeft" ||
       e.key.toLowerCase() == "a") &&
      pg > 1
    ) {

      window.location.href =
        "?pg=" + (pg - 1) + navScrollTo;

    } else if (
      e.key.toLowerCase() == "w"
    ) {

      window.scrollBy({
        top: -30
      });

    } else if (
      e.key.toLowerCase() == "s"
    ) {

      window.scrollBy({
        top: 30
      });
    }

  });
}


// ============================================================
// RUN SEO AFTER PAGE DATA IS AVAILABLE
// ============================================================

updateComicSEO();
```
