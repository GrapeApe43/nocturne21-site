// Nocturne 21 - Anonymous Site Analytics

const N21_SUPABASE_URL = "https://orkiydrkqdtjygmmcfld.supabase.co";
const N21_SUPABASE_KEY = "sb_publishable_0EppKig7i_IR00-enCi1aw_Q8SIo-DW";

// Give this browser a random anonymous visitor ID.
// This contains no name, email, IP address, etc.
function n21GetVisitorId() {
  let visitorId = localStorage.getItem("n21_visitor_id");

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("n21_visitor_id", visitorId);
  }

  return visitorId;
}

// Record one page view.
async function n21TrackPageView(
  pageType,
  pageId = null,
  pageTitle = null
) {
  try {
    const response = await fetch(
      `${N21_SUPABASE_URL}/rest/v1/page_views`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "apikey": N21_SUPABASE_KEY,
          "Authorization": `Bearer ${N21_SUPABASE_KEY}`,
          "Prefer": "return=minimal"
        },

        body: JSON.stringify({
          visitor_id: n21GetVisitorId(),
          page_type: pageType,
          page_id: pageId ? String(pageId) : null,
          page_title: pageTitle,
          page_url: window.location.pathname + window.location.search,
          referrer: document.referrer || null
        })
      }
    );

    if (!response.ok) {
      console.error(
        "N21 Analytics: page view could not be recorded.",
        response.status,
        await response.text()
      );
      return;
    }

    console.log(
      "N21 Analytics: page view recorded.",
      pageType,
      pageId,
      pageTitle
    );

  } catch (error) {
    console.error("N21 Analytics error:", error);
  }
}


// --------------------------------------------------
// AUTOMATIC TRACKING FOR NORMAL SITE PAGES
// --------------------------------------------------

function n21AutoTrackSitePage() {
  let path = window.location.pathname;

  // Remove trailing slash, if there is one.
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  // These already have their own specialized tracking.
  const specialPages = [
    "",
    "/",
    "/index.html",
    "/n21-entry-page",
    "/n21-entry-page.html"
  ];

  if (specialPages.includes(path)) {
    return;
  }

  // Turn "/about.html" into "about"
  // Turn "/n21-journal.html" into "n21-journal"
  let pageId = path
    .split("/")
    .pop()
    .replace(/\.html$/i, "");

  if (!pageId) return;

  // Use the HTML page title, but remove the repetitive site name.
  let pageTitle = document.title
    .replace(/^Nocturne 21\s*\|\s*/i, "")
    .trim();

  // Fall back to a readable version of the filename if necessary.
  if (!pageTitle || pageTitle === "Nocturne 21") {
    pageTitle = pageId
      .replace(/-/g, " ")
      .replace(/\b\w/g, letter => letter.toUpperCase());
  }

  n21TrackPageView(
    "site",
    pageId,
    pageTitle
  );
}


// Automatically run normal-page tracking.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", n21AutoTrackSitePage);
} else {
  n21AutoTrackSitePage();
}
