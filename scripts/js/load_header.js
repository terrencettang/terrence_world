const headerHtml = 'header.html';
fetch(headerHtml)
    .then(response => response.text())
    .then(html => {
        const head = document.getElementsByTagName('head')[0];
        head.insertAdjacentHTML('beforeend', html);
    });