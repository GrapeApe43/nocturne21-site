//comic_settings.js was created by geno7, with much needed assistance from Dannarchy

//this is the main file you'll be messing with to manage and update your comic. most (not all) of the main toggle-able settings are here.

//comic_archive has more settings pertaining to the archive page, and comic_show has settings pertaining to the main place that pages of your comic are displayed.

let pg = Number(findGetParameter("pg")); //make "pg" mean the current page number (this line doesnt work unless I put it here, if you're inexperienced with js dont worry about it)

////////////////////////
//VARIABLES FOR TWEAKING
////////////////////////

//REALLY IMPORTANT ONES
const maxpg = 186; //the current number of pages your comic has in total. this DOESNT necessarily mean number of IMAGE FILES as it doesn't count pages split into multiple files. 
//YOU MUST UPDATE THIS NUMBER EVERY TIME YOU ADD A NEW PAGE or else it wont display the most recent page

// COMIC PAGE SETTINGS
const folder = "img/comics"; //directory of the folder where you keep all the comics
const image = "pg"; //what you'll name all your comic pages
const imgPart = "_" //special character(s) you put after the page number to subdivide pages into multiple image files (ie pg2_1, pg2_2, etc)
const ext = "jpg"; //file extension of your comic pages

//THUMBNAIL SETTINGS
const thumbFolder = "img/thumbs" //directory of the folder where you keep all the thumbnail images for the comics, in case you want the archive page to use thumbnails.
const thumbExt = "png" //file extension of thumbnails
const thumbDefault = "default" //name of the default thumbnail that displays when no thumbnail is set, located in the directory you set thumbFolder to.

//NAVIGATION SETTINGS
const navText = ["First","Previous","Next","Last"]; //alt text for your nav images, or just the text that shows up if you're not using images
const navFolder = "img/comicnav"; //directory where nav images are stored
const navExt = "png" //file extension of nav images
const navScrollTo = "#showComic"; //id of the div you want the page to automatically scroll to when you click to the next comic. will turn off if you delete text between quotation marks

if (pg == 0) {pg = maxpg;} //display MOST RECENT COMIC when the webpage is loaded. if you want to instead have the FIRST COMIC displayed first, change maxpg to 1.

//pgData holds all the parameters for each of your pages. copypaste this and fill out accordingly:
/* 
    {
        pgNum: ,
        title: "",
        date: writeDate([YEAR],[MONTH],[DAY]),
        altText: "",
        imageFiles: "",
        authorNotes: ``
    },
*/
//Note: the formatting is important! The whole thing won't show up if you forget to include the commas or curly braces in the right place.

