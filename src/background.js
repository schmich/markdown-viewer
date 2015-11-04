function onMarkdownLoaded(tab) {
  chrome.tabs.insertCSS(tab.id, { code: 'html{display:none;}', runAt: 'document_start' }, function() {
    chrome.tabs.executeScript(tab.id, { file: 'lib/marked.min.js' }, function() {
      chrome.tabs.executeScript(tab.id, { file: 'lib/highlight.min.js' }, function() {
        chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function() {
          chrome.pageAction.show(tab.id);
        });
      });
    });
  });
}

function extension(path) {
  var parts = path.split('.');
  if (parts.length < 2) {
    return null;
  }

  return parts[parts.length - 1].toLowerCase();
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status !== 'loading') {
    return;
  }

  if (!tab.url) {
    return;
  }

  var parsed = URI(tab.url);
  var ext = extension(parsed.path());

  if ((ext === 'md') || (ext === 'markdown')) {
    onMarkdownLoaded(tab);
  }
});
