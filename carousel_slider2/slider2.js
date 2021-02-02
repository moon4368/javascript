const slider = document.querySelector(".slider");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

const TOTAL_SLIDES = 5;
let currentIndex = 1;

const nextSlide = () => {
  if (currentIndex <= TOTAL_SLIDES) {
    currentIndex + 1;
    slider.style.transform = `translate(-${currentIndex}00vw)`;
    console.log(currentIndex);
  } else {
    currentIndex = 1;
    slider.style.transform = `translate(0)`;
  }
}

const prevSlide = () => {
  if (currentIndex === 1) {
    currentIndex = TOTAL_SLIDES;
    slider.style.transform = `translate(-${TOTAL_SLIDES - 1}00vw)`;
  } else {
    currentIndex - 1;
    slider.style.transform = `translate(-${currentIndex - 1}00vw)`;
  }
}


function init() {
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

}

init()