const pgData = [
    {
        pgNum: 1, //what page number it is
        title: "Nocturne 21 Volume One: Robot Boy", //the title of the page (leaving this blank will default it to "Page X")
        date: writeDate(2021, 3, 16), //the date on which the page was posted (mainly for the archive). The date is written using a function called "writeDate", basically just put writeDate and then some parenthesis and, comma separated, the year followed by the month and the day. Don't forget another comma at the end outside the parenthesis!
        altText: "Here's some alt text!", //the alt text (mouse over text) for this particular comic. put nothing inbetween the quotes for no alt text
        imageFiles: 1, //how many image files this page is split into
        authorNotes: `
            <p>And so it begins...</p>
            
            `,
    },
    {
        pgNum: 2,
        title: "Chapter One: The Red Rain",
        date: writeDate(2021, 3, 17),
        altText: "Here's some more alt text!",
        imageFiles: 1,
        authorNotes: `
     
            `,
    },
    {
        pgNum: 3,
        title: "Page 1",
        date: writeDate(2021, 3, 18),
        altText: "Here's even more alt text!",
        imageFiles: 1,
        authorNotes: `
            <p></p>
            `,
    },
    {
        pgNum: 4,
        title: "Page 2",
        date: writeDate(2021, 3, 19),
        altText: "So much alt text...",
        imageFiles: 1,
        authorNotes: `
            <p></p>
            `,
    },
    {
        pgNum: 5,
        title: "Page 3",
        date: writeDate(2021, 3, 20),
        altText: "Here's even more alt text!",
        imageFiles: 1,
        authorNotes: `
            <p></p>
            `,
    },
    {
        pgNum: 6,
        title: `Page 4`,
        date: writeDate(2021, 3, 21),
        altText: "Here's even more alt text!",
        imageFiles: 1,
        authorNotes: `
            <p></p>
            `,
    },
      {
        pgNum: 7,
        title: `Page 5`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },
    
     
      {
        pgNum: 8,
        title: `Page 6`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 9,
        title: `Page 7`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 10,
        title: `Page 8`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 11,
        title: `Page 9`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 12,
        title: `Page 10`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 13,
        title: `Page 11`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 14,
        title: `Page 12`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 15,
        title: `Page 13`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 16,
        title: `Page 14`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 17,
        title: `Page 15`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 18,
        title: `Page 16`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 19,
        title: `Page 17`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 20,
        title: `Page 18`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 21,
        title: `Page 19`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 22,
        title: `Page 20`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 23,
        title: `Page 21`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 24,
        title: `Page 22`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 25,
        title: `Page 23`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 26,
        title: `Page 24`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 27,
        title: `Page 25`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 28,
        title: `Page 26`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 29,
        title: `Page 27`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 30,
        title: `Page 28`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 31,
        title: `Page 29`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 32,
        title: `Page 30`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 33,
        title: `Page 31`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

 
      {
        pgNum: 34,
        title: `Page 32`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },
      {
        pgNum: 35,
        title: `Chapter Two: Glass`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 36,
        title: `Page 33`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 37,
        title: `Page 34`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 38,
        title: `Page 35`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 39,
        title: `Page 36`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 40,
        title: `Page 37`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 41,
        title: `Page 38`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 42,
        title: `Page 39`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 43,
        title: `Page 40`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 44,
        title: `Page 41`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 45,
        title: `Page 42`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 46,
        title: `Page 43`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 47,
        title: `Page 44`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 48,
        title: `Page 45`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 49,
        title: `Page 46`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 50,
        title: `Page 47`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 51,
        title: `Page 48`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 52,
        title: `Page 49`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 53,
        title: `Page 50`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 54,
        title: `Page 51 & 52`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 55,
        title: `Page 53`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 56,
        title: `Page 54`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 57,
        title: `Page 55`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 58,
        title: `Page 56`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 59,
        title: `Page 57`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 60,
        title: `Page 58`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 61,
        title: `Page 59`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 62,
        title: `Page 60`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 63,
        title: `Page 61`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 64,
        title: `Page 62`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 65,
        title: `Page 63`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 66,
        title: `Page 64`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 67,
        title: `Page 65`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 68,
        title: `Page 66`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 69,
        title: `Chapter Three: Snow Day`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 70,
        title: `Page 67`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 71,
        title: `Page 68`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 72,
        title: `Page 69`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 73,
        title: `Page 70`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 74,
        title: `Page 71`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 75,
        title: `Page 72`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 76,
        title: `Page 73`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 77,
        title: `Page 74`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 78,
        title: `Page 75`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 79,
        title: `Page 76`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 80,
        title: `Page 77`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 81,
        title: `Page 78`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 82,
        title: `Page 79`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 83,
        title: `Page 80`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 84,
        title: `Page 81`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 85,
        title: `Page 82`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 86,
        title: `Page 83`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 87,
        title: `Page 84`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 88,
        title: `Page 85`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 89,
        title: `Page 86`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 90,
        title: `Page 87`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 91,
        title: `Page 88`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 92,
        title: `Page 89`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 93,
        title: `Page 90`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },
          {
        pgNum: 94,
        title: `The Kai Journals: Part 1`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>So, this is a four part bonus content I made during a hiatus. Chapter 4 takes has a time skip of a few months and these journal entries are meant to fill in the gap as well as give you a better understanding of what goes on inside Kai's head. You don't <i>have</i> to read them to understand chapter 4, but it does make for a meaningful experience. There's a lot of important things that happen, including new abilities and a trip that becomes a core memory for Kai. Hope you enjoy!</p>`
    },

      {
        pgNum: 95,
        title: `The Kai Journals: Part 2`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 96,
        title: `The Kai Journals: Part 3`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 97,
        title: `The Kai Journals: Part 4`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 98,
        title: `Chapter Four: The Stranger`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 99,
        title: `Page 91`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 100,
        title: `Page 92`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 101,
        title: `Page 93`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 102,
        title: `Page 94`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 103,
        title: `Page 95`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 104,
        title: `Page 96`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 105,
        title: `Page 97`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 106,
        title: `Page 98`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 107,
        title: `Page 99`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 108,
        title: `Page 100`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 109,
        title: `Page 101`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 110,
        title: `Page 102`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 111,
        title: `Page 103`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 112,
        title: `Page 104`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 113,
        title: `Page 105`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 114,
        title: `Page 106`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 115,
        title: `Page 107`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 116,
        title: `Page 108`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 117,
        title: `Page 109`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 118,
        title: `Page 110`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 119,
        title: `Page 111`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 120,
        title: `Page 112`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 121,
        title: `Page 113`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 122,
        title: `Page 114`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 123,
        title: `Page 115`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 124,
        title: `Page 116`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 125,
        title: `Page 117`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 126,
        title: `Page 118`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 127,
        title: `Page 119`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 128,
        title: `Page 120`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 129,
        title: `Sleep: Part 1`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 130,
        title: `Sleep: Part 2`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 131,
        title: `Sleep: Part 3`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 132,
        title: `Sleep: Part 4`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 133,
        title: `Sleep: Part 5`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 134,
        title: `Sleep: Part 6/ Page 121`,
        date: writeDate(2023, 10, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },
          {
        pgNum: 135,
        title: `Page 122`,
        date: writeDate(2023, 10, 31),
        altText: "",
        imageFiles: 1,
        authorNotes: `
        <p>Happy Halloween! Honestly, I can't express how stoked I am that ghost Kai ended up live on Halloween. This page was supposed to come out two months ago, but got pushed back for various life reasons and for the additional scene. I guess it worked out for the best!</p>
        `
    },
         {
        pgNum: 136,
        title: `The Kai Journals...er, Napkin: Part 5`,
        date: writeDate(2023, 11, 10),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 137,
        title: `Page 123`,
        date: writeDate(2023, 11, 10),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },

      {
        pgNum: 138,
        title: `Page 124`,
        date: writeDate(2023, 11, 10),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },
      {
        pgNum: 139,
        title: `Page 125`,
        date: writeDate(2023, 11, 17),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p> Where does an anxious, restless sleep-deprived teenager go once he's escaped? To high school of course! Wait...what?!</p>`
    },
      {
        pgNum: 140,
        title: `Page 126`,
        date: writeDate(2023, 11, 17),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Boy's not using that noggin of his, is he?</p>`
    },
      {
        pgNum: 141,
        title: `Page 127`,
        date: writeDate(2023, 11, 22),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Happy 20th anniversary, Nocturne 21! Been quite the amazing ride so far! </P>`
    },
      {
        pgNum: 142,
        title: `Page 128`,
        date: writeDate(2023, 11, 28),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Oof. Having a meltdown in front of your classmates. High school's probably not the best place for that, Kai.</p>`
    },
      {
        pgNum: 143,
        title: `Page 129`,
        date: writeDate(2023, 11, 30),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Poor Yosh. I'm not a runner either...</p>`
    },
      {
        pgNum: 144,
        title: `Page 130`,
        date: writeDate(2023, 12, 05),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>See, folks? Nothing to worry about! Our boy's just taking a little coffee break!</p>`
    },
      {
        pgNum: 145,
        title: `Page 131`,
        date: writeDate(2023, 12, 07),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Maybe this wasn't actually about the coffee...</p>`
    },
      {
        pgNum: 146,
        title: `Page 132`,
        date: writeDate(2023, 12, 12),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Maybe you shouldn't follow him this time...</p>`
    },  {
        pgNum: 147,
        title: `Page 133`,
        date: writeDate(2023, 12, 14),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Watch your back, Yosh...</p>`
    },  
    {
        pgNum: 148,
        title: `Page 134`,
        date: writeDate(2023, 12, 19),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>This woulda been a real bad time to trip over his shoelaces...</p>`
    },  
    {
        pgNum: 149,
        title: `Page 135`,
        date: writeDate(2023, 12, 21),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>The stranger has appeared...</p>`
    },
      {
        pgNum: 150,
        title: `Page 136`,
        date: writeDate(2023, 12, 28),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>And we conclude this chapter with an over-the-top superhero landing and dramatic dust cloud reveal. </p>`
    },
    
        {
        pgNum: 151,
        title: `VOLUME 2: TRUST FALLS`,
        date: writeDate(2024, 06, 12),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
        },
    
     {
        pgNum: 152,
        title: `Chapter Five: The Voice From Below`,
        date: writeDate(2024, 06, 12),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Welcome back, friends! Sorry for the long hiatus! Good to be back at again. I hope you enjoy :)</p>`
    },
   
       {
        pgNum: 153,
        title: `Page 137`,
        date: writeDate(2024, 06, 12),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
       },    
        
      {
        pgNum: 154,
        title: `Page 138`,
        date: writeDate(2024, 06, 12),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 155,
        title: `Page 139`,
        date: writeDate(2024, 06, 19),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 156,
        title: `Page 140`,
        date: writeDate(2024, 06, 26),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 157,
        title: `Page 141`,
        date: writeDate(2023, 07, 03),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 158,
        title: `Page 142`,
        date: writeDate(2024, 07, 17),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },  {
        pgNum: 159,
        title: `Page 143`,
        date: writeDate(2024, 07, 24),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },  
    {
        pgNum: 160,
        title: `Page 144`,
        date: writeDate(2024, 08, 01),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Here ya go! Have some fackin sunsets! Seriously though, this page kicked my ass. It took way longer than a normal page to color. I hope it was worth it!</p>`
    },  
    
     {
        pgNum: 161,
        title: `Page 145`,
        date: writeDate(2024, 08, 07),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Uh-oh. Kuro's got you pegged, Kai. </p>`
    }, 
         {
        pgNum: 162,
        title: `Page 146`,
        date: writeDate(2024, 09, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>"Just one more minute..." famous last words, Kai. </p>`
    }, 
          {
        pgNum: 163,
        title: `Page 147`,
        date: writeDate(2024, 09, 25),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Things aren't looking good for our boy... </p>`
    }, 
         {
        pgNum: 164,
        title: `Page 148`,
        date: writeDate(2024, 10, 02),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Kuro isn't wasting any time. Go save your boi! </p>`
    }, 
          {
        pgNum: 165,
        title: `Page 149`,
        date: writeDate(2024, 10, 09),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Shin, your panic is showing. </p>`
    }, 
       {
        pgNum: 166,
        title: `Page 150`,
        date: writeDate(2024, 10, 16),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>What fresh new hell is this?!</p>`
    }, 
          {
        pgNum: 167,
        title: `Page 151`,
        date: writeDate(2024, 10, 23),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p> </p>`
    }, 
    
      {
        pgNum: 168,
        title: `152`,
        date: writeDate(2023, 11, 10),
        altText: "",
        imageFiles: 1,
        authorNotes: ``
    },
      {
        pgNum: 169,
        title: `Page 153`,
        date: writeDate(2023, 11, 17),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 170,
        title: `Page 154`,
        date: writeDate(2023, 11, 17),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 171,
        title: `Page 155`,
        date: writeDate(2023, 11, 22),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></P>`
    },
      {
        pgNum: 172,
        title: `Page 156`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 173,
        title: `Page 157`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 174,
        title: `Page 158`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 175,
        title: `Page 159`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 176,
        title: `Page 160`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },  {
        pgNum: 177,
        title: `Page 161`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },  
    {
        pgNum: 178,
        title: `Page 162`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },  
    {
        pgNum: 179,
        title: `Page 163`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 180,
        title: `Page 164`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
    
     {
        pgNum: 181,
        title: `Page 165`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 182,
        title: `Page 166`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></P>`
    },
      {
        pgNum: 183,
        title: `Page 167`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
      {
        pgNum: 184,
        title: `Page 168`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p>Hey folks! Sorry for the lack of update for a while. Had a big move and a lot of life changes since I last updated. I'm settled down now and looking to regularly post again. So keep an eye out for that and as always, thanks for reading!</p>`
    },
      {
        pgNum: 185,
        title: `Page 169`,
        date: writeDate(2026, 03, 18),
        altText: "",
        imageFiles: 1,
        authorNotes: `<p></p>`
    },
    
         {
    pgNum: 186,
    title: "Page 170",
    date: writeDate(2026, 4, 10),
    altText: "",
    imageFiles: 1,
    authorNotes: `<p>Looks like Kai's ready to pull out the big guns. Our stranger looks like he's having some regrets</p>`,

    // NEW ↓↓↓
    description: "Page 170 of Nocturne 21",
    thumb: "https://nocturne21.com/img/preview/pg186.png"
} 
      
];

//below is a function you dont rly need to mess with but if you're more experienced with js you can

function findGetParameter(parameterName) { //function used to write a parameter to append to the url, to give each comic page its own unique url
    let result = null,
    tmp = []; 
    let items = location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

function writeDate(year,month,day) { //write date of comic page
    const date = new Date(year,month-1,day)
    .toDateString() //format date as Day Month Date Year
    .toString() //convert it to a string
    .slice(4) //remove the Day
    return date
}
