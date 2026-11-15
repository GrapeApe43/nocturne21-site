
/*
 * NOCTURNE 21
 * YOSHIKO'S SECRET INVESTIGATOR ASSESSMENTS
 *
 * Single-image pull-out card.
 * Load AFTER cast_dossiers.js.
 *
 * Image: img/characters/index-card.png
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

  /*
   * All new styling lives here.
   * This overrides the previous three-piece card.
   */

  const css = `
    /* SINGLE-IMAGE INDEX CARD */

    .n21-cast-page #characterDossier {
      overflow: visible !important;
    }

    .n21-cast-page #characterDossier
    > .n21-dossier-content {
      position: relative;
      z-index: 2;
    }

    .n21-cast-page .n21-pull-card {
      position: relative;
      z-index: 1;
      isolation: auto;
      width: 90%;
      margin: -32px auto 20px;
      text-align: left;
      --card-width: 100%;
    }

    .n21-cast-page .n21-pull-reveal {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows .65s
        cubic-bezier(.2,.8,.2,1);
    }

    .n21-cast-page .n21-pull-card.is-pulled
    .n21-pull-reveal {
      grid-template-rows: 1fr;
    }

    .n21-cast-page .n21-pull-paper {
      position: relative;
      min-height: 0;
      overflow: hidden;
      filter: drop-shadow(
        0 8px 7px rgba(0,0,0,.35)
      );
    }

    /*
     * The complete image remains proportional.
     * Its original dimensions are 1355 x 2048.
     */

    .n21-cast-page .n21-index-sheet {
      position: relative;
      width: 100%;
      aspect-ratio: 1355 / 2048;
      background-image:
        url('img/characters/index-card.png');
      background-position: center top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    /*
     * Writing sits on top of the artwork.
     * Top 17% reserved for handwritten header.
     * Bottom 13% reserved for the pull tab.
     */

    .n21-cast-page .n21-index-writing {
      position: absolute;
      top: 17%;
      left: 13%;
      width: 78%;
      height: 68%;
      box-sizing: border-box;
      overflow: hidden;
      color: #30251c;
      font-family: 'Patrick Hand', cursive;
      container-type: inline-size;
    }

    .n21-cast-page .n21-assess-stamp {
      display: table;
      max-width: 100%;
      margin: 0 0 1.5cqw auto;
      padding: .5cqw 1cqw;
      border: 2px double #a12d2b;
      background: transparent;
      color: #a12d2b !important;
      font: 800 3cqw/1.2
        'Patrick Hand', cursive;
      letter-spacing: .04em;
      transform: rotate(-4deg);
    }

    .n21-cast-page .n21-assess-row {
      margin: 0 0 2.2cqw;
    }

    .n21-cast-page .n21-assess-label {
      color: #30251c !important;
      font: 700 3.7cqw/1.25
        'Patrick Hand', cursive;
    }

    .n21-cast-page .n21-assess-scale {
      display: flex;
      align-items: center;
      position: relative;
      width: 100%;
      max-width: none;
      padding: .6cqw 0;
      color: #423328;
      overflow: visible;
    }

    .n21-cast-page .n21-assess-num {
      position: relative;
      display: grid;
      place-items: center;
      flex: 1 1 0;
      min-width: 0;
      height: 5cqw;
      font: 400 3.5cqw/1
        'Patrick Hand', cursive;
      color: #463629 !important;
    }

    .n21-cast-page .n21-assess-num.is-marked {
      color: #9d2927 !important;
      font-weight: bold;
    }

    .n21-cast-page
    .n21-assess-num.is-marked::after {
      content: "";
      position: absolute;
      inset: 0 1px;
      border: 2px solid #a12d2b;
      border-radius: 48% 53% 47% 51%;
      transform: rotate(-14deg);
    }

    .n21-cast-page
    .n21-assess-num.mark-double::before,
    .n21-cast-page
    .n21-assess-num.mark-triple::before {
      content: "";
      position: absolute;
      inset: -1px 0;
      border: 2px solid #a12d2b;
      border-radius: 54% 45% 55% 48%;
      transform: rotate(23deg);
    }

    .n21-cast-page
    .n21-assess-num.mark-triple {
      text-decoration: underline wavy #a12d2b;
    }

    .n21-cast-page
    .n21-assess-num.mark-soft::after {
      border-width: 1.5px;
      transform: rotate(-6deg);
    }

    .n21-cast-page .n21-assess-zero {
      display: grid;
      place-items: center;
      flex: 0 0 5cqw;
      height: 5cqw;
      border: 3px double #a12d2b;
      border-radius: 50%;
      color: #a12d2b !important;
      font: 700 4cqw
        'Patrick Hand', cursive;
      transform: rotate(-13deg);
    }

    .n21-cast-page
    .n21-assess-scale.is-zero
    .n21-assess-num:first-of-type {
      text-decoration: line-through
        #a12d2b 2px;
    }

    .n21-cast-page .n21-assess-comment {
      margin: .4cqw 0 0 1.5cqw;
      color: #9d2927 !important;
      font: italic 3cqw/1.25
        'Patrick Hand', cursive;
      transform: rotate(-1deg);
    }

    /*
     * KAI'S COMPLETELY UNREASONABLE
     * CAFFEINE RATING
     */

    .n21-cast-page
    .n21-assess-scale.is-beyond {
      padding-bottom: 5cqw;
    }

    .n21-cast-page .n21-assess-arrow {
      position: absolute;
      left: 67%;
      top: 45%;
      width: 58%;
      height: 8cqw;
      overflow: visible;
      pointer-events: none;
      transform: rotate(-7deg);
      z-index: 5;
    }

    .n21-cast-page
    .n21-assess-arrow svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
      filter: drop-shadow(
        1px 1px 0 rgba(120,30,30,.12)
      );
    }

    .n21-cast-page
    .n21-assess-row:has(.is-beyond)
    .n21-assess-comment {
      font-weight: 700;
      font-size: 3.2cqw;
      text-decoration: underline
        #a12d2b 1px;
    }

    /*
     * EVALUATOR'S NOTE
     * No solid colored rectangle.
     */

    .n21-cast-page .n21-assess-conclusion {
      margin: 2.5cqw 0 0 !important;
      padding: 0 !important;
      border: none !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      color: #35291e !important;
      font: 400 3.4cqw/1.3
        'Patrick Hand', cursive !important;
    }

    .n21-cast-page
    .n21-assess-conclusion strong {
      color: #292016 !important;
      background: linear-gradient(
        to bottom,
        transparent 43%,
        rgba(245,199,48,.55) 43%,
        rgba(245,199,48,.55) 88%,
        transparent 88%
      );
      padding: 0 .3cqw;
    }

    /*
     * CLICKABLE ARTWORK TAB
     *
     * The closed state shows a cropped copy
     * of the bottom of index-card.png.
     * When open, the same artwork is visible
     * in the full sheet, and the button
     * becomes transparent.
     */

    .n21-cast-page .n21-pull-tab {
      display: block;
      position: relative;
      z-index: 4;
      box-sizing: border-box;

      width: 53%;
      height: auto;
      min-height: 0;
      aspect-ratio: 2.5 / 1;

      margin: 0 auto;
      padding: 0;

      border: 0 !important;
      border-radius: 0 !important;
      background-color: transparent !important;
      background-image:
        url('img/characters/index-card.png') !important;
      background-repeat: no-repeat !important;
      background-size: 188.7% auto !important;
      background-position:
        center bottom !important;

      box-shadow: none !important;
      transform: none !important;
      color: transparent !important;
      font-size: 0 !important;
      cursor: pointer;
      transition: filter .2s ease;
    }

    .n21-cast-page .n21-pull-tab span {
      display: none !important;
    }

    .n21-cast-page .n21-pull-tab:hover {
      filter: brightness(1.08);
    }

    .n21-cast-page
    .n21-pull-tab:focus-visible {
      outline: 3px solid #8ee9ed;
      outline-offset: 3px;
    }

    .n21-cast-page
    .n21-pull-card.is-pulled
    .n21-pull-tab {
      background-image: none !important;
      margin-top: -19%;
    }

    /*
     * Mobile: retain the same proportions.
     */

    @media (max-width: 600px) {
      .n21-cast-page .n21-pull-card {
        width: 95%;
        margin-top: -15px;
      }

      .n21-cast-page .n21-index-writing {
        left: 13%;
        width: 78%;
      }

      .n21-cast-page .n21-pull-tab {
        min-height: 40px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .n21-cast-page .n21-pull-reveal {
        transition: none;
      }
    }
  `;

  // Replace any previous injected refinements.
  document.getElementById(
    "n21-assessment-refinements"
  )?.remove();

  const oldStyle = document.getElementById(
    "n21-single-card-styles"
  );
  if (oldStyle) oldStyle.remove();

  const style = document.createElement("style");
  style.id = "n21-single-card-styles";
  style.textContent = css;
  document.head.appendChild(style);

  const dossier = document.getElementById(
    "characterDossier"
  );

  if (!dossier) return;

  // Prevent duplicate cards.
  dossier.querySelectorAll(
    ".n21-pull-card"
  ).forEach(element => element.remove());

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

        <div class="n21-index-sheet">

          <div class="n21-index-writing">
            <div class="n21-pull-data"></div>
          </div>

        </div>

      </div>
    </div>

    <button
      type="button"
      class="n21-pull-tab"
      aria-expanded="false"
      aria-controls="n21-assessment-panel"
      aria-label="Pull out investigator's assessment">
      <span aria-hidden="true"></span>
    </button>
  `;

  dossier.appendChild(card);

  const button = card.querySelector(
    ".n21-pull-tab"
  );

  const data = card.querySelector(
    ".n21-pull-data"
  );

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /*
   * A genuinely hand-drawn-looking,
   * exaggerated caffeine arrow.
   *
   * The SVG is decorative and sits
   * beyond the end of the rating scale.
   */

  function caffeineArrow() {
    return `
      <span class="n21-assess-arrow"
            aria-hidden="true">
        <svg viewBox="0 0 220 55"
             xmlns="http://www.w3.org/2000/svg">

          <path
            d="M3 31
               Q35 27 59 30
               T112 25
               Q143 20 174 16
               L208 8"
            fill="none"
            stroke="#a12d2b"
            stroke-width="4.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            d="M174 3
               Q192 5 208 8
               Q196 23 190 35"
            fill="none"
            stroke="#a12d2b"
            stroke-width="4.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            d="M13 37
               Q80 35 141 24
               M180 42 L198 30
               M158 5 L171 12
               M208 43 L217 33"
            fill="none"
            stroke="#a12d2b"
            stroke-width="1.8"
            stroke-linecap="round"
            opacity=".8"
          />
        </svg>
      </span>
    `;
  }

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
            ${marked
              ? "is-marked mark-" + kind
              : ""}">
            ${number}
          </span>
        `;
      }
    ).join("");

    const zero = kind === "zero"
      ? '<span class="n21-assess-zero">0</span>'
      : "";

    const arrow = kind === "beyond"
      ? caffeineArrow()
      : "";

    return `
      <div class="n21-assess-scale
        ${kind === "beyond" ? "is-beyond" : ""}
        ${kind === "zero" ? "is-zero" : ""}"
        aria-label="Score ${
          kind === "beyond"
            ? "off the chart"
            : value + " out of 10"
        }">

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

    card.classList.remove("is-pulled");

    button.setAttribute(
      "aria-expanded",
      "false"
    );

    button.setAttribute(
      "aria-label",
      "Pull out investigator's assessment"
    );
  }

  button.addEventListener("click", () => {
    const open = card.classList.toggle(
      "is-pulled"
    );

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
  });

  // Called when the selected character changes.
  window.n21RenderAssessment = render;

  render(0);
})();
