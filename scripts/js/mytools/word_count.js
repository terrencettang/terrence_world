var identifier = document.querySelector('.containers');
if (identifier .getAttribute('title') === null){
    identifier .setAttribute("title", "");
    function countWords() {
        var textArea = document.getElementById("textArea");
        var wordCountElement = document.getElementById("wordCount");
        var charCountElement = document.getElementById("charCount");
        var digitCountElement = document.getElementById("digitCount");
        var chineseCharCountElement = document.getElementById("chineseCharCount");
        var chinesePunctCountElement = document.getElementById("chinesePunctCount");
        var englishCharCountElement = document.getElementById("englishCharCount");
        var englishPunctCountElement = document.getElementById("englishPunctCount");
        var englishWordCountElement = document.getElementById("englishWordCount");
        var  wordFrequencyElement = document.getElementById("wordFrequency");
    
        // Get the text from the textarea
        var text = textArea.value;
    
        // Remove leading and trailing whitespace
        text = text.trim();
    
        if (text === "") {
            // Clear all count elements when no text is entered
            wordCountElement.textContent = 0;
            charCountElement.textContent = 0;
            digitCountElement.textContent = 0;
            chineseCharCountElement.textContent = 0;
            chinesePunctCountElement.textContent = 0;
            englishCharCountElement.textContent = 0;
            englishPunctCountElement.textContent = 0;
            englishWordCountElement.textContent = 0;
        return;
        }
    
        var words = text.split(/\s+/);
        var wordCount = words.length;
        var charCount = text.length;
        var digitCount = text.replace(/\D/g, "").length;
        var chineseChar = text.match(/[\u4e00-\u9fa5]/g);
        var chineseCharCount = chineseChar?.length || 0;
        var chinesePunctCount = text.match(/[\u3000-\u303f\u2000-\u206f]/g)?.length || 0;
        var englishChar = text.match(/[a-zA-Z]/g);
        var englishCharCount = englishChar?.length || 0; 
        var englishPunctCount = text.match(/[\u0020-\u002f\u003a-\u0040\u005b-\u0060\u007b-\u007e]/g)?.length || 0;
        var englishWord = text.match(/[a-zA-Z]+/g); 
        var englishWordCount = englishWord?.length || 0;

        var allCharacters = [];

        if (chineseChar && englishWord) {
        allCharacters = chineseChar.concat(englishWord);
        } else if (chineseChar) {
        allCharacters = chineseChar;
        } else if (englishWord) {
        allCharacters = englishWord;
        }

        // Calculate word frequency
        var wordFrequency = {};
        allCharacters.forEach(function(word) {
            if (wordFrequency.hasOwnProperty(word)) {
                wordFrequency[word]++;
            } else {
                wordFrequency[word] = 1;
            }
        });

        // Convert wordFrequency object to array of key-value pairs
        var wordFrequencyArray = Object.entries(wordFrequency);

        // Sort the array in descending order based on the count
        wordFrequencyArray.sort(function(a, b) {
            return b[1] - a[1];
        });
            
        // Update the count elements
        wordCountElement.textContent = wordCount;
        charCountElement.textContent = charCount;
        digitCountElement.textContent = digitCount;
        chineseCharCountElement.textContent = chineseCharCount;
        chinesePunctCountElement.textContent = chinesePunctCount;
        englishCharCountElement.textContent = englishCharCount;
        englishPunctCountElement.textContent = englishPunctCount;
        englishWordCountElement.textContent = englishWordCount;

        // Update the word frequency element
        var frequencyTable = "<table class='table_border noborder width50'><tr><td class='center'><b>Counts by Words</b></td></tr>";
        wordFrequencyArray.forEach(function(pair) {
            frequencyTable += "<tr><td>" + pair[0] + "</td><td>" + pair[1] + "</td></tr>";
        });
        frequencyTable += "</table>";
        wordFrequencyElement.innerHTML = frequencyTable;
    }
}