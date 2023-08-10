var uploadInput = document.getElementById('uploadInput');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var colorInput = document.getElementById('colorInput');
var customColorInput = document.getElementById("customColorInput");

uploadInput.addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        const width = img.width;
        const height = img.height;
        const ratio = height / width;
        const paddingColor = colorInput.value;
  
        if (ratio > 5 / 4) {
          const newWidth = height / (5/4);
          const padding = (newWidth - width) / 2;
          canvas.width = newWidth;
          canvas.height = height;
          ctx.fillStyle = paddingColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, padding, 0, width, height);
        } else {
          canvas.width = width;
          canvas.height = height;
          ctx.fillStyle = paddingColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, width, height);
        }
      };
  
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

colorInput.addEventListener("change", function () {
    const paddingColor = colorInput.value;
    if (this.value === "custom") {
        customcolorInput.style.display = "white";
        paddingColor = customcolorInput.value;
    } else {
        customcolorInput.style.display = "none";
        paddingColor = colorInput.value;
    }
    ctx.fillStyle = paddingColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});
customcolorInput.addEventListener("input", function () {
    paddingColor = this.value;
});