// Theme toggle
(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored === 'light') root.classList.add('light');

  function toggleTheme() {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  }
  themeToggle?.addEventListener('click', toggleTheme);

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', (!expanded).toString());
    navMenu?.classList.toggle('show');
  });

  // Scroll spy
  const links = document.querySelectorAll('.nav-menu a[href^="#"]');
  const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = '#' + entry.target.id;
      const link = document.querySelector('.nav-menu a[href="' + id + '"]');
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
  sections.forEach(sec => observer.observe(sec));

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form -> mailto
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = encodeURIComponent(data.get('name'));
    const email = encodeURIComponent(data.get('email'));
    const message = encodeURIComponent(data.get('message'));
    const subject = `Portfolio enquiry from ${decodeURIComponent(name)}`;
    const body = `From: ${decodeURIComponent(name)} (%3C${decodeURIComponent(email)}%3E)%0D%0A%0D%0A${decodeURIComponent(message)}`;
    window.location.href = `mailto:mvunyiswasokanya@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();