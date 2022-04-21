document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#promo-swiper', {
    direction: 'horizontal',
    loop: true,
    clickable: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
  
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
})