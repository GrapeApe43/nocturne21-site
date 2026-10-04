//comic_settings.js was created by geno7, with much needed assistance from Dannarchy

//this is the main file you'll be messing with to manage and update your comic. most (not all) of the main toggle-able settings are here.

//comic_archive has more settings pertaining to the archive page, and comic_show has settings pertaining to the main place that pages of your comic are displayed.

let pg = Number(findGetParameter("pg")); //make "pg" mean the current page number (this line doesnt work unless I put it here, if you're inexperienced with js dont worry about it)

////////////////////////
//VARIABLES FOR TWEAKING
////////////////////////

//REALLY IMPORTANT ONES
const maxpg = 206; //the current number of pages your comic has in total. this DOESNT necessarily mean number of IMAGE FILES as it doesn't count pages split into multiple files. 
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
        altText: "Ready to go on a crazy ride? Nocturne 21 begins...", //the alt text (mouse over text) for this particular comic. put nothing inbetween the quotes for no alt text
        imageFiles: 1, //how many image files this page is split into
        authorNotes: `
            <p>And so it begins...</p>
            
            `,
    },
    {
        pgNum: 2,
        title: "Chapter One: The Red Rain",
        date: writeDate(2021, 3, 17),
        altText: "Chapter One: The Red Rain",
        imageFiles: 1,
        authorNotes: `
     
            `,
    },
    {
        pgNum: 3,
        title: "Page 1",
        date: writeDate(2021, 3, 18),
        altText: "A mysterious blood-soaked boy walks the rainy streets of Caulwyn, New Hampshire.",
        imageFiles: 1,
        authorNotes: `
            <p></p>
            `,
    },
    {
        pgNum: 4,
        title: "Page 2",
        date: writeDate(2021, 3, 19),
        altText: "The boy reflects on the events that brought him here one last time before finally collapsing from his injuries.",
        imageFiles: 1,
        authorNotes: `
            <p></p>
            `,
    },
    {
        pgNum: 5,
        title: "Page 3",
        date: writeDate(2021, 3, 20),
        altText: "Spectators watch and speculate about the boy but mostly keep their distance, until Dr. Kuro Shimizu arrives on the scene.",
        imageFiles: 1,
        authorNotes: `
            <p></p>
            `,
    },
    {
        pgNum: 6,
        title: `Page 4`,
        date: writeDate(2021, 3, 21),
        altText: "The kind doctor rushes to the boy's aid, but is struck when he sees his face—it's someone he recognizes.",
        imageFiles: 1,
        authorNotes: `
            <p></p>
            `,
    },
    {
        pgNum: 7,
        title: `Page 5`,
        date: writeDate(2023, 10, 18),
        altText: "Kuro realizes, for an unknown reason, that the boy can't go to the hospital and makes the bold decision to take him home.",
        imageFiles: 1,
        authorNotes: ``
    },
    
    {
        pgNum: 8,
        title: `Page 6`,
        date: writeDate(2023, 10, 18),
        altText: "Kuro quickly readies a surface to treat the boy's wounds, desperately hoping to save him.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 9,
        title: `Page 7`,
        date: writeDate(2023, 10, 18),
        altText: "Before Kuro can do anything, he first goes to his daughter, Yoshiko, to make sure she stays in her room, away from the chaos.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 10,
        title: `Page 8`,
        date: writeDate(2023, 10, 18),
        altText: "After delivering an alarming and questionable excuse, Kuro leaves his daughter, hoping he's convinced her to stay put.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 11,
        title: `Page 9`,
        date: writeDate(2023, 10, 18),
        altText: "Kuro starts treating his patient's immediate problems, first by removing the blood filling the boy's lungs.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 12,
        title: `Page 10`,
        date: writeDate(2023, 10, 18),
        altText: "With a sudden gasp for air, the boy wakes up frightened and panicked. He manages to utter the words 'I'm sorry' under his breath before fading again.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 13,
        title: `Page 11`,
        date: writeDate(2023, 10, 18),
        altText: "The boy fades out again, and a very stressed Kuro questions whether he made a bad decision by bringing him into his home.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 14,
        title: `Page 12`,
        date: writeDate(2023, 10, 18),
        altText: "Some time passes, and Yoshiko slips out of her room while Kuro continues to operate on the patient. Yoshiko spots the dying boy on the kitchen table and hysterically questions Kuro's actions.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 15,
        title: `Page 13`,
        date: writeDate(2023, 10, 18),
        altText: "Unconvinced by her father's explanation, Yoshiko reaches for the phone to call an ambulance. Without hesitation, Kuro rips the phone off the wall and smashes it to pieces.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 16,
        title: `Page 14`,
        date: writeDate(2023, 10, 18),
        altText: "Yoshiko feels confused and defeated. She doesn't understand her father, but Kuro still manages to talk her into helping treat the boy.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 17,
        title: `Page 15`,
        date: writeDate(2023, 10, 18),
        altText: "The patient has been treated, and Yoshiko and Kuro treat themselves to a 4 AM pizza dinner.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 18,
        title: `Page 16`,
        date: writeDate(2023, 10, 18),
        altText: "Yoshiko worries about what could happen if the boy dies in their care, fearing that Kuro could be arrested or sued and that she could end up in the foster system.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 19,
        title: `Page 17`,
        date: writeDate(2023, 10, 18),
        altText: "Kuro tries to reassure Yoshiko, but it's unclear whether it works. For now, all they can do is wait and hope for the best.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 20,
        title: `Page 18`,
        date: writeDate(2023, 10, 18),
        altText: "Four days later, Yoshiko asks around her school about the boy, including her surrogate cousin, Kiri. Kiri appears jealous as he tells her he's never seen the boy before. Yoshiko goes home feeling defeated and nervous.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 21,
        title: `Page 19`,
        date: writeDate(2023, 10, 18),
        altText: "Kuro and Yoshiko ask each other whether any new information about the boy's identity has come up. No progress has been made, and Kuro has to reassure Yosh once again.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 22,
        title: `Page 20`,
        date: writeDate(2023, 10, 18),
        altText: "Though the boy's injuries show some healing, he has shown no sign of waking up in the past four days—until now. He suddenly wakes up in a panic!",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 23,
        title: `Page 21`,
        date: writeDate(2023, 10, 18),
        altText: "The boy attempts to get out of bed but immediately falls on his face. Yoshiko hears the thud from the living room.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 24,
        title: `Page 22`,
        date: writeDate(2023, 10, 18),
        altText: "Waking up in a strange setting, the boy breaks the mirror, feeling the need to defend himself should trouble arise. Kuro and Yosh are now certain they heard something, and Yosh jumps into action.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 25,
        title: `Page 23`,
        date: writeDate(2023, 10, 18),
        altText: "Reaching the room before Kuro, Yoshiko looks around for their guest and sees no one. She realizes too late that he's gotten the jump on her. Kuro walks in to see the boy holding broken glass against Yoshiko's neck.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 26,
        title: `Page 24`,
        date: writeDate(2023, 10, 18),
        altText: "The boy is terrified and believes himself to be in a dangerous situation. Kuro takes a breath and tries to calmly talk him down.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 27,
        title: `Page 25`,
        date: writeDate(2023, 10, 18),
        altText: "When questioned by Kuro, the boy reveals that he has no idea where he is or...who he is. Yosh and Kuro are shocked and unsure what to do next.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 28,
        title: `Page 26`,
        date: writeDate(2023, 10, 18),
        altText: "Yoshiko takes a chance and gently talks to the boy, assuring him that he's in a safe place with caring people. Her words seem to be working.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 29,
        title: `Page 27`,
        date: writeDate(2023, 10, 18),
        altText: "The boy relaxes and drops the shard. He immediately collapses, succumbing to his injuries. Yoshiko and Kuro hurry to his aid.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 30,
        title: `Page 28`,
        date: writeDate(2023, 10, 18),
        altText: "Kuro and Yosh get him back into bed. Kuro notices that some of his wounds have opened up and begins treating him.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 31,
        title: `Page 29`,
        date: writeDate(2023, 10, 18),
        altText: "Feeling guilty for his actions, the boy apologizes for his behavior. Kuro shows compassion for his patient and reassures him that it was a misunderstanding and that there are no ill feelings.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 32,
        title: `Page 30`,
        date: writeDate(2023, 10, 18),
        altText: "Yoshiko and the boy share some fun banter while Kuro continues to treat him, happy to see the kids getting along.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 33,
        title: `Page 31`,
        date: writeDate(2023, 10, 18),
        altText: "The boy expresses concern about his future and what will happen to him. Kuro insists that he stay with them, with no rush for him to leave.",
        imageFiles: 1,
        authorNotes: ``
    },

    {
        pgNum: 34,
        title: `Page 32`,
        date: writeDate(2023, 10, 18),
        altText: "The boy resists, feeling guilty for being a burden, but Kuro and Yosh shoot down his efforts to leave. The chapter ends with Yoshiko excitedly welcoming the boy to the family.",
        imageFiles: 1,
        authorNotes: ``
    },
{
    pgNum: 35,
    title: `Chapter Two: Glass`,
    date: writeDate(2023, 10, 18),
    altText: "Chapter Two: Glass",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 36,
    title: `Page 33`,
    date: writeDate(2023, 10, 18),
    altText: "The boy rests while Kuro and Yoshiko eat dinner and joke together, relieved that their mysterious guest seems to be recovering—mostly.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 37,
    title: `Page 34`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro makes sure Yoshiko is comfortable with their new living arrangement. She isn't worried about the boy being dangerous, though she is annoyed with her cousin Kiri.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 38,
    title: `Page 35`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro and Yoshiko finish dinner and share a quiet moment as Kuro reflects on how much Yoshiko reminds him of her late mother.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 39,
    title: `Page 36`,
    date: writeDate(2023, 10, 18),
    altText: "Feeling much better, the boy sits with Yoshiko as she tests his memory using picture cards. He recognizes some basic objects, but it quickly becomes clear how much he has forgotten.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 40,
    title: `Page 37`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro announces that lunch is ready and listens to Yoshiko's assessment of the boy's memory loss. He reassures the boy that with time, he'll catch up on everything he's forgotten.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 41,
    title: `Page 38`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko and the boy rush off to lunch as Kuro smiles at the new liveliness in his home. On another morning, Kuro finds the boy—now called Kai—awake early and very curious about his coffee.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 42,
    title: `Page 39`,
    date: writeDate(2023, 10, 18),
    altText: "Kai tries coffee and immediately wants the entire pot, forcing Kuro to intervene. As they discuss Kai's first day of school, Kuro tells him that his brother Shin teaches there and can help if he needs anything.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 43,
    title: `Page 40`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro warns Kai about Shin's troublesome son, Kiri. Yoshiko joins them for coffee, trading playful jabs with her father while Kai makes another attempt to steal the coffee pot.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 44,
    title: `Page 41`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko leaves to study before school while Kuro checks that Kai feels ready for his first day. Kai assures him he's fine before testing his luck with a question he probably shouldn't have asked.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 45,
    title: `Page 42`,
    date: writeDate(2023, 10, 18),
    altText: "Later that day, Kai and Yoshiko sit in the principal's office, Kai visibly distraught. Kuro arrives demanding answers as Principal Wiggins accuses Kai of causing trouble, prompting Yoshiko to jump to his defense.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 46,
    title: `Page 43`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro calms the argument and asks Kai for his side of the story. An overwhelmed and anxious Kai refuses to speak, so Yoshiko begins explaining what happened.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 47,
    title: `Page 44`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko recounts their walk to school, when they encountered her cousin Kiri. Kai reacts poorly when Kiri begins shouting at Yoshiko and lightly antagonizes him in return.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 48,
    title: `Page 45`,
    date: writeDate(2023, 10, 18),
    altText: "Kai and Yoshiko try to walk away from the confrontation, but an enraged Kiri lunges at Kai from behind. Kai notices the attack coming.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 49,
    title: `Page 46`,
    date: writeDate(2023, 10, 18),
    altText: "Without hesitation, Kai kicks backward into Kiri's face, sending him flying into a tree. Yoshiko is stunned by her mysterious friend's incredible reflexes, and Kai appears just as surprised.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 50,
    title: `Page 47`,
    date: writeDate(2023, 10, 18),
    altText: "Immediately feeling guilty, Kai rushes with Yoshiko to help Kiri and take him to the nurse. While waiting for class, Kai worries about hurting him, but Yoshiko tries to ease his guilt with humor.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 51,
    title: `Page 48`,
    date: writeDate(2023, 10, 18),
    altText: "Shin enters the classroom and greets his students before taking attendance. When another student points out the unfamiliar Kai, Kai panics, unsure what he's supposed to say or do.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 52,
    title: `Page 49`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko introduces Kai to her uncle Shin and explains his amnesia. Their classmate Griff tries to use the situation as an excuse to get out of a test, but Shin isn't buying it.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 53,
    title: `Page 50`,
    date: writeDate(2023, 10, 18),
    altText: "Kiri arrives late from the nurse's office with a foot-shaped bruise across his face. After refusing to explain the injury to his father, he exchanges a tense glance with Kai and secretly texts his friends.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 54,
    title: `Page 51 & 52`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko recounts how Kiri convinced numerous boys at school to attack Kai throughout the day. Although Kai repeatedly evaded them, teachers mistook him for the cause of the fighting.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 55,
    title: `Page 53`,
    date: writeDate(2023, 10, 18),
    altText: "Principal Wiggins dismisses Yoshiko's story as ridiculous, and Kuro has to stop her from angrily talking back. He sends both kids outside so he can speak with Wiggins privately, while Kai remains silent and withdrawn.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 56,
    title: `Page 54`,
    date: writeDate(2023, 10, 18),
    altText: "Kai and Yoshiko wait silently outside the office as the adults argue inside. Yoshiko tries to comfort Kai before an angry Kuro emerges, having prevented Kai from being punished but still required to take him home.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 57,
    title: `Page 55`,
    date: writeDate(2023, 10, 18),
    altText: "Kai trails behind Kuro as they leave school, then stops and struggles through an emotional apology. When Kuro reaches toward his shoulder to comfort him, Kai instinctively flinches.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 58,
    title: `Page 56`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro realizes from Kai's frightened reaction that he expected to be hit. Overcome by the implication of past abuse, Kuro embraces the startled boy and reassures him that he isn't a burden.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 59,
    title: `Page 57`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro looks Kai in the eyes and promises that he's safe and will never be hurt by him. Kai begins to relax, and the two leave together to find somewhere to eat and unwind.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 60,
    title: `Page 58`,
    date: writeDate(2023, 10, 18),
    altText: "After dinner, Kai volunteers to clear the dishes and make tea. While he's gone, Kuro asks Yoshiko what happened at school, and she describes how Principal Wiggins blamed and berated Kai.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 61,
    title: `Page 59`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro tells Yoshiko about Kai's frightened reaction earlier and his suspicion that the boy suffered long-term abuse. Yoshiko is determined to help Kai heal, and their private conversation ends when he returns with tea.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 62,
    title: `Page 60`,
    date: writeDate(2023, 10, 18),
    altText: "Late that night, Kai finds Kuro sitting alone in the kitchen, neither of them able to sleep. Kai joins him at the table while Kuro pours him a glass of water.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 63,
    title: `Page 61`,
    date: writeDate(2023, 10, 18),
    altText: "Kai confides in Kuro about his anxiety over returning to school. Kuro offers advice about dealing with Principal Wiggins and shares some of their own unpleasant history before Kai heads back to bed.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 64,
    title: `Page 62`,
    date: writeDate(2023, 10, 18),
    altText: "As Kai leaves the kitchen, Kuro accidentally calls him by a strange name that visibly affects him. The nearby pitcher and glasses suddenly shatter without being touched, leaving Kuro shaken while Kai offers to clean up the unexplained mess.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 65,
    title: `Page 63`,
    date: writeDate(2023, 10, 18),
    altText: "Kai finally falls asleep but is pulled into a dark nightmare. Unable to see anything around him, he hears the unsettling voice of a mysterious woman.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 66,
    title: `Page 64`,
    date: writeDate(2023, 10, 18),
    altText: "The mysterious woman grabs Kai from behind and covers his eyes, threatening that she'll find him as her sharp claws dig painfully into his body. Kai jolts awake from the nightmare drenched in sweat.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 67,
    title: `Page 65`,
    date: writeDate(2023, 10, 18),
    altText: "Kai clutches his chest, still feeling the pain from his nightmare. As he catches his breath, he discovers his drinking glass shattered across the floor and hesitates as he stares at the pieces.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 68,
    title: `Page 66`,
    date: writeDate(2023, 10, 18),
    altText: "Drawn back to the broken glass, Kai kneels beside the shards and discovers he can move them without touching them. The pieces levitate and reform into an intact glass, sending a shocked and frightened Kai running from the room.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 69,
    title: `Chapter Three: Snow Day`,
    date: writeDate(2023, 10, 18),
    altText: "Chapter Three: Snow Day",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 70,
    title: `Page 67`,
    date: writeDate(2023, 10, 18),
    altText: "Still shaken by the night's events, Kai gets sick and tries to freshen up in the bathroom. When he looks into the mirror, something in his reflection frightens him and sends him stumbling backward.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 71,
    title: `Page 68`,
    date: writeDate(2023, 10, 18),
    altText: "In the mirror, Kai sees a bloody, green-eyed version of himself staring back. Panicked, he grabs a pair of scissors and cuts off his hair, desperate to see someone different in his reflection. By early morning, Yoshiko and Kuro are drinking coffee in the kitchen.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 72,
    title: `Page 69`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko and Kuro are talking about school when Kai enters the kitchen looking exhausted and disheveled. Both are left speechless by his freshly chopped, uneven haircut.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 73,
    title: `Page 70`,
    date: writeDate(2023, 10, 18),
    altText: "Kai explains that he cut his hair to keep a lower profile, though Yoshiko points out that his unusual purple eyes will still attract attention. Kai is disappointed when Kuro and Yoshiko limit him to one cup of coffee.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 74,
    title: `Page 71`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro asks Yoshiko to invite her uncle Shin over to discuss Kiri's behavior. After Yoshiko leaves, Kuro notices Kai sadly staring at the empty coffee pot and gives in, pouring him another cup.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 75,
    title: `Page 72`,
    date: writeDate(2023, 10, 18),
    altText: "After class, Yoshiko delivers Kuro's invitation to her uncle Shin. He already suspects the conversation will be about his son Kiri, but the promise of Kuro's cooking quickly convinces him to come over.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 76,
    title: `Page 73`,
    date: writeDate(2023, 10, 18),
    altText: "Kai accidentally dozes off during science class and is jolted awake by another nightmare of the red-eyed woman. When Yoshiko asks if he's okay, Kai brushes it off and leaves for the bathroom.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 77,
    title: `Page 74`,
    date: writeDate(2023, 10, 18),
    altText: "Leaving the bathroom, Kai spots Principal Wiggins talking with another teacher and tries to sneak past unnoticed. Wiggins spots him and gives chase, forcing Kai through the hallways until he reaches a dead end.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 78,
    title: `Page 75`,
    date: writeDate(2023, 10, 18),
    altText: "Desperate to escape Wiggins, Kai uses his newfound telekinetic ability to unlock a nearby janitor's closet and hides inside. Unable to open the door, Wiggins eventually leaves, and Kai breathes a sigh of relief.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 79,
    title: `Page 76`,
    date: writeDate(2023, 10, 18),
    altText: "Kai discovers stairs inside the closet leading to the roof and effortlessly breaks the chain securing the door. Outside, he relaxes in the fresh air and peacefully falls asleep without nightmares. When class ends, Yoshiko searches for Kai, who never returned from the bathroom.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 80,
    title: `Page 77`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko drops her books when classmate Triffany bumps into her and feigns remorse. Their passive-aggressive exchange turns to Kai when Triffany expresses interest in him, and Yoshiko responds with sarcasm before escaping the conversation.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 81,
    title: `Page 78`,
    date: writeDate(2023, 10, 18),
    altText: "The final school bell startles Kai awake on the roof. Realizing he slept through the rest of the day, he frantically searches for Yoshiko while dodging more attacks from Kiri's friends. When he finally finds her, Kai shields Yoshiko from another incoming attacker.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 82,
    title: `Page 79`,
    date: writeDate(2023, 10, 18),
    altText: "Kai and Yoshiko run home to escape further trouble. The next morning, Yoshiko wakes to her alarm and enters Kai's room to get him ready for school, only to find him deeply asleep and clearly exhausted.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 83,
    title: `Page 80`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko lets Kai sleep, and she and Kuro agree he can stay home if he needs the rest. After teasing her father in the kitchen, Yoshiko watches an exhausted Kai wander in, drawn by the smell of fresh coffee.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 84,
    title: `Page 81`,
    date: writeDate(2023, 10, 18),
    altText: "Kai joins Kuro and Yoshiko for coffee and curiously asks about the white substance falling outside. Kuro is dismayed to discover a spring blizzard, while Kai takes advantage of their distraction to sneak himself more coffee.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 85,
    title: `Page 82`,
    date: writeDate(2023, 10, 18),
    altText: "A phone message from Shin confirms that school is closed because of the storm. Kuro reluctantly heads to work through the snow, and that evening Kai and Yoshiko relax together by the fireplace during a power outage.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 86,
    title: `Page 83`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko introduces Kai to s'mores, which he enthusiastically enjoys. Kai cautiously asks whether superpowers are real and appears disappointed when Yoshiko says they aren't, leaving him uncertain about his own unexplained abilities.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 87,
    title: `Page 84`,
    date: writeDate(2023, 10, 18),
    altText: "Kai opens up about remembering none of his past but still carrying the fear and pain associated with it. Yoshiko admits that she and Kuro haven't seriously searched for his family because they suspect he came from an abusive home, and Kai says he doesn't want to go back.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 88,
    title: `Page 85`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko reassures Kai that he'll always have a home with them and pulls him into a comforting hug. Their quiet moment is interrupted by an unexpected visit from Shin.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 89,
    title: `Page 86`,
    date: writeDate(2023, 10, 18),
    altText: "With Kuro still at work, Shin joins Kai and Yoshiko by the fire for s'mores. When Yoshiko begins changing the bandages on Kai's wounds, Shin is horrified by the extent of his injuries.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 90,
    title: `Page 87`,
    date: writeDate(2023, 10, 18),
    altText: "Shin asks what happened between Kiri and Kai, and Yoshiko carefully explains his son's behavior. Exasperated by what he hears, Shin gets up to start the generator and order pizza for the kids.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 91,
    title: `Page 88`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro arrives home late to find the kids asleep and Shin grading papers in the kitchen. Shin heats up pizza for his brother as they discuss Kiri, and promises to put a stop to his son's behavior.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 92,
    title: `Page 89`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro and Shin discuss whether Kai should be attending school and their concerns about his unknown past. Shin notes that both Kuro and Yoshiko seem happier since Kai arrived. During their conversation, Kuro's coffee mug mysteriously cracks, but he brushes it off.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 93,
    title: `Page 90`,
    date: writeDate(2023, 10, 18),
    altText: "Objects mysteriously float through Kai's bedroom while he sleeps curled up inside his closet instead of his bed. In another nightmare, the terrified Kai is confronted once again by the red-eyed woman.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 94,
    title: `The Kai Journals: Part 1`,
    date: writeDate(2023, 10, 18),
    altText: "Kai writes about his daily life, including trouble with the principal, accidentally using his powers in front of Shin's wife, and Yoshiko discovering that sleeping in the closet has become a nightly habit for him.",
    imageFiles: 1,
    authorNotes: `<p>So, this is a four part bonus content I made during a hiatus. Chapter 4 takes has a time skip of a few months and these journal entries are meant to fill in the gap as well as give you a better understanding of what goes on inside Kai's head. You don't <i>have</i> to read them to understand chapter 4, but it does make for a meaningful experience. There's a lot of important things that happen, including new abilities and a trip that becomes a core memory for Kai. Hope you enjoy!</p>`
},

