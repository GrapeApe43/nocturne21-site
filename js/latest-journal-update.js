(function () {
  const box = document.getElementById("latest-journal-box");
  if (!box) return;

  if (typeof N21_JOURNAL_POSTS === "undefined" || !N21_JOURNAL_POSTS.length) {
    box.innerHTML = `
      <div class="latest-journal-inner">
        <p class="latest-journal-label">Latest Journal Post</p>
        <p class="latest-journal-excerpt">No journal posts found.</p>
      </div>
    `;
    return;
  }

  const posts = [...N21_JOURNAL_POSTS].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const filtered = posts.filter(post =>
    Array.isArray(post.tags) &&
    (post.tags.includes("comic") || post.tags.includes("update"))
  );

  const latest = filtered.length ? filtered[0] : posts[0];
  const readMoreLink = `n21-entry-page?id=${latest.id}`;

  box.innerHTML = `
    <div class="latest-journal-inner">
      <p class="latest-journal-label">Latest Journal Post</p>
      <h3 class="latest-journal-title">
        <a href="${readMoreLink}">${latest.title || "Untitled Post"}</a>
      </h3>
      <p class="latest-journal-date">${formatDate(latest.date)}</p>
      <p class="latest-journal-excerpt">${latest.excerpt || ""}</p>
      <a class="latest-journal-button" href="${readMoreLink}">Read Entry</a>
    </div>
  `;

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
})();
