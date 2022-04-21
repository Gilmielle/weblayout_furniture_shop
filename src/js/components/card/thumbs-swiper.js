document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#thumbs-swiper', {
    direction: 'horizontal',
    loop: false,
    spaceBetween: 38,
    slidesPerGroup: 1,
    slidesPerView: 'auto',
  
    breakpoints: {
      320: {
        direction: 'horizontal',
        slidesPerGroup: 1,
        slidesPerView: 'auto',
        spaceBetween: 38,
      },

      577: {
        direction: 'vertical',
        slidesPerGroup: 1,
        slidesPerView: 4,
        spaceBetween: 27,
      },

      769: {
        direction: 'horizontal',
        slidesPerGroup: 3,
        slidesPerView: 'auto',
        spaceBetween: 38,
      },
    },
 
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
})