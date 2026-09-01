const appsNav = document.getElementById('mainNav');
const appsScrollBar = document.getElementById('scrollBar');
const appsMobileMenu = document.getElementById('mobileMenu');
const appsBurger = document.getElementById('burgerBtn');

function updateAppsScroll() {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  if (appsScrollBar) appsScrollBar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
  if (appsNav) appsNav.classList.toggle('scrolled', scrolled > 60);
}

function toggleAppsMobileMenu() {
  if (!appsMobileMenu || !appsBurger) return;
  const isOpen = appsMobileMenu.classList.toggle('open');
  appsBurger.setAttribute('aria-expanded', String(isOpen));
  appsBurger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
}

window.addEventListener('scroll', updateAppsScroll, { passive: true });
appsBurger?.addEventListener('click', toggleAppsMobileMenu);
appsMobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  appsMobileMenu.classList.remove('open');
  appsBurger?.setAttribute('aria-expanded', 'false');
  appsBurger?.setAttribute('aria-label', 'Открыть меню');
}));

const appsRevealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(element => appsRevealObserver.observe(element));
updateAppsScroll();
