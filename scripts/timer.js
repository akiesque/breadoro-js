let isPaused = false;
let breakTime = false;
let timer;


let hour, minute, second;
let hours, minutes, seconds;

let sessions, breaks;
let notify;

function startTimer() {
    isPaused = false;
    notify = document.querySelector('.notify-text');
    hour = document.querySelector('#hours');
    minute = document.querySelector('#minutes');
    second = document.querySelector('#seconds');

    sessions = document.querySelector('#sessions');
    breaks = document.querySelector('#breaks');

    hours = Number(hour.value);
    minutes = Number(minute.value) > 59 ? 59 : Number(minute.value) % 60;
    seconds = Number(second.value) > 59 ? 59 : Number(second.value) % 60;

    timer = setInterval(() => {updateTimer()}, 1000);
}

function timerFormat(h, m, s) {
    h = String(h).padStart(2, '0');
    m = String(m).padStart(2, '0');
    s = String(s).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function updateTimer() {
    const timerElement = document.querySelector('#timer-container');
    timerElement.innerHTML = `<p>${timerFormat(hours, minutes, seconds)}</p>`;

    if (hours > 0 && !isPaused && minutes === 0 && seconds === 0) {
        hours --;
        minutes = 59;
        seconds = 59;
    } else if (!isPaused && minutes > 0 && seconds === 0) {
        minutes--;
        seconds = 59;
    } else if (!isPaused && seconds > 0) {
        seconds --;
    } else if (hours === 0 && minutes === 0 && seconds === 0) {
        if (!breakTime) {
        breakTime = true;
        breakValue = Number(breaks.value);
        minutes = breakValue > 59 ? 59 : breakValue % 60;
        timerElement.innerHTML = `<p>${timerFormat(hours, minutes, seconds)}</p>`;
        notify.innerHTML = "Session complete! Let's have a break.";
        } else {
            breakTime = false;
            if (sessions.value === 0) {
                clearInterval(timer);
                notify.innerHTML = "All sessions complete! Good job!";
            } else {
            sessions.value > 0 ? sessions.value-- : 0;
            hours = Number(hour.value);
            minutes = Number(minute.value) > 59 ? 59 : Number(minute.value) % 60;
            seconds = Number(second.value) > 59 ? 59 : Number(second.value) % 60;
            timerElement.innerHTML = `<p>${timerFormat(hours, minutes, seconds)}</p>`;
            notify.innerHTML = "Break complete! Let's start the next session.";
            }   
        }
    }
}

function toggleTimerButton() {
    const toggleButton = document.querySelector('#timer-btn');
    isPaused = !isPaused;

    if (isPaused && toggleButton.innerText === 'Start') {
        startTimer();
        toggleButton.innerText = 'Pause';
    } else if (isPaused) {
        clearInterval(timer);
        toggleButton.innerText = 'Resume';
    }
}

function restartTimer() {
    clearInterval(timer);
    isPaused = true;
    notify.innerHTML = '';
    const timerElement = document.querySelector('#timer-container');
    timerElement.innerHTML = `<input placeholder="0" id="hours">
            <span>:</span>
            <input placeholder="0" id="minutes">
            <span>:</span>
            <input placeholder="0" id="seconds">
            <div class="timer-labels">
                <span>hours</span>
                <span>minutes</span>
                <span>seconds</span>`;
    let newHours = document.querySelector('#hours').value;
    let newMinutes = document.querySelector('#minutes').value;
    let newSeconds = document.querySelector('#seconds').value;
    timerFormat(newHours, newMinutes, newSeconds);
    clearInterval(timer);
    const toggleButton = document.querySelector('#timer-btn');
    toggleButton.innerText = 'Start';
}
