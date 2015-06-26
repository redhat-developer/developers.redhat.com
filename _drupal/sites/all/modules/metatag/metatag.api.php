<?php
/**
 * @file
 * API documentation for the Metatag module.
 */

/**
 * Provides a default configuration for Metatag intances.
 *
 * This hook allows modules to provide their own Metatag instances which can
 * either be used as-is or as a "starter" for users to build from.
 *
 * This hook should be placed in MODULENAME.metatag.inc and it will be auto-
 * loaded. MODULENAME.metatag.inc *must* be in the same directory as the
 * .module file which *must* also contain an implementation of
 * hook_ctools_plugin_api, preferably with the same code as found in
 * metatag_ctools_plugin_api().
 *
 * The $config->disabled boolean attribute indicates whether the Metatag
 * instance should be enabled (FALSE) or disabled (TRUE) by default.
 *
 * @return
 *   An associative array containing the structures of Metatag instances, as
 *   generated from the Export tab, keyed by the Metatag config name.
 *
 * @see metatag_metatag_config_default()
 * @see metatag_ctools_plugin_api()
 */
function hook_metatag_config_default() {
  $configs = array();

  $config = new stdClass();
  $config->instance = 'config1';
  $config->api_version = 1;
  $config->disabled = FALSE;
  $config->config = array(
    'title' => array('value' => '[current-page:title] | [site:name]'),
    'generator' => array('value' => 'Drupal 7 (http://drupal.org)'),
    'canonical' => array('value' => '[current-page:url:absolute]'),
    'shortlink' => array('value' => '[current-page:url:unaliased]'),
  );
  $configs[$config->instance] = $config;

  $config = new stdClass();
  $config->instance = 'config2';
  $config->api_version = 1;
  $config->disabled = FALSE;
  $config->config = array(
    'title' => array('value' => '[user:name] | [site:name]'),
  );
  $configs[$config->instance] = $config;

  return $configs;
}

/**
 * Internal hook for adding further configuration values in bundled submodules.
 *
 * The defaults provided by the main Metatag module need to be extended by the
 * bundled submodules before they are presented to other modules for altering
 * via hook_metatag_config_default_alter(), in case differences in module
 * weights and loading priorities cause the submodules' settings to run after
 * those of any custom modules.
 *
 * @see hook_metatag_config_default()
 * @see hook_metatag_config_default_alter()
 */
function hook_metatag_bundled_config_alter(&$config) {
}
  
/**
 * 
 */
function hook_metatag_config_default_alter(&$config) {
}

/**
 * 
 */
function hook_metatag_config_delete($entity_type, $entity_ids, $revision_ids, $langcode) {
}

/**
 * 
 */
function hook_metatag_config_insert($config) {
}

/**
 * 
 */
function hook_metatag_config_instance_info() {
  return array();
}

/**
 * 
 */
function hook_metatag_config_instance_info_alter(&$info) {
}

/**
 * 
 */
function hook_metatag_config_load() {
}

/**
 * 
 */
function hook_metatag_config_load_presave() {
}

/**
 * 
 */
function hook_metatag_config_presave($config) {
}

/**
 * 
 */
function hook_metatag_config_update($config) {
}

/**
 * Definition of the meta tags and groups.
 *
 * @return array
 *   A nested array of 'tags' and 'groups', each keyed off the machine name for
 *   their respective structure type, with the following values:
 *   Tags:
 *     'label' - The name for this meta tag.
 *     'description' - An explanation of what this meta tag is used for and what
 *       values are permissible.
 *     'class' - The class name that controls this meta tag.
 *     'weight' - Used to sort the meta tags during output.
 *     'group' - The machine name of a group this meta tag will be contained
 *       within.
 *     'context' - Optionally control the type of configuration the meta tag
 *       will be available from. Possible values are:
 *       [empty] - All meta tags apply to all possible objects, by default.
 *       'global' - This will make it only show in the global meta tag
 *         configuration form.
 *       [entity type] - Makes the meta tag only show for specific entity types.
 *     'header' - Optionally output the meta tag as an HTTP header value.
 *     'element' - Optional attributes for rendering the meta tag. Should
 *       contain the following:
 *       '#theme' - The theming function used to render the meta tag.
 *     'replaces' - An optional array of meta tags that this meta tag replaces.
 *       Used to indicate that these deprecated meta tags will be replaced by
 *       this newer one, their values will be used, upon the next object save
 *       the deprecated tag will be entirely replaced by the new meta tag. While
 *       one meta tag can replace several others, only one of the possible
 *       values will be used, the others will be silently purged upon the next
 *       configuration/object save.
 *     'multiple' - If set to TRUE the output will be comma-separated and output
 *       as multiple tags.
 *     'select_or_other' - If set to TRUE, form[#type] is set to 'select' and
 *       the "select_or_other" module is available, that module will be used to
 *       provide a text field to manually insert another option.
 *     'form' - Optional items to be passed directly to the form; uses standard
 *       Form API values.
 *     'devel_generate' - Optional values to be passed to the Devel Generate
 *       submodule. Should be an array containing one of the following values:
 *       'type' - One of the following:
 *         'canonical' - The token for the absolute URL for the current page.
 *         'email' - An email address randomly generated at the site's hostname.
 *         'float' - A random floating point number between 0.0 and 999.999.
 *         'image' - A randomly generated image.
 *         'integer' - A random integer between 0 and 999.
 *         'phone' - A phone number in the format 999-999-9999.
 *         'select' - A value randomly selected from the available form options.
 *         'text' - Random text string.
 *         'twitter' - A Twitter username.
 *         'url' - A randomly generated URL on this site.
 *       'maxlength' - The maximum length / number of iterations of this value,
 *         defaults to 10.
 *     'dependencies' - Optional nested array of values to indicate other meta
 *       tags that must be present in order for this meta tag to be visible. See
 *       The Open Graph and Twitter Cards submodules for example usage. Each
 *       dependency must contain the following elements:
 *       'dependency' - The name of the meta tag that is required.
 *       'attribute' - The name of the other meta tag that is to be checked,
 *         most meta tags use "value" as the attribute name.
 *       'condition' - The state condition to be checked against, e.g. "filled"
 *         to check text values, "checked" for a checkbox, "value" to compare
 *         the raw selection; see https://api.drupal.org/drupal_process_states
 *         for more details.
 *       'value' - The field value to check the 'condition' against. see
 *         https://api.drupal.org/drupal_process_states for further details.
 *   Groups:
 *     'label' - The name for this group.
 *     'description' - A detailed explanation of these meta tags.
 *     'form' - Additional items to be passed directly to the form.
 *   Note: 'label', 'description', and any text strings passed in 'form', should
 *   be translated.
 *
 * @see metatag_metatag_info().
 */
