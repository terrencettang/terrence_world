// Load the content in the main section based on the URL hash
$(document).ready(function() {
  $('a').on('click', function(e) {
    var link = $(this).attr('href');
    if (link.startsWith('http://localhost:8000') || link.startsWith('https://terrencettang.github.io') || 
    link.startsWith('pages')) {
      // Internal links, load the #main section
      e.preventDefault();
      var pathname = location.origin + "/terrence_world/" + link;
      $.get(pathname, function(html) {
        var $doc = $('<div>').html(html);
        var $mainContent = $doc.find('#content');
        var $script = $doc.find('script').not('[src]');
        $('#main').html($mainContent.html());
        $.globalEval($script.html());
        history.pushState({}, '', pathname);
      });
    }
  });
});