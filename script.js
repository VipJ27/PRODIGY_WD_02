let isRunning = false;
let startTime;
let interval;
let laps = [];
let lapStartTime;

function startStop() {
    if (isRunning) {
        clearInterval(interval);
        document.getElementById('startStop').textContent = 'Start';
        isRunning = false;
    } else {
        startTime = Date.now() - (lapStartTime || 0);
        interval = setInterval(updateTime, 10);
        document.getElementById('startStop').textContent = 'Stop';
        isRunning = true;
    }
}

function reset() {
    clearInterval(interval);
    document.getElementById('display').textContent = '00:00.00';
    document.getElementById('startStop').textContent = 'Start';
    isRunning = false;
    lapStartTime = 0;
    laps = [];
    document.getElementById('laps').textContent = '';
}

function lap() {
    if (isRunning) {
        const lapTime = (Date.now() - startTime) / 1000;
        laps.push(lapTime);
        lapStartTime = Date.now();
        displayLaps();
    }
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = (currentTime % 1000).toString().slice(0, 2);

    const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
    document.getElementById('display').textContent = displayTime;
}

function displayLaps() {
    const lapsContainer = document.getElementById('laps');
    lapsContainer.textContent = '';

    for (let i = 0; i < laps.length; i++) {
        const lapTime = laps[i];
        const lapItem = document.createElement('div');
        lapItem.textContent = `Lap ${i + 1}: ${lapTime.toFixed(2)} seconds`;
        lapsContainer.appendChild(lapItem);
    }
}

reset();
