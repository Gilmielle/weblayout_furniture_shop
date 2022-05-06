document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const burgerClose = document.getElementById('burger-close');

  // burger.addEventListener('click', () => {
  //   menu.style.display = 'block';
  // })
  
  // burgerClose.addEventListener('click', () => {
  //   menu.style.display = 'none';
  // })

  if(screen.width <= 768) {
    const tlBurger = gsap.timeline({paused: true});
    tlBurger
      .fromTo('#menu', {display: 'none'}, {display: 'block'})
      .from('#burger-close', {duration: 0.5, opacity: 0, y: '-45', ease: "slow(0.7, 0.7, false)"})
      .from('.site-navigation', {duration: 0.5, opacity: 0, y: '45', ease: "slow(0.7, 0.7, false)"});

    burger.addEventListener('click', function() {
      tlBurger.play()
    });

    burgerClose.addEventListener('click', function() {
      tlBurger.reverse();
    });
  }
})