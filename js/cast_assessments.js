
/*
 * NOCTURNE 21
 * YOSHIKO'S SECRET ASSESSMENTS
 *
 * Stationary folder / independent pull-out artwork
 *
 * Original folder: 1481 x 2048
 * Extended artwork: 836 x 2048
 *
 * Load AFTER cast_dossiers.js.
 */

(() => {
  "use strict";

  const records = [
    {
      stamp: "CAFFEINATED MENACE",
      ratings: [
        ["Coffee dependency", 10, "beyond", "Expressed concerns with Dad. Dad made him another cup."],
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
        ["Ability to locate car keys", 1, "triple", "Will be purchasing a lanyard for him for Christmas."],
        ["Good intentions", 10, "soft", "Annoyingly, yes."]
      ],
      note: "Loses keys and wallet more than he loses wives...Remind me to redact that later."
    },
    {
      stamp: "REPEAT OFFENDER",
      ratings: [
        ["Likelihood of starting drama", 9, "double", "Exhibit A: literally yesterday."],
        ["Willingness to admit he's wrong", 2, "triple", "Reassessment request denied."],
        ["Concern for his appearance", 10, "double", "He owns a mirror. Probably more than one."],
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
      note: "He knows all ABOUT Kai. I'm not convinced he knows Kai. He insists on sending Kai back to what sounds like an awful home, and won't say why. Why would you want someone you care about to go back to a place that clearly traumatized them?"
    }
  ];

  /*
   * GEOMETRY
   *
   * The original folder has a ratio of 1481:2048.
   * The extended composition has a ratio of 836:2048.
   *
   * The two images are NEVER forced into the same
   * aspect ratio.
   *
   * The extended artwork remains full-size behind
   * the stationary original folder.
   *
   * Its lower portion is revealed using clip-path.
   */

  const css = `
    .n21-cast-page #characterDossier {
      overflow: visible !important;
    }

    /* ORIGINAL FOLDER */

    .n21-cast-page
    #characterDossier > .n21-dossier-content {
      position: relative !important;
      display: block !important;
      width: 100% !important;
      height: auto !important;
      min-height: 0 !important;
      aspect-ratio: 1481 / 2048 !important;
      box-sizing: border-box !important;
      padding: 0 !important;
      margin: 0 !important;
      background: none !important;
      overflow: visible !important;
      isolation: isolate;
    }

    /*
     * Stationary original folder.
     * Its proportions cannot be changed by text
     * or by the index-card animation.
     */

    .n21-cast-page
    #characterDossier > .n21-dossier-content::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 2;
      background-image:
        url('img/characters/dossier-folder-open.png');
      background-position: center top;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      pointer-events: none;
    }

    /* ORIGINAL DOSSIER WRITING */

    .n21-cast-page
    #characterDossier .n21-dossier-writing {
      position: absolute !important;
      top: 19%;
      left: 10%;
      width: 80%;
      height: 73%;
      min-height: 0 !important;
      box-sizing: border-box;
      margin: 0 !important;
      padding: 0 2% !important;
      z-index: 3 !important;
      transform-origin: top left;
    }

    @media (max-width: 1366px) {
      .n21-cast-page
      #characterDossier .n21-dossier-writing {
        top: 23%;
        left: 9%;
        width: 82%;
        height: 71%;
        padding: 0 !important;
      }
    }

    /*
     * EXTENDED COMPOSITION
     *
     * It uses its own actual aspect ratio.
     * It is positioned independently behind
     * the original folder.
     */

    .n21-cast-page
    #characterDossier .n21-pull-card {
      position: absolute !important;
      display: block !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: auto !important;
      aspect-ratio: 836 / 2048 !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      background: transparent !important;
      overflow: visible !important;
      isolation: auto !important;
      z-index: 1;
      pointer-events: none;
      container-type: inline-size;
    }

    /*
     * Only the lower part of the extended
     * composition needs to become visible.
     *
     * The top is already covered by the
     * stationary folder.
     */

    .n21-cast-page
    #characterDossier .n21-extended-art {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background-image:
        url('img/characters/dossier-folder-open-index.png') !important;
      background-position: center top !important;
      background-size: 100% 100% !important;
      background-repeat: no-repeat !important;
      clip-path: inset(52% 0 48% 0);
      transition:
        clip-path .72s cubic-bezier(.22,.8,.25,1);
      pointer-events: none;
    }

    .n21-cast-page
    #characterDossier
    .n21-pull-card.is-pulled .n21-extended-art {
      clip-path: inset(52% 0 0 0);
    }

    /*
     * INDEX-CARD WRITING
     *
     * Text is positioned relative to the
     * extended artwork, not the folder.
     */

    .n21-cast-page
    #characterDossier .n21-index-writing {
      position: absolute !important;
      top: 57.5%;
      left: 14%;
      width: 73%;
      height: 35%;
      box-sizing: border-box;
      overflow: visible !important;
      color: #30251c;
      font-family: 'Patrick Hand', cursive;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-20px);
      transition:
        opacity .25s ease,
        transform .65s cubic-bezier(.22,.8,.25,1),
        visibility 0s linear .72s;
      pointer-events: none;
      container-type: inline-size;
    }

    .n21-cast-page
    #characterDossier
    .n21-pull-card.is-pulled .n21-index-writing {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      transition:
        opacity .25s ease .35s,
        transform .65s cubic-bezier(.22,.8,.25,1),
        visibility 0s;
    }

    /*
     * CLICKABLE TAB
     *
     * This is deliberately OUTSIDE the index
     * card's stacking layer.
     *
     * It sits over the actual illustrated tab.
     * No duplicate tab image is generated.
     */

    .n21-cast-page
    #characterDossier .n21-pull-tab {
      position: absolute !important;
      display: block !important;
      left: 29% !important;
      top: 93% !important;
      width: 42% !important;
      height: 7% !important;
      min-height: 0 !important;
      aspect-ratio: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      background-image: none !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      color: transparent !important;
      font-size: 0 !important;
      transform: none !important;
      filter: none !important;
      cursor: pointer;
      pointer-events: auto;
      z-index: 6 !important;
      transition:
        top .72s cubic-bezier(.22,.8,.25,1);
    }

    .n21-cast-page
    #characterDossier
    .n21-pull-tab.is-pulled {
      top: 170% !important;
    }

    .n21-cast-page
    #characterDossier .n21-pull-tab span {
      display: none !important;
    }

    .n21-cast-page
    #characterDossier .n21-pull-tab:hover {
      background: transparent !important;
      filter: none !important;
    }

    .n21-cast-page
    #characterDossier .n21-pull-tab:focus-visible {
      outline: 3px dashed #9d2927 !important;
      outline-offset: 3px;
    }

    /* ASSESSMENT STAMP */

    .n21-cast-page
    #characterDossier .n21-assess-stamp {
      display: table;
      max-width: 100%;
      margin: 1.5cqw 0 1.5cqw auto;
      padding: .4cqw 1cqw;
      border: 2px double #a12d2b;
      background: transparent;
      color: #a12d2b !important;
      font: 800 3.3cqw/1.35
        'Patrick Hand', cursive;
      letter-spacing: .03em;
      transform: rotate(-4deg);
    }

    /* ASSESSMENT ROWS */

    .n21-cast-page
    #characterDossier .n21-assess-row {
      margin: 0 0 2.2cqw;
    }

    .n21-cast-page
    #characterDossier .n21-assess-label {
      color: #30251c !important;
      font: 700 3.8cqw/1.2
        'Patrick Hand', cursive;
    }

    .n21-cast-page
    #characterDossier .n21-assess-scale {
      display: flex;
      position: relative;
      align-items: center;
      width: 100%;
      max-width: none;
      overflow: visible;
      padding: .5cqw 0;
      color: #423328;
    }

    .n21-cast-page
    #characterDossier .n21-assess-num {
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

    .n21-cast-page
    #characterDossier .n21-assess-num.is-marked {
      color: #9d2927 !important;
      font-weight: bold;
    }

    .n21-cast-page
    #characterDossier
    .n21-assess-num.is-marked::after {
      content: "";
      position: absolute;
      inset: 0 1px;
      border: 2px solid #a12d2b;
      border-radius: 48% 53% 47% 51%;
      transform: rotate(-14deg);
    }

    .n21-cast-page
    #characterDossier
    .n21-assess-num.mark-double::before,
    .n21-cast-page
    #characterDossier
    .n21-assess-num.mark-triple::before {
      content: "";
      position: absolute;
      inset: -1px 0;
      border: 2px solid #a12d2b;
      border-radius: 54% 45% 55% 48%;
      transform: rotate(23deg);
    }

    .n21-cast-page
    #characterDossier
    .n21-assess-num.mark-triple {
      text-decoration: underline wavy #a12d2b;
    }

    .n21-cast-page
    #characterDossier
    .n21-assess-num.mark-soft::after {
      border-width: 1.5px;
      transform: rotate(-6deg);
    }

    .n21-cast-page
    #characterDossier .n21-assess-zero {
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
    #characterDossier .n21-assess-comment {
      margin: .3cqw 0 0 1.5cqw;
      color: #9d2927 !important;
      font: italic 3.1cqw/1.25
        'Patrick Hand', cursive;
      transform: rotate(-1deg);
    }

    /*
     * KAI'S CAFFEINE ARROW
     * Kept from the working version.
     */

    .n21-cast-page
    #characterDossier
    .n21-assess-scale.is-beyond {
      padding-bottom: 5cqw;
    }

    .n21-cast-page
    #characterDossier .n21-assess-arrow {
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

    .n21-cast-page
    #characterDossier .n21-assess-arrow svg {
      display: block;
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .n21-cast-page
    #characterDossier
    .n21-assess-row:has(.is-beyond)
    .n21-assess-comment {
      font-weight: 700;
      text-decoration: underline #a12d2b 1px;
    }

    /* EVALUATOR'S NOTE */

    .n21-cast-page
    #characterDossier .n21-assess-conclusion {
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
    #characterDossier
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
     * PAGE SPACE
     *
     * This expands beneath the stationary folder
     * without changing the folder's dimensions.
     */

    .n21-cast-page
    #characterDossier .n21-pull-spacer {
      display: block;
      width: 100%;
      height: 0;
      margin: 0;
      padding: 0;
      transition:
        height .72s cubic-bezier(.22,.8,.25,1);
      pointer-events: none;
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

  /*
   * REMOVE OLD GENERATED ASSESSMENT STYLES
   */

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

  /*
   * FIND THE DOSSIER
   */

  const dossier = document.getElementById(
    "characterDossier"
  );

  if (!dossier) return;

  const paper = dossier.querySelector(
    ".n21-dossier-content"
  );

  if (!paper) return;

  /*
   * REMOVE ANY OLD GENERATED ASSESSMENT
   */

  dossier.querySelectorAll(
    ".n21-pull-card, .n21-pull-spacer, .n21-pull-tab"
  ).forEach(element => element.remove());

  /*
   * BUILD THE EXTENDED ARTWORK
   */

  const card = document.createElement("section");
  card.className = "n21-pull-card";

  card.setAttribute(
    "aria-label",
    "Yoshiko's investigator assessment"
  );

  card.innerHTML = `
    <div
      class="n21-extended-art"
      aria-hidden="true">
    </div>

    <div
      class="n21-index-writing"
      id="n21-assessment-panel">

      <div class="n21-pull-data"></div>

    </div>
  `;

  paper.appendChild(card);

  /*
   * IMPORTANT:
   *
   * The button is a SIBLING of the card.
   *
   * This allows it to sit above the folder,
   * rather than getting trapped behind it
   * inside the card's stacking context.
   */

  const button = document.createElement("button");
  button.type = "button";
  button.className = "n21-pull-tab";

  button.setAttribute(
    "aria-expanded",
    "false"
  );

  button.setAttribute(
    "aria-controls",
    "n21-assessment-panel"
  );

  button.setAttribute(
    "aria-label",
    "Pull out investigator's assessment"
  );

  paper.appendChild(button);

  /*
   * EXTRA PAGE SPACE
   */

  const spacer = document.createElement("div");
  spacer.className = "n21-pull-spacer";
  dossier.appendChild(spacer);

  const data = card.querySelector(
    ".n21-pull-data"
  );

  /*
   * SAFE HTML OUTPUT
   */

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /*
   * KAI'S CAFFEINE ARROW
   */

  function caffeineArrow() {
    return `
      <span
        class="n21-assess-arrow"
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

  /*
   * RATING SCALE
   */

  function score(value, kind) {
    const numbers = Array.from(
      { length: 10 },
      (_, index) => {
        const number = index + 1;

        const marked =
          number === value &&
          kind !== "beyond" &&
          kind !== "zero";

        const markClass = marked
          ? "is-marked mark-" + kind
          : "";

        return `
          <span class="n21-assess-num ${markClass}">
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

    const scaleClass =
      kind === "beyond"
        ? "is-beyond"
        : kind === "zero"
          ? "is-zero"
          : "";

    const description =
      kind === "beyond"
        ? "off the chart"
        : value + " out of 10";

    return `
      <div
        class="n21-assess-scale ${scaleClass}"
        aria-label="Score ${description}">

        ${zero}
        ${numbers}
        ${arrow}

      </div>
    `;
  }

  /*
   * SPACE CALCULATION
   *
   * The folder keeps its own natural height.
   * The extended image keeps its own natural
   * height.
   *
   * Only the extra space below the folder
   * changes when the assessment is pulled out.
   */

  function updateSpacer() {
    const width = paper.getBoundingClientRect().width;

    if (!width) return;

    const folderHeight =
      width * (2048 / 1481);

    const extendedHeight =
      width * (2048 / 836);

    const extra = Math.max(
      0,
      extendedHeight - folderHeight
    );

    spacer.style.height =
      card.classList.contains("is-pulled")
        ? extra + "px"
        : "0px";
  }

  /*
   * PULL OUT / RETRACT
   */

  function setPulled(open) {
    card.classList.toggle("is-pulled", open);
    button.classList.toggle("is-pulled", open);

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

  /*
   * RENDER CHARACTER
   */

  function render(index) {
    const record = records[index];

    if (!record) return;

    const rows = record.ratings.map(
      ([name, value, kind, comment]) => {
        const displayedComment =
          kind === "beyond"
            ? "OFF THE CHART! " + comment
            : comment;

        return `
          <div class="n21-assess-row">

            <div class="n21-assess-label">
              ${escapeHTML(name)}
            </div>

            ${score(value, kind)}

            <div class="n21-assess-comment">
              ${escapeHTML(displayedComment)}
            </div>

          </div>
        `;
      }
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

  /*
   * EVENTS
   */

  button.addEventListener("click", () => {
    setPulled(
      !card.classList.contains("is-pulled")
    );
  });

  window.addEventListener(
    "resize",
    updateSpacer
  );

  window.addEventListener(
    "orientationchange",
    () => {
      requestAnimationFrame(updateSpacer);
    }
  );

  document.fonts?.ready.then(updateSpacer);

  window.addEventListener(
    "load",
    updateSpacer
  );

  /*
   * MAKE THE RENDERER AVAILABLE TO cast.html
   */

  window.n21RenderAssessment = render;

  render(0);
})();




/*
 * NOCTURNE 21 — SMOOTH TAB RETURN
 *
 * Replaces the previous TWO-TAB GOBLIN FIX.
 *
 * The successful extended-state mask stays fixed.
 * A separate copy of the original folder's lower
 * edge fades in and out during the card animation.
 *
 * No changes to sizing, pull distance, or timing.
 */

(() => {
  "use strict";

  const styleId = "n21-single-visible-tab-fix";
  document.getElementById(styleId)?.remove();

  const style = document.createElement("style");
  style.id = styleId;

  style.textContent = `
    /*
     * BASE FOLDER
     *
     * Keep the successful 87%–94% mask
     * permanently in place.
     *
     * This means the browser no longer needs
     * to switch between two mask images.
     */

    .n21-cast-page
    #characterDossier > .n21-dossier-content::before {
      -webkit-mask-image: linear-gradient(
        to bottom,
        #000 0%,
        #000 87%,
        transparent 94%
      ) !important;

      mask-image: linear-gradient(
        to bottom,
        #000 0%,
        #000 87%,
        transparent 94%
      ) !important;
    }

    /*
     * LOWER FOLDER EDGE
     *
     * A second copy of the folder image covers
     * only the bottom section.
     *
     * Closed: fully visible.
     * Extended: transparent.
     *
     * Because opacity is animatable, the original
     * tab returns smoothly instead of popping.
     */

    .n21-cast-page
    #characterDossier > .n21-dossier-content::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 2;

      background-image:
        url('img/characters/dossier-folder-open.png');
      background-position: center top;
      background-size: 100% 100%;
      background-repeat: no-repeat;

      -webkit-mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 84%,
        #000 87%,
        #000 100%
      );

      mask-image: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 84%,
        #000 87%,
        #000 100%
      );

      opacity: 1;
      pointer-events: none;

      transition:
        opacity .18s ease-in .54s;
    }

    /*
     * CARD EXTENDED
     *
     * Fade the original bottom edge away,
     * revealing the index card beneath.
     */

.n21-cast-page
#characterDossier:has(.n21-pull-card.is-pulled)
> .n21-dossier-content::after {
  opacity: 0;
  transition: opacity .18s ease-out;
}

    /*
     * REDUCED MOTION
     */

    @media (prefers-reduced-motion: reduce) {
      .n21-cast-page
      #characterDossier > .n21-dossier-content::after {
        transition: none !important;
      }
    }
  `;

  document.head.appendChild(style);
})();



/*
 * NOCTURNE 21 — RESPONSIVE DOSSIER WRITING
 *
 * Keeps the visible left and right margins consistent
 * for ALL characters, including Kai and Kuro.
 *
 * The artwork, pull-out card, animation, and tab
 * remain completely untouched.
 *
 * Replaces both previous responsive-fitting and
 * close-button-centering systems.
 */

(() => {
  "use strict";

  const dossier = document.getElementById("characterDossier");
  if (!dossier) return;

  const paper = dossier.querySelector(".n21-dossier-content");
  const writing = dossier.querySelector(".n21-dossier-writing");

  if (!paper || !writing) return;

  const styleId = "n21-unified-dossier-fit";
  document.getElementById(styleId)?.remove();

  const style = document.createElement("style");
  style.id = styleId;

  style.textContent = `
    .n21-cast-page
    #characterDossier .n21-dossier-writing {
      box-sizing: border-box !important;
      transform-origin: top left !important;
      min-height: 0 !important;
      overflow: visible !important;
    }

    .n21-cast-page
    #characterDossier .n21-dossier-close {
      display: block !important;
      position: relative !important;
      float: none !important;
      clear: both !important;

      width: max-content !important;
      max-width: 100% !important;

      margin: 12px auto 0 !important;

      left: auto !important;
      right: auto !important;

      transform: none !important;
      translate: none !important;

      text-align: center !important;
      box-sizing: border-box !important;
    }
  `;

  document.head.appendChild(style);

  let scheduled = false;

  function fitWriting() {
    scheduled = false;

    // Clear only the adjustments made by this fitter.
    writing.style.removeProperty("transform");
    writing.style.removeProperty("width");
    writing.style.removeProperty("height");

    if (!dossier.open || dossier.hidden) return;

    // Preserve the existing desktop layout.
    if (window.innerWidth > 1366) return;

    const paperWidth = paper.clientWidth;
    const paperHeight = paper.clientHeight;

    if (!paperWidth || !paperHeight) return;

    const computed = getComputedStyle(writing);
    const top = parseFloat(computed.top) || 0;
    const left = parseFloat(computed.left) || 0;

    /*
     * Consistent visible writing boundaries.
     *
     * Left edge stays at the existing CSS position.
     * Right edge retains the same paper margin.
     *
     * Scaling must NEVER move the left edge inward.
     */

    const rightMargin = paperWidth * 0.09;

    const availableWidth = Math.max(
      1,
      paperWidth - left - rightMargin
    );

    /*
     * Keep writing above the illustrated pull tab.
     * The folder itself never changes dimensions.
     */

    const availableHeight = Math.max(
      1,
      paperHeight * 0.88 - top
    );

    /*
     * Important:
     *
     * When text scales down, its layout width
     * increases proportionally.
     *
     * Example:
     * A 75% scale gets 133.33% layout width.
     *
     * After scaling, the VISIBLE writing width
     * is unchanged.
     *
     * This prevents Kuro's long dossier from
     * becoming a tiny centered column.
     */

    function measureAtScale(scale) {
      const layoutWidth = availableWidth / scale;

      writing.style.setProperty(
        "width",
        layoutWidth + "px",
        "important"
      );

      writing.style.setProperty(
        "height",
        "auto",
        "important"
      );

      writing.style.setProperty(
        "transform",
        "none",
        "important"
      );

      return writing.scrollHeight * scale;
    }

    /*
     * Find the largest scale that fits vertically.
     *
     * Binary search is more stable than repeatedly
     * shrinking an already-shrunk element.
     */

    let scale = 1;

    if (measureAtScale(1) > availableHeight) {
      let low = 0.2;
      let high = 1;

      for (let i = 0; i < 18; i++) {
        const middle = (low + high) / 2;

        if (measureAtScale(middle) <= availableHeight) {
          low = middle;
        } else {
          high = middle;
        }
      }

      scale = low;
    }

    /*
     * Apply the final width and scale.
     *
     * No translateX.
     * No recentering.
     * No character-specific offsets.
     */

    writing.style.setProperty(
      "width",
      (availableWidth / scale) + "px",
      "important"
    );

    writing.style.setProperty(
      "height",
      "auto",
      "important"
    );

    writing.style.setProperty(
      "transform",
      `scale(${scale})`,
      "important"
    );
  }

  function scheduleFit() {
    if (scheduled) return;

    scheduled = true;

    requestAnimationFrame(() => {
      requestAnimationFrame(fitWriting);
    });
  }

  // Opening or closing the secret file.
  dossier.addEventListener("toggle", scheduleFit);

  // Browser resizing.
  window.addEventListener("resize", scheduleFit);

  // iPad and phone orientation changes.
  window.addEventListener("orientationchange", () => {
    scheduleFit();

    requestAnimationFrame(() => {
      requestAnimationFrame(scheduleFit);
    });
  });

  // Detect actual changes to the folder's dimensions.
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(() => {
      scheduleFit();
    });

    observer.observe(paper);
  }

  /*
   * Character switching.
   *
   * Recalculate after cast.html replaces the
   * dossier writing for the selected character.
   */

  const originalRender = window.n21RenderAssessment;

  if (typeof originalRender === "function") {
    window.n21RenderAssessment = function(index) {
      originalRender(index);
      scheduleFit();
    };
  }

  // Detect dossier text changes.
  const mutationObserver = new MutationObserver(
    scheduleFit
  );

  mutationObserver.observe(writing, {
    childList: true,
    subtree: true,
    characterData: true
  });

  document.fonts?.ready.then(scheduleFit);

  window.addEventListener("load", scheduleFit);

  scheduleFit();
})();


/*
 * NOCTURNE 21 — CENTER THE STUBBORN BUTTON
 *
 * Centers the close button relative to the
 * visible dossier writing area.
 *
 * Does not change text sizing, folder art,
 * or the pull-out animation.
 */

(() => {
  "use strict";

  const styleId = "n21-center-dossier-close";
  document.getElementById(styleId)?.remove();

  const style = document.createElement("style");
  style.id = styleId;

  style.textContent = `
    .n21-cast-page
    #characterDossier .n21-dossier-close {
      display: block !important;
      position: relative !important;

      width: max-content !important;
      max-width: 100% !important;

      margin: 12px 0 0 50% !important;

      left: auto !important;
      right: auto !important;

      transform: translateX(-50%) !important;
      transform-origin: center center !important;

      float: none !important;
      clear: both !important;
      text-align: center !important;
    }
  `;

  document.head.appendChild(style);
})();

/*
 * NOCTURNE 21 — RETURN TO DOSSIER
 *
 * When the investigator's assessment is tucked away,
 * smoothly return the reader to the folder.
 *
 * Does not change artwork, sizing, margins,
 * or the existing pull-out animation.
 */

(() => {
  "use strict";

  const dossier = document.getElementById("characterDossier");
  if (!dossier) return;

  let returnTimer = null;

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".n21-pull-tab");
    if (!button || !dossier.contains(button)) return;

    const card = dossier.querySelector(".n21-pull-card");
    if (!card) return;

    // At click time, the existing handler hasn't changed
    // the card state yet. Only act when retracting.
    const isClosing = card.classList.contains("is-pulled");

    clearTimeout(returnTimer);

    if (!isClosing) return;

    // Let the existing 720ms retraction finish.
    returnTimer = setTimeout(() => {
      // Don't scroll if the reader reopened the card
      // or closed the entire dossier.
      if (
        !dossier.open ||
        dossier.hidden ||
        card.classList.contains("is-pulled")
      ) return;

      const folderTop =
        dossier.getBoundingClientRect().top +
        window.scrollY;

      const destination = Math.max(0, folderTop - 24);

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: destination,
        behavior: reducedMotion ? "instant" : "smooth"
      });
    }, 760);

  }, true);
})();

