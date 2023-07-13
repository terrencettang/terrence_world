$(document).ready(function() {
   loadPage("./about/index.html");
});

function loadPage(page) {
   $("#main").load(page);
}

$(document).on("click", "a:not(.social)", function(event) {
   event.preventDefault();
   var page = $(this).attr("href");
   loadPage(page);
});

$(document).on("click", ".social-media a", function(event) {
   event.stopPropagation();
});