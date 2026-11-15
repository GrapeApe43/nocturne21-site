
/* NOCTURNE 21 — YOSHIKO'S PULL-OUT ASSESSMENT CARD
   Load AFTER cast_dossiers.js. Does not change the original dossiers.
   Requires index-top.png, index-middle.png, index-bottom.png in img/characters/.
*/
(() => {
  const records = [
  [
    "CAFFEINATED MENACE",
    [
      [
        "Coffee dependency",
        10,
        "beyond",
        "Dad made him another cup."
      ],
      [
        "Making friends",
        10,
        "normal",
        "It's actually ridiculous."
      ],
      [
        "Shoe compliance",
        1,
        "double",
        "Claims shoes are optional."
      ],
      [
        "Finding snacks",
        10,
        "normal",
        "A supernatural talent."
      ]
    ],
    "He's family. And apparently 90% caffeine."
  ],
  [
    "CHRONICALLY OVERWORKED",
    [
      [
        "Ability to relax",
        1,
        "triple",
        "Please sit down, Dad."
      ],
      [
        "Coffee dependency",
        9,
        "double",
        "See also: Kai's enabler."
      ],
      [
        "Suspicious dad behavior",
        10,
        "double",
        "I KNOW you're hiding something."
      ],
      [
        "Keeping plants alive",
        2,
        "normal",
        "The bonsai graveyard has witnesses."
      ]
    ],
    "Kai's helping with the bonsai now. Survival rates are improving. Coincidence?"
  ],
  [
    "ABOVE SUSPICION",
    [
      [
        "Investigative genius",
        10,
        "double",
        "Objectively speaking."
      ],
      [
        "Artistic brilliance",
        10,
        "double",
        "Obviously."
      ],
      [
        "Modesty",
        10,
        "triple",
        "My greatest quality."
      ],
      [
        "Effectiveness of unsolicited advice",
        4,
        "soft",
        "Not sure if they're even listening."
      ]
    ],
    "Without my constant intervention, this family would collapse in 48 hours. You're welcome."
  ],
  [
    "WELL-MEANING MENACE",
    [
      [
        "Composure under pressure",
        0,
        "zero",
        "Not a typo."
      ],
      [
        "Embarrassing dad energy",
        10,
        "double",
        "Unmeasurable, frankly."
      ],
      [
        "Ability to locate car keys",
        1,
        "triple",
        "PLEASE check your pockets."
      ],
      [
        "Good intentions",
        10,
        "soft",
        "Annoyingly, yes."
      ]
    ],
    "If he asks, I said only nice things. I do not have time for the follow-up conversation."
  ],
  [
    "REPEAT OFFENDER",
    [
      [
        "Likelihood of starting drama",
        9,
        "double",
        "Exhibit A: literally yesterday."
      ],
      [
        "Willingness to admit he's wrong",
        2,
        "triple",
        "Reassessment request denied."
      ],
      [
        "Concern for his appearance",
        10,
        "double",
        "He owns a mirror. We know."
      ],
      [
        "Potential",
        8,
        "soft",
        "I've seen it."
      ]
    ],
    "He's an idiot, but I remember who he is when he stops trying so hard."
  ],
  [
    "EXTREME CAUTION",
    [
      [
        "Creepiness",
        10,
        "triple",
        "Absolutely not."
      ],
      [
        "Respect for personal boundaries",
        1,
        "triple",
        "Does she know what those are?"
      ],
      [
        "Knife enthusiasm",
        10,
        "double",
        "WHY THE KNIVES?"
      ],
      [
        "Trustworthiness",
        1,
        "double",
        "Would give a zero, but I'm being professional."
      ]
    ],
    "I have never met this woman, and I intend to keep it that way."
  ],
  [
    "DO NOT APPROACH",
    [
      [
        "Resemblance to Kai",
        10,
        "triple",
        "EXPLAIN THIS."
      ],
      [
        "Claims to know everything",
        10,
        "double",
        "According to him."
      ],
      [
        "Actual understanding of Kai",
        2,
        "double",
        "Then why is he always surprised?"
      ],
      [
        "Willingness to explain himself",
        1,
        "triple",
        "An impressive commitment to silence."
      ],
      [
        "Respect for Kai's well-being",
        1,
        "soft",
        "Why send him back somewhere that hurt him?"
      ]
    ],
    "He knows all ABOUT Kai. I'm not convinced he knows Kai. He wants Kai sent back to what sounds like an awful home, and won't say why. Why would you want somebody to go back to a place that hurt them?"
  ]
];
  const escapeHTML = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const dossier = document.getElementById('characterDossier');
  if (!dossier) return;
  const card = document.createElement('section');
  card.className = 'n21-pull-card';
  card.setAttribute('aria-label', "Yoshiko's pull-out investigator assessment");
  card.innerHTML = `<div class="n21-pull-reveal" id="n21-assessment-panel">
    <div class="n21-pull-paper">
      <div class="n21-pull-top"><h2>INVESTIGATOR'S<br>ASSESSMENT</h2></div>
      <div class="n21-pull-middle"><div class="n21-pull-data"></div></div>
      <div class="n21-pull-bottom" aria-hidden="true"></div>
    </div>
  </div>
  <button type="button" class="n21-pull-tab" aria-expanded="false" aria-controls="n21-assessment-panel" aria-label="Pull out investigator's assessment"><span>PULL FOR ASSESSMENT ↓</span></button>`;
  dossier.appendChild(card); // Sibling of the fixed-size illustrated folder paper.
  const button = card.querySelector('.n21-pull-tab');
  const data = card.querySelector('.n21-pull-data');
  const score = (value,kind) => {
    const numbers = Array.from({length:10},(_,i) => {
      const n=i+1, marked=n===value && kind!=='beyond' && kind!=='zero';
      return `<span class="n21-assess-num ${marked?'is-marked mark-'+kind:''}">${n}</span>`;
    }).join('');
    return `<div class="n21-assess-scale ${kind==='beyond'?'is-beyond':''} ${kind==='zero'?'is-zero':''}" aria-label="Score ${kind==='beyond'?'above 10':value} out of 10">
      ${kind==='zero'?'<span class="n21-assess-zero">0</span>':''}${numbers}
      ${kind==='beyond'?'<span class="n21-assess-arrow">⟶⟶⟶</span>':''}
    </div>`;
  };
  function render(index) {
    const record=records[index]; if (!record) return;
    const [stamp,ratings,conclusion]=record;
    data.innerHTML=`<div class="n21-assess-stamp">${escapeHTML(stamp)}</div>` +
      ratings.map(([name,value,kind,note])=>`<div class="n21-assess-row">
        <div class="n21-assess-label">${escapeHTML(name)}</div>
        ${score(value,kind)}
        <div class="n21-assess-comment">${escapeHTML(kind==='beyond'?'OFF THE CHART! '+note:note)}</div>
      </div>`).join('') +
      `<p class="n21-assess-conclusion"><strong>EVALUATOR'S NOTE:</strong> ${escapeHTML(conclusion)}</p>`;
    card.classList.remove('is-pulled');
    button.setAttribute('aria-expanded','false');
  }
  button.addEventListener('click',()=>{
    const open=card.classList.toggle('is-pulled');
    button.setAttribute('aria-expanded',String(open));
    button.setAttribute('aria-label',open?"Tuck away investigator's assessment":"Pull out investigator's assessment");
    button.querySelector('span').textContent=open?'TUCK AWAY ASSESSMENT ↑':'PULL FOR ASSESSMENT ↓';
  });
  // Called by showCharacter; also initialize Kai on load.
  window.n21RenderAssessment=render;
  render(0);
})();
