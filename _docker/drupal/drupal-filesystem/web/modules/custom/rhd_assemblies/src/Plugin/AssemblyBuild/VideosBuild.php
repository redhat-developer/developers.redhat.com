<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\assembly\Plugin\AssemblyBuildView;

/**
 * Adds video view.
 *
 *  @AssemblyBuild(
 *   id = "videos",
 *   types = { "videos" },
 *   label = @Translation("Videos")
 * )
 */
class VideosBuild extends AssemblyBuildView {

  /**
   * {@inheritdoc}
   */
  protected function views() {
    return ['videos' => ['view' => 'videos_by_category']];
  }

  /**
   * {@inheritdoc}
   */
  protected function argumentMappings() {
    return ['field_tags' => ['index' => 0]];
  }

}
