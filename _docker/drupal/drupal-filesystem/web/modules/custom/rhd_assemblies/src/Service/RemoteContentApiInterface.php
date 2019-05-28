<?php

namespace Drupal\rhd_assemblies\Service;

/**
 * Interface RemoteContentApiInterface
 */
interface RemoteContentApiInterface {
  public function getContentById($id);
  public function getContentByCategory($categories, $max_results, $select_logic);
  public function getAutocompleteContentOptions($search, $max_results);
  public function getCategories();
  public function getCategoryOptions();
}
