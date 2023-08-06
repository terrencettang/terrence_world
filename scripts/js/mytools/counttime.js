var obj = document.createElement('audio');
obj.src = location.origin + "/terrence_world/sound/firealarm.mp3";
obj.id = "audio";
document.getElementById('main').appendChild(obj);

var setButton = document.getElementById("setbutton");
setButton.addEventListener("click", function() {
    const countdownElement = document.getElementById('countdown');
    var timer;
    var isTimerSet = false;
    if (!isTimerSet) {
        var hours = document.getElementById('hours').value;
        var minutes = document.getElementById('minutes').value;
        var seconds = document.getElementById('seconds').value;
        var totalSeconds = (hours * 3600) + (minutes * 60) + Number(seconds);

        var audio = document.getElementById('audio');
        timer = setInterval(function() {
            totalSeconds--;
            if (totalSeconds < 0) {
            clearInterval(timer);
            audio.play();
            alert('Timer finished!');
            } else {
            var displayHours = Math.floor(totalSeconds / 3600);
            var displayMinutes = Math.floor((totalSeconds % 3600) / 60);
            var displaySeconds = totalSeconds % 60;
            var displaytime = '';
            if (displayHours > 0) {
                displaytime =  displayHours + 'H ' + displayMinutes + 'M ' + displaySeconds + 'S';
            }
            else if (displayMinutes > 0) {
                displaytime =  displayMinutes + 'M ' + displaySeconds + 'S';
            }
            else {
                displaytime =  displaySeconds + 'S';
            }
            countdownElement.innerText = displaytime;
            }
        }, 1000);
        isTimerSet = true;
        setButton.innerText = "Stop";
        }
    else {
        clearInterval(timer);
        countdownElement.innerText = '';
        isTimerSet = false;
        setButton.innerText = "Start";
        }   
    }
)
