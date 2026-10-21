import './style.css';

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileMenu = document.querySelector<HTMLElement>('#mobile-menu');
const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-link, .mobile-menu-bottom a');
const year = document.querySelector<HTMLElement>('#year');

function setMenu(open: boolean): void {
  if (!toggle || !mobileMenu) return;
  toggle.classList.toggle('is-open', open);
  mobileMenu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  mobileMenu.inert = !open;
  document.body.classList.toggle('menu-open', open);
}

toggle?.addEventListener('click', () => {
  setMenu(toggle.getAttribute('aria-expanded') !== 'true');
});

mobileLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

document.addEventListener('keydown', (event: KeyboardEvent) => {
  if (event.key === 'Escape') setMenu(false);
});

window.matchMedia('(min-width: 900px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});

if (year) year.textContent = String(new Date().getFullYear());
