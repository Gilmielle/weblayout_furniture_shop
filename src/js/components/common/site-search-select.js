window.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('#site-search-select');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });
})
