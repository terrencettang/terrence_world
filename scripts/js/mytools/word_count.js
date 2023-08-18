var containers_ = document.querySelector(".containers");
var containers_id = containers_.getAttribute('id');
if (containers_id === null){
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
    
        // Get the text from the textarea
        var text = textArea.value;
        console.log(text);
    
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
    
        var wordCount = text.trim().split(/\s+/).length;
        var charCount = text.length;
        var digitCount = text.replace(/\D/g, "").length;
        var chineseCharCount = text.match(/[\u4e00-\u9fa5]/g)?.length || 0;
        var chinesePunctCount = text.match(/[\u3000-\u303f\u2000-\u206f]/g)?.length || 0;
        var englishCharCount = text.match(/[a-zA-Z]/g)?.length || 0;
        var englishPunctCount = text.match(/[\u0020-\u002f\u003a-\u0040\u005b-\u0060\u007b-\u007e]/g)?.length || 0;
        var englishWordCount = text.match(/[a-zA-Z]+/g)?.length || 0;
    
        // Update the count elements
        wordCountElement.textContent = wordCount;
        charCountElement.textContent = charCount;
        digitCountElement.textContent = digitCount;
        chineseCharCountElement.textContent = chineseCharCount;
        chinesePunctCountElement.textContent = chinesePunctCount;
        englishCharCountElement.textContent = englishCharCount;
        englishPunctCountElement.textContent = englishPunctCount;
        englishWordCountElement.textContent = englishWordCount;
    }
}