<?php

namespace Drupal\rhd_common\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Product page controller class definition.
 */
class ProductPageController extends ControllerBase {
  /**
   * @var Connection
   */
  private $connection;

  /**
   * ProductPageController constructor.
   * @param \Drupal\Core\Database\Connection $connection
   */
  public function __construct(Connection $connection) {
    $this->connection = $connection;
  }

  /**
   * @inheritDoc
   */
  public static function create(ContainerInterface $container) {
    return new static($container->get('database'));
  }

  /**
   * Router callback function.
   */
  public function productPage($product_code, $sub_page) {
    // Get node id from the product code.
    $query = $this->connection->select('node__field_product_machine_name', 'pmn');
    $query->fields('pmn', array('entity_id'));
    $query->condition('pmn.field_product_machine_name_value', $product_code);
    $nid = $query->execute()->fetchField();

    $title = '';
    $summary = '';
    $get_started = '';
    $disable = 0;
    $product_pages_url = array();
    $main_content = '';
    $buzz_tags = '';
    if (!empty($nid)) {
      $node_obj = Node::load($nid);
      $title = $node_obj->title->value;
      $summary = $node_obj->field_product_summary->value;
      $get_started = $node_obj->field_product_get_started->value;
      foreach ($node_obj->field_product_pages as $product_page) {
        $product_pages_id = $product_page->target_id;
        // entity_load paragraph type.
        $load_paragraph = $this->entityTypeManager()
          ->getStorage('paragraph')
          ->load($product_pages_id);
        // Prepare left nav links data.
        $overview_url = $load_paragraph->field_overview_url->value;
        $url_string = str_replace(' ', '-', strtolower($overview_url));
        $url = Url::fromRoute('rhd_common.main_page_controller', array(
          'product_code' => $product_code,
          'sub_page' => $url_string
        ))->toString();
        if ($url_string == $sub_page) {
          $active_sub_page = $product_pages_id;
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
          if (isset($load_paragraph->field_buzz_tags)) {
            $buzz_tags = explode(",", $load_paragraph->field_buzz_tags->value);
          }
        }
      }
    }
    // Process active sub page and fetch paragraph data.
    $active_paragraph = $this->entityTypeManager()
      ->getStorage('paragraph')
      ->load($active_sub_page);
    // Main content data.
    if (isset($active_paragraph->field_overview_main_content)) {
      $main_content = $active_paragraph->field_overview_main_content->value;
    }

    // Hide get started block or not.
    $hide_get_started = $active_paragraph->field_overview_hide_get_started->value;
    $nav_url = $active_paragraph->field_overview_url->value;
    $url_string = str_replace(' ', '-', strtolower($nav_url));
    $disable = 0;
    if ($hide_get_started && $sub_page = $url_string) {
      $disable = 1;
    }

    // If sub-page is docs and apis.
    // Call a different template as the laypout is different.
    if ($active_paragraph->type->target_id == 'docs_and_apis') {
      if (isset($active_paragraph->field_add_documents)) {
        $row = array();
        foreach ($active_paragraph->field_add_documents as $document_paragraph) {
          $document_urls = array();
          $document_paragraph_id = $document_paragraph->target_id;
          $document_paragraph_data = $this->entityTypeManager()
            ->getStorage('paragraph')
            ->load($document_paragraph_id);
          $document_title = $document_paragraph_data->field_document_title->value;
          $document_description = $document_paragraph_data->field_document_description->value;
          foreach ($document_paragraph_data->field_document_url as $document_url) {
            $document_urls[] = array(
              'link_title' => $document_url->title,
              'link_url' => $document_url->uri
            );
          }
          $row[] = array(
            'doc_title' => $document_title,
            'id' => str_replace(' ', '_', $document_title),
            'doc_description' => $document_description,
            'url' => $document_urls,
          );
        }
        $all_dl_versions = $active_paragraph->field_all_document_versions->value;
      }
      return [
        '#theme' => 'product-pages-docs-apis',
        '#title' => $title,
        '#summary' => $summary,
        '#get_started' => $get_started,
        '#disable_get_started' => $disable,
        '#product_pages' => $product_pages_url,
        '#main_content' => $main_content,
        '#documents_row' => $row,
        '#all_download_versions' => $all_dl_versions,
      ];
    }
    return [
      '#theme' => 'product-pages',
      '#title' => $title,
      '#summary' => $summary,
      '#get_started' => $get_started,
      '#disable_get_started' => $disable,
      '#product_pages' => $product_pages_url,
      '#main_content' => $main_content,
      '#buzz_tags' => $buzz_tags,
    ];
  }

}