{
    pgNum: 95,
    title: `The Kai Journals: Part 2`,
    date: writeDate(2023, 10, 18),
    altText: "Kai writes about staying awake to avoid his nightmares, finally recovering from his injuries, and taking a family trip to Hampton. During the trip, an overjoyed Kai accepts Kuro's offer to adopt him, and afterward the family shops for things to make his room his own.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 96,
    title: `The Kai Journals: Part 3`,
    date: writeDate(2023, 10, 18),
    altText: "Kai writes that his nightmares have returned and that he has begun hearing other people's thoughts, causing more trouble at school. Barely sleeping and tormented by the red-eyed woman whenever he does, Kai refuses to confide in a worried Kuro, creating tension at home.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 97,
    title: `The Kai Journals: Part 4`,
    date: writeDate(2023, 10, 18),
    altText: "Kai's final entries describe increasingly torturous nightmares and waking to find strange symbols carved throughout his closet. Exhausted and at the end of his rope, he can no longer stay awake and is pulled into another nightmare.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 98,
    title: `Chapter Four: The Stranger`,
    date: writeDate(2023, 10, 18),
    altText: "Chapter Four: The Stranger",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 99,
    title: `Page 91`,
    date: writeDate(2023, 10, 18),
    altText: "Kai falls into another nightmare where the red-eyed woman tortures him and demands his real name. Kai insists that the only name he knows is Kai, but she continues trying to force an answer from him.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 100,
    title: `Page 92`,
    date: writeDate(2023, 10, 18),
    altText: "Frustrated by Kai's refusal, the red-eyed woman throws aside her knife. A shadowy man enters and picks it up, his face obscured except for glowing green eyes. The sight and sound of him immediately terrify Kai.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 101,
    title: `Page 93`,
    date: writeDate(2023, 10, 18),
    altText: "Kai pleads that he can't remember, but the green-eyed man insists that he simply doesn't want to. The woman restrains Kai while the man repeatedly carves symbols into his body, leaving him screaming in pain.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 102,
    title: `Page 94`,
    date: writeDate(2023, 10, 18),
    altText: "Kai lies nearly motionless, his body covered in carved symbols. As he begs them to stop, the green-eyed man claims Kai's own guilt is creating the nightmare. Shadowy hands emerge beneath Kai and begin pulling him downward.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 103,
    title: `Page 95`,
    date: writeDate(2023, 10, 18),
    altText: "The ground shatters beneath Kai and he falls into a dark void as the man's glowing green eyes stare down at him. Screaming, Kai begins to awaken from the nightmare covered in blood, with Kuro desperately holding him down.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 104,
    title: `Page 96`,
    date: writeDate(2023, 10, 18),
    altText: "Kai wakes confused and breathing heavily as Kuro restrains his arms and Yoshiko holds his legs, preventing him from hurting himself. Seeing the severity of the situation, Kuro tells Yoshiko to call Shin for a ride to the hospital.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 105,
    title: `Page 97`,
    date: writeDate(2023, 10, 18),
    altText: "Terrified that going to the hospital could separate him from his new family, Kai begs Kuro not to take him. Kuro promises they will stay together and reassures him that getting help is the safest choice while Yoshiko calls Shin.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 106,
    title: `Page 98`,
    date: writeDate(2023, 10, 18),
    altText: "Shin explains the emergency to his wife Helena before leaving, and Kiri convinces his father to let him come along. Back at the Shimizu house, an anxious Yoshiko watches for Shin's van and the family rushes outside when he arrives.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 107,
    title: `Page 99`,
    date: writeDate(2023, 10, 18),
    altText: "Shin is horrified by Kai's bloody condition, though a slurring Kai stubbornly insists that he's fine. Shin speeds toward the hospital, where the family later waits anxiously while Kai is treated.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 108,
    title: `Page 100`,
    date: writeDate(2023, 10, 18),
    altText: "While waiting at the hospital, Shin asks Yoshiko if she's all right. She begins telling him about the strange events that have occurred since Kai arrived, while Shin tries to find rational explanations.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 109,
    title: `Page 101`,
    date: writeDate(2023, 10, 18),
    altText: "As Shin asks more questions about Kai, Yoshiko admits that the story he was originally told wasn't entirely true. Shin becomes increasingly baffled and upset by Kuro's decision to secretly bring an injured stranger into their home.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 110,
    title: `Page 102`,
    date: writeDate(2023, 10, 18),
    altText: "Yoshiko tries to calm Shin despite her own visible concern and asks him not to tell Kuro that she revealed the truth. Shin makes no promises, while nearby Kuro stops an irritated Kiri from attacking a vending machine.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 111,
    title: `Page 103`,
    date: writeDate(2023, 10, 18),
    altText: "Shin insists on speaking privately with Kuro and confronts him in an empty room about what's really happening with Kai. Kuro tries to avoid the conversation while Yoshiko and a grumpy Kiri wait outside.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 112,
    title: `Page 104`,
    date: writeDate(2023, 10, 18),
    altText: "Shin refuses to drop the subject, so Kuro reluctantly agrees to tell him the truth while warning that he won't believe it. After Shin promises to trust him, Kuro reveals that Kai is telepathic.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 113,
    title: `Page 105`,
    date: writeDate(2023, 10, 18),
    altText: "Shin immediately breaks his promise and heads for the door in disbelief. Kuro stops him by revealing that he knows Kai's father, then firmly states that he intends to keep Kai away from his biological father at all costs.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 114,
    title: `Page 106`,
    date: writeDate(2023, 10, 18),
    altText: "Kiri unsuccessfully tries to listen through the door before sitting with a visibly stressed Yoshiko. Behind closed doors, Kuro reveals something further about Kai that sends a stunned and angry Shin storming down the hospital hallway.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 115,
    title: `Page 107`,
    date: writeDate(2023, 10, 18),
    altText: "The family is finally allowed to visit Kai, who is visibly relieved to see them. Their reunion goes well until Kiri begins antagonizing Kai, prompting Kuro to send him away to find Shin.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 116,
    title: `Page 108`,
    date: writeDate(2023, 10, 18),
    altText: "Alone with Kai, Kuro and Yoshiko encourage him to talk about his nightmares. Kai is visibly uncomfortable and reluctant, but Yoshiko persuades him to begin by describing the mysterious red-eyed woman.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 117,
    title: `Page 109`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro reacts with surprise to Kai's description of the red-eyed woman. He and Yoshiko are even more alarmed when Kai admits the nightmares have continued for months, and Kai becomes emotional when he sees Kuro's distress.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 118,
    title: `Page 110`,
    date: writeDate(2023, 10, 18),
    altText: "Kai reluctantly describes the green-eyed man who appeared in his latest nightmare. Kuro turns away to hide his own fear, while Kai breaks down in tears and Yoshiko insists that they've pushed him far enough.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 119,
    title: `Page 111`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro regains his composure and leaves to speak with Kai's doctor, but Kai fears that Kuro is angry with him. Yoshiko reassures him and lightens the mood with humor and morning television.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 120,
    title: `Page 112`,
    date: writeDate(2023, 10, 18),
    altText: "Later, Kai and Yoshiko watch television while discussing his unusually fast-growing claws. Shin arrives and joins their conversation about crime dramas, then delights the kids by offering them his old television.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 121,
    title: `Page 113`,
    date: writeDate(2023, 10, 18),
    altText: "Kai and Shin joke together as Shin prepares to leave for work. Kuro returns with Kiri after dragging him away from another vending machine, and a tense exchange passes between the brothers before Shin and Kiri leave.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 122,
    title: `Page 114`,
    date: writeDate(2023, 10, 18),
    altText: "That evening, Yoshiko sleeps on Kai's hospital bed while Kai and Kuro play Go Fish. When a nurse arrives for Kai's sleep study, his fear returns, and Kuro and Yoshiko pull him into a reassuring family hug.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 123,
    title: `Page 115`,
    date: writeDate(2023, 10, 18),
    altText: "While Kuro and Yoshiko eat a late dinner, Kuro is called to the nurse's station. Kai's doctor explains that the sleep study ended early after equipment malfunctioned and Kai reacted so violently to a nightmare that he had to be sedated.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 124,
    title: `Page 116`,
    date: writeDate(2023, 10, 18),
    altText: "Kai's doctor believes his parasomnia may be connected to psychological trauma and refers him to a mental health specialist. Kuro sends an exhausted Yoshiko home to rest while he remains at the hospital with Kai.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 125,
    title: `Page 117`,
    date: writeDate(2023, 10, 18),
    altText: "Alone in an empty room, Kuro finally breaks down under the weight of his fear and uncertainty. Smoking a cigarette, he tearfully speaks aloud to his deceased wife about everything he's struggling with.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 126,
    title: `Page 118`,
    date: writeDate(2023, 10, 18),
    altText: "After collecting himself, Kuro returns to a dejected Kai and assures him that the failed sleep study wasn't his fault. Kuro gently gives Kai an opportunity to admit that he has unusual abilities, but Kai remains silent about them.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 127,
    title: `Page 119`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro urges Kai to be more honest with him and confronts him about skipping class. Kai admits that he likes school but feels like a freak because of everything he doesn't know, and Kuro comforts him while encouraging him to keep trying.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 128,
    title: `Page 120`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro reminds Kai that he's family and doesn't have to face everything alone. When Kuro suggests that Kai may be repressing his memories, Kai becomes distressed and objects around them react telekinetically, prompting Kuro to stop and comfort him.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 129,
    title: `Sleep: Part 1`,
    date: writeDate(2023, 10, 18),
    altText: "Late that night, Kai finally admits to Kuro that he's afraid to sleep. Kuro holds and reassures him before bringing him back to bed and offering to read aloud until he falls asleep.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 130,
    title: `Sleep: Part 2`,
    date: writeDate(2023, 10, 18),
    altText: "Kai curls up closely beside Kuro, comforted as he listens to him read. Kai falls asleep before Kuro finishes the first page, leaving Kuro saddened by how completely the boy's basic sense of safety was taken from him.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 131,
    title: `Sleep: Part 3`,
    date: writeDate(2023, 10, 18),
    altText: "Holding the sleeping Kai, Kuro speaks aloud about his initial fears of bringing him home and how quickly he came to love him. He begs Kai to keep fighting his nightmares and promises to be the best father he can be.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 132,
    title: `Sleep: Part 4`,
    date: writeDate(2023, 10, 18),
    altText: "The cold darkness of Kai's dream transforms into the sunny beach at Hampton, where he's surrounded by his family relaxing together. Safe and content, Kai falls asleep beneath the sun while, in reality, he and Kuro sleep peacefully curled up together.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 133,
    title: `Sleep: Part 5`,
    date: writeDate(2023, 10, 18),
    altText: "After sunrise, Kuro jolts awake in fear that Kai has hurt himself again, only to find him happily sitting by the window after a peaceful night's sleep. As they enjoy breakfast and coffee, Kuro's secretary arrives with news of a work emergency.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 134,
    title: `Sleep: Part 6/ Page 121`,
    date: writeDate(2023, 10, 18),
    altText: "Kuro prepares to cancel a surgery so he can remain with Kai, but Kai insists that he'll be fine alone and encourages him to work his shift. Kuro reluctantly agrees, and Kai becomes painfully bored within minutes of being left alone.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 135,
    title: `Page 122`,
    date: writeDate(2023, 10, 31),
    altText: "A bored Kai entertains himself with cartwheels, pretending to be a ghost under his bedsheet, and nearly pulling the fire alarm. Just as defeat sets in, Kuro returns and secretly brings him a cup of coffee.",
    imageFiles: 1,
    authorNotes: `
        <p>Happy Halloween! Honestly, I can't express how stoked I am that ghost Kai ended up live on Halloween. This page was supposed to come out two months ago, but got pushed back for various life reasons and for the additional scene. I guess it worked out for the best!</p>
        `
},

