<?php
/**
 * @file
 * Metatag integration for the Metatag Google+ module.
 */

/**
 * Implements hook_metatag_bundled_config_alter().
 */
function metatag_google_plus_metatag_bundled_config_alter(array &$configs) {
  foreach ($configs as &$config) {
    switch ($config->instance) {
      case 'global':
        $config->config += array(
          'itemprop:name' => array('value' => '[current-page:title]'),
        );
        break;

      case 'global:frontpage':
        $config->config += array(
          'itemprop:name' => array('value' => '[site:name]'),
          'itemprop:description' => array('value' => '[site:slogan]'),
        );
        break;

      // On error pages point everything to the homepage.
      case 'global:403':
      case 'global:404':
        $config->config += array(
          'itemprop:name' => array('value' => '[site:name]'),
        );
        break;

      case 'node':
        $config->config += array(
          'itemprop:description' => array('value' => '[node:summary]'),
          'itemprop:name' => array('value' => '[node:title]'),
          'itemtype' => array('value' => 'Article'),
        );
        break;

      case 'taxonomy_term':
        $config->config += array(
          'itemprop:description' => array('value' => '[term:description]'),
          'itemprop:name' => array('value' => '[term:name]'),
        );
        break;

      case 'user':
        $config->config += array(
          'itemprop:name' => array('value' => '[user:name]'),
          'itemtype' => array('value' => 'Person'),
        );
        if (variable_get('user_pictures')) {
          $config->config += array(
            'itemprop:image' => array('value' => '[user:picture:url]'),
          );
        }
        break;
    }
  }
}

/**
 * Implements hook_metatag_info().
 */
function metatag_google_plus_metatag_info() {
  $info['groups']['google-plus'] = array(
    'label' => t('Google+'),
    'description' => t('A set of meta tags specially for controlling the summaries displayed when content is shared on <a href="!url">Google+</a>.', array('!url' => 'https://plus.google.com/')),
    'form' => array(
      '#weight' => 80,
    ),
  );

  // Google+ meta tags stack after the Twitter Cards tags.
  $weight = 60;

  // Defaults used for all cards.
  $defaults = array(
    'class' => 'DrupalTextMetaTag',
    'group' => 'google-plus',
    'element' => array(
      '#theme' => 'metatag_google_plus',
    ),
  );

  $info['tags']['itemtype'] = array(
    'label' => t('Page type'),
    'description' => t('Schema type. <a href="!url">More schema info</a>. If your page type does not exist in options above, please install <a href="!url2">select_or_other</a> module to enter page type manually.', array('!url' => 'http://schema.org/docs/schemas.html', '!url2' => 'https://drupal.org/project/select_or_other')),
    'class' => 'DrupalSchemaMetaTag',
    'weight' => ++$weight,
    'select_or_other' => TRUE,
    'form' => array(
      '#type' => 'select',
      '#options' => array(
        'Article' => t('Article'),
        'Blog' => t('Blog'),
        'Book' => t('Book'),
        'Event' => t('Event'),
        'LocalBusiness' => t('Local Business'),
        'Organization' => t('Organization'),
        'Person' => t('Person'),
        'Product' => t('Product'),
        'Review' => t('Review'),
      ),
      '#empty_option' => t('- None -'),
    ),
  ) + $defaults;

  $info['tags']['itemprop:name'] = array(
    'label' => t('Title'),
    'description' => t('A Google+ title for the page being shared. Keep keywords towards the front.'),
    'weight' => ++$weight,
  ) + $defaults;
  $info['tags']['itemprop:description'] = array(
    'label' => t('Description'),
    'description' => t('Longer form description, you’ve 200 words here that can specifically reference your presence on Google+'),
    'weight' => ++$weight,
  ) + $defaults;
  $info['tags']['itemprop:image'] = array(
    'label' => t('Image URL'),
    'description' => t('The URL to a unique image representing the content of the page. Do not use a generic image such as your website logo, author photo, or other image that spans multiple pages. '),
    'weight' => ++$weight,
    'devel_generate' => array(
      'type' => 'image',
    ),
  ) + $defaults;

  return $info;
}
