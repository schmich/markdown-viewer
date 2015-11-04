var markdownSource = document.documentElement.innerText;

var options = {
  highlight: function(code, lang, callback) {
    callback(null, hljs.highlight(lang, code).value);
  }
};

marked(markdownSource, options, function(err, formatted) {
  var xhr = new XMLHttpRequest();

  var baseUrl = chrome.extension.getURL('/') + 'template/';
  var templateUrl = baseUrl + 'template.html';

  xhr.open('GET', templateUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      return;
    }

    var html = xhr.responseText;
    html = html.replace('{{formatted}}', formatted)
               .replace('{{source}}', markdownSource)
               .replace('{{base}}', baseUrl);

    document.documentElement.innerHTML = html;
    document.documentElement.style.display = 'block';

    var scripts = document.querySelectorAll('script');
    for (var i = 0; i < scripts.length; ++i) {
      var script = document.createElement('script');
      script.src = scripts[i].src;

      var parent = scripts[i].parentElement;
      parent.insertBefore(script, scripts[i]);
      parent.removeChild(scripts[i]);
    }
  };

  xhr.send();
});
