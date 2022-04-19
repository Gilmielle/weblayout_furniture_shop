document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('site-search-input');
  const searchIcon = document.querySelector('.site-search__icon');

  searchInput.addEventListener('input', function(evt) {
    if(evt.target.value.length > 0) {
      searchIcon.style.fill = '#A65CF0';
    } else {
      searchIcon.style.fill = '#999999';
    }
  });
});

// classList - классы необходимо задавать через массив,
// attribute - атрибуты через объект,
// где ключ - это название атрибута, а значение - значение атрибута
function createElement(tag, options, parent = null) {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(options)) {
    if (key === 'classList') {
      for (let i = 0; i < value.length; i++) {
        el.classList.add(value[i]);
      }
    } else if (key === 'attribute') {
      for (const [prop, propVal] of Object.entries(value)) {
        el.setAttribute(prop, propVal);
      }
    } else {
      el[key] = value;
    }
  }

  if(parent !== null) {
    parent.append(el);
  }

  return el;
}