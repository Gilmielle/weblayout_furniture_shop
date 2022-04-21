document.addEventListener('DOMContentLoaded', () => {
  const cardBtn = document.getElementById('order-modal-open');
  const modalClose = document.getElementById('feedback-modal-close');
  const modal = document.querySelector('.modal');
  const modalForm = document.getElementById('modal-form');
  const modalSuccess = document.getElementById('modal-form-success');
  const modalImages = document.getElementById('modal-images');
  const modalContainer = document.querySelector('.modal__container');
  const fullImgs = document.querySelectorAll('.product-card__img-item');

  fullImgs.forEach((fullImg) => {
    fullImg.addEventListener('click', () => {
      modal.classList.add('modal_active');
      modalContainer.classList.add('modal__container_wide');
      modalImages.classList.add('modal__content_active');
      modalSuccess.classList.remove('modal__content_active');
      modalForm.classList.remove('modal__content_active');
    })
  });

  cardBtn.addEventListener('click', () => {
    modal.classList.add('modal_active');
    modalContainer.classList.remove('modal__container_wide');
    modalImages.classList.remove('modal__content_active');
    modalSuccess.classList.remove('modal__content_active');
    modalForm.classList.add('modal__content_active');
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('modal_active');
  });
})