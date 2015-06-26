<?php
/**
 * @file
 * Metatag integration for the Metatag:Facebook module.
 */

/**
 * Implements hook_metatag_info().
 */
function metatag_facebook_metatag_info() {
  $info['groups']['facebook'] = array(
    'label' => t('Facebook'),
    'description' => t("Meta tags used to integrate with Facebook's APIs. Most sites do not need to use these, they are primarily of benefit for sites using either the Facebook widgets, the Facebook Connect single-signon system, or are using Facebook's APIs in a custom way. Sites that do need these meta tags usually will only need to set them globally."),
    'form' => array(
      '#weight' => 55,
    ),
  );

  // Facebook meta tags stack after the simple tags.
  $weight = 20;

  // Default values for each meta tag.
  $tag_info_defaults = array(
    'description' => '',
    'class' => 'DrupalTextMetaTag',
    'group' => 'facebook',
    'element' => array(
      '#theme' => 'metatag_property',
    ),
  );

  $info['tags']['fb:admins'] = array(
    'label' => t('Admins'),
    'description' => t('A comma-separated list of Facebook user IDs of people who are considered administrators or moderators of this page.'),
    'weight' => ++$weight,
    'multiple' => TRUE,
  ) + $tag_info_defaults;

  $info['tags']['fb:app_id'] = array(
    'label' => t('Application ID'),
    'description' => t('A comma-separated list of Facebook Platform Application IDs applicable for this site.'),
    'weight' => ++$weight,
    'devel_generate' => array(
      'type' => 'integer',
    ),
  ) + $tag_info_defaults;

  // If the FB_Social module is installed already, disable the app_id field.
  if (module_exists('fb_social')) {
    $info['tags']['fb:app_id']['form']['#disabled'] = TRUE;
    $info['tags']['fb:app_id']['form']['#description'] = t('The FB_Social module will automatically output this meta tag, go to the <a href="!fb_social">FB_Social settings page</a> to customize it.', array('!fb_social' => url('admin/config/user-interface/fb_social')));
  }

  return $info;
}
