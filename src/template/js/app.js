document.getElementById('source').addEventListener('click', function() {
  showContent('source');
});

document.getElementById('formatted').addEventListener('click', function() {
  showContent('formatted');
});

function showContent(type) {
  var sourceGroup = ['.markdown-source', '#formatted'];
  var formattedGroup = ['.markdown-body', '#source'];

  var hide = sourceGroup;
  var show = formattedGroup;

  if (type === 'source') {
    hide = formattedGroup;
    show = sourceGroup;
  }

  for (var i = 0; i < hide.length; ++i) {
    document.querySelector(hide[i]).classList.add('hidden');
  }

  for (var i = 0; i < show.length; ++i) {
    document.querySelector(show[i]).classList.remove('hidden');
  }
}
