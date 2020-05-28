<?php

namespace Drupal\rhd_purpose_attributes\Controller;

use Drupal\Core\Block\BlockManager;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Link;
use Drupal\Core\Url;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Class PurposeAttributesPageController.
 *
 * @package Drupal\rhd_purpose_attributes\Controller
 */
class PurposeAttributesPageController extends ControllerBase {

  /**
   * The block plugin manager.
   *
   * @var Drupal\Core\Block\BlockManager
   */
  protected $blockManager;

  /**
   * {@inheritdoc}
   */
  public function __construct(BlockManager $block_manager) {
    $this->blockManager = $block_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $block_manager = $container->get('plugin.manager.block');

    return new static($block_manager);
  }

  /**
   * Returns a purpose_attributes_report_block block.
   *
   * @return array
   *   Returns a block render array.
   */
  public function renderBlockContent() {
    $plugin_block = $this->blockManager
      ->createInstance('purpose_attributes_report_block', []);
    $access_result = $plugin_block->access($this->currentUser());
    if (is_object($access_result) && $access_result->isForbidden() || is_bool($access_result) && !$access_result) {
      return [];
    }
    $build = $plugin_block->build();
    return $build;
  }

  /**
   * Renders the content.
   *
   * @return array
   *   Returns a render array.
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
