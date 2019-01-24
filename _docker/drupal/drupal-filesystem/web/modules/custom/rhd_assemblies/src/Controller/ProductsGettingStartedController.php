<?php

namespace Drupal\rhd_assemblies\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Render\Renderer;
use Drupal\rhd_assemblies\Service\DownloadManagerApi;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * The Product Getting Started Page.
 */
class ProductsGettingStartedController extends ControllerBase {

  /**
   * The download manager API service.
   *
   * @var Drupal\rhd_assemblies\Service\DownloadManagerApi
   */
  protected $downloadManagerApi;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The product downloads data returned from Download Manager.
   *
   * @var array
   */
  protected $productDownloads;

  /**
   * The renderer service.
   *
   * @var \Drupal\Core\Render\Renderer
   */
  protected $renderer;

  /**
   * {@inheritdoc}
   */
  public function __construct(DownloadManagerApi $download_manager_api, EntityTypeManagerInterface $entity_type_manager, Renderer $renderer) {
    $this->downloadManagerApi = $download_manager_api;
    $this->entityTypeManager = $entity_type_manager;
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $download_manager_api = $container->get('rhd_assemblies.download_manager_api');
    $entity_type_manager = $container->get('entity_type.manager');
    $renderer = $container->get('renderer');

    return new static($download_manager_api, $entity_type_manager, $renderer);
  }

  /**
   * Determines if thie Product node should have a Getting Started page.
   *
   * @param Node $product
   *   A Product node.
   *
   * @return bool
   *   Returns FALSE if we are not using the new product page. If we are and
   *   there is content for the Download Page field and the Product Machine Name
   *   field is set, returns TRUE.
   *
   * @throws NotFoundHttpException
   *   If someone hits this route, but we do not have the content necessary to
   *   fetch data from download, manager, we throw a 404.
   */
  protected function hasGettingStartedPage($product) {
    if (!isset($product->field_product_machine_name)
      || !isset($product->field_getting_started_content)
      || !isset($product->field_use_new_product_page)
      || (isset($product->field_use_new_product_page) && $product->get('field_use_new_product_page')->value !== '1')) {
      // Log an error and throw a 404 NotFoundHttpException.
      \Drupal::logger('rhd_assemblies')->error(
        "Failed to retrieve product downloads from Download Manager for @label",
       ['@label' => $product->label()]
      );
      throw new NotFoundHttpException();
    }

    return TRUE;
  }

  /**
   * Retrieves the page title for this entity.
   *
   * @param string $product_url_name
   *   The value of field_url_product_name for this Product node.
   *
   * @return string
   *   The page title of this entity.
   */
  public function getTitle($product_url_name) {
    // Retrieves an array of nids of nodes with a Product URL Name equal to
    // $product_url_name. This field should be unique, so there should be 1.
    $products = $this->downloadManagerApi->getProductNodesByProductUrlName($product_url_name);

    // Grab the first (and should be only) product loaded from the query.
    if ($product = reset($products)) {
      return $product->label() . ' Getting Started';
    }
  }

  /**
   * Build and return the content of a Product's Getting Started page.
   *
   * @param string $product_url_name
   *   The value of field_url_product_name for this Product node.
   *
   * @return array
   *   The render array.
   */
  public function content($product_url_name) {
    // Retrieves an array of nids of nodes with a Product URL Name equal to
    // $product_url_name. This field should be unique, so there should be 1.
    $products = $this->downloadManagerApi->getProductNodesByProductUrlName($product_url_name);

    // Grab the first (and should be only) product loaded from the query.
    if ($product = reset($products)) {
      // Display the latest revision of the Product node.
      if ($this->currentUser()->hasPermission('view all revisions')) {
        $revision_ids = $this->entityTypeManager
          ->getStorage('node')
          ->revisionIds($product);
        $latest_revision_id = end($revision_ids);
        $latest_revision = $this->entityTypeManager
          ->getStorage('node')
          ->loadRevision($latest_revision_id);

        if ($this->hasGettingStartedPage($latest_revision)) {
          // Get the render array for the latest revision of this Product and
          // the product_getting_started_page entity view display.
          $product_view = $this->entityTypeManager
            ->getViewBuilder('node')
            ->view($latest_revision, 'product_getting_started_page');
        }
      }
      // Display the default revision of the Product node.
      else {
        if ($this->hasGettingStartedPage($product)) {
          // Get the render array for this Product and the product_download_page
          // entity view display.
          $product_view = $this->entityTypeManager
            ->getViewBuilder('node')
            ->view($product, 'product_getting_started_page');
        }
      }
    }

    return [
      '#markup' => $this->renderer->render($product_view),
    ];
  }

}
