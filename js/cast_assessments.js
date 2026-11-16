
/*
 * NOCTURNE 21 — YOSHIKO'S SECRET ASSESSMENTS
 * Animated, single-composition edition
 *
 * Requires:
 * img/characters/dossier-folder-open.png
 * img/characters/dossier-folder-open-index.png
 *
 * Load AFTER cast_dossiers.js.
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
    /*
     * NEW ANIMATED DOSSIER
     *
     * The original folder remains the closed artwork.
     * The extended image is revealed on top of it.
     * Both are kept proportional.
     */

    .n21-cast-page #characterDossier {
      overflow: visible !important;
    }

    .n21-cast-page #characterDossier
    .n21-dossier-content {
      position: relative !important;
      overflow: visible !important;
      isolation: isolate;
    }

    .n21-cast-page #characterDossier
    .n21-dossier-writing {
      position: relative;
      z-index: 3 !important;
    }

    .n21-cast-page .n21-pull-card {
      position: absolute !important;
      top: 0;
      left: 0;
      width: 100%;
      height: auto;
      aspect-ratio: 836 / 2048;
      margin: 0 !important;
      padding: 0 !important;
      z-index: 2;
      isolation: auto;
      overflow: visible;
      pointer-events: none;
      container-type: inline-size;
    }

    /*
     * The full image is already assembled.
     * No separate paper pieces or generated tabs.
     */

    .n21-cast-page .n21-extended-art {
      position: absolute;
      inset: 0;
      background:
        url('img/characters/dossier-folder-open-index.png')
        center top / 100% 100% no-repeat;
      clip-path: inset(0 0 100% 0);
      transition:
        clip-path .72s cubic-bezier(.22,.8,.25,1);
      pointer-events: none;
    }

    .n21-cast-page .n21-pull-card.is-pulled
    .n21-extended-art {
      clip-path: inset(0 0 0 0);
    }

    /*
     * Text lives on the lined paper in the
     * lower half of the extended composition.
     */

    .n21-cast-page .n21-index-writing {
      position: absolute;
      top: 56%;
      left: 14%;
      width: 73%;
      height: 35%;
      box-sizing: border-box;
      overflow: hidden;
      color: #30251c;
      font-family: 'Patrick Hand', cursive;
      opacity: 0;
      transform: translateY(-22px);
      transition:
        opacity .25s ease,
        transform .65s cubic-bezier(.22,.8,.25,1);
      pointer-events: none;
      container-type: inline-size;
    }

    .n21-cast-page .n21-pull-card.is-pulled
    .n21-index-writing {
      opacity: 1;
      transform: translateY(0);
      transition-delay: .35s;
    }

    /*
     * TRANSPARENT PULL CONTROL
     *
     * The image already contains the lettering.
     * We only add an invisible hit area.
     */

    .n21-cast-page .n21-pull-tab {
      position: absolute !important;
      left: 29%;
      top: 43%;
      width: 42%;
      height: 7%;
      min-height: 0 !important;
      aspect-ratio: auto !important;
      margin: 0 !important;
      padding: 0 !important;

      background: transparent !important;
      background-image: none !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      transform: none !important;
      filter: none !important;

      color: transparent !important;
      font-size: 0 !important;
      cursor: pointer;
      pointer-events: auto;
      z-index: 6;

      transition:
        top .72s cubic-bezier(.22,.8,.25,1);
    }

    .n21-cast-page .n21-pull-tab span {
      display: none !important;
    }

    .n21-cast-page .n21-pull-card.is-pulled
    .n21-pull-tab {
      top: 94%;
    }

    .n21-cast-page .n21-pull-tab:hover {
      background: transparent !important;
      filter: none !important;
    }

    .n21-cast-page .n21-pull-tab:focus-visible {
      outline: 3px dashed #9d2927 !important;
      outline-offset: 3px;
    }

    /*
     * ASSESSMENT HANDWRITING
     */

    .n21-cast-page .n21-assess-stamp {
      display: table;
      max-width: 100%;
      margin: 0 0 1.5cqw auto;
      padding: .4cqw 1cqw;
      border: 2px double #a12d2b;
      background: transparent;
      color: #a12d2b !important;
      font: 800 3.3cqw/1.15
        'Patrick Hand', cursive;
      letter-spacing: .03em;
      transform: rotate(-4deg);
    }

    .n21-cast-page .n21-assess-row {
      margin: 0 0 2.2cqw;
    }

    .n21-cast-page .n21-assess-label {
      color: #30251c !important;
      font: 700 3.8cqw/1.2
        'Patrick Hand', cursive;
    }

    .n21-cast-page .n21-assess-scale {
      display: flex;
      position: relative;
      align-items: center;
      width: 100%;
      max-width: none;
      overflow: visible;
      padding: .5cqw 0;
      color: #423328;
    }

    .n21-cast-page .n21-assess-num {
      position: relative;
      display: grid;
      place-items: center;
      flex: 1 1 0;
      min-width: 0;
      height: 5cqw;
      color: #463629 !important;
      font: 400 3.6cqw/1
        'Patrick Hand', cursive;
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

    .n21-cast-page .n21-assess-comment {
      margin: .3cqw 0 0 1.5cqw;
      color: #9d2927 !important;
      font: italic 3.1cqw/1.25
        'Patrick Hand', cursive;
      transform: rotate(-1deg);
    }

    /*
     * KAI'S CAFFEINE ARROW
     *
     * Starts near the end of the scale
     * and keeps the arrowhead inside the
     * visible paper area.
     */

    .n21-cast-page
    .n21-assess-scale.is-beyond {
      padding-bottom: 5cqw;
    }

    .n21-cast-page .n21-assess-arrow {
      position: absolute;
      left: 67%;
      top: 43%;
      width: 32%;
      height: 9cqw;
      z-index: 5;
      overflow: visible;
      pointer-events: none;
      transform: rotate(-6deg);
    }

    .n21-cast-page .n21-assess-arrow svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .n21-cast-page
    .n21-assess-row:has(.is-beyond)
    .n21-assess-comment {
      font-weight: 700;
      text-decoration: underline #a12d2b 1px;
    }

    /*
     * EVALUATOR'S NOTE
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
     * Make room below the folder
     * when the index card is extended.
     */

    .n21-cast-page .n21-pull-spacer {
      display: block;
      width: 100%;
      height: 0;
      transition:
        height .72s cubic-bezier(.22,.8,.25,1);
      pointer-events: none;
    }

    .n21-cast-page
    #characterDossier:has(.n21-pull-card.is-pulled)
    .n21-pull-spacer {
      height: 0;
    }

    /* FIX: keep the original dossier at its illustrated aspect ratio.
       Content and pull-out artwork must never resize the folder. */
    .n21-cast-page #characterDossier > .n21-dossier-content {
      aspect-ratio: 1080 / 1429 !important;
      min-height: 0 !important;
      box-sizing: border-box !important;
      background-size: 100% 100% !important;
      overflow: visible !important;
    }

    /* Make the click target follow the visible handwritten pull tab. */
    .n21-cast-page .n21-pull-tab {
      top: 52%;
      height: 6.5%;
    }
    .n21-cast-page .n21-pull-card.is-pulled .n21-pull-tab {
      top: 94%;
    }

    /* Keep the assessment stamp comfortably below the paper header. */
    .n21-cast-page .n21-index-writing {
      top: 57.5%;
      overflow: visible;
    }
    .n21-cast-page .n21-assess-stamp {
      margin-top: 1.5cqw;
      line-height: 1.35;
    }

    @media (prefers-reduced-motion: reduce) {
      .n21-cast-page .n21-extended-art,
      .n21-cast-page .n21-index-writing,
      .n21-cast-page .n21-pull-tab,
      .n21-cast-page .n21-pull-spacer {
        transition: none !important;
      }
    }
  `;

  // Remove styles from earlier assessment versions.
  [
    "n21-assessment-refinements",
    "n21-single-card-styles",
    "n21-animated-card-styles"
  ].forEach(id => {
    document.getElementById(id)?.remove();
  });

  const style = document.createElement("style");
  style.id = "n21-animated-card-styles";
  style.textContent = css;
  document.head.appendChild(style);

  const dossier = document.getElementById(
    "characterDossier"
  );

  if (!dossier) return;

  const paper = dossier.querySelector(
    ".n21-dossier-content"
  );

  if (!paper) return;

  // Remove any previous assessment card.
  dossier.querySelectorAll(
    ".n21-pull-card, .n21-pull-spacer"
  ).forEach(element => element.remove());

  const card = document.createElement("section");
  card.className = "n21-pull-card";

  card.setAttribute(
    "aria-label",
    "Yoshiko's investigator assessment"
  );

  card.innerHTML = `
    <div class="n21-extended-art"
         aria-hidden="true"></div>

    <div class="n21-index-writing">
      <div class="n21-pull-data"></div>
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

  card.querySelector(
    ".n21-index-writing"
  ).id = "n21-assessment-panel";

  paper.appendChild(card);

  const spacer = document.createElement("div");
  spacer.className = "n21-pull-spacer";
  dossier.appendChild(spacer);

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

  function caffeineArrow() {
    return `
      <span class="n21-assess-arrow"
            aria-hidden="true">

        <svg
          viewBox="0 0 220 65"
          xmlns="http://www.w3.org/2000/svg">

          <path
            d="M5 42
               Q35 39 65 39
               T120 32
               Q155 26 185 18
               L207 12"
            fill="none"
            stroke="#a12d2b"
            stroke-width="4.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            d="M174 5
               L207 12
               L188 41"
            fill="none"
            stroke="#a12d2b"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />

          <path
            d="M10 48 Q72 44 133 30
               M161 7 L172 15
               M192 49 L207 35"
            fill="none"
            stroke="#a12d2b"
            stroke-width="2"
            stroke-linecap="round"
            opacity=".75"
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

  function lockFolderHeight() {
    // Explicit pixel height prevents content-based aspect-ratio expansion.
    const width = paper.getBoundingClientRect().width;
    if (!width) return;
    const target = width * (1429 / 1080);
    paper.style.setProperty("height", target + "px", "important");
    paper.style.setProperty("min-height", "0px", "important");
  }

  function updateSpacer() {
    lockFolderHeight();

    const extendedHeight =
      card.getBoundingClientRect().width *
      (2048 / 836);

    const folderHeight =
      paper.getBoundingClientRect().height;

    const extra = Math.max(
      0,
      extendedHeight - folderHeight
    );

    spacer.style.height =
      card.classList.contains("is-pulled")
        ? extra + "px"
        : "0px";
  }

  function setPulled(open) {
    card.classList.toggle("is-pulled", open);

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

    updateSpacer();
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

    setPulled(false);
  }

  button.addEventListener("click", () => {
    setPulled(
      !card.classList.contains("is-pulled")
    );
  });

  window.addEventListener(
    "resize",
    updateSpacer
  );

  // Character changes reset the card.
  window.n21RenderAssessment = render;

  render(0);
  document.fonts?.ready.then(updateSpacer);
  window.addEventListener("load", updateSpacer);
})();