{
    pgNum: 136,
    title: `The Kai Journals...er, Napkin: Part 5`,
    date: writeDate(2023, 11, 10),
    altText: "Kai writes a new journal entry on a napkin about his hospital stay, including the failed sleep study and playing dress-up with a nurse. He also describes a strange sensation of his mind being tugged like a string and realizes with alarm that he left his journal on the closet floor at home.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 137,
    title: `Page 123`,
    date: writeDate(2023, 11, 10),
    altText: "Kai continues struggling with boredom until Kuro brings him lunch during his break. With his appointment approaching, Kai admits that he's nervous about meeting the psychologist.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 138,
    title: `Page 124`,
    date: writeDate(2023, 11, 10),
    altText: "As his appointment approaches, an anxious Kai gets dressed and impulsively sneaks out of the hospital, walking unnoticed past distracted security guards. When Kuro learns that Kai has escaped, he seems unsurprised.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 139,
    title: `Page 125`,
    date: writeDate(2023, 11, 17),
    altText: "During the last class of the day, Yoshiko is stunned to discover the escaped Kai sitting at his usual desk. Shin enters the classroom and immediately notices his hospitalized student has unexpectedly returned.",
    imageFiles: 1,
    authorNotes: `<p> Where does an anxious, restless sleep-deprived teenager go once he's escaped? To high school of course! Wait...what?!</p>`
},

