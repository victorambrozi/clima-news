import Swiper from "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js";

export function controlSwiper() {
  return new Swiper(".swiper", {
    // Optional parameter
    direction: "horizontal",
    loop: true,
    centeredSlides: true,
    slidesPerView: "auto",
    effect: "coverflow",
    coverflowEffect: {
      rotate: 20,
      slideShadows: true,
      // modifier: 1
      // scale: 1
      stretch: -20,
    },   
  });
}
