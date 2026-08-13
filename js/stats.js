// =========================================
// NOCTURNE 21 - STATS DASHBOARD
// =========================================

const N21_STATS_URL = "https://orkiydrkqdtjygmmcfld.supabase.co";
const N21_STATS_KEY = "sb_publishable_0EppKig7i_IR00-enCi1aw_Q8SIo-DW";


// -----------------------------------------
// CALL A SUPABASE DATABASE FUNCTION
// -----------------------------------------

async function n21StatsRpc(functionName, body = {}) {
  const response = await fetch(
    `${N21_STATS_URL}/rest/v1/rpc/${functionName}`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "apikey": N21_STATS_KEY,
        "Authorization": `Bearer ${N21_STATS_KEY}`
      },

      body: JSON.stringify(body)
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Stats request failed (${response.status}): ${errorText}`
    );
  }

  return response.json();
}


// -----------------------------------------
// NUMBER FORMATTING
// -----------------------------------------

function n21FormatNumber(number) {
  return Number(number || 0).toLocaleString("en-US");
}


// -----------------------------------------
// CURRENT DATE RANGE
// -----------------------------------------

function n21GetDaysBack() {
  const range = document.getElementById("statsRange");

  if (!range) return 30;

  if (range.value === "all") {
    return null;
  }

  return Number(range.value);
}


// -----------------------------------------
// OVERVIEW CARDS
// -----------------------------------------

async function n21LoadOverview() {
  const daysBack = n21GetDaysBack();

  const data = await n21StatsRpc(
    "get_n21_overview",
    {
      days_back: daysBack
    }
  );

  if (!Array.isArray(data) || !data.length) {
    throw new Error("No overview data returned.");
  }

  const stats = data[0];

  document.getElementById("statVisitors").textContent =
    n21FormatNumber(stats.unique_visitors);

  document.getElementById("statViews").textContent =
    n21FormatNumber(stats.total_views);

  document.getElementById("statComicViews").textContent =
    n21FormatNumber(stats.comic_views);

  document.getElementById("statJournalViews").textContent =
    n21FormatNumber(stats.journal_views);

  document.getElementById("statSiteViews").textContent =
    n21FormatNumber(stats.site_views);
}


// -----------------------------------------
// BUILD ONE STATS LIST
// -----------------------------------------

function n21RenderList(containerId, rows) {
  const container = document.getElementById(containerId);

  if (!container) return;

  if (!rows.length) {
    container.innerHTML =
      `<p class="stats-loading">No data yet.</p>`;
    return;
  }

  container.innerHTML = rows
    .map(row => `
      <div class="stats-list-row">

        <span class="stats-list-name">
          ${n21EscapeHtml(row.page_title || row.page_id || "Unknown")}
        </span>

        <span class="stats-list-value">
          ${n21FormatNumber(row.view_count)}
          ${Number(row.view_count) === 1 ? "view" : "views"}
        </span>

      </div>
    `)
    .join("");
}


// -----------------------------------------
// TOP CONTENT
// -----------------------------------------

async function n21LoadTopContent() {
  const daysBack = n21GetDaysBack();

  const data = await n21StatsRpc(
    "get_n21_top_content",
    {
      days_back: daysBack,
      result_limit: 10
    }
  );

  if (!Array.isArray(data)) {
    throw new Error("No top-content data returned.");
  }

  const comicRows = data
    .filter(row => row.page_type === "comic")
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 10);

  const journalRows = data
    .filter(row => row.page_type === "journal")
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 10);

  const siteRows = data
    .filter(row => row.page_type === "site")
    .sort((a, b) => b.view_count - a.view_count)
    .slice(0, 10);

  n21RenderList(
    "topComicPages",
    comicRows
  );

  n21RenderList(
    "topJournalPosts",
    journalRows
  );

  n21RenderList(
    "topSitePages",
    siteRows
  );
}


// -----------------------------------------
// BASIC HTML SAFETY
// -----------------------------------------

function n21EscapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// -----------------------------------------
// LOAD DASHBOARD
// -----------------------------------------

async function n21LoadDashboard() {
  try {

    await Promise.all([
      n21LoadOverview(),
      n21LoadTopContent()
    ]);

    console.log("N21 Stats: dashboard loaded.");

  } catch (error) {

    console.error(
      "N21 Stats dashboard error:",
      error
    );
  }
}


// -----------------------------------------
// DATE RANGE CHANGES
// -----------------------------------------

const statsRange = document.getElementById("statsRange");

if (statsRange) {
  statsRange.addEventListener(
    "change",
    n21LoadDashboard
  );
}


// -----------------------------------------
// START
// -----------------------------------------

n21LoadDashboard();
