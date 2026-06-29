
const navbarBtn = document.getElementById('navbar-btn');
const navbar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');

navbarBtn.addEventListener('click', () => {
  const isExpanded = navbarBtn.getAttribute('aria-expanded') === 'true';
  navbarBtn.setAttribute('aria-expanded', !isExpanded);
  document.body.classList.toggle('overflow-hidden')
  overlay.classList.toggle('hidden');
  overlay.classList.toggle('block');
  navbarBtn.classList.toggle('active')
  navbar.classList.toggle('hidden');
  navbar.classList.toggle('flex');
});
