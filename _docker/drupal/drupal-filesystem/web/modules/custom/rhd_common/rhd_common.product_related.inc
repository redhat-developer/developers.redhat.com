<?php

/**
 * @file
 * Custom functionality for the Product content type.
 */

use Drupal\Component\Utility\Html;
use Drupal\Component\Utility\NestedArray;
use Drupal\Core\Entity\FieldableEntityInterface;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;

/**
 * Implements hook_preprocess_HOOK().
 */
function rhd_common_preprocess_paragraph(&$variables) {
  // I don't like the way you have to do this, but that just seems to be drupal
  // Pulling out the product_machine_name field from the parent node of the
  // paragraph so we can use it in the paragraph template as well.
  /** @var Drupal\node\Entity\Node $entity */
  $entity = $variables['paragraph']->getParentEntity();

  if ($entity instanceof FieldableEntityInterface) {
    if ($entity->hasField('field_product_machine_name')) {
      $variables['product_machine_name'] = $entity->field_product_machine_name->value;
      // Same thing for the name of the product.
      $variables['product_name'] = $entity->label();
    }
    if ($entity->hasField('field_stackoverflow_product_refe')) {
      if (empty($entity->field_stackoverflow_product_refe->value)) {
        $variables['product_stackoverflow_code'] = $entity->field_product_machine_name->value;
      }
      else {
        $variables['product_stackoverflow_code'] = $entity->field_stackoverflow_product_refe->value;
      }
    }

    // Same thing for the short name, but if there isn't one, use the long name.
    if ($entity->hasField('field_product_short_name')) {
      $variables['product_short_name'] = $entity->field_product_short_name->value;
    }
    else {
      $variables['product_short_name'] = $variables['product_name'] ?? '';
    }
  }
}

/**
 * Implements hook_preprocess_HOOK().
 *
 * Preprocessor for the overview paragraph.
 */
function rhd_common_preprocess_paragraph__overview(&$variables) {
  $paragraph = $variables['paragraph'];
  $variables['features'] = array_map(
    'build_feature_grouping',
    $paragraph->field_product_overview_features->referencedEntities()
  );
}

/**
 * @param \Drupal\paragraphs\Entity\Paragraph $feature
 * @return array
 */
function build_feature_grouping($feature) {
  $builder = Drupal::entityTypeManager()->getViewBuilder('media');
  $media_reference = $feature->field_media_reference->referencedEntities();

  $image_array = $feature->field_paragraph_image_image->view(['label' => 'visually_hidden']);

  if (empty($image_array['#theme']) && !empty($media_reference)) {
    $image_array = $builder->view($media_reference[0], 'embedded');
  }

  return [
    'image' => $image_array,
    'title' => $feature->field_paragraph_image_title->view(['label' => 'visually_hidden']),
    'body' => $feature->field_paragraph_image_body->view(['label' => 'visually_hidden']),
  ];
}

/**
 * Implements hook_preprocess_HOOK().
 */
function rhd_common_preprocess_paragraph__community(&$variables) {
  $paragraph = $variables['paragraph'];
  $variables['display_projects'] = (bool) $paragraph->field_display_projects->value;
}

/**
 * Implements hook_preprocess_HOOK().
 */
function rhd_common_preprocess_paragraph__download(&$variables) {
  $paragraph = $variables['paragraph'];
  $variables['offer_subscription'] = (bool) $paragraph->field_offer_subscription->value;
}

/**
 * Implements hook_preprocess_HOOK().
 */
function rhd_common_preprocess_paragraph__help(&$variables) {
  $paragraph = $variables['paragraph'];
  $variables['show_stack_overflow'] = (bool) $paragraph->field_show_stack_overflow->value;
}

/**
 * Implements hook_preprocess_HOOK().
 */
function rhd_common_preprocess_paragraph__get_started(&$variables) {
  $paragraph = $variables['paragraph'];
  $tab_count = $paragraph->field_tabs->count();
  $tab_links = [];

  $variables['tab_panels'] = [
    '#theme' => 'get_started_tabs',
    '#items' => [],
  ];

  // Build up a render array for the tab bar. This is much easier here than in
  // twig where I cannot access php functions. We only want to show a tab bar if
  // there's more than one tab.
  if ($tab_count > 1) {
    $tab_links = [
      '#theme' => 'item_list',
      '#list_type' => 'ul',
      '#attributes' => [
        'class' => 'tabs nav-tabs current-tabs',
        'data-tab' => '',
        'role' => 'tablist',
        'data-options' => 'scroll_to_content:false;deep_linking:true;',
      ],
    ];
  }

  foreach ($paragraph->field_tabs as $index => $tab_item) {
    $tab = $tab_item->entity;
    $url_field_title = Html::getId($tab->field_title->value);
    $variables['tab_panels']['#items'][] = $tab;

    if ($tab_count > 1) {
      $tab_links['#items'][] = [
        '#type' => 'link',
        '#title' => $tab->field_title->value,
        '#url' => Url::fromUri('internal:#' . $url_field_title),
        '#attributes' => [
          'role' => 'tab',
          'tabindex' => '0',
          'aria-selected' => 'false',
          'aria-controls' => $url_field_title,
        ],
        // #wrapper_attributes are for the li, or the things wrapping the link.
        '#wrapper_attributes' => [
          'role' => 'presentation',
          'class' => (function () use ($index) {
            if ($index === 0) {
              return 'active';
            }
            else {
              return '';
            }
          })(),
        ],
      ];
    }
  }

  $variables['tab_bar'] = $tab_links;
}

