document.addEventListener('DOMContentLoaded', function () {
  const tagsList = document.querySelector('.product-tags');
  const checkboxes = document.querySelectorAll('.filters-form__checkbox');
  const priceMaxInput = document.getElementsByName('filters-form-price-max')[0];
  const priceMaxHandle = document.getElementById('filter-range-handle-max');

  checkboxes.forEach((checkbox) => {
    const checkboxInput = checkbox.querySelector('input');
    const checkboxLabel = checkbox.querySelector('.checkbox__label');

    if(checkboxInput.checked) {
      createCatalogTag(checkboxInput);
    } else {
    }

    checkboxLabel.addEventListener('click', function() {
      if(!checkboxInput.checked) {
        checkboxInput.setAttribute('checked', '');
        createCatalogTag(checkboxInput);
      } else {
        checkboxInput.removeAttribute('checked', '');
        const path = checkboxInput.value
        const target = tagsList.querySelector(`[data-tag="${path}"]`);
        target.remove();
      }
    })
  });

  createCatalogTag(priceMaxInput);
  
  priceMaxInput.addEventListener('change', function() {
    let priceTag = document.querySelector('.product-tags__item_price');
    if(priceTag === null) {
      createCatalogTag(priceMaxInput);
    } else {
      priceTag = document.querySelector('.product-tags__item_price');
      const priceTagSpan = priceTag.querySelector('.product-tags__text');
      priceTagSpan.textContent = 'До ' + priceMaxInput.value;
    }
  });

  priceMaxHandle.addEventListener('mouseleave', function () {
    let priceTag = document.querySelector('.product-tags__item_price');
    if(priceTag === null) {
      createCatalogTag(priceMaxInput);
    } else {
      priceTag = document.querySelector('.product-tags__item_price');
      const priceTagSpan = priceTag.querySelector('.product-tags__text');
      priceTagSpan.textContent = 'До ' + priceMaxInput.value;
    }
  });

  function createCatalogTag(input) {
    const tagListItem = createDOMElement('li', {
      classList: ['product-tags__item'],
    }, tagsList);
    if(input.name === 'filters-form-price-max') {
      tagListItem.dataset.tag = 'filters-form-price-max'
    } else {
      tagListItem.dataset.tag = input.value;
    }

    const tagText = createDOMElement('span', {
      classList: ['product-tags__text'],
      textContent: input.value,
    }, tagListItem);
    const tagBtn = createDOMElement('button', {
      classList: ['product-tags__btn', 'btn'],
    }, tagListItem);

    if(input.name === 'category') {
      tagListItem.classList.add('product-tags__item_furniture');
    } else if(input.name === 'discount') {
      tagListItem.classList.add('product-tags__item_discount');
    } else if(input.name === 'color') {
      tagListItem.classList.add('product-tags__item_color');
    } else {
      tagListItem.classList.add('product-tags__item_price');
      tagText.textContent = 'До ' + input.value;
    }

    tagBtn.addEventListener('click', () => {
      const path = tagBtn.parentNode.dataset.tag
      if(path !== 'filters-form-price-max') {
        const connectedInput = document.querySelector(`input[value="${path}"]`);
        connectedInput.removeAttribute('checked', '');
      } else {
        priceMaxInput.value = '2000';
      }
      tagBtn.parentNode.remove();
    })
  }
});