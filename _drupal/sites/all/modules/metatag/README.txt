Metatag
-------
This module allows you to automatically provide structured metadata, aka "meta
tags", about your website and web pages.

In the context of search engine optimization, providing an extensive set of
meta tags may help improve your site's & pages' ranking, thus may aid with
achieving a more prominent display of your content within search engine
results. Additionally, using meta tags can help control the summary content
that is used within social networks when visitors link to your site,
particularly the Open Graph submodule for use with Facebook, Pinterest,
LinkedIn, etc (see below).

This version of the module only works with Drupal 7.28 and newer.


Features
------------------------------------------------------------------------------
The primary features include:

* The current supported basic meta tags are ABSTRACT, DESCRIPTION, CANONICAL,
  GENERATOR, GEO.PLACENAME, GEO.POSITION, GEO.REGION, ICBM IMAGE_SRC, KEYWORDS,
  PUBLISHER, REVISIT-AFTER, RIGHTS, ROBOTS, SHORTLINK, and the page's TITLE tag.

* Multi-lingual support using the Entity Translation module.

* Translation support using the Internationalization (i18n) module.

* Full support for entity revisions and workflows based upon revision editing,
  including compatibility with the Revisioning and Workbench Moderation modules.

* Per-path control over meta tags using the "Metatag: Context" submodule
  (requires the Context module).

* Integration with the Views module allowing meta tags to be controlled for
  individual Views pages, with each display in the view able to have different
  meta tags, by using the "Metatag: Views" submodule.

* Integration with the Panels module allowing meta tags to be controlled for
  individual Panels pages, by using the "Metatag: Panels" submodule.

* The fifteen Dublin Core Basic Element Set 1.1 meta tags may be added by
  enabling the "Metatag: Dublin Core" submodule.

* The Open Graph Protocol meta tags, as used by Facebook, Pinterest, LinkedIn
  and other sites, may be added by enabling the "Metatag: Open Graph" submodule.

* The Twitter Cards meta tags may be added by enabling the "Metatag: Twitter
  Cards" submodule.

* Certain meta tags used by Google+ may be added by enabling the "Metatag:
  Google+" submodule.

* Facebook's fb:app_id and fb:admins meta tags may be added by enabling the
  "Metatag: Facebook" submodule. These are useful for sites which are using
  Facebook widgets or are building custom integration with Facebook's APIs,
  but they are not needed by most sites and have no bearing on the Open Graph
  meta tags.

* The App Links meta tags may be added by enabling the Metatag: App Links
  submodule.

* Site verfication meta tags can be added, e.g. as used by the Google search
  engine to confirm ownership of the site; see the "Metatag: Verification"
  submodule.

* The MobileOptimized, HandheldFriendly, viewport and cleartype meta tags are
  available via the Metatag: Mobile submodule.

* A variety of favicon sizes and styles can be added to the global configuration
  using the Metatag: Favicons submodule.

* An API allowing for additional meta tags to be added, beyond what is provided
  by this module - see metatag.api.php for full details.

* Support for the Migrate module for migrating data from another system - see
  metatag.migrate.inc for full details.

* Support for the Feeds module for importing data from external data sources or
  file uploads.

* Integrates with Devel_Generate, part of the Devel module, to automatically
  generate meta tags for generated nodes, via the Metatag:Devel submodule.

* Integrates with Workbench Moderation (both v1 and v2) allowing meta tags on
  nodes to be managed through the workflow process.

* The Transliteration and Imagecache Token modules (see below) are highly
  recommended when using image meta tags, e.g. og:image.

* Adds an extra item to the "Flush all caches" menu for the Admin Menu module,
  allowing for a quick way to clear the Metatag module's custom caches.

* A custom pane, called "Node form meta tags", is available for adding the meta
  tags fieldset when the node_edit page is customized using Panels; the
  Metatag: Panels submodule does not need to be enabled in order for this to
  work.

* Several advanced options may be controlled via the Settings page.

* An import script is provided in the Metatag:Importer submodule for D6 sites
  that used Nodewords and need to migrate the data.


Configuration
------------------------------------------------------------------------------
 1. On the People Permissions administration page ("Administer >> People
    >> Permissions") you need to assign:

    - The "Administer meta tags" permission to the roles that are allowed to
      access the meta tags admin pages to control the site defaults.

    - The "Edit meta tags" permission to the roles that are allowed to change
      meta tags on each individual page (node, term, etc).

 2. The main administrative page controls the site-wide defaults, both global
    settings and defaults per entity (node, term, etc), in addition to those
    assigned specifically for the front page:
      admin/config/search/metatags

 3. The list of supported entity types (nodes, taxonomy terms, etc) and bundles
    (content types, vocabularies, etc) may be controlled from the Settings page:
      admin/config/search/metatags/settings

 4. In order to provide a specific configuration per entity bundle (content
    type, vocabulary, etc), click "Add a Metatag default".

 5. Each supported entity object (nodes, terms, users) will have a set of meta
    tag fields available for customization on their respective edit page, these
    will inherit their values from the defaults assigned in #2 above. Any
    values that are not overridden per object will automatically update should
    the defaults be updated.

 6. As the meta tags are output using Tokens, it may be necessary to customize
    the token display for the site's entities (content types, vocabularies,
    etc). To do this go to e.g., admin/structure/types/manage/article/display,
    in the "Custom Display Settings" section ensure that "Tokens" is checked
    (save the form if necessary), then to customize the tokens go to:
    admin/structure/types/manage/article/display/token


