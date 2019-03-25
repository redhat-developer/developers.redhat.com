<?php

namespace Drupal\rhd_custom_meta\Plugin\metatag\Tag;

use Drupal\metatag\Plugin\metatag\Tag\MetaNameBase;

/**
 * Provides a plugin for the 'TaxonomyTopic' meta tag.
 *
 * @MetatagTag(
 *   id = "rhd_taxonomy_topic",
 *   label = @Translation("Red Hate: Topic"),
 *   description = @Translation("The topic of the node"),
 *   name = "rhd:taxonomy-topic",
 *   group = "red_hat",
 *   weight = 3,
 *   type = "string",
 *   secure = FALSE,
 *   multiple = TRUE
 * )
 */
class TaxonomyTopic extends MetaNameBase {
  // Nothing here yet. Just a placeholder class for a plugin.
}
