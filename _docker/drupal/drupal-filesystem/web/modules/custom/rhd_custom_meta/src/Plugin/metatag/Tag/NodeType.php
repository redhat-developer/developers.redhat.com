<?php

namespace Drupal\rhd_custom_meta\Plugin\metatag\Tag;

use Drupal\metatag\Plugin\metatag\Tag\MetaNameBase;

/**
 * Provides a plugin for the 'TaxonomyTopic' meta tag.
 *
 * @MetatagTag(
 *   id = "rhd_node_type",
 *   label = @Translation("Red Hate: Node Type"),
 *   description = @Translation("Drupal Content Type"),
 *   name = "rhd:node-type",
 *   group = "red_hat",
 *   weight = 3,
 *   type = "string",
 *   secure = FALSE,
 *   multiple = FALSE
 * )
 */
class NodeType extends MetaNameBase {
  // Nothing here yet. Just a placeholder class for a plugin.
}
