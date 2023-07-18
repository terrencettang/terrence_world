  // Get the main section content from localStorage
  var oldContent = localStorage.getItem('main');
  if (oldContent) {
    $(function() {
      var $mainContent = $('<div>').html(oldContent).find('#content');
      console.log($mainContent)
      var $script = $('<div>').html(oldContent).find('script').not('[src]');
      $('#main').html($mainContent.html());
      $.globalEval($script.html());
    });
      // Clear the localStorage
      localStorage.removeItem('main');
  }
  else {// Load the main content of about.html by default
    $(function() {
      $.get("pages/about/index.html", function(html) {
        var $doc = $('<div>').html(html);
        var $mainContent = $doc.find('#content');
        var $script = $doc.find('script').not('[src]');
        $('#main').html($mainContent.html());
        $.globalEval($script.html());
      });
    });
  }