function hook_metatag_info() {
  return array();
}

/**
 * 
 */
function hook_metatag_info_alter(&$info) {
}

/**
 * 
 */
function hook_metatag_load_entity_from_path_alter(&$path, $result) {
}

/**
 * Alter metatags before being cached.
 *
 * This hook is invoked prior to the meta tags for a given page are cached.
 *
 * @param array $output
 *   All of the meta tags to be output for this page in their raw format. This
 *   is a heavily nested array.
 * @param string $instance
 *   An identifier for the current page's page type, typically a combination
 *   of the entity name and bundle name, e.g. "node:story".
 * @param array $options
 *   All of the options used to generate the meta tags.
 */
function hook_metatag_metatags_view_alter(&$output, $instance, $options) {
  if (isset($output['description']['#attached']['drupal_add_html_head'][0][0]['#value'])) {
    $output['description']['#attached']['drupal_add_html_head'][0][0]['#value'] = 'O rly?';
  }
}

/**
 * 
 */
function hook_metatag_page_cache_cid_parts_alter(&$cid_parts) {
}

/**
 * 
 */
function hook_metatag_presave(&$metatags, $entity_type, $entity_id, $revision_id, $langcode) {
}

/**
 * Allows modules to alter the defined list of tokens available
 * for metatag patterns replacements.
 *
 * By default only context (for example: global, node, etc...)
 * related tokens are made available to metatag patterns replacements.
 * This hook allows other modules to extend the default declared tokens.
 *
 * @param array $options
 *   (optional) An array of options including the following keys and values:
 *   - token types: An array of token types to be passed to theme_token_tree().
 *   - context: An identifier for the configuration instance type, typically
 *     an entity name or object name, e.g. node, views, taxonomy_term.
 *
 * @see metatag_config_edit_form()
 * @see metatag_field_attach_form()
 */
function hook_metatag_token_types_alter(&$options) {
  // Watchout: $options['token types'] might be empty
  if (!isset($options['token types'])) {
    $options['token types'] = array();
  }

  if ($options['context'] == 'config1'){
    $options['token types'] += array('token_type1','token_type2');
  }
  elseif ($options['context'] == 'config2'){
    $options['token types'] += array('token_type3','token_type4');
  }
}

/**
 * Allows modules to alter defined token patterns and values before replacement.
 *
 * The metatag module defines default token patterns replacements depending on
 * the different configuration instances (contexts, such as global, node, ...).
 * This hook provides an opportunity for other modules to alter the patterns or
 * the values for replacements, before tokens are replaced (token_replace).
 *
 * See facetapi and facetapi_bonus modules for an example of implementation.
 *
 * @param $pattern
 *   A string potentially containing replaceable tokens. The pattern could also
 *   be altered by reference, allowing modules to implement further logic, such
 *   as tokens lists or masks/filters.
 * @param $types
 *   Corresponds to the 'token data' property of the $options object.
 *   (optional) An array of keyed objects. For simple replacement scenarios
 *   'node', 'user', and others are common keys, with an accompanying node or
 *   user object being the value. Some token types, like 'site', do not require
 *   any explicit information from $data and can be replaced even if it is
 *   empty.
 * @param string $tag_name
 *   The name of the meta tag being altered.
 *
 * @see DrupalTextMetaTag::getValue()
 */
function hook_metatag_pattern_alter(&$pattern, &$types, $tag_name) {
  if (strpos($pattern, 'token_type1') !== FALSE) {
    $types['token_type1'] = "data to be used in hook_tokens for replacement";
  }
  if (strpos($pattern, 'token_type2') !== FALSE) {
    // Load something or do some operations.
    $types['token_type2'] = array("Then fill in the array with the right data");
    // $pattern could also be altered, for example, strip off [token_type3].
    $pattern = str_replace('[token_type3]', '', $pattern);
  }
}
