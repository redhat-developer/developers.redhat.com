(function ($, Drupal) {
  Drupal.behaviors.highlightCodeSnippet = {
    attach: function (context, settings) {
      hljs.initHighlightingOnLoad();

      $('.assembly-type-code_snippet pre code, #rhd-article .field--name-body .field__item > pre').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }
  }
})(jQuery, Drupal);
