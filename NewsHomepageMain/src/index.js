const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click',() => {
  navbar.classList.toggle('active');
  overlay.classList.toggle('overlay');
  overlay.classList.toggle('hidden');
  document.body.classList.toggle('overflow-hidden');
})