var chinese_words = [];
async function load_chi_words() {
    // Load Chinese words here...
    const response = await fetch(location.origin + '/terrence_world/data/csv/mandarin_words.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    headers[headers.length - 1] = headers[headers.length - 1].trim();
    
    for (let i = 1; i < lines.length; i++) {
        const values = [];
        let currentVal = '';
        let insideQuotes = false;
        for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];
            if (char === '"' && !insideQuotes) {
                insideQuotes = true;
            } else if (char === '"' && insideQuotes) {
                insideQuotes = false;
            } else if (char === ',' && !insideQuotes) {
                values.push(currentVal.trim());
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
        values.push(currentVal.trim());
        
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
        }
        chinese_words.push(obj);
    }
}
function weightedRandom(arr, weight_t) {
    const weight = weight_t.map(Number);
    let totalWeight = weight.reduce((prev, curr) => prev + curr, 0);
    let randomNum = Math.random() * totalWeight;
    let weightSum = 0;

    for (let i = 0; i < arr.length; i++) {
        weightSum += weight[i];
        weightSum = +weightSum.toFixed(2);

        if (randomNum <= weightSum) {
            return arr[i];
        }
    }
}
if (chinese_words.length === 0) {
    load_chi_words();
}
// Function to generate a random word from the dataset
function generateWord() {
    document.getElementById("trans_word").innerHTML = "Translate Loading....."
    const minRank = parseInt(document.getElementById("min-rank").value);
    const maxRank = parseInt(document.getElementById("max-rank").value);
    // Filter the English words by rank
    if (minRank > maxRank) {
        alert("Minimum rank must be lower than maximum rank.");
        return;
        }
    const filteredWords = chinese_words.filter(w => w.rank >= minRank && w.rank <= maxRank);
    if (filteredWords.length === 0) {
        alert(`No words found with rank between ${minRank} and ${maxRank}.`);
        return;
    }
    // Get a random index between 0 and the length of the dataset
    var randIndex = Math.floor(Math.random() * filteredWords.length);
    // Get the word at the random index
    var randWord = filteredWords[randIndex].Traditional;
    var randWord_simp = filteredWords[randIndex].Simplified;
    var wordrank = filteredWords[randIndex].rank;
    var wordmeaning = filteredWords[randIndex].Definition;
    // Display the random word on the page
    document.getElementById("rand-word").innerHTML = randWord;
    document.getElementById("word_meaning").innerHTML = "By Wiki: " + wordmeaning;
    translate(randWord_simp);
    document.getElementById("word_rank").innerHTML = "Rank: " + wordrank;
    //
    dictLinks = document.getElementById("dict_links")
    dictLinks.innerHTML = "More: "
    const url1 = 'https://www.mdbg.net/chinese/dictionary?page=worddict&wdrst=1&wdqb=' + randWord;
    dictLinks.innerHTML = dictLinks.innerHTML + '<a href=' + url1 + ' target="_blank">MDBG</a>';
    dictLinks.innerHTML = dictLinks.innerHTML + " | ";
    const url2 = 'https://www.collinsdictionary.com/dictionary/chinese_traditional-english/' + randWord;
    dictLinks.innerHTML = dictLinks.innerHTML + '<a href=' + url2 + ' target="_blank">Collins</a>';
    dictLinks.innerHTML = dictLinks.innerHTML + " | ";
    const url3 = 'https://www.trainchinese.com/v2/search.php?searchWord=' + randWord;
    dictLinks.innerHTML = dictLinks.innerHTML + '<a href=' + url3 + ' target="_blank">Train Chinese</a>';
    dictLinks.innerHTML = dictLinks.innerHTML + " | ";
    const url4 = 'https://chinese.yabla.com/chinese-english-pinyin-dictionary.php?define=' + randWord;
    dictLinks.innerHTML = dictLinks.innerHTML + '<a href=' + url4 + ' target="_blank">Yabla</a>';
}
async function translate(word) {
    const targetLanguage = document.getElementById("target-language").value;
    const res = await fetch("https://translate.argosopentech.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: word,
            source: "zh",
            target: targetLanguage,
        }),
        headers: { "Content-Type": "application/json" }
    });
    const wordtran_data = await res.json();
    if (wordtran_data) {
        const wordtraned = wordtran_data.translatedText;
        if (targetLanguage === "zh"){
            document.getElementById("trans_word").innerHTML = wordtraned.replace(/\s+/g, "")
        }
        else{
        document.getElementById("trans_word").innerHTML = wordtraned;
        }
    }
}