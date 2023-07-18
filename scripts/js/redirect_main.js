  // Put the main section content into localStorage
  var main = document.getElementById('main').innerHTML;
  localStorage.setItem('main', main);
  // Redirect to new page
  window.location.href = location.origin + "/terrence_world/";
