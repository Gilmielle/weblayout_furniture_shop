document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#special-offers-swiper', {
    direction: 'horizontal',
    loop: false,
    spaceBetween: 32,
    slidesPerGroup: 3,
    slidesPerView: "auto",
  
    breakpoints: {
      320: {
        slidesPerGroup: 1,
        slidesPerView: 1,
      },

      660: {
        slidesPerGroup: 2,
        slidesPerView: 2,
      },

      900: {
        slidesPerGroup: 3,
        slidesPerView: 3,
      },

      1325: {
        slidesPerGroup: 3,
        slidesPerView: "auto",
      },
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
})