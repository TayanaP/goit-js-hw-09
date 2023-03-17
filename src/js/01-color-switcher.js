const buttonStartEl = document.querySelector('[data-start]');
const buttonStopEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

console.log(buttonStartEl);
console.log(buttonStopEl);
console.log(bodyEl);

buttonStartEl.addEventListener('click', onStart);
buttonStopEl.addEventListener('click', onStop);

let timerId = null;

function onStart(event) {
  buttonStartEl.disabled = true;
  buttonStopEl.disabled = false;

  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStop(event) {
  buttonStartEl.disabled = false;
  buttonStopEl.disabled = true;

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
