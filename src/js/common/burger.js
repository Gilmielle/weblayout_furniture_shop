document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const burgerClose = document.getElementById('burger-close');

  // burger.addEventListener('click', () => {
  //   menu.style.display = 'block';
  // })
  
  // burgerClose.addEventListener('click', () => {
  //   menu.style.display = 'none';
  // })

  function burgerGsap() {

    if(screen.width <= 768) {
      const tlBurger = gsap.timeline({paused: true});
      tlBurger
        .fromTo('#menu', {display: 'none'}, {display: 'block'})
        .fromTo('#menu', {transform: 'translateY(-20%)', opacity: 0}, {transform: 'none', opacity: 1})
        .fromTo('#burger-close', {duration: 0.5, opacity: 0, y: '-45', ease: "slow(0.7, 0.7, false)"}, {opacity: 1, y: 0})
        .fromTo('.site-navigation', {duration: 0.5, opacity: 0, y: '45', ease: "slow(0.7, 0.7, false)"}, {opacity: 1, y: 0});
      burger.addEventListener('click', function() {
        tlBurger.play()
      });
 
      burgerClose.addEventListener('click', function() {
        tlBurger.reverse();
      });
    } else {
      ['#menu', '#burger-close', '.site-navigation'].forEach(item => document.querySelector(item).removeAttribute("style"));
    }
  }
  
  burgerGsap();
  window.addEventListener("resize", burgerGsap);
})