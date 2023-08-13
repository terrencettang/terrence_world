var identifier = document.querySelector('.containers');
if (identifier .getAttribute('title') === null){
    identifier .setAttribute("title", "");


var num1MinSelect = document.getElementById('num1-min');
var num1MaxSelect = document.getElementById('num1-max');
var num2MinSelect = document.getElementById('num2-min');
var num2MaxSelect = document.getElementById('num2-max');
var operatorSelect = document.getElementById('operator');

var operator = null;

function generateQuestion() {
    var num1MinDigits = parseInt(num1MinSelect.value);
    var num1MaxDigits = parseInt(num1MaxSelect.value);
    var num2MinDigits = parseInt(num2MinSelect.value);
    var num2MaxDigits = parseInt(num2MaxSelect.value);
    
    if (operatorSelect.value === "random"){
        operator = generateRandom();
    } else {
        operator = operatorSelect.value;
    }

    var num1 = generateRandomNumber(num1MinDigits, num1MaxDigits);
    var num2 = generateRandomNumber(num2MinDigits, num2MaxDigits);
    var question = num1 + ' ' + operator + ' ' + num2;
    document.getElementById('question').textContent = question;
}

function generateRandom() {
    var operators = ['+', '-', '*', '/'];
    var randomOperator = operators[Math.floor(Math.random() * operators.length)];
    return randomOperator;
}

function generateRandomNumber(minDigits, maxDigits) {
    var min = Math.pow(10, minDigits - 1);
    var max = Math.pow(10, maxDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkAnswer() {
    var userAnswer = parseFloat(document.getElementById('answer').value);
    var resultElement = document.getElementById('result');
    var question = document.getElementById('question').textContent;
    var parts = question.split(' ');
    var num1 = parseFloat(parts[0]);
    var operator = parts[1];
    var num2 = parseFloat(parts[2]);
    var correctAnswer;

        // Validate user input
    if (isNaN(userAnswer)) {
        resultElement.textContent = 'Invalid input. Please enter a valid number.';
        resultElement.className = 'incorrect';
        return;
    }
  
    switch (operator) {
      case '+':
        correctAnswer = num1 + num2;
        break;
      case '-':
        correctAnswer = num1 - num2;
        break;
      case '*':
        correctAnswer = num1 * num2;
        break;
      case '/':
        correctAnswer = num1 / num2;
        break;
    }
  
    
    var decimalPlaces = userAnswer.toString().split('.')[1]?.length || 0;
    var tolerance = 0.1 ** decimalPlaces;
    var resultMessage;
  
    if (Math.abs(userAnswer - correctAnswer) < tolerance) {
      resultMessage = 'Correct!';
      resultElement.className = 'correct';
    } else {
      resultMessage = 'Incorrect. Correct answer: ' + correctAnswer;
      resultElement.className = 'incorrect';
    }
  
    resultElement.textContent = resultMessage;
  }
}