const handleMin = document.querySelector('input[name="filter-range-handle-min"]');
const handleMax = document.querySelector('input[name="filter-range-handle-max"]');
const inputMin = document.querySelector('input[name="filters-form-price-min"]');
const inputMax = document.querySelector('input[name="filters-form-price-max"]');
const rangeRail = document.querySelector('.filter-range__rail');
const rangeTrack = document.querySelector('.filter-range__track');
const updateView = function () {
  if (this.getAttribute('name') === 'filter-range-handle-min') {
    inputMin.value = this.value;
  } else {
    inputMax.value = this.value;
  }
  if (parseInt(handleMin.value) > parseInt(handleMax.value)) {
    rangeTrack.style.width = (handleMin.value - handleMax.value) / this.getAttribute('max') * 100 + '%';
    rangeTrack.style.left = handleMax.value / this.getAttribute('max') * 100 + '%';
    inputMin.value = handleMax.value;
    inputMax.value = handleMin.value;
  } else {
    rangeTrack.style.width = (handleMax.value - handleMin.value) / this.getAttribute('max') * 100 + '%';
    rangeTrack.style.left = handleMin.value / this.getAttribute('max') * 100 + '%';
  }
};

document.addEventListener('DOMContentLoaded', function () {
  updateView.call(handleMin);
  updateView.call(handleMax);
  handleMin.addEventListener('input', function () {
    rangeTrack.style.backgroundColor = '#7033AC';
    updateView.call(this);
  });

  handleMin.addEventListener('mouseleave', function () {
    rangeTrack.style.backgroundColor = '#A65CF0';
  });

  inputMin.addEventListener('change', function () {
    handleMin.value = this.value;
    updateView.call(handleMin);
  });

  handleMax.addEventListener('mouseleave', function () {
    rangeTrack.style.backgroundColor = '#A65CF0';
  });

  handleMax.addEventListener('input', function () {
    rangeTrack.style.backgroundColor = '#7033AC';
    updateView.call(this);
  });

  inputMax.addEventListener('change', function () {
    handleMax.value = this.value;
    updateView.call(handleMax);
  });
});