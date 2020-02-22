<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;

/**
 * Adds download manager data to the built entity.
 *
 * @AssemblyBuild(
 *   id = "product_download_hero",
 *   types = { "product_download_hero" },
 *   label = @Translation("Product Download Hero")
 * )
 */
class ProductDownloadHeroBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  /**
   * {@inheritdoc}
   */
  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $parent_entity = $build['#parent']['entity'];

    if ($parent_entity->hasField('field_product_machine_name') && isset($parent_entity->field_product_machine_name)) {
      $download_manager_api = \Drupal::service('rhd_assemblies.download_manager_api');
      $product_downloads = $download_manager_api->getContentById(
        $parent_entity->get('field_product_machine_name')->value
      );

      if (!empty($product_downloads)) {
        $featured = $product_downloads[0]->featuredArtifact;
        $featured->fileSize = format_size($featured->fileSize);
        $build['featured'] = [];
        $build['featured']['releaseDate'] = $featured->releaseDate;
        $build['featured']['url'] = $featured->url;
        $build['featured']['versionName'] = $featured->versionName;
      }
    }
  }

}
