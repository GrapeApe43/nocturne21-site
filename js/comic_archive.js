//comic_archive.js was created by geno7

//Writing sections of the archive page involves 2 steps:
//first, use the writeArchive function in this .js file. set the parameters (the stuff inside the parenthesis, comma separated) to toggle options.
//then, to place that section of the archive on the html page, you'd make a div, and give that div a class name of whatever you've called that section of the archive in the first parameter.
//if you put anything in that div, the list of comics will get appended after it. i.e. you can put the title of that specific section as a header in that div. 


// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


writeArchive("chapter1", 1, 34, -1, true, false); //writeArchive is for listing a RANGE of pages, take advantage of this by using headers to divide them into chapters or by month

writeArchive("chapter2", 35, 68, -1, true, false);

writeArchive("chapter3", 69, 93, -1, true, false);

writeArchive("kaijournal", 94, 97, -1, true, false);

writeArchive("chapter4", 98, 150, -1, true, false);

writeArchive("chapter5", 151, 187, -1, true, false);


// Continue Reading button on archive page
function updateContinueReadingButton() {
  const savedPage = localStorage.getItem("nocturne21_lastPage_v2");
  const continueWrap = document.getElementById("continue-reading-wrap");
  const continueBtn = document.getElementById("continue-reading-btn");

  if (!continueWrap || !continueBtn) return;

  if (savedPage) {
    continueWrap.style.display = "block";
    continueBtn.href = `./?pg=${savedPage}`;
    continueBtn.textContent = "Continue where you left off →";
  } else {
    continueWrap.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", updateContinueReadingButton);
window.addEventListener("pageshow", updateContinueReadingButton);
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    updateContinueReadingButton();
  }
});


function getChapterFromPage(page) {
  const pg = parseInt(page, 10);

  if (pg >= 1 && pg <= 34) return "chapter1";
  if (pg >= 35 && pg <= 68) return "chapter2";
  if (pg >= 69 && pg <= 93) return "chapter3";
  if (pg >= 94 && pg <= 97) return "kaijournal";
  if (pg >= 98 && pg <= 150) return "chapter4";
  if (pg >= 151 && pg <= 185) return "chapter5";

  return null;
}

function setOpenChapter(targetId = null, shouldScroll = false) {
  const sections = document.querySelectorAll(".archive-section");

  sections.forEach((section, index) => {
    const table = section.querySelector(".archiveTable");
    const toggle = section.querySelector(".archive-toggle");
    const startButton = section.querySelector(".start-chapter-btn");

    if (!table || !toggle) return;

    const shouldOpen = targetId
      ? section.id === targetId
      : index === 0;

    table.style.display = shouldOpen ? "table" : "none";
    toggle.classList.toggle("open", shouldOpen);

    if (startButton) {
      startButton.style.display = shouldOpen ? "block" : "none";
    }

    if (shouldOpen && shouldScroll) {
      section.scrollIntoView({ block: "start" });
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".archive-section");

  sections.forEach((section) => {
    const toggle = section.querySelector(".archive-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      const table = section.querySelector(".archiveTable");
      const startButton = section.querySelector(".start-chapter-btn");
      const isOpen = table && table.style.display !== "none";

      if (isOpen) {
        if (table) table.style.display = "none";
        if (startButton) startButton.style.display = "none";
        toggle.classList.remove("open");
      } else {
        setOpenChapter(section.id, false);
      }
    });
  });

  const hash = window.location.hash.replace("#", "");
  const savedPage = localStorage.getItem("nocturne21_lastPage_v2");
  const savedChapter = savedPage ? getChapterFromPage(savedPage) : null;

  if (hash) {
    setOpenChapter(hash, false);
  } else if (savedChapter) {
    setOpenChapter(savedChapter, false);
  } else {
    setOpenChapter(null, false);
  }
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    setOpenChapter(hash, true);
  }
});


//below this point is stuff you don't really need to pay attention to if you're not super familiar with JS 

function writeArchive(divClass, min, max, reverseOrder, useThumbs, useNums) {
    //create a table to put the archive data
    let archiveTable = document.createElement("TABLE");
    archiveTable.setAttribute("class", "archiveTable"); //set class to archiveTable for css styling
    let getDiv = document.getElementsByClassName(divClass)[0]; //get div class
    getDiv.appendChild(archiveTable);

    // add "Start Chapter" button
    let startButton = document.createElement("a");
    startButton.href = `./?pg=${min}${navScrollTo}`;
    startButton.className = "start-chapter-btn";
    startButton.textContent = "Start Chapter →";

    getDiv.insertBefore(startButton, archiveTable);    
    
    //make the table from the currently available comics
    for (i = min; i <= max; i++) {
        let row = archiveTable.insertRow(reverseOrder); //if reverseOrder is set to 0 it'll reverse the order, otherwise it'll display it in regular order

        //insert table cells
        let cellThumb = useThumbs ? row.insertCell() : 0; //only insert thumbs and number rows if useThumbs and useNums are toggled respectively
        let cellNum = useNums ? row.insertCell() : 0;

        let cellTitle = row.insertCell();
        let cellDate = row.insertCell();

        //default values when you don't have page data set
        let pgTitle = "Page " + i;
        let pgDate = "";
        let pgNum = "";

        //url of thumbnail
        let pgThumb = thumbFolder + "/" + image + i + "." + thumbExt;
        //url of default thumbnail
        let pgThumbDefault = thumbFolder + "/" + thumbDefault + "." + thumbExt;

        if (pgData.length >= i) {
            //set values to the values indicated in the pgData object if available
            if (pgData[i - 1].title) {
                pgTitle = pgData[i - 1].title;
            }
            if (pgData[i - 1].date) {
                pgDate = pgData[i - 1].date;
            }
            if (pgData[i - 1].date) {
                pgDate = pgData[i - 1].date;
            }
            if (pgData[i - 1].pgNum) {
                pgNum = pgData[i - 1].pgNum;
            }
        }

        //make the whole row a clickable link to the corresponding comic
        row.setAttribute("class", `archiveRow`);

        let linkToComic = `./?pg=${i}${navScrollTo}`;

        row.addEventListener("click", () => {
            window.location.href = linkToComic;
        });

        if (useThumbs) {
            //draw thumbnails if you have thumbnails toggled
            cellThumb.innerHTML = `<img alt="${pgTitle}" title="${pgTitle}" src="${pgThumb}" onerror="javascript:this.src='${pgThumbDefault}'"/>`;
            cellThumb.setAttribute("class", "archiveCellThumb");
        }

        if (useNums) {
            //same for numbers
            cellNum.innerHTML = `<span><strong>${pgNum}</strong></span>`;
            cellNum.setAttribute("class", "archiveCellNum");
        }

        //draw each row
        cellTitle.innerHTML = `<span><strong>${pgTitle}</strong></span>`;
        cellTitle.setAttribute("class", "archiveCellTitle");
        cellDate.innerHTML = "<span> " + pgDate + " </span>";
        cellDate.setAttribute("class", "archiveCellDate");
        console.log(i + `created row - ${pgTitle} - ${linkToComic}`);

        //left align text if not using thumbnails
        cellTitle.className += " leftAlignTableText";
    }
}
