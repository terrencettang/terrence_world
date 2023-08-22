function openPlayer() {
    var url = document.getElementById("url").value;
    var width = document.getElementById("width").value;
    var height = document.getElementById("height").value;
    
    if (url){
        var playerURL = "https://www.youtube.com/embed/" + getYouTubeVideoID(url);
    } else {
        alert ("Width/Height is/are missing. Please enter.");
        reutrn
    }
    if (width && height && !isNaN(width) && !isNaN(height)) { 
        var windowFeatures = "width=" + width + ",height=" + height + ",resizable=no";
    } else {
        alert("Width/Height is/are missing or invalid. Please enter valid numeric values.");
        return
    }
    var newWindow = window.open(playerURL, "YouTube Player", windowFeatures);

    //(Not Working)
    // Wait for the new window to load
    newWindow.addEventListener("load", function() {
    // Handle link clicks in the new window
    newWindow.document.addEventListener("click", function(event) {
      console.log("run");
      var target = event.target;
      var videoURL = null;

      event.preventDefault();
      console.log(target);

      // Check if the clicked element or its parent has a YouTube video ID in the URL
      if (target.href && target.href.includes("youtube.com")) {
        videoURL = target.href;
      } else if (target.parentNode.href && target.parentNode.href.includes("youtube.com")) {
        videoURL = target.parentNode.href;
      }

      if (videoURL) {
        event.preventDefault();
        var videoID = getYouTubeVideoID(videoURL);
        var embeddedURL = "https://www.youtube.com/embed/" + videoID;
        newWindow.location.href = embeddedURL;
      }
    }, true); // Use capture phase to ensure event handling within the new window
  })
}

  
  function getYouTubeVideoID(url) {
    var videoID = "";
    var pattern = /(?:\?v=|\/embed\/|\.be\/|\/watch\?v=|\/v\/|youtu\.be\/|\/embed\/|\/v=|^youtu\.be\/)([^#\&\?]*).*/;
    var match = url.match(pattern);
    
    if (match && match[1]) {
      videoID = match[1];
    }
    
    return videoID;
  }

  document.getElementById("width").addEventListener("input", function() {
    var width = parseInt(this.value);
    var aspectRatioOption = document.getElementById("aspectRatio");
    var heightInput = document.getElementById("height");
    
    if (aspectRatioOption.checked) {
      var height = Math.round((width * 9) / 16);
      heightInput.value = height;
    }
  });

  document.getElementById("height").addEventListener("input", function() {
    var height = parseInt(this.value);
    var aspectRatioOption = document.getElementById("aspectRatio");
    var widthInput = document.getElementById("width");
    
    if (aspectRatioOption.checked) {
      var width = Math.round((height * 16) / 9);
      widthInput.value = width;
    }
  });