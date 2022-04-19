document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#thumbs-swiper-modal', {
    direction: 'horizontal',
    loop: false,
    spaceBetween: 78,
    slidesPerGroup: 1,
    slidesPerView: "auto",
  
    breakpoints: {
      320: {
        slidesPerGroup: 1,
        slidesPerView: 1,
      },

      651: {
        slidesPerGroup: 2,
        slidesPerView: 2,
      },

      971: {
        slidesPerGroup: 1,
        slidesPerView: "auto",
      },

      1300: {
        spaceBetween: 78,
        slidesPerGroup: 1,
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