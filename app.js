// Menú hamburguesa
const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = '#29323c';
  } else {
    header.style.backgroundColor = 'transparent';
  }
});

menu_item.forEach((item) => {
  item.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
  });
});

const eventDate = new Date("2025-09-30T13:00:00").getTime();

const red = document.getElementById("light-red");
const yellow = document.getElementById("light-yellow");
const green = document.getElementById("light-green");

const daysSpan = document.getElementById("days");
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");

const goMessage = document.getElementById("go-message");
let goShown = false;

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));

  daysSpan.textContent = days;
  hoursSpan.textContent = hours;
  minutesSpan.textContent = minutes;

  // Activar luces progresivamente
  red.classList.add("active");
  yellow.classList.toggle("active", days <= 0);
  green.classList.toggle("active", days <= 0 && hours <= 0);

  // Mostrar mensaje "GOOOO" solo si está en pantalla y el tiempo llegó
  if (distance <= 0 && isInViewport(goMessage) && !goShown) {
    goMessage.style.display = "block";
    goShown = true;
  }
}

// Verifica si el elemento está visible en pantalla
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Ejecutar al cargar
updateCountdown();

// Actualizar cada minuto
setInterval(updateCountdown, 60000);

// También verificar al hacer scroll
window.addEventListener("scroll", updateCountdown);

const images = [
  "img/Banner.jpg",
  "img/Banner.jpg",
  "img/Banner.jpg",
  "img/Banner.jpg",
  "img/Banner.jpg",
  "img/Banner.jpg",
  "img/Banner.jpg",
];

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = images[currentIndex];
  lightbox.style.display = "flex";

  // Reiniciar animación
  lightboxImg.classList.remove("zoom");
  void lightboxImg.offsetWidth; // Forzar reflow
  lightboxImg.classList.add("zoom");
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = images[currentIndex];

  // Reiniciar animación
  lightboxImg.classList.remove("zoom");
  void lightboxImg.offsetWidth;
  lightboxImg.classList.add("zoom");
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = images[currentIndex];

  // Reiniciar animación
  lightboxImg.classList.remove("zoom");
  void lightboxImg.offsetWidth;
  lightboxImg.classList.add("zoom");
}
