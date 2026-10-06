//comic_show.js was created by geno7, with much needed assistance from Dannarchy

//this is the script that actually displays the comics, nav and comic title on the page. 

//below are what's called some "function calls", each one is responsible for making an element of the page. to get something to actually show up on the page, all you'd need to do is make a div with a class that has the same name as the function call. i.e. writeNav shows comic navigation, to show it on a page youd use <div class="writeNav"></div> wherever you want it to be. You can even put multiple divs with that same class name and it'll display multiple instances of the navigation.

//a couple of the function calls have toggles too.



writeNav(true); //show navigation for comic pages. to toggle either images or text for nav, set this to true or false.

//debug
console.log(pg)

writePageTitle(".writePageTitle", false," - "); //write title of page. true/false

// SEO: give explicit comic-page URLs their own browser title
// and meta description. Leave the bare homepage metadata alone.
{
  const params = new URLSearchParams(window.location.search);
  const requestedPage = params.get("pg");

  if (requestedPage && pgData.length >= pg) {
    const pageData = pgData[pg - 1];

    document.title =
      `Nocturne 21 — ${pageData.title} | Sci-Fi Drama Webcomic`;

    const metaDescription =
      document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Read ${pageData.title} of Nocturne 21, a sci-fi drama webcomic by April Ferrero about family, trauma, identity, and finding strength through connection.`
      );
    }
  }
}

// SEO: set the correct canonical URL
// The homepage keeps its own canonical.
// Individual comic pages get their own ?pg= canonical.
{
  let canonical = document.querySelector('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  const params = new URLSearchParams(window.location.search);
  const requestedPage = params.get("pg");

  if (requestedPage) {
    canonical.setAttribute(
      "href",
      `https://nocturne21.com/?pg=${pg}`
    );
  } else {
    canonical.setAttribute(
      "href",
      "https://nocturne21.com/"
    );
  }
}

// SEO: structured data for individual comic pages
{
  const params = new URLSearchParams(window.location.search);
  const requestedPage = params.get("pg");

  if (requestedPage && pgData.length >= pg) {
    const pageData = pgData[pg - 1];
    const chapterInfo = getChapterData(pg);

    const comicStructuredData = {
      "@context": "https://schema.org",
      "@type": "ComicStory",
      "name": `Nocturne 21 — ${pageData.title}`,
      "position": pageData.pgNum,
      "url": `https://nocturne21.com/?pg=${pg}`,
      "mainEntityOfPage": `https://nocturne21.com/?pg=${pg}`,
      "isPartOf": {
        "@type": "ComicSeries",
        "name": "Nocturne 21",
        "url": "https://nocturne21.com/"
      },
      "author": {
        "@type": "Person",
        "name": "April Ferrero"
      },
      "artist": {
        "@type": "Person",
        "name": "April Ferrero"
      },
      "genre": [
        "Science fiction",
        "Drama"
      ],
      "inLanguage": "en"
    };

    // Add volume and chapter context when available
if (chapterInfo) {
  comicStructuredData.isPartOf = {
    "@type": "ComicSeries",
    "name": "Nocturne 21",
    "url": "https://nocturne21.com/",
    "hasPart": {
      "@type": "CreativeWork",
      "name": chapterInfo.volume,
      "hasPart": {
        "@type": "CreativeWork",
        "name": chapterInfo.chapter
      }
    }
  };
}

// Add publication date in ISO 8601 format when one exists
if (pageData.date) {
  const parsedDate = new Date(pageData.date);

  if (!isNaN(parsedDate.getTime())) {
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    comicStructuredData.datePublished = `${year}-${month}-${day}`;
  }
}

    const structuredDataScript = document.createElement("script");
    structuredDataScript.type = "application/ld+json";
    structuredDataScript.id = "comic-page-structured-data";
    structuredDataScript.textContent =
      JSON.stringify(comicStructuredData);

    document.head.appendChild(structuredDataScript);
  }
}

