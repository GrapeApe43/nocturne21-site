// Nocturne 21 chapter data
// Shared chapter information for comic pages and the archive.

const chapterData = [
  {
    id: "chapter1",
    volume: "Volume One: Robot Boy",
    chapter: "Chapter One: The Red Rain",
    start: 1,
    end: 34
  },
  {
    id: "chapter2",
    volume: "Volume One: Robot Boy",
    chapter: "Chapter Two: Glass",
    start: 35,
    end: 68
  },
  {
    id: "chapter3",
    volume: "Volume One: Robot Boy",
    chapter: "Chapter Three: Snow Day",
    start: 69,
    end: 93
  },
  {
    id: "kaijournal",
    volume: "Volume One: Robot Boy",
    chapter: "The Kai Journals",
    start: 94,
    end: 97
  },
  {
    id: "chapter4",
    volume: "Volume One: Robot Boy",
    chapter: "Chapter Four: The Stranger",
    start: 98,
    end: 150
  },
{
  id: "chapter5",
  volume: "Volume Two: Trust Falls",
  chapter: "Chapter Five: The Voice from Below",
  start: 151,
  end: null
}
];

function getChapterData(page) {
  const pageNumber = parseInt(page, 10);

  return chapterData.find((chapter) => {
    const afterStart = pageNumber >= chapter.start;
    const beforeEnd =
      chapter.end === null || pageNumber <= chapter.end;

    return afterStart && beforeEnd;
  }) || null;
}
