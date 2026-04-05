(function () {
  function renderRelatedJournalForComicPage() {
    const mount = document.getElementById("relatedJournalBox");
    if (!mount) return;

    if (typeof N21_JOURNAL_POSTS === "undefined" || !Array.isArray(N21_JOURNAL_POSTS)) {
      mount.innerHTML = "";
      return;
    }

    if (typeof pg === "undefined") {
      mount.innerHTML = "";
      return;
    }

    const currentPg = Number(pg);

    const post = N21_JOURNAL_POSTS.find(function (p) {
      return Number(p.comicPage) === currentPg;
    });

    if (!post) {
      mount.innerHTML = "";
      return;
    }

    mount.innerHTML = `
      <div class="related-journal-box">
        <p class="related-journal-label">From the Journal</p>
        <h3 class="related-journal-title">${post.title}</h3>
        <p class="related-journal-excerpt">${post.excerpt || ""}</p>
       <a class="related-journal-button" href="/n21-entry-page.html?id=${encodeURIComponent(post.id)}">
          Read the Journal Entry
        </a>
      </div>
    `;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderRelatedJournalForComicPage);
  } else {
    renderRelatedJournalForComicPage();
  }
})();