writePageClickable(".writePageClickable",true); //show the current page. to toggle whether pages can be clicked to move to the next one, set this to true or false.

writeAuthorNotes(".writeAuthorNotes");

renderCommentBoxForPage();

keyNav(); 

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



//enables navigation through the comic with the arrow keys and WSAD. It doesn't need a div with a class name, it automatically works. delete or comment out (add // at the beginning) here to disable.

// below this point is more under-the-hood type stuff that we only encourage messing with if you're more familiar with js, 
// but it's still commented as extensively as possible anyway just in case

//SHOW COMIC PAGE, with clickable link
function writePageClickable(div,clickable) {
    if (!clickable) {
        document.querySelector(div).innerHTML = `<div class="comicPage">${writePage()}</div>`; //display comic page without link
    } else if (pg < maxpg) {
        //check whether comic is on the last page
        document.querySelector(div).innerHTML = `<div class="comicPage"><a href="?pg=${pg + 1}${navScrollTo}"/>${writePage()}</a></div>`; //display comic page and make it so that clicking it will lead you to the next page
    } else {
        document.querySelector(div).innerHTML = `<div class="comicPage">${writePage()}</div>`; //display comic page without link
    }
}

function writePageTitle(div, toggleNum, char) {
  if (pgData.length >= pg) {
    const pageData = pgData[pg - 1];
    const chapterInfo = getChapterData(pg);

    let chapterContext = "";

    if (chapterInfo) {
      chapterContext = `
        <div class="comic-chapter-context">
          <span>${chapterInfo.volume}</span>
          <span class="chapter-divider">›</span>
          <span>${chapterInfo.chapter}</span>
        </div>
      `;
    }

    let pageTitle = pageData.title;

    if (toggleNum) {
      pageTitle = pageData.pgNum + char + pageData.title;
    }

    document.querySelector(div).innerHTML = `
      ${chapterContext}
      <h1>${pageTitle}</h1>
    `;
  }
}


function writeAuthorNotes(div) {
  if (pgData.length >= pg) {

    const notes = pgData[pg - 1].authorNotes;

    document.querySelector(div).innerHTML = `
      <div class="author-notes-card">

        <div class="author-notes-avatar">
          <img
            src="img/avatar.jpg"
            alt="April Ferrero"
          >
        </div>

        <div class="author-notes-content">

          <div class="author-notes-heading">
            <span class="author-notes-name">APRIL'S NOTES</span>
          </div>

          <div class="author-notes-text">
            ${notes}
          </div>

        </div>

      </div>
    `;
  }
}

//function used to split pages into multiple images if needed, and add alt text
function writePage() {
  let partExtension = ""; //part extension to add to the url if the image is split into multiple parts
  let altText = ""; //variable for alt text
  let path = (folder != "" ? folder + "/" : "") + image + pg + partExtension + "." + ext; //path for your comics made out of variables strung together
  let page = ``;

  if (pgData.length < pg) { //if the array is blank or not long enough to have an entry for this page
    //debug
    console.log("page code to insert - " + page);
    console.log("alt text to print - " + altText);
    //
    page = `<img alt="` + altText + `" title="` + altText + `" src="` + path + `" />`;
    return page;
  } else if (pgData.length >= pg) { //if the array is not blank, and if its at least long enough to have an entry for the current page

    altText = pgData[pg - 1].altText; //set alt text to the text defined in the array

    if (pgData[pg-1].imageFiles > 1) { //if theres more than one page segment
    for (let i = 1; i < pgData[pg-1].imageFiles+1; i++) { //for loop to put all the parts of the image on the webpage
      partExtension = imgPart + i.toString();
      path = (folder != "" ? folder + "/" : "") + image + pg + partExtension + "." + ext; //reinit path (there has to be a less dumb way to do this)
      if (i > 1) {page += `<br/>`} //add line break
      page += `<img alt="` + altText + `" title="` + altText + `" src="` + path + `" />`; //add page segment
      }
    } else {
      page = `<img alt="` + altText + `" title="` + altText + `" src="` + path + `" />`;
    }
    //debug
    console.log("page code to insert - " + page);
    console.log("alt text to print - " + altText);
    //
    return page;
  }
}