{
    pgNum: 140,
    title: `Page 126`,
    date: writeDate(2023, 11, 17),
    altText: "Kai offers an absurd excuse for leaving the hospital that no one believes, and Shin steps into the hallway to make a phone call. As Yoshiko tries to reason with Kai, he suddenly becomes distracted by a telepathic signal in his mind.",
    imageFiles: 1,
    authorNotes: `<p>Boy's not using that noggin of his, is he?</p>`
},

{
    pgNum: 141,
    title: `Page 127`,
    date: writeDate(2023, 11, 22),
    altText: "Kai brushes off Yoshiko's concerns and turns his attention to schoolwork while Shin calls Kuro from the hallway. Exhausted, Kai falls asleep at his desk and another nightmare violently sends him flying from his chair.",
    imageFiles: 1,
    authorNotes: `<p>Happy 20th anniversary, Nocturne 21! Been quite the amazing ride so far! </P>`
},

{
    pgNum: 142,
    title: `Page 128`,
    date: writeDate(2023, 11, 28),
    altText: "The class stares as Shin and Yoshiko help Kai from the floor and escort him into the hallway. Feverish and visibly unwell, Kai still resists returning to the hospital until Yoshiko offers to go with him.",
    imageFiles: 1,
    authorNotes: `<p>Oof. Having a meltdown in front of your classmates. High school's probably not the best place for that, Kai.</p>`
},

