const setButton = document.getElementById("setbutton");
const alarmTimeInput = document.getElementById("alarmtime");
const messageDiv = document.getElementById("message");
const alarmAudio = new Audio(location.origin + "/terrence_world/sound/firealarm.mp3");

var alarmIntervalId = null;
var isAlarmSet = false;

setButton.addEventListener("click", function() {
if (!isAlarmSet) {
    var alarmTime = alarmTimeInput.value;
    if (alarmTime) {
        var now = new Date();
        var alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmTime.split(":")[0], alarmTime.split(":")[1], 0, 0);
        var timeToAlarm = alarmDate.getTime() - now.getTime();
        if (timeToAlarm < 0) {
            alarmDate.setDate(alarmDate.getDate() + 1);
            timeToAlarm = alarmDate.getTime() - now.getTime();
        }
        setTimeout(function() {
            alarmIntervalId = setInterval(function() {
                alarmAudio.play();
            }, 1000);
            messageDiv.style.display = "block";
            messageDiv.innerHTML = "Time's up!";
        }, timeToAlarm);
        setButton.textContent = "Stop";
        isAlarmSet = true;
    } else {
        alert("Please enter the alarm time.");
    }
} else {
    if (alarmIntervalId) {
        clearInterval(alarmIntervalId);
    }
    messageDiv.style.display = "none";
    setButton.textContent = "Set Alarm";
    isAlarmSet = false;
}
});