var identifier = document.querySelector('.containers');
if (identifier.getAttribute('title') === null){ 
    identifier.setAttribute("title", "");

var num1numMinSelect = document.getElementById('num1-num-min');
var num1numMaxSelect = document.getElementById('num1-num-max');
var num1denoMinSelect = document.getElementById('num1-deno-min');
var num1denoMaxSelect = document.getElementById('num1-deno-max');
var num2numMinSelect = document.getElementById('num2-num-min');
var num2numMaxSelect = document.getElementById('num2-num-max');
var num2denoMinSelect = document.getElementById('num2-deno-min');
var num2denoMaxSelect = document.getElementById('num2-deno-max');

var operatorSelect = document.getElementById('operator');

var operator = null;
var num1 = null;
var num2 = null;

function generateQuestion() {
    var num1numMinDigits = parseInt(num1numMinSelect.value);
    var num1numMaxDigits = parseInt(num1numMaxSelect.value);
    var num1denoMinDigits = parseInt(num1denoMinSelect.value);
    var num1denoMaxDigits = parseInt(num1denoMaxSelect.value);
    var num2numMinDigits = parseInt(num2numMinSelect.value);
    var num2numMaxDigits = parseInt(num2numMaxSelect.value);
    var num2denoMinDigits = parseInt(num2denoMinSelect.value);
    var num2denoMaxDigits = parseInt(num2denoMaxSelect.value);

    var num1numElement = document.getElementById('num1num');
    var num2numElement = document.getElementById('num2num');
    
    // Validate max >= min
    if (num1numMaxDigits < num1numMinDigits || num1denoMaxDigits < num1denoMinDigits || num2numMaxDigits < num2numMinDigits || num2denoMaxDigits < num2denoMinDigits) {
        // Handle validation error
        alert('Invalid input: max must be greater than or equal to min.');
        return;
    }

    if (operatorSelect.value === "random"){
        operator = generateRandom();
    } else {
        operator = operatorSelect.value;
    }

    var num1num = generateRandomNumber(num1numMinDigits, num1numMaxDigits);
    var num1deno = generateRandomNumber(num1denoMinDigits, num1denoMaxDigits);
    var num2num = generateRandomNumber(num2numMinDigits, num2numMaxDigits);
    var num2deno = generateRandomNumber(num2denoMinDigits, num2denoMaxDigits);

    num1 = new Fraction(num1num, num1deno);
    num2 = new Fraction(num2num, num2deno);

    num1numElement.textContent = num1num;
    num2numElement.textContent = num2num;
    document.getElementById('operater').textContent = operator;
    document.getElementById('num1deno').textContent = num1deno;
    document.getElementById('num2deno').textContent = num2deno;
    
}

function generateRandom() {
    var operators = ['+', '-', '×', '÷'];
    var randomOperator = operators[Math.floor(Math.random() * operators.length)];
    return randomOperator;
}

function generateRandomNumber(minDigits, maxDigits) {
    var min = Math.pow(10, minDigits - 1);
    var max = Math.pow(10, maxDigits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkAnswer() {
    var userAnswernum = parseInt(document.getElementById('answernum').value);
    var userAnswerdeno = parseInt(document.getElementById('answerdeno').value);
    var resultElement = document.getElementById('result');
    var messageElement = document.getElementById('resultmessage');
    var resultnumElement = document.getElementById('resultnum');
    var resultdenoElement = document.getElementById('resultdeno');

    // Validate user input
    if (isNaN(userAnswernum) || (isNaN(userAnswernum))) {
        messageElement.textContent = 'Invalid input. Please enter a valid number.';
        resultElement.classList.remove('correct');
        resultElement.classList.add('incorrect');
        return;
    }

    if (Number.isInteger(userAnswernum) && Number.isInteger(userAnswerdeno)) {
    } else {
        alert("Numerator and denominator must be integers.");
    }
    var userAnswer = Fraction(userAnswernum, userAnswerdeno);
    var correctAnswer;

    switch (operator) {
      case '+':
        correctAnswer = num1.add(num2);
        break;
      case '-':
        correctAnswer = num1.sub(num2);
        break;
      case '×':
        correctAnswer = num1.mul(num2);
        break;
      case '÷':
        correctAnswer = num1.div(num2);
        break;
    }
    var resultMessage;
  
    if (userAnswer.n === correctAnswer.n && userAnswer.d === correctAnswer.d){
      resultMessage = 'Correct!';
      resultnumElement.textContent = null;
      resultdenoElement.textContent = null;
      resultElement.classList.remove('incorrect');
      resultElement.classList.add('correct');
    } else {
      resultMessage = 'Incorrect. Answer: '
      resultnumElement.textContent = correctAnswer.n
      resultdenoElement.textContent = correctAnswer.d
      resultElement.classList.remove('correct');
      resultElement.classList.add('incorrect');
    }
  
    messageElement.textContent = resultMessage;
  }
}
