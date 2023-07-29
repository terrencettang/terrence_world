function generateRandomNumber() {
    // Get the minimum and maximum values from the input fields
    var min = parseFloat(document.getElementById("min").value);
    var max = parseFloat(document.getElementById("max").value);

    if (min > max) {
        alert("Minimum value must be less than or equal to maximum value");
        return; // Exit the function if the check fails
    }

    // Get the number of decimal places from the input field
    var decimalPlaces = parseInt(document.getElementById("decimal-places").value);

    // Generate a random number between the minimum and maximum values
    var randomNumber = Math.random() * (max - min) + min;

    // Round the random number to the specified number of decimal places
    randomNumber = randomNumber.toFixed(decimalPlaces);

    // Display the random number on the page
    document.getElementById('textoutput').value = randomNumber;
}
function copyPassword() {
    var randomNumber = document.getElementById('textoutput');
    randomNumber.select();
    document.execCommand('copy');
}