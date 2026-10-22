import './style.css';

const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileMenu = document.querySelector<HTMLElement>('#mobile-menu');
const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-link, .mobile-menu-bottom a');
const year = document.querySelector<HTMLElement>('#year');
const hero = document.querySelector<HTMLElement>('.hero');
const heroEyebrow = document.querySelector<HTMLElement>('#hero-eyebrow');
const heroTitleFirst = document.querySelector<HTMLElement>('#hero-title-first');
const heroTitleSecond = document.querySelector<HTMLElement>('#hero-title-second');
const heroDescription = document.querySelector<HTMLElement>('#hero-description');
const heroPhoto = document.querySelector<HTMLElement>('.hero-photo');
const heroSlideCount = document.querySelector<HTMLElement>('#hero-slide-count');
const heroSlideCaption = document.querySelector<HTMLElement>('#hero-slide-caption');
const heroArrows = document.querySelectorAll<HTMLButtonElement>('.hero-arrow');

const heroSlides = [
  {
    eyebrow: 'ТЁПЛЫЕ МОМЕНТЫ НАЧИНАЮТСЯ ЗДЕСЬ',
    titleFirst: 'Пряная',
    titleSecond: 'радость',
    description: 'Нежное тесто, ароматная корица и мягкая глазурь. Плюс чашечка любимого кофе — и день уже чуточку лучше.',
    caption: 'Только что из печи',
    imageLabel: 'Свежие булочки с корицей и глазурью',
  },
  {
    eyebrow: 'КОФЕЙНАЯ ПАУЗА — ТО, ЧТО НУЖНО',
    titleFirst: 'Время',
    titleSecond: 'для кофе',
    description: 'Насыщенный аромат, любимый вкус и тёплая булочка рядом — идеальный повод ненадолго замедлиться.',
    caption: 'Кофе по любви',
    imageLabel: 'Чашка свежего кофе',
  },
  {
    eyebrow: 'ХОРОШИЕ МОМЕНТЫ ЛУЧШЕ ДЕЛИТЬ',
    titleFirst: 'Вкуснее',
    titleSecond: 'вместе',
    description: 'Возьми любимую выпечку с собой или раздели её с близкими. Для хорошего момента нужен только повод.',
    caption: 'Для тебя и близких',
    imageLabel: 'Свежая выпечка на подносе',
  },
] as const;
let activeHeroSlide = 0;

function showHeroSlide(index: number): void {
  if (
    !heroEyebrow ||
    !heroTitleFirst ||
    !heroTitleSecond ||
    !heroDescription ||
    !heroPhoto ||
    !heroSlideCount ||
    !heroSlideCaption
  ) {
    return;
  }

  activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
  const slide = heroSlides[activeHeroSlide];

  heroEyebrow.textContent = slide.eyebrow;
  heroTitleFirst.textContent = slide.titleFirst;
  heroTitleSecond.textContent = slide.titleSecond;
  heroDescription.textContent = slide.description;
  heroPhoto.dataset.slide = String(activeHeroSlide + 1);
  heroPhoto.setAttribute('aria-label', slide.imageLabel);
  heroSlideCount.textContent = `${String(activeHeroSlide + 1).padStart(2, '0')} / ${String(heroSlides.length).padStart(2, '0')}`;
  heroSlideCaption.textContent = slide.caption;
}

heroArrows.forEach((button) => {
  button.addEventListener('click', () => {
    showHeroSlide(activeHeroSlide + Number(button.dataset.slideDirection));
  });
});

let touchStart: { x: number; y: number } | undefined;
hero?.addEventListener('pointerdown', (event: PointerEvent) => {
  if (event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY };
});
hero?.addEventListener('pointerup', (event: PointerEvent) => {
  if (event.pointerType !== 'touch' || !touchStart) return;
  const deltaX = event.clientX - touchStart.x;
  const deltaY = event.clientY - touchStart.y;
  touchStart = undefined;
  if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
    showHeroSlide(activeHeroSlide + (deltaX < 0 ? 1 : -1));
  }
});
hero?.addEventListener('pointercancel', () => {
  touchStart = undefined;
});

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
