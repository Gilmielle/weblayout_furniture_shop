document.addEventListener('DOMContentLoaded', () => {
  const highRatingOpenBtn = document.getElementById('high-rating-open-btn');
  const highRatingCloseBtn = document.getElementById('high-rating-close-btn');
  highRatingCloseBtn.style.display = 'none';

  const tlHighRating = gsap.timeline({paused: true});
  
  if(screen.width > 1024) {
    tlHighRating
      .fromTo('.high-rating__product_hidden', 
        {duration: 0.5, opacity: 0, display: 'none', ease: "slow(0.7, 0.7, false)"}, 
        {opacity: 1, display: 'block'});
  }

  if(screen.width <= 1024) {
    tlHighRating
      .fromTo('.high-rating__product_mobile-hidden, .high-rating__product_hidden', 
        {duration: 0.5, opacity: 0, display: 'none', ease: "slow(0.7, 0.7, false)"}, 
        {opacity: 1, display: 'block'});
  }

  highRatingOpenBtn.addEventListener('click', function() {
    tlHighRating.play();
    highRatingOpenBtn.style.display = 'none';
    highRatingCloseBtn.style.display = 'block';
  });
  
  highRatingCloseBtn.addEventListener('click', function() {
    tlHighRating.reverse();
    highRatingCloseBtn.style.display = 'none';
    highRatingOpenBtn.style.display = 'block';
  });
})