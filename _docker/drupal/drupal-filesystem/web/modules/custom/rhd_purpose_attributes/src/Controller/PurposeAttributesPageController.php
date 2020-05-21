<?php

namespace Drupal\rhd_purpose_attributes\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;
use Drupal\core\Url;

/**
 * Class PurposeAttributesPageController.
 *
 * @package Drupal\rhd_purpose_attributes\Controller
 */
class PurposeAttributesPageController extends ControllerBase {

  /**
   * Returns a purpose_attributes_report_block block.
   *
   * @return array
   *   Returns a block render array.
   */
  public function renderBlockContent() {
    $plugin_block = \Drupal::service('plugin.manager.block')
      ->createInstance('purpose_attributes_report_block', []);
    $access_result = $plugin_block->access(\Drupal::currentUser());
    if (is_object($access_result) && $access_result->isForbidden() || is_bool($access_result) && !$access_result) {
      return [];
    }
    $build = $plugin_block->build();
    return $build;
  }

  /**
   * Render the content.
   */
  public function content() {

    $content = $this->renderBlockContent();

    // Render link to csv output.
    // @TODO: Get route to the view dynamically.
    $link = Link::fromTextAndUrl('Download CSV', Url::fromUri('internal:/feed/property_export'));
    $rendered_link = $link->toRenderable();
    $rendered_link['#attributes'] = [
      'class' => ['button', 'btn-default'],
      'download' => TRUE,
    ];

    return [
      '#prefix' => '<div id="page_wrapper">',
      '#suffix' => '</div>',
      'item_1' => $content,
      'link' => [
        'link' => $rendered_link,
        '#prefix' => '<div class="rhd-adobe-export-links">',
        '#suffix' => '</div>',
      ],
      '#attached' => [
        'library' => ['rhd_purpose_attributes/default'],
      ],
    ];
  }

}
