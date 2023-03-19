import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dataStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dataCalendar = document.querySelector('#datetime-picker');

let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    differenceDate(selectedDates[0]);
  },
};

dataStart.setAttribute('disabled', true);

flatpickr(dataCalendar, options);

dataStart.addEventListener('click', onBtnStart);

function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

function differenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    dataStart.setAttribute('disabled', true);
    return window.alert('Please choose a date in the future');
  }
  deltaTime = selectedDates.getTime() - currentDate;
  formatDate = convertMs(deltaTime);

  renderDate(formatDate);
  dataStart.removeAttribute('disabled');
}

function renderDate(formatDate) {
  dataDays.textContent = addLeadingZero(formatDate.days);
  dataHours.textContent = addLeadingZero(formatDate.hours);
  dataMinutes.textContent = addLeadingZero(formatDate.minutes);
  dataSeconds.textContent = addLeadingZero(formatDate.seconds);
}

function startTimer() {
  dataStart.setAttribute('disabled', true);

  deltaTime -= 1000;

  if (deltaTime <= 0) {
    clearInterval(timerId);
  } else {
    formatDate = convertMs(deltaTime);
    renderDate(formatDate);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
