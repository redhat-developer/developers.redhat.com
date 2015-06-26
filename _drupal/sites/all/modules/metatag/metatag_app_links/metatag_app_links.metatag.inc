<?php
/**
 * @file
 * Metatag integration for the Metatag:App Links module.
 */

/**
 * Implements hook_metatag_info().
 */
function metatag_app_links_metatag_info() {
  $info['groups']['app_links'] = array(
    'label' => t('App Links'),
    'description' => t('Meta tags used to expose App Links for app deep linking. See <a href="@url">applinks.org</a> for details and documentation.', array('@url' => 'http://applinks.org')),
    'form' => array(
      '#weight' => 90,
    ),
  );

  // Default values for each meta tag.
  $defaults = array(
    'description' => '',
    'class' => 'DrupalTextMetaTag',
    'group' => 'app_links',
    'element' => array(
      '#theme' => 'metatag_property',
    ),
  );
  // Stack these codes after most others.
  $weight = 80;

  $info['tags']['al:android:package'] = array(
    'label' => t('Android App Package ID'),
    'description' => t('A fully-qualified package name for intent generation. <strong>This attribute is required by the App Links specification.</strong>'),
    'weight' => ++$weight,
  ) + $defaults;

  $info['tags']['al:android:url'] = array(
    'label' => t('Android App URL scheme'),
    'description' => t('A custom scheme for the Android app.'),
  ) + $defaults;

  $info['tags']['al:android:class'] = array(
    'label' => t('Android App Activity Class'),
    'description' => t('A fully-qualified Activity class name for intent generation.'),
  ) + $defaults;

  $info['tags']['al:android:app_name'] = array(
    'label' => t('Android App Name'),
    'description' => t('The name of the app (suitable for display)'),
  ) + $defaults;

  $info['tags']['al:ios:url'] = array(
    'label' => t('iOS App URL scheme'),
    'description' => t('A custom scheme for the iOS app. <strong>This attribute is required by the App Links specification.</strong>'),
  ) + $defaults;

  $info['tags']['al:ios:app_store_id'] = array(
    'label' => t('iOS App Store ID'),
    'description' => t('The app ID for the App Store.'),
    'devel_generate' => array(
      'type' => 'integer',
    ),
  ) + $defaults;

  $info['tags']['al:ios:app_name'] = array(
    'label' => t('iOS App Name'),
    'description' => t('The name of the app (suitable for display)'),
  ) + $defaults;

  $info['tags']['al:ipad:url'] = array(
    'label' => t('iPad App URL scheme'),
    'description' => t('A custom scheme for the iPad app. <strong>This attribute is required by the App Links specification.</strong>'),
  ) + $defaults;

  $info['tags']['al:ipad:app_store_id'] = array(
    'label' => t('iPad App Store ID'),
    'description' => t('The app ID for the App Store.'),
    'devel_generate' => array(
      'type' => 'integer',
    ),
  ) + $defaults;

  $info['tags']['al:ipad:app_name'] = array(
    'label' => t('iPad App Name'),
    'description' => t('The name of the app (suitable for display)'),
  ) + $defaults;

  $info['tags']['al:iphone:url'] = array(
    'label' => t('iPhone App URL'),
    'description' => t('A custom scheme for the iPhone app. <strong>This attribute is required by the App Links specification.</strong>'),
  ) + $defaults;

  $info['tags']['al:iphone:app_store_id'] = array(
    'label' => t('iPhone App Store ID'),
    'description' => t('The app ID for the App Store.'),
    'devel_generate' => array(
      'type' => 'integer',
    ),
  ) + $defaults;

  $info['tags']['al:iphone:app_name'] = array(
    'label' => t('iPhone App Name'),
    'description' => t('The name of the app (suitable for display)'),
  ) + $defaults;

  $info['tags']['al:windows_phone:url'] = array(
    'label' => t('Windows Phone App URL scheme'),
    'description' => t('A custom scheme for the Windows Phone app. <strong>This attribute is required by the App Links specification.</strong>'),
  ) + $defaults;

  $info['tags']['al:windows_phone:app_id'] = array(
    'label' => t('Windows Phone App GUID'),
    'description' => t('The app ID (a GUID) for app store.'),
  ) + $defaults;

  $info['tags']['al:windows_phone:app_name'] = array(
    'label' => t('Windows Phone App Name'),
    'description' => t('The name of the app (suitable for display)'),
  ) + $defaults;

  $info['tags']['al:windows:url'] = array(
    'label' => t('Windows App URL scheme'),
    'description' => t('A custom scheme for the Windows app. <strong>This attribute is required by the App Links specification.</strong>'),
  ) + $defaults;

  $info['tags']['al:windows:app_id'] = array(
    'label' => t('Windows App GUID'),
    'description' => t('The app ID (a GUID) for app store.'),
  ) + $defaults;

  $info['tags']['al:windows:app_name'] = array(
    'label' => t('Windows App Name'),
    'description' => t('The name of the app (suitable for display)'),
  ) + $defaults;

  $info['tags']['al:windows_universal:url'] = array(
    'label' => t('Windows Universal App URL scheme'),
    'description' => t('A custom scheme for the Windows Universal app. <strong>This attribute is required by the App Links specification.</strong>'),
  ) + $defaults;

  $info['tags']['al:windows_universal:app_id'] = array(
    'label' => t('Windows Universal App GUID'),
    'description' => t('The app ID (a GUID) for app store.'),
  ) + $defaults;

  $info['tags']['al:windows_universal:app_name'] = array(
    'label' => t('Windows Universal App Name'),
    'description' => t('The name of the app (suitable for display)'),
  ) + $defaults;

  $info['tags']['al:web:url'] = array(
    'label' => t('Web URL'),
    'description' => t('The web URL; defaults to the URL for the content that contains this tag.'),
  ) + $defaults;

  $info['tags']['al:web:should_fallback'] = array(
    'label' => t('Should fallback'),
    'description' => t('Indicates if the web URL should be used as a fallback; defaults to "true".'),
  ) + $defaults;

  return $info;
}
