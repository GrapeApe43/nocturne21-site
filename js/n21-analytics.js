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
async function n21TrackPageView(pageType, pageId = null) {
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

    console.log("N21 Analytics: page view recorded.");
  } catch (error) {
    console.error("N21 Analytics error:", error);
  }
}
