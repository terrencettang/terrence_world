$(document).ready(function() {
    loadPage("./about/index.html");
});

function loadPage(page) {
    $("#main").load(page);
}

$(document).on("click", "a", function(event) {
    var page = $(this).attr("href");
    if (page.indexOf("http") === 0 || page.indexOf("https") === 0) {
        // External link - open in new tab
        event.preventDefault();
        window.open(page, "_blank");
    } else {
        // Internal link - load in main section
        event.preventDefault();
        loadPage(page);
    }
});
