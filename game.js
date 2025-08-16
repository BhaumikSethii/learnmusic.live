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

// ===== Falling Musical Symbols =====
const createNote = () => {
  const note = document.createElement('div');
  note.classList.add('note');
    
  // 🎶 Musical instrument & mic emojis
  const noteValues = ['🎸', '🎹', '🥁', '🎤', '🎻', '🎺', '🎷', '🎶'];
  note.textContent = noteValues[Math.floor(Math.random() * noteValues.length)];
    
  // Random horizontal position
  note.style.left = `${Math.random() * window.innerWidth}px`;
  
  // Random fall speed
  const duration = Math.random() * 3 + 2; // Between 2–5s
  note.style.animationDuration = `${duration}s`;
  
  // Random scale
  const scale = Math.random() * 0.5 + 0.75; // Between 0.75–1.25
  note.style.transform = `scale(${scale})`;
  
  document.body.appendChild(note);
  
  // Remove after animation
  setTimeout(() => {
    note.remove();
  }, duration * 1000);
};

// Keep generating notes
const startFallingNotes = () => {
  setInterval(createNote, 400); // every 0.4s
};

startFallingNotes();

// ===== Carousel Init (if used) =====
$(document).ready(function() {
  $('.carousel').slick({
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  });
});

