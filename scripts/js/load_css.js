function loadCSS(href, beforeEl, media) {
    var ss = window.document.createElement('link');
    var ref = beforeEl || window.document.getElementsByTagName('script')[0];
    ss.rel = 'stylesheet';
    ss.href = href;
    ss.media = 'only x';
    ref.parentNode.insertBefore(ss, ref);
    setTimeout(function () {
        ss.media = media || 'all';
    });
    return ss;
}

// Load the critical CSS
var criticalCSS = 'scripts/js/load_header.js';
var criticalStyle = document.createElement('style');
criticalStyle.innerHTML = '@import url("' + criticalCSS + '");';
document.head.appendChild(criticalStyle);

// Load the rest of the CSS asynchronously
var restCSS = 'scripts/js/load_header.js';
loadCSS(restCSS);