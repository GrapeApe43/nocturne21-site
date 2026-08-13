// =========================================
// NOCTURNE 21 - STATS DASHBOARD
// =========================================

const N21_STATS_URL =
  "https://orkiydrkqdtjygmmcfld.supabase.co";

const N21_STATS_KEY =
  "sb_publishable_0EppKig7i_IR00-enCi1aw_Q8SIo-DW";

let n21VisitorChart = null;


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
          ${n21EscapeHtml(
            row.page_title ||
            row.page_id ||
            "Unknown"
          )}
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
// DAILY VISITOR ACTIVITY
// -----------------------------------------

async function n21LoadDailyActivity() {
  const daysBack = n21GetDaysBack();

  const data = await n21StatsRpc(
    "get_n21_daily_activity",
    {
      days_back: daysBack
    }
  );

  if (!Array.isArray(data)) {
    throw new Error("No daily activity data returned.");
  }

  n21RenderVisitorChart(data);
}


// -----------------------------------------
// TRAFFIC CHART
// -----------------------------------------

function n21RenderVisitorChart(rows) {
  const canvas = document.getElementById("visitorChart");

  if (!canvas) return;

  const labels = rows.map(row => {
    const date = new Date(row.day + "T00:00:00");

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
    });
  });

  const totalViews = rows.map(row =>
    Number(row.total_views || 0)
  );

  const uniqueVisitors = rows.map(row =>
    Number(row.unique_visitors || 0)
  );

  const comicViews = rows.map(row =>
    Number(row.comic_views || 0)
  );

  if (n21VisitorChart) {
    n21VisitorChart.destroy();
  }

  n21VisitorChart = new Chart(canvas, {
    type: "line",

    data: {
      labels: labels,

      datasets: [
        {
          label: "Page Views",
          data: totalViews,
          borderColor: "#c82f43",
          backgroundColor: "rgba(200, 47, 67, 0.12)",
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 3,
          pointHoverRadius: 5
        },

        {
          label: "Visitors",
          data: uniqueVisitors,
          borderColor: "#6d78d8",
          backgroundColor: "rgba(109, 120, 216, 0.10)",
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 3,
          pointHoverRadius: 5
        },

        {
          label: "Comic Views",
          data: comicViews,
          borderColor: "#6fbf73",
          backgroundColor: "rgba(111, 191, 115, 0.08)",
          borderWidth: 2,
          tension: 0.25,
          pointRadius: 3,
          pointHoverRadius: 5
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      interaction: {
        mode: "index",
        intersect: false
      },

      plugins: {
        legend: {
          labels: {
            color: "#c6cfdb",
            usePointStyle: true,
            boxWidth: 8,
            padding: 18
          }
        },

        tooltip: {
          backgroundColor: "#0d131c",
          titleColor: "#ffffff",
          bodyColor: "#d7dce5",
          borderColor: "#303846",
          borderWidth: 1
        }
      },

      scales: {
        x: {
          ticks: {
            color: "#8994a4",
            maxRotation: 0,
            autoSkip: true,
            maxTicksLimit: 10
          },

          grid: {
            color: "rgba(255,255,255,0.04)"
          },

          border: {
            color: "#303846"
          }
        },

        y: {
          beginAtZero: true,

          ticks: {
            color: "#8994a4",
            precision: 0
          },

          grid: {
            color: "rgba(255,255,255,0.06)"
          },

          border: {
            color: "#303846"
          }
        }
      }
    }
  });
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
      n21LoadTopContent(),
      n21LoadDailyActivity()
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

const statsRange =
  document.getElementById("statsRange");

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
