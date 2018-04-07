<?php
/**
 * Created by PhpStorm.
 * User: jporter
 * Date: 3/26/18
 * Time: 1:54 PM
 */

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\assembly\Plugin\AssemblyBuildView;

/**
 * Adds video view
 *  @AssemblyBuild(
 *   id = "product_categories",
 *   types = { "product_categories" },
 *   label = @Translation("Product Categories")
 * )
 */
class ProductGroupsBuild extends AssemblyBuildView {
  protected function views() {
    return [ 'categories' => [ 'view' => 'product_groups', ] ];
  }
}