<?php

namespace Drupal\rhd_assemblies\Service;

/**
 * Defines an interface for interacting with APIs, currently only Wordpress.
 */
interface RemoteContentApiInterface {

  public function getContentById($id);

  public function getContentByCategory(array $categories, $max_results, $select_logic);

  public function getAutocompleteContentOptions($search, $max_results);

  public function getCategories();

  public function getCategoryOptions();

}
