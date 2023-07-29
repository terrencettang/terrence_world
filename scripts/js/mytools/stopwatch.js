var containers_ = document.querySelector(".stopwatch");
var containers_id = containers_.getAttribute('id');
if (containers_id === null){
    containers_.setAttribute("id", "added");
    const stopwatch = document.querySelector('.containers');
    const display = stopwatch.querySelector('.time_display');
    const toggleBtn = stopwatch.querySelector('.toggle');
    const resetBtn = stopwatch.querySelector('.reset');
    const copyBtn = stopwatch.querySelector('.copy');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;

    function formatTime(time) {
        const ms = String(time % 1000).padStart(3, '0');
        const sec = String(Math.floor(time / 1000) % 60).padStart(2, '0');
        const min = String(Math.floor(time / 60000) % 60).padStart(2, '0');
        const hr = String(Math.floor(time / 3600000)).padStart(2, '0');
        return `${hr}:${min}:${sec}.${ms}`;
    }

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.value = formatTime(elapsedTime);
        }, 10);
        toggleBtn.textContent = 'Stop';
        resetBtn.disabled = true;
    }

    function stopTimer() {
        clearInterval(timerInterval);
        toggleBtn.textContent = 'Start';
        resetBtn.disabled = false;
    }

    function toggleTimer() {
        if (toggleBtn.textContent === 'Start') {
        startTimer();
        } else {
        stopTimer();
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        display.value = formatTime(elapsedTime);
        toggleBtn.textContent = 'Start';
        resetBtn.disabled = true;
    }

    function copyToClipboard() {
        display.select();
        document.execCommand('copy');
        }

    toggleBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    copyBtn.addEventListener('click', copyToClipboard);
}