{
    pgNum: 143,
    title: `Page 129`,
    date: writeDate(2023, 11, 30),
    altText: "Kai finally agrees to leave with Yoshiko, but the moment Shin returns to his classroom, Kai breaks away and runs. Yoshiko struggles to chase him through the school until he abruptly stops at a door.",
    imageFiles: 1,
    authorNotes: `<p>Poor Yosh. I'm not a runner either...</p>`
},

{
    pgNum: 144,
    title: `Page 130`,
    date: writeDate(2023, 12, 05),
    altText: "Kai ducks into the teachers' lounge with an anxious Yoshiko close behind. He pours them both coffee and promises he'll leave with her after ten minutes, and she reluctantly agrees to wait.",
    imageFiles: 1,
    authorNotes: `<p>See, folks? Nothing to worry about! Our boy's just taking a little coffee break!</p>`
},

{
    pgNum: 145,
    title: `Page 131`,
    date: writeDate(2023, 12, 07),
    altText: "When Yoshiko asks why he's behaving so strangely, Kai admits he's terrified that recovering his memories could reveal that he was a bad person. More than anything, he fears the Shimizus would stop loving him.",
    imageFiles: 1,
    authorNotes: `<p>Maybe this wasn't actually about the coffee...</p>`
},

{
    pgNum: 146,
    title: `Page 132`,
    date: writeDate(2023, 12, 12),
    altText: "Yoshiko reassures Kai that his past won't change how much they love him. His relief is short-lived when he senses something strange, cryptically thanks Yoshiko for everything, and suddenly bolts from the lounge with her chasing after him.",
    imageFiles: 1,
    authorNotes: `<p>Maybe you shouldn't follow him this time...</p>`
},

{
    pgNum: 147,
    title: `Page 133`,
    date: writeDate(2023, 12, 14),
    altText: "Yoshiko catches up with Kai outside and scolds him for running away. Kai tells her to stay quiet as he waits for something he can sense nearby, then suddenly detects an object flying toward her.",
    imageFiles: 1,
    authorNotes: `<p>Watch your back, Yosh...</p>`
},

{
    pgNum: 148,
    title: `Page 134`,
    date: writeDate(2023, 12, 19),
    altText: "Kai shoves Yoshiko out of the path of a sharp flying weapon, which embeds itself in the car behind her. He tells Yoshiko to stay down while he searches for whoever attacked them, despite her pleas for him not to leave.",
    imageFiles: 1,
    authorNotes: `<p>This woulda been a real bad time to trip over his shoelaces...</p>`
},

