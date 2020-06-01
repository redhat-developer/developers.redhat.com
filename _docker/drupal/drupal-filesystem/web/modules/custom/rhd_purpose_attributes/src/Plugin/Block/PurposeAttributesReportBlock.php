<?php

namespace Drupal\rhd_purpose_attributes\Plugin\Block;

/**
 * @file
 * Contains \Drupal\rhd_purpose_attributes\Plugin\Block\PurposeAttributesReporteBlock.
 */
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\CacheableMetadata;

/**
 * Provides a custom block that displays views for Purpose Attributes.
 *
 * @Block(
 *   id = "purpose_attributes_report_block",
 *   admin_label = @Translation("Purpose Attributes"),
 *   category = @Translation("Blocks")
 * )
 */
class PurposeAttributesReportBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {

    // @TODO: Use service dependency injection.
    /** @var \Drupal\Core\Render\Renderer $renderer */
    $renderer = \Drupal::service('renderer');
    $build = [];

    $view_business_unit = views_embed_view('purpose_attributes_report', 'block_1');
    $view_business_unit_render = $renderer->render($view_business_unit);

    $view_product = views_embed_view('purpose_attributes_report', 'block_2');
    $view_product_render = $renderer->render($view_product);

    $build = [
      '#theme' => 'purpose_attributes_report_block',
      '#tax_business_unit' => $view_business_unit_render,
      '#tax_product' => $view_product_render,
    ];

    $cache = CacheableMetadata::createFromRenderArray($build);
    $cache->merge(CacheableMetadata::createFromRenderArray($view_business_unit))
      ->merge(CacheableMetadata::createFromRenderArray($view_product))
      ->applyTo($build);

    return $build;

  }

}
