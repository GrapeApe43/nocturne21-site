
/* NOCTURNE 21 — YOSHIKO'S INVESTIGATOR ASSESSMENTS
   Load AFTER js/cast_dossiers.js.
   Adds the ratings without changing existing dossier text.
*/

(() => {
  const records = [
    // KAI
    [
      "CAFFEINATED MENACE",
      [
        ["Coffee dependency", 10, "beyond", "Dad made him another cup."],
        ["Making friends", 10, "normal", "It's actually ridiculous."],
        ["Shoe compliance", 1, "double", "Claims shoes are optional."],
        ["Finding snacks", 10, "normal", "A supernatural talent."]
      ],
      "He's family. And apparently 90% caffeine."
    ],

    // KURO
    [
      "CHRONICALLY OVERWORKED",
      [
        ["Ability to relax", 1, "triple", "Please sit down, Dad."],
        ["Coffee dependency", 9, "double", "See also: Kai's enabler."],
        ["Suspicious dad behavior", 10, "double", "I KNOW you're hiding something."],
        ["Keeping plants alive", 2, "normal", "The bonsai graveyard has witnesses."]
      ],
      "Kai's helping with the bonsai now. Survival rates are improving. Coincidence?"
    ],

    // YOSHIKO
    [
      "ABOVE SUSPICION",
      [
        ["Investigative genius", 10, "double", "Objectively speaking."],
        ["Artistic brilliance", 10, "double", "Obviously."],
        ["Modesty", 10, "triple", "My greatest quality."],
        ["Effectiveness of unsolicited advice", 4, "soft", "Not sure if they're even listening."]
      ],
      "Without my constant intervention, this family would collapse in 48 hours. You're welcome."
    ],

    // SHINGEN
    [
      "WELL-MEANING MENACE",
      [
        ["Composure under pressure", 0, "zero", "Not a typo."],
        ["Embarrassing dad energy", 10, "double", "Unmeasurable, frankly."],
        ["Ability to locate car keys", 1, "triple", "PLEASE check your pockets."],
        ["Good intentions", 10, "soft", "Annoyingly, yes."]
      ],
      "If he asks, I said only nice things. I do not have time for the follow-up conversation."
    ],

    // KIRI
    [
      "REPEAT OFFENDER",
      [
        ["Likelihood of starting drama", 9, "double", "Exhibit A: literally yesterday."],
        ["Willingness to admit he's wrong", 2, "triple", "Reassessment request denied."],
        ["Concern for his appearance", 10, "double", "He owns a mirror. We know."],
        ["Potential", 8, "soft", "I've seen it."]
      ],
      "He's an idiot, but I remember who he is when he stops trying so hard."
    ],

    // CREEPY DREAM LADY
    [
      "EXTREME CAUTION",
      [
        ["Creepiness", 10, "triple", "Absolutely not."],
        ["Respect for personal boundaries", 1, "triple", "Does she know what those are?"],
        ["Knife enthusiasm", 10, "double", "WHY THE KNIVES?"],
        ["Trustworthiness", 1, "double", "Would give a zero, but I'm being professional."]
      ],
      "I have never met this woman, and I intend to keep it that way."
    ],

    // THE STRANGER
    [
      "DO NOT APPROACH",
      [
        ["Resemblance to Kai", 10, "triple", "EXPLAIN THIS."],
        ["Claims to know everything", 10, "double", "According to him."],
        ["Actual understanding of Kai", 2, "double", "Then why is he always surprised?"],
        ["Willingness to explain himself", 1, "triple", "An impressive commitment to silence."],
        ["Respect for Kai's well-being", 1, "soft", "Why send him back somewhere that hurt him?"]
      ],
      "He knows all ABOUT Kai. I'm not convinced he knows Kai. He wants Kai sent back to what sounds like an awful home, and won't say why. Why would you want somebody to go back to a place that hurt them?"
    ]
  ];

  const esc = s => String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  function scoreHTML(value, kind) {
    const cells = Array.from({ length: 10 }, (_, i) => {
      const n = i + 1;
      const marked =
        n === value &&
        kind !== "beyond" &&
        kind !== "zero";

      return `
        <span class="n21-assess-num
          ${marked ? "is-marked" : ""}
          ${marked ? "mark-" + kind : ""}">
          ${n}
        </span>
      `;
    }).join("");

    return `
      <div class="n21-assess-scale
        ${kind === "beyond" ? "is-beyond" : ""}
        ${kind === "zero" ? "is-zero" : ""}"
        aria-hidden="true">

        ${kind === "zero"
          ? '<span class="n21-assess-zero">0</span>'
          : ""}

        ${cells}

        ${kind === "beyond"
          ? '<span class="n21-assess-arrow">⟶⟶⟶</span>'
          : ""}
      </div>
    `;
  }

  records.forEach(([stamp, ratings, conclusion], index) => {
    const rows = ratings.map(([name, value, kind, note]) => `
      <div class="n21-assess-row">
        <div class="n21-assess-label">${esc(name)}</div>

        ${scoreHTML(value, kind)}

        <div class="n21-assess-comment">
          ${esc(kind === "beyond"
            ? "OFF THE CHART! " + note
            : note)}
        </div>
      </div>
    `).join("");

    const section = `
      <section class="n21-assessment"
        aria-label="Investigator's assessment">

        <div class="n21-assess-stamp">
          ${esc(stamp)}
        </div>

        <details class="n21-assess-fold">
          <summary>
            INVESTIGATOR'S ASSESSMENT
            <span class="n21-assess-open-hint">
              (tap to unfold)
            </span>
          </summary>

          <div class="n21-assess-inner">
            ${rows}

            <p class="n21-assess-conclusion">
              <strong>EVALUATOR'S NOTE:</strong>
              ${esc(conclusion)}
            </p>
          </div>
        </details>
      </section>
    `;

    if (
      typeof dossierPages !== "undefined" &&
      dossierPages[String(index)]
    ) {
      dossierPages[String(index)] += section;
    }
  });
})();