Internationalization: i18n.module
------------------------------------------------------------------------------
All default configurations may be translated using the Internationalization
(i18n) module. The custom strings that are assigned to e.g., the "Global: Front
page" configuration will show up in the Translate Interface admin page
(admin/config/regional/translate/translate) and may be customized per language.


Fine Tuning
------------------------------------------------------------------------------
All of these may be controlled from the advanced settings page:
admin/config/search/metatags/settings

* It is possible to "disable" the meta tags provided by Drupal core, i.e.
  "generator", "canonical URL" and "shortlink", though it may not be completely
  obvious. Metatag takes over the display of these tags, thus any changes made
  to them in Metatag will supercede Drupal's normal output. To hide a tag, all
  that is necessary is to clear the default value for that tag, e.g. on the
  global settings for nodes, which will result in the tag not being output for
  those pages.
* By default Metatag will load the global default values for all pages that do
  not have meta tags assigned via the normal entity display or via Metatag
  Context. This may be disabled by setting the variable 'metatag_load_all_pages'
  to FALSE through one of the following methods:
  * Use Drush to set the value:
    drush vset metatag_load_all_pages FALSE
  * Hardcode the value in the site's settings.php file:
    $conf['metatag_load_all_pages'] = FALSE;
  To re-enable this option simply set the value to TRUE.
* By default users will be able to edit meta tags on forms based on the 'Edit
  meta tags' permission. The 'metatag_extended_permissions' variable may be set
  to TRUE to give each individual meta tag a separate permission. This allows
  fine-tuning of the site's editorial control, and for rarely-used fields to be
  hidden from most users. Note: The 'Edit meta tags' permission is still
  required otherwise none of the meta tag fields will display at all. The
  functionality may be disabled again by either removing the variable or
  setting it to FALSE.
* Each entity type (nodes, terms, users, etc) & bundle (content types,
  vocabularies, etc) may have its Metatag integration enabled & disabled from
  the Settings page.
  These UI options correspond to variables. To enable an entity or bundle just
  assign a variable 'metatag_enable_{$entity_type}' or
  'metatag_enable_{$entity_type}__{$bundle}' the value FALSE, e.g.:
    // Disable metatags for files (file_entity module).
    $conf['metatag_enable_file'] = FALSE;
    // Disable metatags for carousel nodes, but leave it enabled for all other
    // content types.
    $conf['metatag_enable_node__carousel'] = FALSE;
  To enable the entity and/or bundle simply set the value to TRUE or remove the
  settings.php line. Note that the Metatag cache will need to be cleared after
  changing these settings, specifically the 'info' records, e.g., 'info:en'; a
  quick version of doing this is to clear the site caches using either Drush,
  Admin Menu (flush all caches -> Metatag), or the "Clear all caches" button on
  admin/config/development/performance. Changing these from the Settings page
  automatically clears the cache.
* By default Metatag will not display meta tags on admin pages. To enable meta
  tags on admin pages simply set the 'metatag_tag_admin_pages' variable to TRUE
  through one of the following methods:
  * Use Drush to set the value:
    drush vset metatag_tag_admin_pages TRUE
  * Hardcode the value in the site's settings.php file:
    $conf['metatag_tag_admin_pages'] = TRUE;
  To re-enable this option simply set the value to FALSE or delete the
  settings.php line.
* When loading an entity with multiple languages for a specific language the
  meta tag values saved for that language will be used if they exist, otherwise
  values assigned to the entity's default language will be used. This
  may be disabled using the enabling the "Don't load entity's default language
  values if no languages match" option on the Settings page, which will cause
  default values to be used should there not be any values assigned for the
  current requested language.
* When using Features to export Metatag configurations, it is suggested to
  override all of the default configurations and then disable the default
  configurations via the advanced settings page; doing so will avoid potential
  conflicts of the same configurations being loaded by both the Metatag module
  and the new Features-based modules.
* By default all meta tag output for individual entities will be cached in a
  separate cache table. This may be disabled by unchecking the "Cache meta tag
  output" option on the Settings page, which will cause all meta tags for
  entities to be generated uniquely for each page load. Note: the entity
  configuration and output for other types of pages will still be cached, but
  this can stop the {cache_metatag} table from growing out of control in some
  scenarios.


