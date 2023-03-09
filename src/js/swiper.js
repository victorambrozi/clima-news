const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    effect: 'coverflow',
    coverflowEffect: {
        rotate: 20,
        slideShadows: true,
        // modifier: 1
        // scale: 1
        stretch: -20
    },
    // spaceBetween: '2',

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        // type: 'progressbar'
    },
    // initialSlide: 1,
    // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
});


