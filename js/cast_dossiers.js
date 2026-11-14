/* NOCTURNE 21 — YOSHIKO’S CASE FILES
   Edit the words inside each character section below.
   Keep the HTML tags (such as <p> and </p>) intact.
   The numbers correspond to the character buttons on cast.html.
*/

const dossierPages = {

  // ===== KAI =====
  "0": `
    <h2>CASE FILE: KAI</h2>
    <div class="n21-dossier-facts">
    <p>
    <strong>Age:</strong> 14–16 maybe?</p>
    <p>
    <strong>Relation:</strong> Adopted best friend</p>
    </div>
    <section class="n21-dossier-redactions" aria-label="Kai's unknown past">
    <h3>Background information</h3>
    <p>Place of birth: <span class="n21-blackout" aria-label="Redacted">
    </span>
    </p>
    <p>Family history: <span class="n21-blackout short" aria-label="Redacted">
    </span>
    </p>
    <p>Previous residence: <span class="n21-blackout" aria-label="Redacted">
    </span>
    </p>
    <span class="n21-classified" aria-hidden="true">REDACTED</span>
    <p class="n21-redaction-note">↳ I don't actually know what's under these.</p>
    <p class="n21-redaction-note">Seriously.</p>
    <p class="n21-redaction-note">I asked him. He doesn't know.</p>
    </section>
    <h3>Known habits</h3>
    <p>Drinks enough coffee to concern a medical professional. Unfortunately, the medical professional in this house is Dad, and he's a constant enabler.</p>
    <h3>Suspicious activity</h3>
    <p>Can make friends with practically anyone. Has a talent for appearing wherever the snacks are. Claims he doesn't need shoes. This is not normal behavior.</p>
    <h3>Personal observations</h3>
    <p>He's curious about everything, asks a million questions, and somehow makes our very quiet house feel less quiet.</p>
    <p class="n21-dossier-note">
    <strong>Yoshiko's note:</strong> He's family. Don't tell him I wrote that. He'll be unbearable. ♡</p>
  `,

  // ===== KURO =====
  "1": `
    <h2>CASE FILE: DR. KURO SHIMIZU</h2>
    <div class="n21-dossier-facts">
    <p>
    <strong>Age:</strong> 38</p>
    <p>
    <strong>Relation:</strong> Dad</p>
    </div>
    <section class="n21-dossier-redactions" aria-label="Kuro’s suspiciously incomplete answers">
    <h3>Information Dad definitely doesn't know (apparently)</h3>
    <p>What happened before Kai arrived: <span class="n21-blackout" aria-label="Redacted">
    </span>
    </p>
    <p>Things Dad isn't telling me: <span class="n21-blackout short" aria-label="Redacted">
    </span>
    </p>
    <span class="n21-classified" aria-hidden="true">REDACTED</span>
    <p class="n21-redaction-note">He says he doesn't know anything.</p>
    <p class="n21-redaction-note">I asked him again. Same answer.</p>
    <p class="n21-redaction-note">The man is doing the thing where plays dumb, but I'm onto him.</p>
    </section>
    <h3>Known habits</h3>
    <p>Works too much. Drinks coffee like it's water. Smokes when he's really stessed. Lies about that too. 
    I can smell ya, Pal. Has the ability to make an entire room feel guilty just by raising one eyebrow. Refuses to spell his name in Kanji
    because of his Daddy issues.</p>
    <h3>Suspicious activity</h3>
    <p>Claims he's not worried. Is clearly worried. Claims he doesn't know. Somehow has a very specific opinion anyway.</p>
    <h3>Personal observations</h3>
    <p>He's a terrible liar. Unfortunately, he's also very committed. He cooks, he worries, and he pretends he isn't doing either for our benefit.</p>
    <p class="n21-dossier-note">
    <strong>Yoshiko's note:</strong> He's still my dad. I guess I'll keep him. Don't tell him I said that.</p>
  `,

  // ===== YOSHIKO =====
  "2": `
    <h2>CASE FILE: YOSHIKO SHIMIZU</h2>
    <div class="n21-dossier-facts">
    <p>
    <strong>Age:</strong> 14</p>
    <p>
    <strong>Relation:</strong> Me (obviously)</p>
    </div>
    <h3>Known habits</h3>
    <p>Excellent artist. Highly observant. The only person in this house capable of keeping a sensible filing system.</p>
    <h3>Suspicious activity</h3>
    <p>NONE. This investigator has been cleared of all wrongdoing by an impartial review board. (Me.)</p>
    <h3>Personal observations</h3>
    <p>Someone has to keep an eye on these people. Do I get thanked? No. Do I get asked why I'm writing things down? Constantly.</p>
    <p class="n21-dossier-note">
    <strong>Official conclusion:</strong> Brilliant, responsible, and tragically underappreciated. Any opposing testimony is inadmissible.</p>
  `,

  // ===== SHINGEN =====
  "3": `
    <h2>CASE FILE: SHINGEN YAMAGATA</h2>
    <div class="n21-dossier-facts">
    <p>
    <strong>Age:</strong> Adult. Ask him.</p>
    <p>
    <strong>Relation:</strong> Honorary uncle / Dad’s best friend</p>
    </div>
    <h3>Known habits</h3>
    <p>Checks on everyone. Then checks again to make sure the first check worked. Gives advice whether anyone asked for it or not.
    Never give him the car keys. He WILL lose them. Also has a habit of losing wives. Don't tell him I said that.</p>
    <h3>Suspicious activity</h3>
    <p>Can turn one minor inconvenience into a full-scale family emergency in approximately four seconds.</p>
    <h3>Personal observations</h3>
    <p>He's loud, he worries too much, and he somehow always shows up when we need him. Dad pretends to be annoyed. Nobody is fooled.</p>
    <p class="n21-dossier-note">
    <strong>Yoshiko's note:</strong> If he asks, I said only nice things. I do not have time for the follow-up conversation.</p>
  `,

  // ===== KIRI =====
  "4": `
    <h2>CASE FILE: KIRI YAMAGATA</h2>
    <div class="n21-dossier-facts">
    <p>
    <strong>Age:</strong> 14</p>
    <p>
    <strong>Relation:</strong> Basically my cousin (unfortunately)</p>
    </div>
    <h3>Known habits</h3>
    <p>Worries a lot about what other people think of him. Would rather die than admit he's worried about what other people think of him.</p>
    <h3>Suspicious activity</h3>
    <p>Suddenly has opinions about EVERYTHING Kai does. Especially things that have absolutely nothing to do with him.</p>
    <h3>Personal observations</h3>
    <p>We've known each other forever. Which means I remember when he was less concerned with looking cool and more concerned with being an actual person.</p>
    <p class="n21-dossier-note">
    <strong>Yoshiko's note:</strong> He can be a jerk. He's also family. Both things can be true, and it's incredibly annoying.</p>
  `,

  // ===== CREEPY DREAM LADY =====
  "5": `
    <h2>CASE FILE: CREEPY DREAM LADY</h2>
    <div class="n21-dossier-facts">
    <p>
    <strong>Age:</strong> ???</p>
    <p>
    <strong>Relation:</strong> Unknown. Thankfully.</p>
    </div>
    <h3>Known habits</h3>
    <p>Appearing in Kai's dreams. Being extremely unsettling. Apparently not understanding the concept of personal space.
    Loves knives.</p>
    <h3>Suspicious activity</h3>
    <p>Everything. Literally EVERYTHING about her is suspicious.</p>
    <h3>Personal observations</h3>
    <p>I can't exactly interview somebody who only shows up in somebody else's dreams. This is making my investigative work VERY difficult.</p>
    <p class="n21-dossier-note">
    <strong>Yoshiko's note:</strong> If you see her, maybe don't introduce yourself. Just a thought.</p>
  `,

  // ===== THE STRANGER =====
  "6": `
    <h2>CASE FILE: THE STRANGER</h2>
    <div class="n21-dossier-facts">
    <p>
    <strong>Age:</strong> ???</p>
    <p>
    <strong>Relation:</strong> Unknown. Looks familiar, though.</p>
    </div>
    <h3>Known habits</h3>
    <p>Showing up without an invitation. Making a terrible first impression. Terrible aim, but throws sharp objects anyway.
    Carries himself like he knows everything, but might actually be clueless. Easy to trick.</p>
    <h3>Suspicious activity</h3>
    <p>Has Kai's face. I feel like this should be a much bigger deal to everybody.</p>
    <h3>Personal observations</h3>
    <p>Identity: unknown. Motives: unknown. Explanation for any of this: ALSO UNKNOWN. I am surrounded by people who refuse to provide useful answers.</p>
    <p class="n21-dossier-note">
    <strong>Yoshiko's note:</strong> This case is getting ridiculous.</p>
  `

};
