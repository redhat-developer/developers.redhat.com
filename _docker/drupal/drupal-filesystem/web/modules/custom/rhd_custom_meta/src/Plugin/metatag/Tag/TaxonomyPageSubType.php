<?php

namespace Drupal\rhd_custom_meta\Plugin\metatag\Tag;

use Drupal\metatag\Plugin\metatag\Tag\MetaNameBase;

/**
 * Provides a plugin for the 'TaxonomyTopic' meta tag.
 *
 * @MetatagTag(
 *   id = "rhd_taxonomy_page_sub_type",
 *   label = @Translation("Red Hat: Page Sub Type"),
 *   description = @Translation("Sub type of a page"),
 *   name = "rhd:taxonomy-page-sub-type",
 *   group = "red_hat",
 *   weight = 3,
 *   type = "string",
 *   secure = FALSE,
 *   multiple = FALSE
 * )
 */
class TaxonomyPageSubType extends MetaNameBase {
  // Nothing here yet. Just a placeholder class for a plugin.
}
