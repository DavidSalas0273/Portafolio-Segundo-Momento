/* ═══════════════════════════════════════
   MAIN.JS — nav, theme, fab, animations
═══════════════════════════════════════ */

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── MOBILE NAV ── */
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMobile.classList.toggle('open');
});
document.querySelectorAll('.nav-mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMobile.classList.remove('open');
  });
});

/* ── THEME TOGGLE ── */
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

let isDark = true;
themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
});

/* ── LANGUAGE DROPDOWN ── */
const langToggle = document.getElementById('langToggle');
const langMenu   = document.getElementById('langMenu');

langToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  langMenu.classList.toggle('open');
  // close cv ring if open
  cvRing.classList.remove('open');
  cvOpen = false;
});

/* ── CV CIRCULAR MENU ── */
const cvToggle = document.getElementById('cvToggle');
const cvRing   = document.getElementById('cvRing');
let cvOpen = false;

cvToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  cvOpen = !cvOpen;
  cvRing.classList.toggle('open', cvOpen);
  // close lang menu if open
  langMenu.classList.remove('open');
});

// Close all FAB menus on outside click
document.addEventListener('click', () => {
  langMenu.classList.remove('open');
  cvRing.classList.remove('open');
  cvOpen = false;
});

// Prevent closing when clicking inside menus
langMenu.addEventListener('click', e => e.stopPropagation());
cvRing.addEventListener('click',  e => e.stopPropagation());

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--accent)' : '';
  });
}, { passive: true });

/* ── FADE-UP OBSERVER ── */
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObs.observe(el));

/* ── SKILL BAR OBSERVER ── */
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animated'));
    }
  });
}, { threshold: 0.3 });

const skillSec = document.getElementById('habilidades');
if (skillSec) skillObs.observe(skillSec);

/* ── TESTIMONIALS INTERACTION ── */
function setupTestimonials() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  function closeAll(except) {
    cards.forEach(c => { if (c !== except) c.classList.remove('expanded'); });
  }

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const isExpanded = card.classList.toggle('expanded');
      if (isExpanded) closeAll(card);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('expanded');
        closeAll(card.classList.contains('expanded') ? card : null);
      }
    });
  });

  // Close expanded on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.testimonial-card')) closeAll(null);
  });
}

// Initialize after DOM ready
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupTestimonials);
else setupTestimonials();
