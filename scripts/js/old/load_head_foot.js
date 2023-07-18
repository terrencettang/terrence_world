// Load the meta
fetch(path + 'templetes/meta.html')
  .then(response => response.text())
  .then(html => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var headElements = doc.head.childNodes;
    headElements.forEach(element => {
      document.head.appendChild(element);
    });
  });
// Load the header
fetch(path + 'templetes/header.html')
    .then(response => response.text())
    .then(html => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var mainContent = doc.querySelector('#header');
    document.querySelector('#header').innerHTML = mainContent.innerHTML;
    // Load and execute the JavaScript code in the fetched HTML content
    loadjs(doc.scripts[0].src, function() {
      // console.log('JavaScript loaded and executed!');
    });
});
//Load the nav
fetch(path + 'templetes/nav.html')
    .then(response => response.text())
    .then(html => {
    document.querySelector('#nav').innerHTML = html;
});
// Load the footer
fetch(path + 'templetes/footer.html')
    .then(response => response.text())
    .then(html => {
    document.querySelector('#footer').innerHTML = html;
// load the scripts
});
fetch(path + 'templetes/scripts.html')
    .then(response => response.text())
    .then(html => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, 'text/html');
    var mainContent = doc.querySelector('#scripts');
    document.querySelector('#scripts').innerHTML = mainContent.innerHTML;
    // Load and execute the JavaScript code in the fetched HTML content
    loadjs(doc.scripts[0].src, function() {
    // console.log('JavaScript loaded and executed!');
    });
});