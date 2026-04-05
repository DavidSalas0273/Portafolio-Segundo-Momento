/* Copia de trabajo de i18n.js */

const translations = {
  es: {
    "nav.about":    "Sobre mí",
    "nav.projects": "Proyectos",
    "nav.skills":   "Habilidades",
    "nav.contact":  "Contacto",
    "hero.tag":     "Disponible para proyectos",
    "hero.t1":      "Diseño &amp;",
    "hero.t2":      "Desarrollo",
    "hero.t3":      "Digital",
    "hero.desc":    "Creo experiencias digitales que combinan diseño elegante con código limpio. Especializado en interfaces modernas y aplicaciones web de alto impacto.",
    "hero.cta1":    "Ver proyectos",
    "hero.cta2":    "Contactar",
    "hero.role":    "Desarrollador Full Stack",
    "hero.s1":      "Años exp.",
    "hero.s2":      "Proyectos",
    "hero.s3":      "Clientes",
    "about.title":  "Sobre mí",
    "about.bio":    "Soy un desarrollador apasionado con +5 años de experiencia creando aplicaciones web modernas y escalables. Me especializo en desarrollo frontend con React y Next.js, siempre buscando las mejores prácticas y excelencia en el código.",
    "about.softTitle": "Habilidades Blandas",
    "about.techTitle": "Tecnologías",
    "soft.1": "Trabajo en Equipo",
    "soft.2": "Comunicación",
    "soft.3": "Resolución de Problemas",
    "soft.4": "Creatividad",
    "proj.tag":  "02 — Proyectos",
    "proj.t1":   "Trabajo",
    "proj.t2":   "seleccionado",
    "proj.view": "Ver proyecto →",
    "proj.p1t":  "Plataforma E-commerce",
    "proj.p1d":  "Tienda online completa con carrito, pagos y panel de administración. Construida con React y Node.js.",
    "proj.p2t":  "Dashboard Analytics",
    "proj.p2d":  "Panel de visualización de datos en tiempo real con gráficos interactivos y reportes exportables.",
    "proj.p3t":  "App Móvil Social",
    "proj.p3d":  "Aplicación de red social con feed personalizado, mensajería instantánea y perfil de usuario.",
    "proj.p4t":  "Sistema de Gestión",
    "proj.p4d":  "CRUD completo para gestión de inventario, usuarios y reportes con roles y permisos.",
    "sk.tag":  "03 — Habilidades",
    "sk.t1":   "Stack &amp;",
    "sk.t2":   "herramientas",
    "chips.front": "Front-end",
    "chips.back":  "Back-end",
    "chips.tools": "Herramientas",
    "ct.tag":  "04 — Contacto",
    "ct.t1":   "¿Tienes un",
    "ct.t2":   "proyecto en mente?",
    "ct.desc": "Estoy disponible para proyectos freelance, colaboraciones y posiciones full-time. ¡Hablemos!",
    "ct.btn":  "Enviar mensaje →",
    "footer.made": "Hecho con ♥ en Colombia",
  },
  en: {
    "nav.about":    "About Me",
    "nav.projects": "Projects",
    "nav.skills":   "Skills",
    "nav.contact":  "Contact",
    "hero.tag":     "Available for projects",
    "hero.t1":      "Design &amp;",
    "hero.t2":      "Development",
    "hero.t3":      "Digital",
    "hero.desc":    "I craft digital experiences that blend elegant design with clean code. Specialized in modern interfaces and high-impact web applications.",
    "hero.cta1":    "See projects",
    "hero.cta2":    "Contact",
    "hero.role":    "Full Stack Developer",
    "hero.s1":      "Years exp.",
    "hero.s2":      "Projects",
    "hero.s3":      "Clients",
    "about.title":  "About Me",
    "about.bio":    "I'm a passionate developer with +5 years of experience creating modern and scalable web applications. I specialize in frontend development with React and Next.js, always seeking best practices and code excellence.",
    "about.softTitle": "Soft Skills",
    "about.techTitle": "Technologies",
    "soft.1": "Teamwork",
    "soft.2": "Communication",
    "soft.3": "Problem Solving",
    "soft.4": "Creativity",
    "proj.tag":  "02 — Projects",
    "proj.t1":   "Selected",
    "proj.t2":   "work",
    "proj.view": "View project →",
    "proj.p1t":  "E-commerce Platform",
    "proj.p1d":  "Full online store with cart, payments and admin panel. Built with React and Node.js.",
    "proj.p2t":  "Analytics Dashboard",
    "proj.p2d":  "Real-time data visualization panel with interactive charts and exportable reports.",
    "proj.p3t":  "Social Mobile App",
    "proj.p3d":  "Social network app with personalized feed, instant messaging and user profile.",
    "proj.p4t":  "Management System",
    "proj.p4d":  "Full CRUD for inventory management, users and reports with roles and permissions.",
    "sk.tag":  "03 — Skills",
    "sk.t1":   "Stack &amp;",
    "sk.t2":   "tools",
    "chips.front": "Front-end",
    "chips.back":  "Back-end",
    "chips.tools": "Tools",
    "ct.tag":  "04 — Contact",
    "ct.t1":   "Do you have a",
    "ct.t2":   "project in mind?",
    "ct.desc": "I'm available for freelance projects, collaborations and full-time positions. Let's talk!",
    "ct.btn":  "Send message →",
    "footer.made": "Made with ♥ in Colombia",
  }
};

let currentLang = 'es';

function applyTranslations(lang) {
  currentLang = lang;
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTranslations(btn.dataset.lang);
      document.getElementById('langMenu').classList.remove('open');
    });
  });
});
