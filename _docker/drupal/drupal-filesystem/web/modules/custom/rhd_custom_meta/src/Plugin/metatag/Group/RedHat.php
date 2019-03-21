<?php

namespace Drupal\rhd_custom_meta\Plugin\metatag\Group;

use Drupal\metatag\Plugin\metatag\Group\GroupBase;
use Drupal\metatag\Plugin\metatag\Group\RedHatDeveloperCustomMetaTagGroupBase;

/**
 * Provides a plugin for the 'What' meta tag group.
 *
 * @MetatagGroup(
 *   id = "red_hat",
 *   label = @Translation("Red Hat Meta Tags"),
 *   description = @Translation("Custom meta tags for Red Hat"),
 *   weight = 7,
 * )
 */
class RedHat extends GroupBase {
  // Nothing here yet. Just a placeholder class for a plugin.
}