{
    pgNum: 149,
    title: `Page 135`,
    date: writeDate(2023, 12, 21),
    altText: "Kai follows the attacker's trail into the parking lot and uses his abilities to locate a mysterious figure standing on the school roof. The stranger greets Kai with familiarity, but Kai angrily demands to know who he is.",
    imageFiles: 1,
    authorNotes: `<p>The stranger has appeared...</p>`
},

{
    pgNum: 150,
    title: `Page 136`,
    date: writeDate(2023, 12, 28),
    altText: "The mysterious figure leaps from the school roof as Yoshiko screams, believing he's falling to his death. He crashes safely into the parking lot in a cloud of dust and debris, and when the air clears, Kai and Yoshiko discover that the stranger has Kai's face.",
    imageFiles: 1,
    authorNotes: `<p>And we conclude this chapter with an over-the-top superhero landing and dramatic dust cloud reveal. </p>`
},
   
{
    pgNum: 151,
    title: `VOLUME 2: TRUST FALLS`,
    date: writeDate(2024, 06, 12),
    altText: "Nocturne 21 Volume Two: Trust Falls",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 152,
    title: `Chapter Five: The Voice From Below`,
    date: writeDate(2024, 06, 12),
    altText: "Chapter Five: The Voice From Below",
    imageFiles: 1,
    authorNotes: `<p>Welcome back, friends! Sorry for the long hiatus! Good to be back at again. I hope you enjoy :)</p>`
},

{
    pgNum: 153,
    title: `Page 137`,
    date: writeDate(2024, 06, 12),
    altText: "Three weeks earlier, Shin pulls into the driveway and is immediately approached by Kuro as the kids begin loading his van. Kuro explains that they need a ride to Hampton for a family trip celebrating Kai's recovery from his injuries.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 154,
    title: `Page 138`,
    date: writeDate(2024, 06, 12),
    altText: "Shin angrily refuses both the ride and Kuro's invitation to join them. Kai and Yoshiko make one last attempt with pleading puppy-dog eyes while Kuro sweetens the deal with the promise of good food.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 155,
    title: `Page 139`,
    date: writeDate(2024, 06, 19),
    altText: "The family travels down the highway toward Hampton as Kai excitedly takes in the passing scenery. Kuro offers him the front seat, and despite Shin's protests, Kai and Kuro happily swap places.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 156,
    title: `Page 140`,
    date: writeDate(2024, 06, 26),
    altText: "Kai discovers how to roll down the window and gleefully sticks half his body outside to enjoy the wind. A panicked Shin yanks him back by his shirt, and after Kuro tells Kai to sit properly, Kai settles for asking to change the music.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 157,
    title: `Page 141`,
    date: writeDate(2023, 07, 03),
    altText: "Shin gives in and lets Kai change the music. Yoshiko quietly asks Kuro in Japanese when he plans to ask Kai to officially join their family, and Kuro says he'll do it when the time is right. Watching the happy family, Shin smiles and affectionately rests a hand on Kai's shoulder.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 158,
    title: `Page 142`,
    date: writeDate(2024, 07, 17),
    altText: "Kai smiles at Shin's affectionate gesture as they continue toward Hampton. At the rental house, owner Rita jokingly mistakes Kai for Yoshiko's boyfriend, and Kuro quickly explains that he's a new member of the family before calling everyone in for lunch.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 159,
    title: `Page 143`,
    date: writeDate(2024, 07, 24),
    altText: "A montage shows the family's Hampton trip: sharing lunch, Shin and Kuro competing at Dance Dance Revolution, visiting the pier, eating ice cream and shopping for a sweater, and finally relaxing together on the beach at sunset.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 160,
    title: `Page 144`,
    date: writeDate(2024, 08, 01),
    altText: "Kai watches the sunset with his feet in the ocean and convinces Kuro to join him, though Kuro finds the water painfully cold. Ignoring Kuro's objections, Kai wades deeper before diving in and swimming farther from shore.",
    imageFiles: 1,
    authorNotes: `<p>Here ya go! Have some fackin sunsets! Seriously though, this page kicked my ass. It took way longer than a normal page to color. I hope it was worth it!</p>`
},

{
    pgNum: 161,
    title: `Page 145`,
    date: writeDate(2024, 08, 07),
    altText: "Yoshiko spots Kai far out in the water and scolds Kuro for allowing it. While Kuro insists Kai went in on his own, Kai uses his telekinetic abilities to propel himself rapidly through the water.",
    imageFiles: 1,
    authorNotes: `<p>Uh-oh. Kuro's got you pegged, Kai. </p>`
},

{
    pgNum: 162,
    title: `Page 146`,
    date: writeDate(2024, 09, 18),
    altText: "Hearing Kuro call his name, Kai surfaces and agrees to come back to shore after floating for one more minute. As he relaxes in the water, something suddenly wraps around his leg and drags him beneath the surface.",
    imageFiles: 1,
    authorNotes: `<p>"Just one more minute..." famous last words, Kai. </p>`
},

{
    pgNum: 163,
    title: `Page 147`,
    date: writeDate(2024, 09, 25),
    altText: "Kai desperately struggles against whatever has caught his leg as he's dragged deeper into the water. Unable to break free, he eventually loses consciousness and sinks into darkness.",
    imageFiles: 1,
    authorNotes: `<p>Things aren't looking good for our boy... </p>`
},

{
    pgNum: 164,
    title: `Page 148`,
    date: writeDate(2024, 10, 02),
    altText: "In reality, Kai remains floating unconscious on the surface. When he doesn't respond to Kuro's calls, Kuro dives in and grabs him while Shin throws out a life ring, helping pull them both back to safety.",
    imageFiles: 1,
    authorNotes: `<p>Kuro isn't wasting any time. Go save your boi! </p>`
},

{
    pgNum: 165,
    title: `Page 149`,
    date: writeDate(2024, 10, 09),
    altText: "Back on shore, Kuro checks Kai and finds him breathing but dangerously cold. He sends Shin and Yoshiko to find blankets and other supplies while desperately talking to the unconscious Kai and begging him to wake up.",
    imageFiles: 1,
    authorNotes: `<p>Shin, your panic is showing. </p>`
},

{
    pgNum: 166,
    title: `Page 150`,
    date: writeDate(2024, 10, 16),
    altText: "Kai awakens within a dream, washed ashore on a beach resembling Hampton. Strange houses surround him, while enormous crumbling structures inexplicably float in the sky overhead.",
    imageFiles: 1,
    authorNotes: `<p>What fresh new hell is this?!</p>`
},

{
    pgNum: 167,
    title: `Page 151`,
    date: writeDate(2024, 10, 23),
    altText: "Kai follows a stone path through the deserted village, calling for his family. A ghostly voice draws him toward a dark opening and down a stone staircase, where he discovers a boy who looks like him chained to the wall.",
    imageFiles: 1,
    authorNotes: `<p> </p>`
},

{
    pgNum: 168,
    title: `Page 152`,
    date: writeDate(2023, 11, 10),
    altText: "Kai approaches the sleeping chained boy to see if he's all right. The boy suddenly wakes, grabs Kai's shirt, calls him by name, and begs Kai to kill him. Horrified, Kai pulls away and heads for the exit.",
    imageFiles: 1,
    authorNotes: ``
},

{
    pgNum: 169,
    title: `Page 153`,
    date: writeDate(2023, 11, 17),
    altText: "Ignoring the chained boy's desperate warning, Kai runs toward the water as glowing wires chase him from the darkness. Kai turns and creates a barrier that deflects them, and the wires finally retreat back into the underground chamber.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 170,
    title: `Page 154`,
    date: writeDate(2023, 11, 17),
    altText: "Kai quietly apologizes before diving back into the water as the chained boy warns that this isn't over. Kai suddenly awakens hysterically in Kuro's arms and tries to explain what happened. Kuro comforts him with a tight hug, and Kai apologizes for ignoring his warning to leave the water.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 171,
    title: `Page 155`,
    date: writeDate(2023, 11, 22),
    altText: "Yoshiko and Shin return relieved to find Kai awake. They wrap Kai and Kuro in blankets and give Kai a warm drink as everyone agrees that they've had enough of the water for one trip.",
    imageFiles: 1,
    authorNotes: `<p></P>`
},

