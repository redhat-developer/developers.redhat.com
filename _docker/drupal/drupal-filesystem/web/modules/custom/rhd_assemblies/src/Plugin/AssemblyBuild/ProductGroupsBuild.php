<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\assembly\Plugin\AssemblyBuildView;

/**
 * Provides a grouping of Products using the product_groups View.
 *
 * @AssemblyBuild(
 *   id = "product_categories",
 *   types = { "product_categories" },
 *   label = @Translation("Product Categories")
 * )
 */
class ProductGroupsBuild extends AssemblyBuildView {

  /**
   * {@inheritdoc}
   */
  protected function views() {
    return [
      'categories' => [
        'view' => 'product_groups',
      ],
    ];
  }

}
