let isPaused = false;
let breakTime = false;
let timer;


let minute, second;
let minutes, seconds;

let sessions, breaks, settings;
let notify;

function startTimer() {
    isPaused = false;
    const timerContainer = document.querySelector('.timer-container');
    notify = document.querySelector('.notify-text');
    minute = document.querySelector('#minutes');
    second = document.querySelector('#seconds');
    settings = document.querySelector('.settings-container');

    sessions = Number(document.querySelector('#sessions').value) || 4;
    breaks = Number(document.querySelector('#breaks').value) || 5;

    seconds = Number(second.value) > 59 ? 59 : Number(second.value) % 60;
     minutes = Number(minute.value) > 59 ? 59 : Number(minute.value) % 60 || seconds > 0 ? 0 : 25;
    
    document.querySelector('.input-container').classList.add('hidden');
    document.querySelector('.settings-container').classList.add('hidden');
    document.querySelector('.timer-container').classList.remove('hidden');
    timerContainer.innerHTML = `<p>${timerFormat(minutes, seconds)}</p>`;

    updateTimer();
    timer = setInterval(() => {updateTimer()}, 1000);
    displaySettings();
}

function timerFormat(m, s) {
    m = String(m).padStart(2, '0');
    s = String(s).padStart(2, '0');
    return `${m}:${s}`;
}

function updateTimer() {
    const timerContainer = document.querySelector('.timer-container');
    timerContainer.innerHTML = `<p>${timerFormat(minutes, seconds)}</p>`;

    if (minutes > 0 && seconds === 0) {
        if (breakTime) {
            notify.innerHTML = "Let's take a break."
        }
        minutes--;
        seconds = 59;
    } else if (seconds > 0) {
        seconds --;
    } else if (minutes === 0 && seconds === 0) {
        displaySettings();
        if (!breakTime) {
        breakTime = true;
        minutes = breaks > 59 ? 59 : breaks % 60;
        seconds = 0;
        notify.innerHTML = "Session complete!"
        // timerContainer.innerHTML = `<p>${timerFormat(minutes, seconds)}</p>`;
        } else {
            breakTime = false;

            sessions > 0 ? sessions-- : 0;
            if (sessions === 0) {
                clearInterval(timer);
                notify.innerHTML = "All sessions complete! Good job!";
            } else {
            minutes = Number(minute.value) > 59 ? 59 : Number(minute.value) % 60;
            seconds = Number(second.value) > 59 ? 59 : Number(second.value) % 60;
            timerContainer.innerHTML = `<p>${timerFormat(minutes, seconds)}</p>`;
            notify.innerHTML = "Break complete! Let's start the next session.";
            }   
        }
    }
}

function toggleTimerButton() {
    const toggleButton = document.querySelector('.timer-btn');


    if (toggleButton.innerText === 'Start') {  
        startTimer();
        toggleButton.innerText = 'Pause';
    } else if (toggleButton.innerText === 'Pause') {
        clearInterval(timer);
        isPaused = true;
        toggleButton.innerText = 'Resume';
    } else if (toggleButton.innerText === 'Resume') {
        timer = setInterval(() => {updateTimer()}, 1000);
        isPaused = false;
        toggleButton.innerText = 'Pause';
    }   
}

function restartTimer() {
    clearInterval(timer);
    document.querySelector('.input-container').classList.remove('hidden');
    document.querySelector('.settings-container').classList.remove('hidden');
    document.querySelector('.settings-display').classList.add('hidden');
    document.querySelector('.timer-container').classList.add('hidden');
    minutes = 0;
    seconds = 0;
    sessions = 0;
    breaks = 0;
    breakTime = false;
    isPaused = true;
    notify.innerHTML = '';
    const toggleButton = document.querySelector('.timer-btn');
    toggleButton.innerText = 'Start';
}

function displaySettings() {
    document.querySelector('.settings-display').classList.remove('hidden');
    const displaySessions = document.querySelector('#display-sessions');
    const displayBreaks = document.querySelector('#display-breaks');
    displaySessions.innerHTML = `Sessions: ${sessions}`;
    displayBreaks.innerHTML = `Breaks: ${breaks}`;
}