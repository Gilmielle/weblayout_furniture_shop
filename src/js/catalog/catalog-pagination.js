document.addEventListener('DOMContentLoaded', function () {
  const items = document.querySelectorAll('.catalog__item');
  const pagination = document.querySelector('.pagination');
  const catalogTitle = document.querySelector('.products-section__title');
  let pageNumber = 0;

  window.onload = function() {
    if(screen.width > 768) {
      addDataPage(9);
    } else {
      addDataPage(6);
    }
  }
  
  function addDataPage(itemsPerPage) {
    for(let i = 0; i < items.length; i++) {
      if(i % itemsPerPage === 0) {
        pageNumber++;
        createPaginationItem(pageNumber);
      }
      items[i].dataset.page = pageNumber;
      
      if(i < itemsPerPage) {
        items[i].classList.add('catalog__item_active');
      }
    }
  }

  function createPaginationItem(pageNumber) {
    const paginationListItem = createDOMElement('li', {
      classList: ['pagination__item'],
    }, pagination);

    const paginationLink = createDOMElement('a', {
      classList: ['pagination__link', 'btn_secondary'],
      textContent: pageNumber,
      attribute: {
        href: '#',
      }
    }, paginationListItem);

    if(pageNumber === 1) {
      paginationLink.classList.add('pagination__link_active');
    }

    paginationLink.addEventListener('click', function(evt) {
      evt.preventDefault();
      const path = evt.target.textContent;
      const targets = document.querySelectorAll(`[data-page="${path}"]`);
      const links = document.querySelectorAll('.pagination__link');

      items.forEach((item) => {
        item.classList.remove('catalog__item_active');
      });
      links.forEach((page) => {
        page.classList.remove('pagination__link_active');
      });

      evt.target.classList.add('pagination__link_active');
      targets.forEach((target) => {
        target.classList.add('catalog__item_active');
        const tlCatalogItems = gsap.timeline();
        tlCatalogItems
          .fromTo('.catalog__item_active', {opacity: '0', x: '90'}, {opacity: '1', x: '0', ease: "slow(0.7, 0.7, false)", duration: '1.2', delay: '0.3'});
        tlCatalogItems.play();
      });

      catalogTitle.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    })
  }
});