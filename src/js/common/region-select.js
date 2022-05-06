window.addEventListener('DOMContentLoaded', function() {
  const element = document.querySelector('#region-select');
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
  });
})
