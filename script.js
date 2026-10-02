/* ==========================================================
   PORTFOLIO – script.js
   1. Thème clair/sombre   2. Menu mobile
   3. Lien actif           4. Année
   ========================================================== */
(function () {
  'use strict';
 
  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);
 
  /* ---------- 1. Thème clair / sombre ---------- */
  const themeBtn = $('theme');
  const themeLabel = $('themeLabel');
  const themeIcon = $('themeIcon');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
 
  const currentTheme = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');
 
  function paintThemeButton() {
    const dark = currentTheme() === 'dark';
    themeLabel.textContent = dark ? 'Thème clair' : 'Thème sombre';
    themeIcon.textContent = dark ? '☀' : '☾';
  }
 
  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    paintThemeButton();
  });
  paintThemeButton();
 
  /* ---------- 2. Menu mobile ---------- */
  const burger = $('burger');
 
  function setMenu(open) {
    document.body.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  }
 
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('open')));
  $('scrim').addEventListener('click', () => setMenu(false));
  document.querySelectorAll('.side a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
 
  /* ---------- 3. Lien actif au défilement ---------- */
  const links = {};
  document.querySelectorAll('.side nav a[href^="#"]').forEach((a) => {
    links[a.getAttribute('href').slice(1)] = a;
  });
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.side a.active').forEach((a) => a.classList.remove('active'));
      const link = links[entry.target.id];
      if (link) link.classList.add('active');
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
 
  document.querySelectorAll('main section').forEach((s) => observer.observe(s));
 
  /* ---------- 4. Année du pied de page ---------- */
  $('year').textContent = new Date().getFullYear();
})();
 
