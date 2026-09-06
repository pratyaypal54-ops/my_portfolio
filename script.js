// ---------- SKILLS FILTER ----------
document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.skill-group').forEach(g => {
      g.style.display = (f === 'all' || g.dataset.cat === f) ? '' : 'none';
    });
  });
});

// ---------- TYPEWRITER ANIMATION ----------
// Cycles: name first, then each role. Types letter by letter (fast),
// pauses ~1s so it's readable, deletes letter by letter, then moves to
// the next word. Loops forever.
const typedWords = [
  "Pratyay",
  "a Frontend Developer",
  "a Backend Developer",
  "a Full Stack Web Developer",
  "a Problem Solver"
];

const typedEl = document.getElementById('typed-text');

if (typedEl) {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPE_SPEED = 65;     // ms per character while typing (fast)
  const DELETE_SPEED = 35;   // ms per character while deleting (faster)
  const PAUSE_AFTER_TYPE = 1000; // wait 1s once fully typed
  const PAUSE_AFTER_DELETE = 250; // short gap before typing next word

  function tick() {
    const currentWord = typedWords[wordIndex];

    if (!isDeleting) {
      charIndex++;
      typedEl.textContent = currentWord.substring(0, charIndex);

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      typedEl.textContent = currentWord.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typedWords.length; // loop back after last word
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}
