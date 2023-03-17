import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dataStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dataCalendar = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr(dataCalendar, options);

dataStart.addEventListener('click', () => {
  const selectedDate = dataCalendar.value;
  const currentDate = new Date();
  const countdownDate = new Date(selectedDate);
  if (countdownDate < currentDate) {
    // dataStart.disabled = true;
    // dataStart.setAttribute('disabled', true);
    window.alert('Please choose a date in the future');
    return;
  }

  const deltaTime = countdownDate - currentDate;
  //
  const time = convertMs(deltaTime);

  dataDays.textContent = addLeadingZero(time.days);
  dataHours.textContent = addLeadingZero(time.hours);
  dataMinutes.textContent = addLeadingZero(time.minutes);
  dataSeconds.textContent = addLeadingZero(time.seconds);

  const interval = setInterval(() => {
    const deltaTime = countdownDate - new Date();

    const time = convertMs(deltaTime);

    dataDays.textContent = addLeadingZero(time.days);
    dataHours.textContent = addLeadingZero(time.hours);
    dataMinutes.textContent = addLeadingZero(time.minutes);
    dataSeconds.textContent = addLeadingZero(time.seconds);

    if (deltaTime <= 0) {
      //   dataStart.disabled = false;
      clearInterval(interval);
    }
  }, 1000);
});

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
