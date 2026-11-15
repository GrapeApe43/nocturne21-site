
/*
 * NOCTURNE 21 — YOSHIKO'S INVESTIGATOR ASSESSMENTS
 * Pull-out index card, updated artwork and styling.
 *
 * Load after cast_dossiers.js.
 *
 * Artwork:
 * img/characters/index-top.png
 * img/characters/index-middle.png
 * img/characters/index-bottom.png
 *
 * This script adds its own CSS refinements.
 * Leave the existing pull-card CSS in cast.html alone.
 */

(() => {
  "use strict";

  const records = [
    {
      stamp: "CAFFEINATED MENACE",
      ratings: [
        ["Coffee dependency", 10, "beyond", "Dad made him another cup."],
        ["Making friends", 10, "normal", "It's actually ridiculous."],
        ["Shoe compliance", 1, "double", "Claims shoes are optional."],
        ["Finding snacks", 10, "normal", "A supernatural talent."]
      ],
      note: "He's family. And apparently 90% caffeine."
    },
    {
      stamp: "CHRONICALLY OVERWORKED",
      ratings: [
        ["Ability to relax", 1, "triple", "Please sit down, Dad."],
        ["Coffee dependency", 9, "double", "See also: Kai's enabler."],
        ["Suspicious dad behavior", 10, "double", "I KNOW you're hiding something."],
        ["Keeping plants alive", 2, "normal", "The bonsai graveyard has witnesses."]
      ],
      note: "Kai's helping with the bonsai now. Survival rates are improving. Coincidence?"
    },
    {
      stamp: "ABOVE SUSPICION",
      ratings: [
        ["Investigative genius", 10, "double", "Objectively speaking."],
        ["Artistic brilliance", 10, "double", "Obviously."],
        ["Modesty", 10, "triple", "My greatest quality."],
        ["Effectiveness of unsolicited advice", 4, "soft", "Not sure if they're even listening."]
      ],
      note: "Without my constant intervention, this family would collapse in 48 hours. You're welcome."
    },
    {
      stamp: "WELL-MEANING MENACE",
      ratings: [
        ["Composure under pressure", 0, "zero", "Not a typo."],
        ["Embarrassing dad energy", 10, "double", "Unmeasurable, frankly."],
        ["Ability to locate car keys", 1, "triple", "PLEASE check your pockets."],
        ["Good intentions", 10, "soft", "Annoyingly, yes."]
      ],
      note: "If he asks, I said only nice things. I do not have time for the follow-up conversation."
    },
    {
      stamp: "REPEAT OFFENDER",
      ratings: [
        ["Likelihood of starting drama", 9, "double", "Exhibit A: literally yesterday."],
        ["Willingness to admit he's wrong", 2, "triple", "Reassessment request denied."],
        ["Concern for his appearance", 10, "double", "He owns a mirror. We know."],
        ["Potential", 8, "soft", "I've seen it."]
      ],
      note: "He's an idiot, but I remember who he is when he stops trying so hard."
    },
    {
      stamp: "EXTREME CAUTION",
      ratings: [
        ["Creepiness", 10, "triple", "Absolutely not."],
        ["Respect for personal boundaries", 1, "triple", "Does she know what those are?"],
        ["Knife enthusiasm", 10, "double", "WHY THE KNIVES?"],
        ["Trustworthiness", 1, "double", "Would give a zero, but I'm being professional."]
      ],
      note: "I have never met this woman, and I intend to keep it that way."
    },
    {
      stamp: "DO NOT APPROACH",
      ratings: [
        ["Resemblance to Kai", 10, "triple", "EXPLAIN THIS."],
        ["Claims to know everything", 10, "double", "According to him."],
        ["Actual understanding of Kai", 2, "double", "Then why is he always surprised?"],
        ["Willingness to explain himself", 1, "triple", "An impressive commitment to silence."],
        ["Respect for Kai's well-being", 1, "soft", "Why send him back somewhere that hurt him?"]
      ],
      note: "He knows all ABOUT Kai. I'm not convinced he knows Kai. He wants Kai sent back to what sounds like an awful home, and won't say why. Why would you want somebody to go back to a place that hurt them?"
    }
  ];

  const css = `
    /* UPDATED YOSHIKO INDEX CARD */

    .n21-cast-page .n21-pull-top {
      aspect-ratio: 1600 / 560;
      background-size: 100% 100%;
    }

    .n21-cast-page .n21-pull-top h2 {
      position: absolute;
      top: 25%;
      left: 3%;
      right: 3%;
      margin: 0;
      padding: 0;
      color: #201b16 !important;
      font-family: 'Gloria Hallelujah',
                   'Patrick Hand', cursive;
      font-size: clamp(13px, 2.6vw, 29px);
      font-weight: 700;
      line-height: 1.2;
      text-align: center;
      white-space: nowrap;
      letter-spacing: -0.035em;
      transform: rotate(-1deg);
    }

    .n21-cast-page .n21-pull-middle {
      background-image:
        url('img/characters/index-middle.png');
      background-size: 100% auto;
      background-repeat: repeat-y;
      padding: 14px 12% 26px 15%;
    }

    .n21-cast-page .n21-pull-bottom {
      width: 100%;
      aspect-ratio: 1600 / 808;
      background-image:
        url('img/characters/index-bottom.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center top;
    }

    /* Larger handwriting */

    .n21-cast-page .n21-assess-stamp {
      font-size: clamp(13px, 1.8vw, 19px);
    }

    .n21-cast-page .n21-assess-row {
      margin-bottom: 20px;
    }

    .n21-cast-page .n21-assess-label {
      font-size: clamp(17px, 2.1vw, 23px);
      line-height: 1.4;
    }

    .n21-cast-page .n21-assess-num {
      font-size: clamp(17px, 2.2vw, 24px);
      height: 39px;
    }

    .n21-cast-page .n21-assess-comment {
      font-size: clamp(15px, 1.8vw, 20px);
      line-height: 1.45;
      margin-top: 3px;
    }

    /* Evaluator's note: handwritten,
       with a highlighted heading */

    .n21-cast-page .n21-assess-conclusion {
      background: transparent !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      padding: 4px 0 !important;
      margin: 22px 0 10px !important;
      color: #35291e !important;
      font-size: clamp(17px, 2vw, 22px) !important;
      line-height: 1.55 !important;
    }

    .n21-cast-page .n21-assess-conclusion strong {
      display: inline;
      background: linear-gradient(
        to bottom,
        transparent 42%,
        rgba(245, 199, 48, 0.57) 42%,
        rgba(245, 199, 48, 0.57) 87%,
        transparent 87%
      );
      padding: 0 3px;
      color: #292016 !important;
    }

    /*
     * ACTUAL PAPER TAB
     *
     * Closed: show the bottom portion of
     * index-bottom.png as the pull control.
     *
     * Open: overlay a transparent button
     * on the tab already in the full image.
     */

    .n21-cast-page .n21-pull-tab {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 3;

      width: 53%;
      height: auto;
      min-height: 0;
      aspect-ratio: 2.8 / 1;

      margin: 0 auto;
      padding: 7% 2% 3%;

      border: none;
      border-radius: 0;

      background-color: transparent;
      background-image:
        url('img/characters/index-bottom.png');
      background-size: 188.7% auto;
      background-position: center bottom;
      background-repeat: no-repeat;

      box-shadow: none;
      color: #fff;
      transform: none;
      cursor: pointer;
      transition: filter 0.2s ease;
    }

    .n21-cast-page .n21-pull-card.is-pulled
    .n21-pull-tab {
      margin-top: -18.9%;
      background-image: none;
    }

    /* Label-maker sticker ON the tab */

    .n21-cast-page .n21-pull-tab span {
      display: inline-block;
      max-width: 90%;
      padding: 5px 12px;
      background: #272520;
      color: #f5eedc;
      border: 1px solid rgba(255,255,255,.15);
      border-radius: 1px;
      box-shadow: 1px 2px 3px rgba(0,0,0,.28);

      font-family: monospace;
      font-size: clamp(10px, 1.4vw, 14px);
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: .08em;
      text-align: center;
      white-space: nowrap;
      transform: rotate(-2deg);
      pointer-events: none;
    }

    .n21-cast-page .n21-pull-tab:hover {
      filter: brightness(1.08);
    }

    .n21-cast-page .n21-pull-tab:focus-visible {
      outline: 3px solid #8ee9ed;
      outline-offset: 3px;
    }

    @media (max-width: 600px) {
      .n21-cast-page .n21-pull-top h2 {
        font-size: clamp(10px, 3.1vw, 17px);
        letter-spacing: -0.05em;
      }

      .n21-cast-page .n21-pull-middle {
        padding: 8px 11% 18px 15%;
      }

      .n21-cast-page .n21-assess-label {
        font-size: 17px;
      }

      .n21-cast-page .n21-assess-num {
        font-size: 15px;
        height: 29px;
      }

      .n21-cast-page .n21-assess-comment {
        font-size: 15px;
      }

      .n21-cast-page .n21-assess-conclusion {
        font-size: 17px !important;
      }

      .n21-cast-page .n21-pull-tab span {
        font-size: 9px;
        padding: 4px 6px;
      }
    }
  `;

  // Install the updated styles.
  const style = document.createElement("style");
  style.id = "n21-assessment-refinements";
  style.textContent = css;
  document.head.appendChild(style);

  const dossier =
    document.getElementById("characterDossier");

  if (!dossier) return;

  const card = document.createElement("section");
  card.className = "n21-pull-card";
  card.setAttribute(
    "aria-label",
    "Yoshiko's investigator assessment"
  );

  card.innerHTML = `
    <div class="n21-pull-reveal"
         id="n21-assessment-panel">

      <div class="n21-pull-paper">

        <div class="n21-pull-top">
          <h2>INVESTIGATOR'S ASSESSMENT</h2>
        </div>

        <div class="n21-pull-middle">
          <div class="n21-pull-data"></div>
        </div>

        <div class="n21-pull-bottom"
             aria-hidden="true"></div>

      </div>
    </div>

    <button
      type="button"
      class="n21-pull-tab"
      aria-expanded="false"
      aria-controls="n21-assessment-panel"
      aria-label="Pull out investigator's assessment">
      <span>PULL ↓</span>
    </button>
  `;

  dossier.appendChild(card);

  const button = card.querySelector(".n21-pull-tab");
  const data = card.querySelector(".n21-pull-data");

  const escapeHTML = value =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function score(value, kind) {
    const numbers = Array.from(
      { length: 10 },
      (_, index) => {
        const number = index + 1;
        const marked =
          number === value &&
          kind !== "beyond" &&
          kind !== "zero";

        return `
          <span class="n21-assess-num
            ${marked ? "is-marked mark-" + kind : ""}">
            ${number}
          </span>
        `;
      }
    ).join("");

    const zero =
      kind === "zero"
        ? '<span class="n21-assess-zero">0</span>'
        : "";

    const arrow =
      kind === "beyond"
        ? '<span class="n21-assess-arrow">⟶⟶⟶</span>'
        : "";

    return `
      <div
        class="n21-assess-scale
          ${kind === "beyond" ? "is-beyond" : ""}
          ${kind === "zero" ? "is-zero" : ""}"
        aria-label="Score ${
          kind === "beyond" ? "above 10" : value
        } out of 10">

        ${zero}
        ${numbers}
        ${arrow}

      </div>
    `;
  }

  function render(index) {
    const record = records[index];
    if (!record) return;

    const rows = record.ratings.map(
      ([name, value, kind, comment]) => `
        <div class="n21-assess-row">

          <div class="n21-assess-label">
            ${escapeHTML(name)}
          </div>

          ${score(value, kind)}

          <div class="n21-assess-comment">
            ${escapeHTML(
              kind === "beyond"
                ? "OFF THE CHART! " + comment
                : comment
            )}
          </div>

        </div>
      `
    ).join("");

    data.innerHTML = `
      <div class="n21-assess-stamp">
        ${escapeHTML(record.stamp)}
      </div>

      ${rows}

      <p class="n21-assess-conclusion">
        <strong>EVALUATOR'S NOTE:</strong>
        ${escapeHTML(record.note)}
      </p>
    `;

    // Reset the card when changing characters.
    card.classList.remove("is-pulled");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute(
      "aria-label",
      "Pull out investigator's assessment"
    );
    button.querySelector("span").textContent = "PULL ↓";
  }

  button.addEventListener("click", () => {
    const open =
      card.classList.toggle("is-pulled");

    button.setAttribute(
      "aria-expanded",
      String(open)
    );

    button.setAttribute(
      "aria-label",
      open
        ? "Tuck away investigator's assessment"
        : "Pull out investigator's assessment"
    );

    button.querySelector("span").textContent =
      open ? "PUSH ↑" : "PULL ↓";
  });

  // Existing Cast page calls this
  // whenever the selected character changes.
  window.n21RenderAssessment = render;

  render(0);
})();
