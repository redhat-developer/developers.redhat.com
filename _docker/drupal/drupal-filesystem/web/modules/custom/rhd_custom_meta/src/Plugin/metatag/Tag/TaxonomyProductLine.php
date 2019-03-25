<?php

namespace Drupal\rhd_custom_meta\Plugin\metatag\Tag;

use Drupal\metatag\Plugin\metatag\Tag\MetaNameBase;

/**
 * Provides a plugin for the 'TaxonomyTopic' meta tag.
 *
 * @MetatagTag(
 *   id = "rhd_taxonomy_product_line",
 *   label = @Translation("Red Hat: Product Line"),
 *   description = @Translation("Related Product line for the node"),
 *   name = "rhd:taxonomy-product-line",
 *   group = "red_hat",
 *   weight = 3,
 *   type = "string",
 *   secure = FALSE,
 *   multiple = FALSE
 * )
 */
class TaxonomyProductLine extends MetaNameBase {
  // Nothing here yet. Just a placeholder class for a plugin.
}
