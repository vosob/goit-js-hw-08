// ? 1. Робимо імпорти
import throttle from 'lodash.throttle';

// ? 2. Робимо рефи
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('textarea[name="message"]'),
  emailInput: document.querySelector('.feedback-form input'),
  throttle: require('lodash.throttle'),
};
// ? назва ключа мого localStorage
const STORAGE_KEY = 'feedback-form-state';

// ? 4. парсимо і отримуємо значення з localStorage
const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));

refs.form.addEventListener('input', refs.throttle(handlerOnInput, 500));

// ? провірка на наявність чогось у localStorage
if (storageData) {
  refs.textarea.value = storageData.message;
  refs.emailInput.value = storageData.email;
}
// ? 3. Створюємо ф-цію яка буде значення з інпутів записувати в localStorage
function handlerOnInput() {
  // ? створюємо об'єкт (ключ значення для створюємо)
  const userData = {
    email: refs.emailInput.value,
    message: refs.textarea.value,
  };
  // ? створюємо запис в створюємо в вигляді строки
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  //  ? действие по умолчанию не должно выполняться (перезагрузка при сабміті)
  event.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  // ? восстанавливает значения элемента формы по умолчанию (очищає форму)
  event.currentTarget.reset();
  // ? видаляємо запис з localStorage при відправці
  localStorage.removeItem(STORAGE_KEY);
}
