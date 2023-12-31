var containers_ = document.querySelector(".headers-buttons");
var containers_id = containers_.getAttribute('id');
if (containers_id === null){
    containers_.setAttribute("id", "added");
    var tabCounter = 1;
        // New tab button
    document.getElementById("new-tab").addEventListener("click", function() {
        tabCounter++;
        var newTab = document.createElement("div");
        newTab.classList.add("tab");
        newTab.setAttribute("id", "tab" + tabCounter);
        var newTextArea = document.createElement("textarea");
        newTab.appendChild(newTextArea);
        document.querySelector(".containers").insertBefore(newTab, document.querySelector(".tab-links"));
        var newTabLink = document.createElement("button");
        newTabLink.classList.add("btn_s", "tab-link");
        newTabLink.setAttribute("data-tab", "tab" + tabCounter);
        newTabLink.innerHTML = "Tab " + tabCounter;
        newTabLink.addEventListener("click", function() {
            activateTab(this);
        });
        document.querySelector(".tab-links").appendChild(newTabLink);
        activateTab(newTabLink);
        countWords();
    });

    // Open file button
    document.getElementById("open-file").addEventListener("click", function() {
        var activeTab = document.querySelector(".tab.active");
        var fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.addEventListener("change", function() {
            var reader = new FileReader();
            reader.onload = function() {
                activeTab.querySelector("textarea").value = reader.result;
                countWords();
            }
            reader.readAsText(this.files[0]);
        });
        fileInput.click();
    });

    // Save file button
    document.getElementById("save-file").addEventListener("click", function() {
        var activeTab = document.querySelector(".tab.active");
        var text = activeTab.querySelector("textarea").value;
        var filename = "text.txt";
        var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
    });

    // Activate tab
    function activateTab(tabLink) {
        var tabId = tabLink.getAttribute("data-tab");
    var tabs = document.querySelectorAll(".tab");
        for (var j = 0; j < tabs.length; j++) {
            tabs[j].classList.remove("active");
        }
        document.getElementById(tabId).classList.add("active");
        var tabLinks = document.querySelectorAll(".tab-link");
        for (var j = 0; j < tabLinks.length; j++) {
            tabLinks[j].classList.remove("active");
        }
        tabLink.classList.add("active");
        countWords();
    }

    // Tab links
    var tabLinks = document.querySelectorAll(".tab-link");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].addEventListener("click", function() {
            activateTab(this);
        });
    }

    // Word count button 
    document.getElementById("word-count-btn").addEventListener("click", function() {
        countWords();
    });

    // Count words
    function countWords() {
        var activeTab = document.querySelector(".tab.active");
        var text = activeTab.querySelector("textarea").value;
        var wordCount = text.trim().split(/\s+/).length;
        var charCount = text.length;
        var digitCount = text.replace(/\D/g, "").length;
        var lineCount = text.split(/\r\n|\r|\n/).length;
        var chineseCharCount = text.match(/[\u4e00-\u9fa5]/g)?.length || 0;
        var chinesePunctCount = text.match(/[\u3000-\u303f\u2000-\u206f]/g)?.length || 0;
        var englishCharCount = text.match(/[a-zA-Z]/g)?.length || 0;
        var englishPunctCount = text.match(/[\u0020-\u002f\u003a-\u0040\u005b-\u0060\u007b-\u007e]/g)?.length || 0;
        var englishWordCount = text.match(/[a-zA-Z]+/g)?.length || 0;
        var byteWordCount = text.match(/[^\x00-\xff]+/g)?.length || 0;

        document.getElementById("word-count").innerHTML = `
            <p><b>Word Counts</b></p>
            <p>Total Characters: ${charCount}<br>No. of Digits: ${digitCount}<br>No. of Lines: ${lineCount}<br>
            No. of Chinese Characters: ${chineseCharCount} | No. of Chinese Punctuation: ${chinesePunctCount}<br>
            No. of English Characters: ${englishCharCount} | No. of English Punctuation: ${englishPunctCount}<br>
            No. of English Words: ${englishWordCount} | No. of Byte Words: ${byteWordCount}</p>
        `;
    }
}