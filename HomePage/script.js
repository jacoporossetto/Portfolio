const testo = document.getElementById('frasiApparizione');


//hamburger menu
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('#menu');
  
  hamburger.addEventListener('click', function() {
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });
});

//sezioni testo

function getActiveSection() {
  const sections = document.querySelectorAll('section');
  let activeSection = '';
  sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          activeSection = section.getAttribute('id');
      }
  });
  return activeSection;
}

window.addEventListener('scroll', function() {
  const activeSection = getActiveSection();
  const indicatore = document.getElementById('indicatore');
  if (activeSection) {
      indicatore.textContent = activeSection.toUpperCase();
  }
});




//evento compare testo

// animazione frasi
const frasi = [
  "Welcome to my website!",
  "Explore my projects.",
  "Contact me for collaborations."
];

// Variabili di controllo per l'animazione
let indiceFrase = 0;
let indiceCarattere = 0;
let inCancellazione = false;
let tempoDigitazione = 80;
let tempoPausa = 900;

function animazioneTyping() {
  const fraseCorrente = frasi[indiceFrase];
  
  // Scrittura della frase
  if (!inCancellazione && indiceCarattere < fraseCorrente.length) {
    testo.textContent += fraseCorrente.charAt(indiceCarattere);
    indiceCarattere++;
    setTimeout(animazioneTyping, tempoDigitazione);
  } 
  // Pausa alla fine della scrittura
  else if (!inCancellazione && indiceCarattere === fraseCorrente.length) {
    setTimeout(() => {
      inCancellazione = true;
      animazioneTyping();
    }, tempoPausa);
  } 
  // Cancellazione della frase
  else if (inCancellazione && indiceCarattere > 0) {
    testo.textContent = fraseCorrente.substring(0, indiceCarattere - 1);
    indiceCarattere--;
    setTimeout(animazioneTyping, tempoDigitazione / 2);
  } 
  // Passaggio alla frase successiva
  else if (inCancellazione && indiceCarattere === 0) {
    inCancellazione = false;
    indiceFrase = (indiceFrase + 1) % frasi.length;
    setTimeout(animazioneTyping, tempoPausa / 2);
  }
}// fine animazione frasi

animazioneTyping();

const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});



