import Swiper from "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.esm.browser.min.js";

export function controlSwiper() {
  return new Swiper(".swiper", {
    // Optional parameter
    direction: "horizontal",
    autoHeight: true,
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    effect: "coverflow",
    spaceBetween: 20,

    // Modules
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },

    coverflowEffect: {
      rotate: 20,
      slideShadows: true,
    },

    autoplay: {
      delay: 2000
    }
  });
}
