<?php

namespace Drupal\rhd_common\Controller;

use Drupal\Core\Cache\Cache;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\Query\QueryFactory;
use Drupal\Core\Render\Renderer;
use Drupal\Core\Template\Attribute;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Product page controller class definition.
 */
class ProductPageController extends ControllerBase {
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
   * @var Connection
   */
  private $connection;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The renderer service.
   *
   * @var \Drupal\Core\Render\Renderer
   */
  protected $renderer;

  /**
   * The config factory service.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * ProductPageController constructor.
   *
   * @param QueryFactory $queryFactory
   * @param Connection $connection
   */
  public function __construct(
    QueryFactory $queryFactory,
    Connection $connection,
    EntityTypeManagerInterface $entity_type_manager,
    Renderer $renderer,
    ConfigFactoryInterface $config_factory
  ) {
    $this->entityQuery = $queryFactory;
    $this->connection = $connection;
    $this->entityTypeManager = $entity_type_manager;
    $this->renderer = $renderer;
    $this->configFactory = $config_factory;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity.query'),
      $container->get('database'),
      $container->get('entity_type.manager'),
      $container->get('renderer'),
      $container->get('config.factory')
    );
  }

  /**
   * Router callback function.
   *
   * @param string $product_code
   *   Product URL Name.
   * @param string $sub_page
   *   Sub page paragraph name.
   *
   * @return array
   *   Render array for the page.
   */
  public function productPage($product_code, $sub_page) {
    $build = [];
    $active_product = $this->findProduct($product_code);

    // If the Use New Product Page field value is '1', then we don't want to
    // utilize this old, paragraph-based Product page approach.
    if (isset($active_product->field_use_new_product_page)
      && $active_product->get('field_use_new_product_page')->value === '1') {
      // The New Product Pages only have the /download and /getting-started
      // sub-pages / sub routes.
      if (!in_array($sub_page, ['download', 'getting-started', 'overview'])) {
        throw new NotFoundHttpException();
      }
      elseif ($sub_page == 'overview') {
        // Get the render array for this Product and the product_download_page
        // view mode.
        $product_view = $this->entityTypeManager
          ->getViewBuilder('node')
          ->view($active_product, 'new_product_page');

        return [
          '#markup' => $this->renderer->render($product_view),
        ];
      }
      else {
        return [
          '#markup' => '',
        ];
      }
    }
    else {
      \Drupal::request()->attributes->add(['node' => $active_product]);
      // Load the trailing_slash.settings config object. We will be adding these
      // programmatically generated Product sub-page routes to this module's
      // config below in the while statement.
      $trailing_slash_settings = $this->configFactory->getEditable('trailing_slash.settings');
      // This immutable config variable will respect config overrides. The
      // config object returned from getEditable (above) will not.
      $trailing_slash_settings_immutable = $this->configFactory->get('trailing_slash.settings');
      $trailing_slash_enabled = $trailing_slash_settings_immutable->get('enabled');

      if ($trailing_slash_enabled === TRUE) {
        $page_links = [];
      }
      else {
        // This render array will hold the left side navigation links.
        $page_links = [
          '#theme' => 'item_list',
          '#list_type' => 'ul',
          '#items' => [
            [
              '#markup' => '<a href="#">Menu</a>',
              '#wrapper_attributes' => ['class' => 'side-nav-toggle'],
            ],
          ],
          '#attributes' => [
            'class' => ['side-nav', 'rhd-sub-nav'],
          ],
        ];
      }

      // Iterate over all the product sub pages configured for this product.
      // Find the active one, create links for the left side nav.
      $stmt = $this->connection->query('SELECT field_product_pages_target_id, field_product_pages_target_revision_id
  FROM
    {node_revision},
    {node_revision__field_product_pages}
    -- {paragraph_revision__field_tabs}
  WHERE {node_revision__field_product_pages}.entity_id = {node_revision}.nid
    AND {node_revision__field_product_pages}.revision_id = {node_revision}.vid
    -- AND paragraph_revision__field_tabs.entity_id = node_revision__field_product_pages.field_product_pages_target_id
    -- AND paragraph_revision__field_tabs.revision_id = node_revision__field_product_pages.field_product_pages_target_revision_id
    AND {node_revision}.nid = :nid AND {node_revision}.vid = :vid',
        [
          ':nid' => $active_product->id(),
          ':vid' => $active_product->getRevisionId(),
        ]);

      $returns = NULL;

      while (($returns = $stmt->fetchAssoc()) !== FALSE) {
        $product_pages_id = $returns['field_product_pages_target_revision_id'];

        // entity_load paragraph type.
        $sub_page_paragraph = $this->entityTypeManager()
          ->getStorage('paragraph')
          ->loadRevision($product_pages_id);

        // Prepare left nav links data.
        $sub_page_url = $sub_page_paragraph->field_overview_url->value;
        $sub_page_url_string = str_replace(' ', '-', strtolower($sub_page_url));

        if ($sub_page_url_string == $sub_page) {
          $active_paragraph = $sub_page_paragraph;
        }

        if ($trailing_slash_enabled === TRUE) {
          // Get the Product subpage URL object, and then add the URL string to our
          // trailing_slash.settings.path config item.
          $url = Url::fromUri("internal:/products/$product_code/$sub_page_url_string/");
          $url_string = $url->toString();
          // We have to use $trailing_slash_settings_immutable to ensure config
          // overrides are respected.
          $trailing_slash_paths = $trailing_slash_settings_immutable->get('paths');
          $trailing_slash_settings->set('paths', $trailing_slash_paths . "\n$url_string");
          $title = t(strpos($sub_page_paragraph->field_overview_url->value, 'Hello') === FALSE ?
            $sub_page_paragraph->field_overview_url->value :
            $sub_page_paragraph->field_overview_url->value . '!'
          );
          $active_class = ($sub_page_url_string == $sub_page) ? 'active' : '';

          $page_links[] = [
            'title' => $title->__toString(),
            'url' => "$url_string/",
            'active_class' => $active_class
          ];
        }
        else {
          $page_links['#items'][] = [
            '#type' => 'link',
            '#title' => [
              '#type' => 'inline_template',
              '#template' => "{{text}}",
              '#context' => [
                'text' => t(strpos($sub_page_paragraph->field_overview_url->value,
                  'Hello') === FALSE ?
                  $sub_page_paragraph->field_overview_url->value : $sub_page_paragraph->field_overview_url->value . '!'),
              ],
            ],
            '#url' => Url::fromRoute('rhd_common.main_page_controller', [
              'product_code' => $product_code,
              'sub_page' => $sub_page_url_string,
            ]),
            '#wrapper_attributes' => (function () use (
              $sub_page,
              $sub_page_url_string
            ) {
              if ($sub_page_url_string == $sub_page) {
                return ['class' => 'active'];
              }
              else {
                return [];
              }
            })(),
          ];
        }
      }

      if (empty($active_paragraph)) {
        throw new NotFoundHttpException();
      }

      $build['#theme'] = 'product-pages';
      $build['#page_links'] = $page_links;
      $build['#trailing_slash_enabled'] = ($trailing_slash_enabled === TRUE);
      $build['#product_machine_name'] = $active_product->field_product_machine_name->value;

      $build['#active_paragraph'] = $this->entityTypeManager()
        ->getViewBuilder($active_paragraph->getEntityTypeId())
        ->view($active_paragraph, 'full');

      $build['#product_summary'] = $active_product->field_product_summary->view(['label' => 'hidden']);
      $build['#product_title'] = $active_product->getTitle();

      // Also product category.
      if ($active_product->hasField('field_product_category')) {
        $product_category = $active_product->field_product_category->value;
        $build['#product_category'] = $product_category;
      }

      // URL product name.
      if ($active_product->hasField('field_url_product_name')) {
        $build['#url_product_name'] = $active_product->field_url_product_name->value;
      }

      // Helper for twig to know if there are corresponding product subpages.
      $product_pages = $active_product->field_product_pages->referencedEntities();
      $build['#has_community'] = count(array_filter($product_pages,
          function ($entity) {
            return strtolower($entity->field_overview_url->value) === 'community';
          })) > 0;
      $build['#has_download'] = count(array_filter($product_pages,
            function ($entity) {
                return strtolower($entity->field_overview_url->value) === 'download';
            })) > 0;
      $build['#has_hello_world'] = count(array_filter($product_pages,
            function ($entity) {
              return strtolower($entity->field_overview_url->value) === 'hello world';
            })) > 0;

      // Disable caching of these product pages.
      $build['#cache']['max-age'] = 0;

      return $build;
    }
  }

  /**
   * Returns the title for the page.
   *
   * @param string $product_code
   * @param string $sub_page
   *
   * @return string
   */
  public function getPageTitle($product_code, $sub_page) {
    $product = $this->findProduct($product_code);
    return $product->label() . ' ' . ucwords($sub_page);
  }

  /**
   * @param string $url_name
   *   URL Product Name.
   *
   * @return \Drupal\Core\Entity\EntityInterface|NULL
   */
  private function findProduct($url_name) {
    $query = $this->entityQuery->get('node', 'AND');
    $query->condition('field_url_product_name', $url_name)
      ->accessCheck(TRUE);

    if ($this->currentUser()->hasPermission('view product revisions')) {
      $query->latestRevision();
    }
    else {
      $query->currentRevision();
    }

    $vids = array_keys($query->execute());
    $version = end($vids);

    if (empty($version)) {
      throw new NotFoundHttpException();
    }

    return $this->entityTypeManager()
      ->getStorage('node')
      ->loadRevision($version);
  }

}
