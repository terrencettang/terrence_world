let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let img, text, fontSize, fontColor, fontStyle;

fontSize = 100

function merge() {
    if (img && text) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.font = fontSize  + "px " + fontStyle;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = fontColor;
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }
}

function setFontStyle() {
    fontStyle = document.getElementById("fontStyleInput").value;
}

document.getElementById("fileInput").addEventListener("change", function () {
    img = new Image();
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = URL.createObjectURL(this.files[0]);
});

document.getElementById("textInput").addEventListener("input", function () {
    text = this.value;
});

document.getElementById("fontSizeInput").addEventListener("input", function () {
    fontSize = parseInt(this.value);
});

document.getElementById("colorInput").addEventListener("change", function () {
    if (this.value === "custom") {
        document.getElementById("customColorInput").style.display = "block";
        fontColor = document.getElementById("customColorInput").value;
    } else {
        document.getElementById("customColorInput").style.display = "none";
        fontColor = this.value;
    }
});

document.getElementById("customColorInput").addEventListener("input", function () {
    fontColor = this.value;
});

document.getElementById("fontStyleInput").addEventListener("change", function () {
    setFontStyle();
});

setFontStyle(); // set default font style

// When the window is resized, clear the canvas and redraw the image and text
window.addEventListener("resize", function () {
    if (img && text) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        merge();
    }
});