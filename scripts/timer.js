let isPaused = false;
let breakTime = false;
let timer;
let pomoTimer;


let minute, min;
let minutes, seconds;

let sessions, breaks, settings, sessionsDone;
let notify;

const settingsBtn = document.querySelector('#settings-btn');

function startTimer() {
    isPaused = false;
    pomoTimer = document.querySelector('.pomo-time');
    notify = document.querySelector('.notify-text');
    minute = document.querySelector('#minutes');
    settings = document.querySelector('.settings-container');

    min = Number(document.querySelector('#minutes').value)

    sessions = Number(document.querySelector('#sessions').value) || 4;
    breaks = Number(document.querySelector('#breaks').value) || 5;

    seconds = 0;
    minutes = Number(minute.value) > 59 ? 59 : Number(minute.value) % 60 || 25;
    
    document.querySelector('.settings-container').classList.add('hidden');
    document.querySelector('.settings-display').classList.add('hidden');

    pomoTimer.innerHTML = `<p>${timerFormat(minutes, seconds)}</p>`;
    settingsBtn.disabled = true;

    updateTimer();
    timer = setInterval(() => {updateTimer()}, 1000);
    displaySettings();
    breadGet();
}

function timerFormat(m, s) {
    m = String(m).padStart(2, '0');
    s = String(s).padStart(2, '0');
    return `${m}:${s}`;
}

function updateTimer() {
    const pomoTimer = document.querySelector('.pomo-time');
    pomoTimer.innerHTML = `${timerFormat(minutes, seconds)}`;

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
            sessionsDone += 1;
            if (sessions === 0 && sessionsDone === sessions) {
                clearInterval(timer);
                notify.innerHTML = "All sessions complete! Good job!";
            } else {
                if (sessions > 0 &&sessionsDone === 4) {
                    minutes = breaks === 5 ? 30 : breaks + minutes;
                    seconds = Number(second.value) > 59 ? 59 : Number(second.value) % 60;
                    pomoTimer.innerHTML = `<p>${timerFormat(minutes, seconds)}</p>`;
                    notify.innerHTML = "Break complete! Let's start the next session.";
                }
            
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
    document.querySelector('.settings-container').classList.remove('hidden');
    document.querySelector('.settings-display').classList.add('hidden');
    const minute = document.querySelector('#minutes');
    minutes = Number(minute.value) || 25;
    seconds = 0;
    sessions = 0;
    breaks = 0;
    breakTime = false;
    isPaused = true;
    settingsBtn.disabled = false;
    notify.innerHTML = '';
    breadGet();
    pomoTimer.innerHTML = `<p>${timerFormat(minutes, seconds)}</p>`;
    const toggleButton = document.querySelector('.timer-btn');
    toggleButton.innerText = 'Start';

    const alertElement = document.getElementById('bread-notif');
    if (alertElement) alertElement.classList.remove('show');
}

function displaySettings() {
    document.querySelector('.settings-display').classList.remove('hidden');
    const displaySessions = document.querySelector('#display-sessions');
    const displayBreaks = document.querySelector('#display-breaks');
    displaySessions.innerHTML = `Sessions: ${sessions}`;
    displayBreaks.innerHTML = `Breaks: ${breaks} minutes`;
}

function openSettings() {
    const settingsScreen = document.querySelector('#settings-screen');
    settingsScreen.classList.remove('hidden');
}

function closeSettings() {
    const settingsScreen = document.querySelector('#settings-screen');
    settingsScreen.classList.add('hidden');
    const minute = document.querySelector('#minutes');
    minutes = Number(minute.value) || 25;
    seconds = 0;
    breadGet();
    document.querySelector('.pomo-time').innerHTML = `${timerFormat(minutes, seconds)}`;
}

function breadGet() {
    const alertElement = document.getElementById('bread-notif');
    if (!alertElement) return; 

    const currentSessions = Number(document.querySelector('#sessions').value) || 4;
    const currentMinutes = Number(document.querySelector('#minutes').value) || 25;

    if (currentSessions >= 2 && currentMinutes >= 25) {
        alertElement.classList.add('show');

        setTimeout(() => {
            alertElement.classList.remove('show');
        }, 3000); 
    } else {
        alertElement.classList.remove('show');
    }
}