//debug
console.log("array blank/not long enough? " + (pgData.length < pg));
console.log("array length - " + pgData.length);
console.log("current page - " + pg);
console.log("number of page segments - " + pgData[pg-1].imageFiles);
console.log("alt text - " + `"` + pgData[pg - 1].altText + `"`);

console.log("nav text - " + navText);
console.log("nav image file extension - " + navExt);

function imgOrText(setImg,navTextSet) { //function that writes the indicated nav button as either an image or text

  if (setImg) { //if its an image
    return `<img src="` + navFolder + `/nav_` + navText[navTextSet].toLowerCase() + `.` + navExt + `" alt="` + navText[navTextSet] + `" />`;
  } else {
    return navText[navTextSet];
  }
}

function writeNav(imageToggle) {
    let writeNavDiv = document.querySelectorAll(".writeNav");
    writeNavDiv.forEach(function(element) {
      element.innerHTML = `<div class="comicNav">
        ${firstButton()}
        ${divider()}
        ${prevButton()}
        ${divider()}
        ${nextButton()}
        ${divider()}
        ${lastButton()}
        </div>
        `;})

    function firstButton() {
        //FIRST BUTTON
        if (pg > 1) {
            //wait until page 2 to make button active
            return `<a href="?pg=` + 1 + navScrollTo + `"/>` + imgOrText(imageToggle, 0) + `</a>`;
        } else {
            if (!imageToggle) {
                return imgOrText(imageToggle, 0);
            } else {
                return ``;
            }
        }
    }

    function divider() {
        //divider
        if (!imageToggle) {
            return ` | `;
        }
        return ``;
    }

    function prevButton() {
        //PREV BUTTON
        if (pg > 1) {
            //wait until page 2 to make button active
            return `<a href="?pg=` + (pg - 1) + navScrollTo + `"/>` + imgOrText(imageToggle, 1) + `</a>`;
        } else {
            if (!imageToggle) {
                return imgOrText(imageToggle, 1);
            } else {
                return ``;
            }
        }
    }

    function nextButton() {
        //NEXT BUTTON
        if (pg < maxpg) {
            //only make active if not on the last page
            return `<a href="?pg=` + (pg + 1) + navScrollTo + `"/>` + imgOrText(imageToggle, 2) + `</a>`;
        } else {
            if (!imageToggle) {
                return imgOrText(imageToggle, 2);
            } else {
                return ``;
            }
        }
    }

    function lastButton() {
        //LAST BUTTON
        if (pg < maxpg) {
            //only make active if not on last page
            return `<a href="?pg=` + maxpg + navScrollTo + `"/>` + imgOrText(imageToggle, 3) + `</a>`;
        } else {
            if (!imageToggle) {
                return imgOrText(imageToggle, 3);
            } else {
                return ``;
            }
        }
    }
}


//KEYBOARD NAVIGATION
function keyNav() {
  document.addEventListener("keydown", (e) => {
  if ((e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') && pg < maxpg) { //right arrow or D goes to next page
    window.location.href = "?pg=" + (pg + 1) + navScrollTo;
  } else if ((e.key == "ArrowLeft" || e.key.toLowerCase() == "a") && pg > 1) { //left arrow or A goes to previous page
    window.location.href = "?pg=" + (pg - 1) + navScrollTo;
  } else if (e.key.toLowerCase() == "w") { //W scrolls up
    window.scrollBy({ top: -30 });
  } else if (e.key.toLowerCase() == "s") { //S scrolls down
    window.scrollBy({ top: 30 });
  }
});};
