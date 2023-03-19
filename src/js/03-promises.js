import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(formEl.delay.value);
  let step = Number(formEl.step.value);
  let amount = Number(formEl.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    delay += step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const object = { position, delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(object);
      } else {
        reject(object);
      }
    }, delay);
  });
}