/**
 * Implements hook_preprocess_HOOK().
 */
function rhd_common_preprocess_get_started_tabs(&$variables) {
  // Each item is going to be a reference to a paragraph,
  // we want the actual paragraph available in the view.
  foreach ($variables['items'] as $tab_index => $tab) {
    $variables['tabs'][$tab_index] = [
      'title' => $tab->field_title->value,
      'preamble' => $tab->field_body->view(['label' => 'visually_hidden']),
      'sections' => [],
    ];

    foreach ($tab->field_blue_sections as $blue_section_index => $blue_section) {
      $blue_section_entity = $blue_section->entity;
      $variables['tabs'][$tab_index]['sections'][$blue_section_index] = [];
      $blue_section_render = &$variables['tabs'][$tab_index]['sections'][$blue_section_index];

      $blue_section_render['title'] = $blue_section_entity->field_title->value;
      $blue_section_render['minutes'] = $blue_section_entity->field_minutes_to_complete->value;
      $blue_section_render['body'] = $blue_section_entity->field_body->view(['label' => 'visually_hidden']);
      $blue_section_render['supports_progress'] = (bool) $blue_section_entity->field_support_progress->value;
    }
  }
  unset($variables['items']);
}

/**
 * Implements hook_page_attachments_alter().
 *
 * Add in the metatags for the product pages.
 */
function rhd_common_page_attachments_alter(array &$attachments) {
  // We only want to do this for product pages, everything else will have meta
  // tags.
  if (Drupal::routeMatch()->getRouteName() === 'rhd_common.main_page_controller') {
    // Pull in all the services we need.
    $route_params = Drupal::routeMatch()->getParameters()->all();

    /** @var \Drupal\Core\Entity\Query\QueryInterface $query */
    $query = Drupal::service('entity.query')->get('node', 'AND');

    /** @var \Drupal\metatag\Entity\MetatagDefaults $global_metatag_manager */
    $global_metatag_manager = Drupal::entityTypeManager()->getStorage('metatag_defaults');

    /** @var \Drupal\metatag\MetatagManager $metatag_manager */
    $metatag_manager = Drupal::service('metatag.manager');

    // Find the product based on the product_code.
    $query->condition('field_url_product_name', $route_params['product_code']);
    $nid = current($query->execute());
    $product = Node::load($nid);

    if (isset($product)) {
      // Figure out which sub page we're on.
      $product_pages = $product->field_product_pages->referencedEntities();
      $filtered_paragraphs = array_filter($product_pages,
        function ($entity) use ($route_params) {
          return str_replace(' ', '-', strtolower($entity->field_overview_url->value)) === $route_params['sub_page'];
        });
      $active_paragraph = current($filtered_paragraphs);

      // Get all the meta tags, many were missed so we're redoing all this logic :(.
      $metatags = $global_metatag_manager->load('global');
      $entity_metatags = $global_metatag_manager->load($product->getEntityTypeId());
      $bundle_metatags = $global_metatag_manager->load($product->getEntityTypeId() . '__' . $product->bundle());

      if (isset($bundle_metatags)) {
        $metatags->overwriteTags($bundle_metatags->get('tags'));
      }

      if (isset($entity_metatags)) {
        $metatags->overwriteTags($entity_metatags->get('tags'));
      }

      $metatags->overwriteTags([
        'description' => $active_paragraph->field_page_description->value ?? '',
        'title' => $product->label() . ' ' . ucwords($route_params['sub_page']) . ' | [site:name]',
      ]);

      $metatags_elements = $metatag_manager->generateElements(
        $metatags->get('tags'),
        $product
      );

      $merged_array = NestedArray::mergeDeep(
        $metatags_elements['#attached']['html_head'],
        $attachments['#attached']['html_head']
      );

      $attachments['#attached']['html_head'] = $merged_array;
    }
  }
}
