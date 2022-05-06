document.addEventListener('DOMContentLoaded', function () {
  const dropfilterButtons = document.querySelectorAll('.filters-form__dorpfilter-button');
  
  dropfilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('filters-form__dorpfilter-button_active');
    })
  })
});