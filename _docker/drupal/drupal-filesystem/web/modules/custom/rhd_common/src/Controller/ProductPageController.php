<?php

namespace Drupal\rhd_common\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Drupal\Core\Render\Markup;
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
    return new static($container->get('database'),
      $container->get('entity_type.manager'));
  }

  /**
   * Router callback function.
   */
  public function productPage($product_code, $sub_page) {
    // Get node id from the product code.
    $query = $this->connection->select('node__field_product_machine_name', 'pmn');
    $query->fields('pmn', ['entity_id']);
    $query->condition('pmn.field_product_machine_name_value', $product_code);
    $nid = $query->execute()->fetchField();

    $build = [];

    if (!empty($nid)) {
      $active_paragraph = NULL;
      $node_obj = Node::load($nid);
      $page_links = [
        '#theme' => 'item_list',
        '#list_type' => 'ul',
        '#items' => [
          [
            '#markup' => '<a href="#">Menu</a>',
            '#wrapper_attributes' => ['class' => 'side-nav-toggle']
          ]
        ],
        '#attributes' => [
          'class' => 'side-nav'
        ]
      ];

      foreach ($node_obj->field_product_pages as $product_page) {
        $active_sub_page = NULL;
        $product_pages_id = $product_page->target_id;

        // entity_load paragraph type.
        $load_paragraph = $this->entityTypeManager()
          ->getStorage('paragraph')
          ->load($product_pages_id);

        // Prepare left nav links data.
        $overview_url = $load_paragraph->field_overview_url->value;
        $url_string = str_replace(' ', '-', strtolower($overview_url));

        if ($url_string == $sub_page) {
          $active_sub_page = $product_pages_id;
        }

        $link_icon = '<i class="fa fa-caret-right fa-lg"></i>';
        $page_links['#items'][] = [
          '#type' => 'link',
          '#title' => Markup::create(t($load_paragraph->field_overview_url->value) . $link_icon),
          '#url' => Url::fromRoute('rhd_common.main_page_controller', [
            'product_code' => $product_code,
            'sub_page' => $url_string,
          ]),
          '#wrapper_attributes' => (function () use ($active_sub_page) {
            if (!empty($active_sub_page)) {
              return ['class' => 'active'];
            }
            else {
              return [];
            }
          })()
        ];
      }

      $build = $this->entityTypeManager()
        ->getViewBuilder($node_obj->getEntityTypeId())
        ->view($node_obj, 'full');

      $build['#theme'] = 'product-pages';
      $build['page_links'] = $page_links;

      // Process active sub page and fetch paragraph data.
      if (!empty($active_sub_page)) {
        $active_paragraph = $this->entityTypeManager()
          ->getStorage('paragraph')
          ->load($active_sub_page);

        $build['active_paragraph'] = $this->entityTypeManager()
          ->getViewBuilder($active_paragraph->getEntityTypeId())
          ->view($active_paragraph, 'full');
      }
    }

    return $build;
  }

}
