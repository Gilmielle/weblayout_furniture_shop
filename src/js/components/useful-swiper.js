document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#useful-swiper', {
    direction: 'horizontal',
    loop: false,
    spaceBetween: 32,
    slidesPerGroup: 1,
    slidesPerView: 2,
  
    breakpoints: {
      320: {
        slidesPerView: 1,
      },

      577: {
        slidesPerView: 2,
      },

      769: {
        slidesPerView: 3,
      },

      1025: {
        slidesPerView: 2,
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