{
    pgNum: 172,
    title: `Page 156`,
    date: writeDate(2026, 03, 18),
    altText: "Back in the present, Kai stands face-to-face with his mysterious look-alike. Yoshiko clings to Kai in shock while he gives the red-eyed stranger a decidedly unfriendly greeting.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 173,
    title: `Page 157`,
    date: writeDate(2026, 03, 18),
    altText: "Kai demands to know what the stranger wants and learns that he's come to take Kai home. The red-eyed stranger is shocked and upset that Kai doesn't remember him, while Yoshiko asks whether anything about him seems familiar.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 174,
    title: `Page 158`,
    date: writeDate(2026, 03, 18),
    altText: "Kai admits that he hadn't noticed how strongly he resembles the stranger until Yoshiko shows him a mirror. Shaken by the discovery, Kai finally agrees that his memory loss needs medical attention, angering the stranger when he makes it clear he won't return home with him.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 175,
    title: `Page 159`,
    date: writeDate(2026, 03, 18),
    altText: "Kai firmly tells the stranger that Caulwyn is his home and refuses to leave. He and Yoshiko walk toward the school, even inviting the stranger to come along, while the red-eyed boy becomes enraged that Kai is choosing his new family.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 176,
    title: `Page 160`,
    date: writeDate(2026, 03, 18),
    altText: "In a flash, the red-eyed stranger appears in front of Kai and Yoshiko, blocking the school entrance. When he refuses to move, Kai headbutts him in the nose and Yoshiko tries to slip past, but the stranger fires glowing red wires from his gloves toward her.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 177,
    title: `Page 161`,
    date: writeDate(2026, 03, 18),
    altText: "Kai telekinetically deflects the first wires aimed at Yoshiko, but another set strikes her hard and sends her to the ground. Kai rushes to help her up as the stranger refuses to let him leave, forcing Kai to prepare for a fight.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 178,
    title: `Page 162`,
    date: writeDate(2026, 03, 18),
    altText: "Yoshiko reluctantly accepts that Kai will have to fight and tries to reduce the danger. She tricks the red-eyed stranger into surrendering his sword, retrieves the other sword from the car, and warns Kai to watch out for the glowing wires.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 179,
    title: `Page 163`,
    date: writeDate(2026, 03, 18),
    altText: "Kai urges Yoshiko to wait safely inside the school, but she refuses to leave him. Seeing how worried she is, Kai reassures Yoshiko that he'll be all right and sincerely thanks her for looking out for him.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 180,
    title: `Page 164`,
    date: writeDate(2026, 03, 18),
    altText: "After exchanging some final taunts, Kai and the red-eyed stranger begin fighting. The stranger charges with such speed that Kai barely sees him coming, landing a powerful punch that sends Kai crashing into a car.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 181,
    title: `Page 165`,
    date: writeDate(2026, 03, 18),
    altText: "Unknown to Kai, a student smoking marijuana is inside the car he crashes into. The student slips out and tells several classmates who are skipping class about the fight, and the group excitedly heads over to watch.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 182,
    title: `Page 166`,
    date: writeDate(2026, 03, 18),
    altText: "The stranger again tries to convince Kai to come home, but Kai insists that he already is home. They exchange a rapid series of attacks and evasions until Kai kicks the stranger in the face and sends him crashing onto a car hood.",
    imageFiles: 1,
    authorNotes: `<p></P>`
},

{
    pgNum: 183,
    title: `Page 167`,
    date: writeDate(2026, 03, 18),
    altText: "Yoshiko watches in horror as Kai and the stranger continue smashing into parked cars. Her frustration grows when a group of students arrives to watch, and after failing to make them leave, she reluctantly explains why the two boys are fighting.",
    imageFiles: 1,
    authorNotes: `<p></p>`
},

{
    pgNum: 184,
    title: `Page 168`,
    date: writeDate(2026, 03, 18),
    altText: "The spectators light a blunt and pass it around, though Yoshiko refuses when Griff offers it to her. Nearby, Kai catches the stranger's leg during a kick and slams him face-first into the pavement before their fight continues.",
    imageFiles: 1,
    authorNotes: `<p>Hey folks! Sorry for the lack of update for a while. Had a big move and a lot of life changes since I last updated. I'm settled down now and looking to regularly post again. So keep an eye out for that and as always, thanks for reading!</p>`
},

{
    pgNum: 185,
    title: "Page 169",
    date: writeDate(2026, 3, 24),
    altText: "The red-eyed stranger grabs Kai's leg and hurls him through the front and rear windows of a car. Shattered glass flies toward the spectators but suddenly freezes in midair, and Yoshiko looks up to see Kai with glowing eyes, apparently controlling the suspended shards.",
    imageFiles: 1,
    authorNotes: `<p>Ruh-roh. Cat's outta the bag now, kid...</p>`,

    // NEW ↓↓↓
    description: "Page 169 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg185.png"
},

{
    pgNum: 186,
    title: "Page 170",
    date: writeDate(2026, 4, 10),
    altText: "Kai telekinetically pulls the suspended glass toward himself, sending the shards swirling around his body like a violent tornado. Yoshiko stares in shock while the red-eyed stranger looks terrified by the display of power.",
    imageFiles: 1,
    authorNotes: `<p>Looks like Kai's ready to pull out the big guns. Our stranger looks like he's having some regrets</p>`,

    // NEW ↓↓↓
    description: "Page 170 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg186.png"
},

{
    pgNum: 187,
    title: "Page 171",
    date: writeDate(2026, 4, 23),
    altText: "Kai launches the swirling glass at the red-eyed stranger, who is nicked by several shards but avoids most of the attack by diving behind a car. An angry Yoshiko confronts Kai for hiding his powers from her, and he promises to explain after the fight.",
    imageFiles: 1,
    authorNotes: `<p>I'm sure he can't wait for that conversation, Yosh.</p>`,

    // NEW ↓↓↓
    description: "Page 171 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg187.png"
},

{
    pgNum: 188,
    title: "Page 172",
    date: writeDate(2026, 4, 30),
    altText: "A rattled red-eyed stranger asks how long Kai has had his powers and warns that they can be dangerous if used improperly. Kai is surprised that his look-alike doesn't share the same abilities but dismisses the warning and charges again as more students arrive to watch.",
    imageFiles: 1,
    authorNotes: `<p>Ah, good. The circus is complete.</p>`,

    // NEW ↓↓↓
    description: "Page 172 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg188.png"
},

{
    pgNum: 189,
    title: "Page 173",
    date: writeDate(2026, 05, 07),
    altText: "Kai knocks the stranger down with a kick, chases him between the parked cars, and sends him crashing into another vehicle. The stranger retaliates by extending his glowing wires and slashing them across Kai's chest.",
    imageFiles: 1,
    authorNotes: `<p>Ah, good. The circus is complete.</p>`,

    // NEW ↓↓↓
    description: "Page 173 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg189.png"
},

{
    pgNum: 190,
    title: "Page 174",
    date: writeDate(2026, 05, 14),
    altText: "Kai asks about the strange glowing wires, but the stranger will only explain them if Kai agrees to return home. Kai refuses and the fight resumes, with both boys trading kicks and slashing attacks between the parked cars.",
    imageFiles: 1,
    authorNotes: `<p>Pffft. Fine. Keep your secrets.</p>`,

    // NEW ↓↓↓
    description: "Page 174 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg190.png"
},

{
    pgNum: 191,
    title: "Page 175",
    date: writeDate(2026, 05, 21),
    altText: "The stranger knocks Kai into a car and pins him by the neck as glowing wires coil tightly around his face. Kai reaches toward Yoshiko, who realizes he wants one of the swords and reluctantly releases it, allowing Kai to pull it telekinetically into his hand.",
    imageFiles: 1,
    authorNotes: `<p>I don't think sass is gonna get you out of this one, Kai.</p>`,

    // NEW ↓↓↓
    description: "Page 175 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg191.png"
},

{
    pgNum: 192,
    title: "Page 176",
    date: writeDate(2026, 05, 28),
    altText: "Kai slices through the wires restraining him and kicks the stranger backward into a car. As Kai catches his breath, the sword in his hand triggers a sudden flash of memory, and he immediately throws it away in distress.",
    imageFiles: 1,
    authorNotes: `<p>Magic or cursed sword? Or maybe a memory if finally breaking through. Or maybe Kai senses something unique. 
    Maybe it's just the sleep deprivation finally getting to him. Guess we'll have to wait to find out...</p>`,

    // NEW ↓↓↓
    description: "Page 176 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg192.png"
},

