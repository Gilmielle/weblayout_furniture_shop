document.addEventListener('DOMContentLoaded', function () {
  const thumbs = document.querySelectorAll('.thumbs-swiper__img');
  const fullImgs = document.querySelectorAll('.product-card__img-item');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', function(evt) {
      const path = evt.target.dataset.thumb;
      const targets = document.querySelectorAll(`[data-img="${path}"]`);

      fullImgs.forEach((fullImg) => {
        fullImg.classList.remove('product-card__img-item_active');
      });
      
      targets.forEach((target) => {
        target.classList.add('product-card__img-item_active');
      })
    })
  })
});