// ===== Fullscreen Toggle =====
const enterFullscreen = document.getElementById("enter-fullscreen");
const exitFullscreen = document.getElementById("exit-fullscreen");

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.error(`Error entering fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

// Update fullscreen icons
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    enterFullscreen.style.opacity = "0";
    enterFullscreen.style.pointerEvents = "none";
    exitFullscreen.style.opacity = "1";
    exitFullscreen.style.pointerEvents = "auto";
  } else {
    enterFullscreen.style.opacity = "1";
    enterFullscreen.style.pointerEvents = "auto";
    exitFullscreen.style.opacity = "0";
    exitFullscreen.style.pointerEvents = "none";
  }
});

// ===== Dark Mode Toggle =====
let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkmode = () => {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkmode', null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem('darkmode');
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// ===== Typewriter Effect =====
const words = ["guitar", "drums", "ukulele", "piano", "singing", "music"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicWord = document.getElementById("dynamic-word");

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    dynamicWord.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    dynamicWord.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex++;
      if (wordIndex >= words.length) return; // Stop at the last word
    }
  }
  setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();

// ===== Falling Musical Symbols (variable size + fair randomness) =====
const noteValues = ['🎸', '🎹', '🥁', '🎤', '🎻', '🎺', '🎷', '🎶'];

function createNote() {
  const note = document.createElement('div');
  note.classList.add('note');

  // Pick a random emoji fairly
  note.textContent = noteValues[Math.floor(Math.random() * noteValues.length)];

  // Random horizontal position
  note.style.left = `${Math.random() * window.innerWidth}px`;

  // Random fall speed
  const duration = Math.random() * 3 + 2; // 2–5s
  note.style.animationDuration = `${duration}s`;

  // Random size (20px to 50px)
  const size = Math.floor(Math.random() * 30) + 20;
  note.style.fontSize = `${size}px`;

  document.body.appendChild(note);

  setTimeout(() => note.remove(), duration * 1000);
}

function startFallingNotes() {
  setInterval(() => {
    createNote();
  }, Math.floor(Math.random() * 500) + 300); // random 0.3–0.8s interval
}

startFallingNotes();
