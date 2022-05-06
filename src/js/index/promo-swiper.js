document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('#promo-swiper', {
    direction: 'horizontal',
    loop: true,
    clickable: true,
    preloadImages: false,
    lazy: true,
    autoplay: {
      delay: 4000,
    },
  
    pagination: {
      el: '.swiper-pagination',
      bulletClass:"swiper-pagination__btn btn custom-bullet",
      bulletActiveClass:"custom-bullet_active",
      clickable: true,
      renderBullet: function(index, className) {
        return '<button class="' + className + '">' + 
          '<svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" class="custom-bullet__backgr"></circle><circle cx="10" cy="10" r="9" class="custom-bullet__filler"></circle></svg></button>';
      },
    },
  
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
  });
})