{
    pgNum: 193,
    title: "Page 177",
    date: writeDate(2026, 06, 04),
    altText: "The stranger grabs the discarded sword and launches a relentless attack, eventually cornering Kai. Kai instinctively raises his hands to protect himself, and glowing wires suddenly emerge from them and stop the sword's blade before it can strike.",
    imageFiles: 1,
    authorNotes: `<p>Pulling out all the surprises today, huh, Kai?</p>`,

    // NEW ↓↓↓
    description: "Page 177 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg193.png"
},

{
    pgNum: 194,
    title: "Page 178",
    date: writeDate(2026, 06, 11),
    altText: "Kai excitedly experiments with the glowing wires emerging from his hands, causing the red-eyed stranger to shriek in alarm. Yoshiko watches in bewilderment as Kai turns the new ability against his opponent and relentlessly whips him with the wires.",
    imageFiles: 1,
    authorNotes: `<p>Don't question it. Let them fight.</p>`,

    // NEW ↓↓↓
    description: "Page 178 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg194.png"
},

{
    pgNum: 195,
    title: "Page 179",
    date: writeDate(2026, 06, 18),
    altText: "Unable to fend off Kai's attack, the cornered stranger panics and drives his sword into Kai's abdomen. Kai freezes in shock as Yoshiko screams and rushes toward him, while the stranger painfully pulls the blade back out.",
    imageFiles: 1,
    authorNotes: `<p>Pretty sure this was EXACTLY what Yosh was afraid of. Kai, my guy, you need to learn some defense.</p>`,

    // NEW ↓↓↓
    description: "Page 179 of Nocturne 21: Why boys shouldn't play with sharp objects...",
    thumb: "https://nocturne21.com/img/thumbs/pg195.png"
},

{
    pgNum: 196,
    title: "Page 180",
    date: writeDate(2026, 06, 25),
    altText: "Kai bleeds heavily as Yoshiko presses against his wound and desperately asks the spectators for help. A girl named Charlie produces duct tape, and she and Yoshiko wrap the entire roll around Kai's torso in an improvised attempt to stop the bleeding.",
    imageFiles: 1,
    authorNotes: `<p>Can't imagine why you've been in high school for 6 years, Clyde.</p>`,

    // NEW ↓↓↓
    description: "Page 180 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg196.png"
},

{
    pgNum: 197,
    title: "Page 181",
    date: writeDate(2026, 07, 02),
    altText: "After patching Kai's wound, Yoshiko tries to lead him inside so they can get him to a hospital, but he stubbornly refuses. Yoshiko demands Griff's phone to call for help, only for Kai to telekinetically yank it from her hand.",
    imageFiles: 1,
    authorNotes: `<p>Heyyyy, Kai, my dude, my buddy, my buddy ole pal….maybe you should listen to Yoshiko. I think the blood loss is getting to you. Or you could keep going, I mean…what’s the worst that can happen, right?

<br>Also, Griff, I know you’re higher than a kite right now, but maybe don’t badger her. She’s going through a lot today. And the day is still young.</p>`,

    // NEW ↓↓↓
    description: "Page 181 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg197.png"
},

{
    pgNum: 198,
    title: "Page 182",
    date: writeDate(2026, 07, 09),
    altText: "Kai crushes Griff's phone and telekinetically destroys the spectators' phones as well, stunning everyone around him. He insists that returning to the hospital is too dangerous, and Yoshiko reluctantly accepts his reasoning but pleads with him to at least let Kuro treat his wound.",
    imageFiles: 1,
    authorNotes: `<p>I guess phone smashing runs in the family. Shame none of them own a nokia.</p>`,

    // NEW ↓↓↓
    description: "Page 182 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg198.png"
},

{
    pgNum: 199,
    title: "Page 183",
    date: writeDate(2026, 07, 16),
    altText: "Yoshiko briefly sees hope when the red-eyed stranger offers to stop fighting, but Kai rejects the truce, convinced it's a trick to force him home. Overwhelmed with frustration, Yoshiko kicks a car and again pleads with Kai to end the fight.",
    imageFiles: 1,
    authorNotes: `<p>Guess Yosh wanted to join in the car-smashing fun. </p>`,

    // NEW ↓↓↓
    description: "Page 183 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg199.png"
},

{
    pgNum: 200,
    title: "Page 184",
    date: writeDate(2026, 07, 23),
    altText: "As Yoshiko and Kai argue, the stranger insists that his offer isn't a trick. Kai accuses him of being connected to the attack that nearly killed him, prompting Yoshiko to explain how Kai arrived in Caulwyn. The revelation causes the stranger to abruptly retract his truce and demand that Kai return home immediately.",
    imageFiles: 1,
    authorNotes: `<p>Boys, give the poor girl a break! </p>`,

    // NEW ↓↓↓
    description: "Page 184 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg200.png"
},

{
    pgNum: 201,
    title: "Page 185",
    date: writeDate(2026, 07, 30),
    altText: "Yoshiko and the red-eyed stranger argue over what's best for Kai while he stands between them, increasingly overwhelmed. Their competing demands trigger fragmented memories of his past and the trauma of having no control over his own life.",
    imageFiles: 1,
    authorNotes: `<p>Oh no. Mom and Dad are fighting again.</p>`,

    // NEW ↓↓↓
    description: "Page 185 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg201.png"
},

{
    pgNum: 202,
    title: "Page 186",
    date: writeDate(2026, 08, 06),
    altText: "Yoshiko assures Kai that she isn't trying to control him and is only worried for his safety, while the stranger realizes Kai's reaction is connected to someone from his past. Yoshiko makes one final plea for Kai to leave with her, but he refuses, afraid of being tricked into returning to his former home.",
    imageFiles: 1,
    authorNotes: `<p>It's like the memories are on the tip of his tongue...</p>`,

    // NEW ↓↓↓
    description: "Page 186 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg202.png"
},

{
    pgNum: 203,
    title: "Page 187",
    date: writeDate(2026, 08, 13),
    altText: "Kai insists on confronting the red-eyed stranger now rather than waiting for him to betray them later. Yoshiko reluctantly returns to the sidelines and the two boys resume fighting, but Kai is suddenly distracted by disturbing visions.",
    imageFiles: 1,
    authorNotes: `<p>Yosh: Just don't do anything you'll regret.</p><p>Kai: Challenge accepted.</p>`,

    // NEW ↓↓↓
    description: "Page 186 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg203.png"
},

{
    pgNum: 204,
    title: "Page 188",
    date: writeDate(2026, 08, 20),
    altText: "Kai hallucinates glowing green eyes emerging from the stranger's face and freezes in terror, allowing the stranger to headbutt him. Kai tries to continue fighting but sees the eyes again, becoming increasingly panicked and beginning to hyperventilate.",
    imageFiles: 1,
    authorNotes: `<p>Yeah, thanks, Red. That's just what the kid needed; more head trauma.</p>`,

    // NEW ↓↓↓
    description: "Page 188 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg204.png"
},

{
    pgNum: 205,
    title: "Page 189",
    date: writeDate(2026, 09, 03),
    altText: "Kai stands frozen in terror before suddenly collapsing to the ground. As Yoshiko rushes toward him, a large glowing purple barrier erupts around Kai, preventing both her and the red-eyed stranger from reaching him. Yoshiko desperately pounds against the barrier.",
    imageFiles: 1,
    authorNotes: `<p>Aaaaaand down he goes. Let's hope that big purple bubble pops before the last bell rings.</p>`,

    // NEW ↓↓↓
    description: "Page 189 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg205.png"
},

{
    pgNum: 206,
    title: "Page 190",
    date: writeDate(2026, 09, 03),
    altText: "The red-eyed stranger joins Yoshiko in trying to break through the purple barrier while Kai sinks deep into the darkness of his own mind. A familiar voice draws him awake, and Kai looks up to find the chained boy from his strange experience at Hampton.",
    imageFiles: 1,
    authorNotes: `<p>That's it for Chapter 5, folks! Took WAY too long to finish, but this beast is done!
    Gonna go on a short hiatus to work on Chapter 6, but I'll be back soon! Keep checking in for updates and extras!
    As always, thank you SO much for reading!</p>`,

    // NEW ↓↓↓
    description: "Page 190 of Nocturne 21",
    thumb: "https://nocturne21.com/img/thumbs/pg206.png"
},
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
