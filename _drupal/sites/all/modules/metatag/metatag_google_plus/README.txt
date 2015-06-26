Metatag: Google+
-----------------
This module adds support for meta tag configuration for Google+ Snippet [1].

The following Google+ tags are provided:

* itemprop:name
* itemprop:description
* itemprop:image

Also itemtype is provided to add schema in the HTML markup as follows:

<html itemscope itemtype="http://schema.org/Article">


Usage
--------------------------------------------------------------------------------
Page type (itemtype) provides default type options from the Google+ Snippet page
[1]; to add other types either install select_or_other module [2] or use the
Metatag hooks (see metatag.api.php).


Known Issues
--------------------------------------------------------------------------------
- When using Zen or its derived theme, the RDF Namespaces will be serialized
  into an RDFa 1.1 prefix attribute, which means itemtype will be included in
  prefix="...". To avoid this problem, this module will not add a itemtype
  directly to $variable['rdf_namespaces'], instead, it will be necessary to add
  code manually in the template.php or the custom theme.

  Example code to use and adapt as needed:

/**
 * Implements template_preprocess_html().
 *
 * Add itemtype code for Google+ in the 'html_attributes_array' which is only
 * available in Zen theme. Note Zen will convert rdf_namespaces to RDFa 1.1 with
 * prefix, so putting itemtype there will cause it to be added to the
 * prefix="itemtype=..." attribute.
 *
 * @see zen_preprocess_html()
 */
function MYTHEME_preprocess_html(&$variables, $hook) {
  if (module_exists('metatag_google_plus') && isset($variables['itemtype'])) {
    $variables['html_attributes_array']['itemscope itemtype'] = "http://schema.org/{$variables['itemtype']}";
  }
}


Credits / Contact
--------------------------------------------------------------------------------
Originally developed by Eric Chen [3] and sponsored by Monkii [4].


References
--------------------------------------------------------------------------------
1: https://developers.google.com/+/web/snippet/
2. https://drupal.org/project/select_or_other
3: https://drupal.org/user/265729
4: http://monkii.com
