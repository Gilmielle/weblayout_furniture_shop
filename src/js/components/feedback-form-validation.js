window.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.feedback-form');
  const modal = document.querySelector('.modal');
  const modalForm = document.getElementById('modal-form');
  const modalSuccess = document.getElementById('modal-form-success');
  const modalClose = document.querySelector('#feedback-modal-close');
  const formInputs = form.querySelectorAll('input');
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999)-999-99-99");

  im.mask(selector);

  new JustValidate('.feedback-form', {
    colorWrong: '#FF6972',
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
        function: () => {
          const usernameField = document.getElementById('feedback-form-name');
          const username = usernameField.value;
          let fieldValid = username.match(/^[а-яa-z]+$/i);

          if(fieldValid) {
            usernameField.classList.add('validation-success');
          } else {
            usernameField.classList.remove('validation-success');
          }
          return fieldValid;
        }
      },

      phone: {
        required: true,
        function: () => {
          const phoneField = document.getElementById('feedback-form-tel');
          const phone = selector.inputmask.unmaskedvalue()
          let fieldValid = Number(phone) && phone.length === 10;
          if(fieldValid) {
            phoneField.classList.add('validation-success');
          } else {
            phoneField.classList.remove('validation-success');
          }
          return fieldValid;
        }
      },

      email: {
        email: true,
      }
    },

    messages: {
      name: {
        function: 'Недопустимый формат',
        required: 'Имя обязательно для заполнения',
        minLength: 'Минимум 2 символа',
        maxLength: 'Максимум 30 символов',
      },
      phone: 'Недопустимый формат',
      email: 'Недопустимый формат',
    },
  });

  modalClose.addEventListener('click', function() {
    modal.classList.remove('modal_active');
    if(modalForm) {
      formInputs.forEach((input) => {
        input.value = '';
        input.classList.remove('validation-success');
      })
      modalForm.classList.add('modal__content_active');
      modalSuccess.classList.remove('modal__content_active');
    }
  })

  form.addEventListener('submit', function(evt) {
    evt.preventDefault();

    const errors = document.querySelectorAll('.js-validate-error-field');
    if(errors.length === 0) {
      modal.classList.add('modal_active');
      if(modalForm) {
        modalForm.classList.remove('modal__content_active');
      }
      modalSuccess.classList.add('modal__content_active');
    }
  })
});