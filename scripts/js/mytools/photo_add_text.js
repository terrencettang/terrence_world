var title_ = document.querySelector(".title");
var title_id = title_.getAttribute('id');
if (title_id === null){
    let canvas = document.getElementById("photo_canvas");
    let ctx = canvas.getContext("2d");
    let img, text, fontSize, fontColor, fontStyle;

    fontSize = 100

    function merge() {
        if (img && text) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Split the text into an array of lines
            const lines = text.split("\n");

            // Set up variables for tracking the position of each line of text
            const lineHeight = fontSize * 1.2; // Adjust this value to change line spacing
            const totalHeight = lineHeight * (lines.length - 1) + fontSize; // Calculate the total height of the text
            let lineY = canvas.height / 2 - (totalHeight / 2);

            ctx.font = fontSize + "px " + fontStyle;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = fontColor;

            // Iterate over the lines and break them into two lines if needed
            for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (ctx.measureText(line).width > canvas.width) {
                // Split the line into two parts
                const words = line.split(" ");
                let line1 = "";
                let line2 = "";

                for (let j = 0; j < words.length; j++) {
                const word = words[j];
                const wordWidth = ctx.measureText(word).width;

                if (ctx.measureText(line1 + word).width > canvas.width) {
                    // Add the current word to the second line
                    line2 += word + " ";
                } else {
                    // Add the current word to the first line
                    line1 += word + " ";
                }
                }

                // Draw the two lines of text
                const line1Height = lineHeight * i;
                const line2Height = lineHeight * (i + 1) + fontSize / 2;
                ctx.fillText(line1.trim(), canvas.width / 2, lineY + line1Height);
                ctx.fillText(line2.trim(), canvas.width / 2, lineY + line2Height);
            } else {
                // Draw the line of text
                const lineYOffset = lineHeight * i;
                ctx.fillText(line.trim(), canvas.width / 2, lineY + lineYOffset);
                }
            }
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
    document.getElementById("photo_add_textInput").addEventListener("input", function () {
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
}