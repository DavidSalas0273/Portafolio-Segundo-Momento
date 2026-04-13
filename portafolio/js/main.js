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

/* ── CONTACT FORM SUBMIT ── */
async function setupContactForm() {
  const submitBtn = document.querySelector('.cf-submit');
  const nameInput = document.getElementById('cf-name');
  const emailInput = document.getElementById('cf-email');
  const msgInput = document.getElementById('cf-msg');
  const formCard  = document.querySelector('.contact-form-card');
  if (!submitBtn || !nameInput || !emailInput || !msgInput || !formCard) return;

  let busy = false;

  const statusEl = document.createElement('div');
  statusEl.className = 'cf-status';
  statusEl.style.marginTop = '0.6rem';
  statusEl.style.fontSize = '0.95rem';
  statusEl.style.color = 'var(--text2)';
  formCard.appendChild(statusEl);

  function setStatus(text, isError = false) {
    statusEl.textContent = text;
    statusEl.style.color = isError ? '#ff6b6b' : 'var(--text2)';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function trySend(endpoint, payload) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res;
  }

  submitBtn.addEventListener('click', async () => {
    if (busy) return;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    if (!name || !email || !message) { setStatus('Por favor completa todos los campos.', true); return; }
    if (!validateEmail(email)) { setStatus('Correo no válido.', true); return; }

    busy = true;
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    setStatus('Enviando mensaje...');

    const payload = { name, email, message };
    const endpoints = ['/api/send-email', '/send-email'];
    let sent = false;

    for (const ep of endpoints) {
      try {
        const res = await trySend(ep, payload);
        if (res.ok) { setStatus('Mensaje enviado. Gracias.'); sent = true; break; }
        // If 404 try next endpoint
        if (res.status === 404) continue;
        const body = await res.json().catch(()=>null);
        setStatus(body && body.error ? `Error: ${body.error}` : 'Error al enviar el mensaje.', true);
        break;
      } catch (err) {
        // network error -> try next
        console.warn('Email send attempt failed for', ep, err);
        continue;
      }
    }

    if (sent) {
      nameInput.value = ''; emailInput.value = ''; msgInput.value = '';
    }

    busy = false;
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setupContactForm);
else setupContactForm();
