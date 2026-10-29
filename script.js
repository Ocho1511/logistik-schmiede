document.getElementById('year').textContent = new Date().getFullYear();

const menu = document.getElementById('menu');
const btn = document.querySelector('.menu-btn');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('open'); btn.setAttribute('aria-expanded', false); }
});

const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Kontaktformular: öffnet das Mailprogramm (statische Seite, kein Backend).
// Texte kommen als data-Attribute aus build.js (je Sprache).
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const note = document.getElementById('form-note');
  if (!form.checkValidity()) { note.textContent = form.dataset.invalid; return; }
  const subject = encodeURIComponent(form.dataset.subject + ' – ' + form.name.value);
  const body = encodeURIComponent(form.msg.value + '\n\n' + form.name.value + ' <' + form.email.value + '>');
  location.href = 'mailto:t.knecht@web.de?subject=' + subject + '&body=' + body;
  note.textContent = form.dataset.opening;
});
