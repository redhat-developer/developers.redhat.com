<?php
/**
 * @file
 * Metatag integration for the Metatag:Facebook module.
 */

/**
 * Implements hook_metatag_info().
 */
function metatag_mobile_metatag_info() {
  $info['groups']['mobile'] = array(
    'label' => t('Mobile'),
    'description' => t("Meta tags used to control the mobile browser experience. Many, if not most, of these meta tags have been deprecated by newer mobile browsers. These meta tags usually only need to be set globally, rather than per-page."),
    'form' => array(
      '#weight' => 80,
    ),
  );

  $weight = 80;

  // Default values for each meta tag.
  $tag_info_defaults = array(
    'description' => '',
    'class' => 'DrupalTextMetaTag',
    'group' => 'mobile',
  );

  $info['tags']['MobileOptimized'] = array(
    'label' => t('Mobile Optimized'),
    'description' => t('Using the value "width" tells certain mobile Internet Explorer browsers to display as-is, without being resized. Alternatively a numerical width may be used to indicate the desired page width the page should be rendered in: "240" is the suggested default, "176" for older browsers or "480" for newer devices with high DPI screens.'),
    'weight' => ++$weight,
    'multiple' => TRUE,
  ) + $tag_info_defaults;

  $info['tags']['HandheldFriendly'] = array(
    'label' => t('Handheld-Friendly'),
    'description' => t('Some older mobile browsers will expect this meta tag to be set to "true" to indicate that the site has been designed with mobile browsers in mind.'),
    'weight' => ++$weight,
    'multiple' => TRUE,
  ) + $tag_info_defaults;

  $info['tags']['viewport'] = array(
    'label' => t('Viewport'),
    'description' => t('Used by most contemporary browsers to control the display for mobile browsers. Please read a guide on responsive web design for details of what values to use.'),
    'weight' => ++$weight,
    'multiple' => TRUE,
  ) + $tag_info_defaults;

  $info['tags']['cleartype'] = array(
    'label' => t('Cleartype'),
    'description' => t('A legacy meta tag for older versions of Internet Explorer on Windows, use the value "on" to enable it; this tag is ignored by all other browsers.'),
    'weight' => ++$weight,
    'element' => array(
      '#theme' => 'metatag_http_equiv',
    ),
  ) + $tag_info_defaults;

  return $info;
}
