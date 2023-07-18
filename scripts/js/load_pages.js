// Load the content in the main section based on the URL hash
$(document).ready(function() {
  // Attach the event handler to the #a section
  $('a').on('click', function(e) {
    var link = $(this).attr('href');
    if (link.startsWith('http://localhost:8000') || link.startsWith('https://terrencettang.github.io') || 
        link.startsWith('localhost:8000') || link.startsWith('terrencettang.github.io') || 
        link.startsWith('pages') || link.startsWith('.') || link.startsWith('scripts') || link.startsWith('datat') ||
        link.startsWith('img')) {
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