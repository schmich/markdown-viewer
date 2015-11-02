var content = document.documentElement.innerText;
document.documentElement.innerHTML = '';

var options = {
  highlight: function(code, lang, callback) {
    callback(null, hljs.highlight(lang, code).value);
  }
};

marked(content, options, function(err, replace) {
  var html = '<html><head></head><body><div class="markdown-body">';
  html += replace;
  html += '</div></body></html>';

  document.documentElement.innerHTML = html;
  document.documentElement.style.display = 'block';
});
