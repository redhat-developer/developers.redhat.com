<?php

namespace Drupal\rhd_common\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Url;

/**
 * Product page controller class definition.
 */
class ProductPageController extends ControllerBase {

  /**
   * Router callback function.
   */
  public function productPage($product_code, $sub_page) {
    // Get node id from the product code.
    $query = db_select('node__field_product_machine_name', 'pmn');
    $query->fields('pmn', array('entity_id'));
    $query->condition('pmn.field_product_machine_name_value', $product_code);
    $nid = $query->execute()->fetchField();
    // Initialize variables.
    $title = '';
    $summary = '';
    $get_started = '';
    $disable = 0;
    $product_pages_url = array();
    $main_content = '';
    if (!empty($nid)) {
      $node_obj = node_load($nid);
      $title = $node_obj->title->value;
      $summary = $node_obj->field_product_summary->value;
      $get_started = $node_obj->field_product_get_started->value;
      foreach ($node_obj->field_product_pages as $product_page) {
        $product_pages_id = $product_page->target_id;
        // entity_load paragraph type.
        $load_paragraph = entity_load('paragraph', $product_pages_id);
        // Fetch paragraph fields values.
        $overview_url = $load_paragraph->field_overview_url->value;
        $url_string = str_replace(' ', '-', strtolower($overview_url));
        $url = Url::fromRoute('rhd_common.main_page_controller', array('product_code' => $product_code, 'sub_page' => $url_string))->toString();
        $hide_get_started = $load_paragraph->field_overview_hide_get_started->value;
        if ($hide_get_started) {
          $disable_get_started = $url_string;
        }
        if ($sub_page != $url_string) {
          $product_pages_url[] = array(
            'title' => $overview_url,
            'url' => $url,
          );
        }
        if ($sub_page == $url_string) {
          $product_pages_url[] = array(
            'title' => $overview_url,
            'url' => $url,
            'active' => 1,
          );
          if (isset($load_paragraph->field_overview_main_content)) {
            $main_content = $load_paragraph->field_overview_main_content->value;
          }
        }
      }
      $disable = 0;
      if ($disable_get_started == $sub_page) {
        $disable = 1;
      }
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
