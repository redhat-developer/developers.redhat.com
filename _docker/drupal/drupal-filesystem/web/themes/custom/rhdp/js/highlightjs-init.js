hljs.initHighlightingOnLoad();
$(document).ready(function() {
  $('.assembly-type-code_snippet pre code, #rhd-article .field--name-body .field__item > pre').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
