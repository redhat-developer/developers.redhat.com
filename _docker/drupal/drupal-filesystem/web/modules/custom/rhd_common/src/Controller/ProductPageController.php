<?php

namespace Drupal\rhd_common\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Product page controller class definition.
 */
class ProductPageController extends ControllerBase
{
    /**
     * @var QueryFactory
     */
    private $entityQuery;

    /**
     * @var Node Product entity being displayed
     */
    private $active_product;

    /**
     * @var Paragraph Active product subpage
     */
    private $active_subpage;

    /**
     * ProductPageController constructor.
     * @param QueryFactory $connection
     */
    public function __construct(QueryFactory $connection)
    {
        $this->entityQuery = $connection;
    }

    /**
     * @inheritDoc
     */
    public static function create(ContainerInterface $container)
    {
        return new static($container->get('entity.query'));
    }

    /**
     * Router callback function.
     * @param string $product_code Product URL Name
     * @param string $sub_page sub page paragraph name
     * @return array Render array for the page
     */
    public function productPage($product_code, $sub_page)
    {
        $build = [];
        $this->active_product = $this->findProduct($product_code);

        if (!empty($this->active_product)) {
            // This render array will hold the left side navigation links
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
                'class' => ['side-nav', 'rhd-sub-nav']
              ]
            ];

            // Iterate over all the product sub pages configured for this product
            // Find the active one, create links for the left side nav
            foreach ($this->active_product->field_product_pages as $cur_sub_page) {
                $product_pages_id = $cur_sub_page->target_id;

                // entity_load paragraph type.
                $sub_page_paragraph = $this->entityTypeManager()
                  ->getStorage('paragraph')
                  ->load($product_pages_id);

                // Prepare left nav links data.
                $sub_page_url = $sub_page_paragraph->field_overview_url->value;
                $sub_page_url_string = str_replace(' ', '-', strtolower($sub_page_url));

                if ($sub_page_url_string == $sub_page) {
                    $active_subpage = $product_pages_id;
                    $this->active_paragraph = $sub_page_paragraph;
                }

                $page_links['#items'][] = [
                  '#type' => 'link',
                  '#title' => [
                    '#type' => 'inline_template',
                    '#template' => "{{text}}",
                    '#context' => [
                      'text' => t($sub_page_paragraph->field_overview_url->value)
                    ]
                  ],
                  '#url' => Url::fromRoute('rhd_common.main_page_controller', [
                    'product_code' => $product_code,
                    'sub_page' => $sub_page_url_string,
                  ]),
                  '#wrapper_attributes' => (function () use ($sub_page, $sub_page_url_string) {
                      if ($sub_page_url_string == $sub_page) {
                          return ['class' => 'active'];
                      } else {
                          return [];
                      }
                  })()
                ];
            }

            $build = $this->entityTypeManager()
              ->getViewBuilder($this->active_product->getEntityTypeId())
              ->view($this->active_product, 'full');

            $build['#theme'] = 'product-pages';
            $build['page_links'] = $page_links;

            $build['active_paragraph'] = $this->entityTypeManager()
              ->getViewBuilder($this->active_paragraph->getEntityTypeId())
              ->view($this->active_paragraph, 'full');


            // Also product category
            if ($this->active_product->hasField('field_product_category')) {
                $product_category = $this->active_product->field_product_category->value;
                $build['product_category'] = $product_category;
            }

            // URL product name
            if ($this->active_product->hasField('field_url_product_name')) {
                $build['url_product_name'] = $this->active_product->field_url_product_name->value;
            }

            // Helper for twig to know if there is a community page
            $product_pages = $this->active_product->field_product_pages->referencedEntities();
            $build['has_community'] = count(array_filter($product_pages, function ($entity) {
                  return strtolower($entity->field_overview_url->value) === 'community';
              })) > 0;
        }

        $build['#cache']['max-age'] = 0; // Disable caching of these product pages

        return $build;
    }

    /**
     * Returns the title for the page.
     * @param string $product_code
     * @param string $sub_page
     * @return string
     */
    public function getPageTitle($product_code, $sub_page)
    {
        $product = $this->findProduct($product_code);
        return $product->label() . ' ' . ucwords($sub_page);
    }

    /**
     * @param string $url_name URL Product Name
     * @return mixed|NULL
     */
    private function findProduct($url_name)
    {
        $query = $this->entityQuery->get('node', 'AND');
        $query->condition('field_url_product_name', $url_name);
        $nid = current($query->execute());
        return Node::load($nid);
    }
}
