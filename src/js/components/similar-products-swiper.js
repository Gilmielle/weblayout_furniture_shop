document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#similar-products-swiper', {
    direction: 'horizontal',
    loop: false,
    spaceBetween: 32,
    slidesPerGroup: 4,
    slidesPerView: 4,
  
    breakpoints: {
      320: {
        spaceBetween: 16,
        slidesPerGroup: 2,
        slidesPerView: 2,
      },

      769: {
        spaceBetween: 32,
        slidesPerGroup: 3,
        slidesPerView: 3,
      },

      1025: {
        spaceBetween: 32,
        slidesPerGroup: 4,
        slidesPerView: 4,
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