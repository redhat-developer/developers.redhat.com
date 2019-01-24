<?php

namespace Drupal\rhd_assemblies\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Render\Renderer;
use Drupal\rhd_assemblies\Service\DownloadManagerApi;
use Drupal\rhd_common\Controller\ProductPageController;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

/**
 * Defines a route controller for entity autocomplete form elements.
 */
class ProductsDownloadsController extends ControllerBase {

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
   * The rhd_common product page controller.
   *
   * @var \Drupal\rhd_common\Controller\ProductPageController
   */
  protected $productPageController;


  /**
   * The renderer service.
   *
   * @var \Drupal\Core\Render\Renderer
   */
  protected $renderer;

  /**
   * {@inheritdoc}
   */
  public function __construct(DownloadManagerApi $download_manager_api, EntityTypeManagerInterface $entity_type_manager, ProductPageController $product_page_controller, Renderer $renderer) {
    $this->downloadManagerApi = $download_manager_api;
    $this->entityTypeManager = $entity_type_manager;
    $this->productPageController = $product_page_controller;
    $this->renderer = $renderer;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    $download_manager_api = $container->get('rhd_assemblies.download_manager_api');
    $entity_type_manager = $container->get('entity_type.manager');
    $product_page_controller = $container->get('rhd_common.product_page_controller');
    $renderer = $container->get('renderer');

    return new static($download_manager_api, $entity_type_manager, $product_page_controller, $renderer);
  }

  /**
   * Determines if this Product node should have a Downloads page.
   *
   * A Product node needs to have a field_product_machine_name value and a
   * field_downloads_page_content value in order to require a Downloads page
   * and route.
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
  protected function hasDownloadsPage($product) {
    // If the Use New Product Page field is unchecked, return FALSE.
    if (isset($product->field_use_new_product_page) && $product->get('field_use_new_product_page')->value !== '1') {
      return FALSE;
    }
    // Verify that the Product machine name field is set and make sure that the
    // Downloads Page Content field isn't null.
    elseif (!isset($product->field_product_machine_name)
      || !isset($product->field_downloads_page_content)
      || !isset($product->field_use_new_product_page)) {
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
   *   The page title for this entity.
   */
  public function getTitle($product_url_name) {
    // Retrieves an array of nids of nodes with a Product URL Name equal to
    // $product_url_name. This field should be unique, so there should be 1.
    $products = $this->downloadManagerApi->getProductNodesByProductUrlName($product_url_name);

    // Grab the first (and should be only) product loaded from the query.
    if ($product = reset($products)) {
      return $product->label() . ' Download';
    }
  }

  /**
   * Build and return the content of a Product's Downloads page.
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

        if ($this->hasDownloadsPage($latest_revision)) {
          // Get the render array for this Product and the product_download_page
          // view mode.
          $product_view = $this->entityTypeManager
            ->getViewBuilder('node')
            ->view($latest_revision, 'product_download_page');
        }
        else {
          $product_downloads_render_array = $this->productPageController->productPage($product_url_name, 'download');
          return [
            '#markup' => $this->renderer->render($product_downloads_render_array),
          ];
        }
      }
      else {
        if ($this->hasDownloadsPage($product)) {
          // Get the render array for this Product and the product_download_page
          // view mode.
          $product_view = $this->entityTypeManager
            ->getViewBuilder('node')
            ->view($product, 'product_download_page');
        }
        else {
          $product_downloads_render_array = $this->productPageController->productPage($product_url_name, 'download');
          return [
            '#markup' => $this->renderer->render($product_downloads_render_array),
          ];
        }
      }
    }

    return [
      '#markup' => $this->renderer->render($product_view),
    ];
  }

}
