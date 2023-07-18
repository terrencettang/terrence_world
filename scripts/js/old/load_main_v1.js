$(document).ready(function() {
    loadPage("pages/about/index.html");
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
        if (page === "pages/mytools/index.html") {
            $("#mytools_page").load(page);
        } else {
            $("#mytools_page").empty();
            loadPage(page);
        }
    }
});

const navLinks = {
    "about_nav": "pages/about/index.html",
    "sites_nav": "pages/sites/index.html",
    "apps_nav": "pages/apps/index.html",
    "mytools_nav": "pages/mytools/index.html",
    "learn_nav": "pages/learn/index.html",
    "news_nav": "pages/news/index.html"
};

$.each(navLinks, function(key, value) {
    $("#" + key).click(function(event) {
        event.preventDefault();
        if (value === "pages/mytools/index.html") {
            $("#mytools_page").load(value);
        } else {
            $("#mytools_page").empty();
            loadPage(value);
        }
    });
});