const SHOWING_CLASS = "showing";
const firstSlide = document.querySelector(".slider_item:first-child");
const lastSlide = document.querySelector(".slider_item:last-child");

function slide() {
  const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);

  if (currentSlide) {
    currentSlide.classList.remove(SHOWING_CLASS);
    const nextSlide = currentSlide.nextElementSibling;
    if (nextSlide) {
      nextSlide.classList.add(SHOWING_CLASS);
    } else {
      firstSlide.classList.add(SHOWING_CLASS);
    }

  } else {
    firstSlide.classList.add(SHOWING_CLASS);
  }
}

function nextSlide() {
  const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
  if (currentSlide) {
    currentSlide.classList.remove(SHOWING_CLASS);
    const nextSlide = currentSlide.nextElementSibling;

    if (nextSlide) {
      nextSlide.classList.add(SHOWING_CLASS);
    } else {
      firstSlide.classList.add(SHOWING_CLASS);
    }
  }
}

function prevSlide() {
  const currentSlide = document.querySelector(`.${SHOWING_CLASS}`);
  if (currentSlide) {
    currentSlide.classList.remove(SHOWING_CLASS);
    const prevSlide = currentSlide.previousElementSibling;

    if (prevSlide) {
      prevSlide.classList.add(SHOWING_CLASS);
    } else {
      lastSlide.classList.add(SHOWING_CLASS);
    }
  }
}

function init() {
  firstSlide.classList.add(SHOWING_CLASS);
  const interval = setInterval(slide, 2000);
}

init();


