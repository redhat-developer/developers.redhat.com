<?php

namespace Drupal\rhd_assemblies\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Render\Renderer;
use Drupal\rhd_assemblies\Service\DownloadManagerApi;
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
   * Retrieves the product downloads data from Download Manager.
   */
  protected function getProductDownloads($product_url_name) {
    $products = $this->downloadManagerApi->getProductNodesByProductUrlName($product_url_name);

    // Grab the first (and should be only) product loaded from the query.
    if ($product = reset($products)) {
      // Verify that the Product machine name field is set.
      if (isset($product->field_product_machine_name)) {
        // Make sure that the Has Download Page field has been checked (bool).
        if (isset($product->field_has_downloads_page) && $product->get('field_has_downloads_page')->value === '1') {
          // Retrieve data for this product from Download manager.
          $this->productDownloads = $this->downloadManagerApi->getContentById(
            $product->get('field_product_machine_name')->value
          );

          return $this->productDownloads;
        }
      }
    }

    // If we cannot successfully retrieve a product, log an error and throw a
    // 404 NotFoundHttpException.
    \Drupal::logger('rhd_assemblies')->error("Failed to retrieve product downloads from Download Manager for field_url_product_name: " . $product_url_name);
    // We will throw a 404 exception if no product is loaded.
    throw new NotFoundHttpException();
  }

  /**
   * Build and return the content of a Product's Downloads page.
   */
  public function content($product_url_name) {
    $versions = [];

    // Retrieve the product downloads from Download Manager if productDownloads
    // isn't already set.
    if (!isset($this->productDownloads)) {
      $this->getProductDownloads($product_url_name);
    }

    // Build an array to pass to the Twig template of all the versions of this
    // product.
    foreach ($this->productDownloads[0]->productVersions as $key => $version) {
      $versions[$key] = $version;
    }

    // Retrieves an array of nids of nodes with a Product URL Name equal to
    // $product_url_name. This field should be unique, so there should be 1.
    $products = $this->downloadManagerApi->getProductNodesByProductUrlName($product_url_name);

    // Grab the first (and should be only) product loaded from the query.
    if ($product = reset($products)) {
      // Get the render array for this Product and the product_download_page
      // entity view display.
      $product_view = $this->entityTypeManager
        ->getViewBuilder('node')
        ->view($product, 'product_download_page');
    }

    // Generate the Markup using the $product_view render array.
    $product_markup = $this->renderer->render($product_view);

    return [
      '#markup' => $product_markup,
    ];
  }

}
