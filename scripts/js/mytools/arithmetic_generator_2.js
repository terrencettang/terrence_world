var identifier = document.querySelector('.containers');
if (identifier .getAttribute('title') === null){
    identifier .setAttribute("title", "");

    var numMinSelect = document.getElementById('num-min');
    var numMaxSelect = document.getElementById('num-max');
    var numIntSelect = document.getElementById('num-no');
    var operatorSelect = document.getElementById('operators');
    var ParenthesesSelect = document.getElementById('parenthesesCheckbox');

    var operators = null;
    var operator = null;

    function generateQuestion() {
        var numMinDigits = parseInt(numMinSelect.value);
        var numMaxDigits = parseInt(numMaxSelect.value);
        var numIntegers = parseInt(numIntSelect.value);
        var checkboxes = document.querySelectorAll('input[name="operator"]:checked');
        var Parentheses = ParenthesesSelect.checked;

        // Validate max >= min
        if (numMaxDigits < numMinDigits) {
            // Handle validation error
            alert('Invalid input: max must be greater than or equal to min.');
            return;
        }
        // Create an array to store the selected values
        operators = Array.from(checkboxes, checkbox => checkbox.value);

        var question = '';
        var number = 0;
        for (var i = 0; i < numIntegers; i++) {
            number = generateRandomNumber(numMinDigits, numMaxDigits);
            operator = generateRandom();
            if (i === (numIntegers - 1)){
                question = question + ' ' + number;
            } else {
                question = question + number + ' ' + operator + ' ' ;
            }
        }
        if (Parentheses) {
            if (numIntegers >= 3){
                question = addParentheses(question, 0.5);
            }
        }
        document.getElementById('question').textContent = question;
    }

    function generateRandom() {
        var randomOperator = operators[Math.floor(Math.random() * operators.length)];
        return randomOperator;
    }
    
    function generateRandomNumber(minDigits, maxDigits) {
        var min = Math.pow(10, minDigits - 1);
        var max = Math.pow(10, maxDigits) - 1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function addParentheses(question, prob) {
        var randomQuestion = question.replace(/(\d+ \+ \d+|\d+ - \d+)/g, function(match) {
        // Randomly decide whether to add parentheses or not
        var addParentheses = Math.random() < prob;

        // Generate the parentheses randomly
        var openingParenthesis = addParentheses ? '(' : '';
        var closingParenthesis = addParentheses ? ')' : '';

        // Return the replaced value with parentheses
        return openingParenthesis + match + closingParenthesis;
    });
    return randomQuestion;
    }

    function checkAnswer() {
        var userAnswer = parseFloat(document.getElementById('answer').value);
        var resultElement = document.getElementById('result');
        var question = document.getElementById('question').textContent;
        var correctAnswer;
    
            // Validate user input
        if (isNaN(userAnswer)) {
            resultElement.textContent = 'Invalid input. Please enter a valid number.';
            resultElement.className = 'incorrect';
            return;
        }
        // change the question
        if (question.includes("×")) {
            question = question.replace("×", "*");
        }
        if (question.includes("÷")) {
            question = question.replace("÷", "/");
        }
        correctAnswer = eval(question);
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