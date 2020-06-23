<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\assembly\Plugin\AssemblyBuildView;

/**
 * Adds video view.
 *
 *  @AssemblyBuild(
 *   id = "all_products_listing",
 *   types = { "all_products_listing" },
 *   label = @Translation("All Products Listing")
 * )
 */
class AllProductsListingBuild extends AssemblyBuildView {

  /**
   * Return a list of views that should get added to this view builder.
   *
   * Return value is an associative array structured like so:
   * return [
   *   'some_key' => [
   *     'view' => 'some_view_id',
   *     'display' => 'some_display_id' // optional, will use "default"
   *     'weight' => 99, // an optional weight value. defaults to 99
   *   ]
   * ];
   *
   * @return array
   *   The list of views.
   */
  protected function views() {
    return ['products' => ['view' => 'all_products']];
  }

}