Developers
------------------------------------------------------------------------------
Full API documentation is available in metatag.api.php.

It is not necessary to control Metatag via the entity API, any entity that has
view modes defined and is not a configuration entity is automatically suitable
for use.

The meta tags for a given entity object (node, etc) can be obtained as follows:
  $metatags = metatags_get_entity_metatags($entity_id, $entity_type, $langcode);
The result will be a nested array of meta tag structures ready for either output
via drupal_render(), or examining to identify the actual text values.


Troubleshooting / Known Issues
------------------------------------------------------------------------------
* Image fields do not output very easily in meta tags, e.g. for og:image,
  without use of the Imagecache Token module (see below). This also provides a
  way of using an image style to resize the original images first, rather than
  requiring visitors download multi-megabyte original images.
* When using custom page template files, e.g., page--front.tpl.php, it is
  important to ensure that the following code is present in the template file:
    <?php render($page['content']); ?>
  or
    <?php render($page['content']['metatags']); ?>
  Without one of these being present the meta tags will not be displayed.
* An alternative method to fixing the missing-tags problem is to change the page
  region used to output the meta tags. The region used may be controlled from
  the settings page, it is recommended to test different options to identify the
  one that works best for a specific site.
* Versions of Drupal older than v7.17 were missing necessary functionality for
  taxonomy term pages to work correctly.
* Using Metatag with values assigned for the page title and the Page Title
  module simultaneously can cause conflicts and unexpected results.
* When customizing the meta tags for user pages, it is strongly recommended to
  not use the [current-user] tokens, these pertain to the person *viewing* the
  page and not e.g., the person who authored a page.
* Certain browser plugins, e.g., on Chrome, can cause the page title to be
  displayed with additional double quotes, e.g., instead of:
    <title>The page title | My cool site</title>
  it will show:
    <title>"The page title | My cool site"</title>
  The solution is to remove the browser plugin - the page's actual output is not
  affected, it is just a problem in the browser.
* Drupal core versions before v7.33 had a bug which caused validation problems
  in the Open Graph output if the RDF module was also enabled. The solution is
  to update to core v7.33 or newer.
* If the Administration Language (admin_language) module is installed, it is
  recommended to disable the "Force language neutral aliases" setting on the
  Admin Language settings page, i.e. set the "admin_language_force_neutral"
  variable to FALSE. Failing to do so can lead to data loss in Metatag.


Related modules
------------------------------------------------------------------------------
Some modules are available that extend Metatag with additional functionality:

* Image URL Formatter
  https://www.drupal.org/project/image_url_formatter
  Provides a formatter for file and image fields to output the raw URL, and
  optionally pass it through an image style. Useful for getting an image
  field's token to output correctly for use in a meta tag.

* Imagecache Token
  https://www.drupal.org/project/imagecache_token
  Provides additional tokens for image fields that can be used in e.g. the
  og:image meta tag; ultimately makes it possible to actually use image meta
  tags without writing custom code.

* Transliteration
  https://drupal.org/project/transliteration
  Tidies up filenames for uploaded files, e.g. it can remove commas from
  filenames that could otherwise break certain meta tags.

* Alternative hreflang
  https://www.drupal.org/project/hreflang
  Output <link rel="alternate" hreflang="x" href="http://" /> meta tags for
  each language available on the site.

* Domain Meta Tags
  https://drupal.org/project/domain_meta
  Integrates with the Domain Access module, so each site of a multi-domain
  install can separately control their meta tags.

* Select or Other
  https://drupal.org/project/select_or_other
  Enhances the user experience of the metatag_google_plus and metatag_opengraph
  submodules by allowing the creation of custom itemtype and og:types values.

* Node Form Panes
  https://drupal.org/project/node_form_panes
  Create custom node-edit forms and control the location of the Metatag fields.

* Textimage
  https://drupal.org/project/textimage
  Supports using Textimage's custom tokens in meta tag fields.

* Field Multiple Limit
  https://drupal.org/project/field_multiple_limit
  Allows control over how many items are output in a multi-item field, useful
  with meta tags that only allow for one item but which are assigned from fields
  which accept multiple items, e.g. og:audio and og:video.


Credits / Contact
------------------------------------------------------------------------------
Currently maintained by Damien McKenna [1] and Dave Reid [2]; all initial
development was by Dave Reid.

Ongoing development is sponsored by Mediacurrent [3] and Lullabot [4]. All
initial development was sponsored by Acquia [5] and Palantir.net [6].

The best way to contact the authors is to submit an issue, be it a support
request, a feature request or a bug report, in the project issue queue:
  https://www.drupal.org/project/issues/metatag


References
------------------------------------------------------------------------------
1: https://www.drupal.org/u/damienmckenna
2: https://www.drupal.org/u/dave-reid
3: http://www.mediacurrent.com/
4: http://www.lullabot.com/
5: http://www.acquia.com/
6: http://www.palantir.net/
