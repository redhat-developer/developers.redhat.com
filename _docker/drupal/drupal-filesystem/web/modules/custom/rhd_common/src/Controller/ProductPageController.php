<?php
/**
 * @file
 * Contains \Drupal\rhd_common\Controller\ProductPageController.
 */
namespace Drupal\rhd_common\Controller;

use Drupal\Core\Controller\ControllerBase;

class ProductPageController extends ControllerBase {
  public function productPage($node, $second) {
    $node_obj = node_load($node);
    $title = $node_obj->title->value;
    $summary = $node_obj->field_product_summary->value;
    $get_started = $node_obj->field_product_get_started->value;
    foreach($node_obj->field_product_pages as $product_page) {
      $product_pages_id = $product_page->target_id;
      // entity_load paragraph type.
      $load_paragraph = entity_load('paragraph', $product_pages_id);
      // Fetch paragraph fields values.
      $overview_url = $load_paragraph->field_overview_url->value;
      $url_string = str_replace(' ', '-', strtolower($overview_url));
      $hide_get_started = $load_paragraph->field_overview_hide_get_started->value;
      if ($hide_get_started) {
        $disable_get_started = $url_string;
      }
      if ($second != $url_string) {
        $product_pages_url[] = array('title' => $overview_url, 'url' => '/products/' . $node . '/' .$url_string);
      }
      if ($second == $url_string) {
        $product_pages_url[] = array('title' => $overview_url, 'url' => '/products/' . $node . '/' .$url_string, 'active' => 1);
        if (isset($load_paragraph->field_overview_main_content) ) {
          $main_content = $load_paragraph->field_overview_main_content->value;
        }
      }
    }
    $disable = 0;
    if ($disable_get_started == $second) {
        $disable = 1;
    }
    return [
        '#theme' => 'product-pages',
        '#title' => $title,
        '#summary' => $summary,
        '#get_started' => $get_started,
        '#disable_get_started' => $disable,
        '#product_pages' => $product_pages_url,
        '#main_content' => $main_content,
    ];
  }
}