var identifier = document.querySelector('.containers');
if (identifier .getAttribute('title') === null){
    identifier .setAttribute("title", "");

  var uploadInput = document.getElementById('uploadInput');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var colorInput = document.getElementById('colorInput');
  var customColorInput = document.getElementById("customColorInput");
  var width = 0;
  var height = 0;
  var padding = 0;
  var ratio =0;
  var img = null;

  console.log(customColorInput);

  uploadInput.addEventListener('change', handleFileUpload);

  function handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
    
      reader.onload = function (event) {
        img = new Image();
        img.onload = function () {
          width = img.width;
          height = img.height;
          ratio = height / width;
          const paddingColor = colorInput.value;
    
          if (ratio > 5 / 4) {
            const newWidth = height / (5/4);
            padding = (newWidth - width) / 2;
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
      var paddingColor = colorInput.value;
      if (this.value === "custom") {
          paddingColor = customColorInput.value;
      } else {
          paddingColor = colorInput.value;
      }
      ctx.fillStyle = paddingColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (ratio > 5 / 4) {
        ctx.drawImage(img, padding, 0, width, height);
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
  });
  customColorInput.addEventListener("change", function () {
    if (colorInput.value === "custom"){
      paddingColor = this.value;
    }
  });
}