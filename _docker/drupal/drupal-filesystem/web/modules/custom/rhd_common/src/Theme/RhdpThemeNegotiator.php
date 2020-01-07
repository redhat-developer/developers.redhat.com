<?php

namespace Drupal\rhd_common\Theme;

use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\Core\Theme\ThemeNegotiatorInterface;
use Drupal\node\Entity\Node;
use Drupal\node\NodeInterface;

/**
 * Our RHDP Theme Negotiator.
 */
class RhdpThemeNegotiator implements ThemeNegotiatorInterface {

  /**
   * {@inheritdoc}
   */
  public function applies(RouteMatchInterface $route_match) {
    // We will serve the RHDP theme for these routes.
    $rhdp_routes = [
      'rhd_common.product_overview',
      'rhd_common.main_page_controller',
      'rhd_assemblies.products_downloads',
    ];

    if (in_array($route_match->getRouteName(), $rhdp_routes)) {

      // If this Product sub-page isn't the Overview or Download sub-page,
      // then this is a paragraphs-based Product page; Serve the RHDP theme.
      $parameters = $route_match->getParameters();
      if ($parameters->has('sub_page') && !in_array($parameters->get('sub_page'), ['overview', 'download'])) {
        return TRUE;
      }

      // Load the Node object via the field_url_product_name field.
      $product_url_name = $parameters->get('product_url_name') ?? $parameters->get('product_code');

      $nid = \Drupal::entityQuery('node')
        ->condition('type', 'product')
        ->condition('field_url_product_name', $product_url_name)
        ->execute();

      // No entity found; Serve the default theme.
      if (empty($nid)) {
        return FALSE;
      }

      $node = Node::load(reset($nid));

      if ($node instanceof NodeInterface) {
        // If we are NOT using the new, assembly-based Product page design,
        // then we will serve the RHDP theme.
        if (!$node->field_use_new_product_page->isEmpty() && $node->get('field_use_new_product_page')->value !== '1') {
          return TRUE;
        }
        else {
          return FALSE;
        }
      }
    }

    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function determineActiveTheme(RouteMatchInterface $route_match) {
    return 'rhdp';
  }

}
