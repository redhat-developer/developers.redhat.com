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
   * Determines if thie Product node should have a Downloads page.
   *
   * A Product node needs to have a field_product_machine_name value and a
   * field_downloads_page_content value in order to require a Downloads page
   * and route.
   */
  protected function hasDownloadsPage($product) {
    // Verify that the Product machine name field is set and make sure that the
    // Downloads Page Content field isn't null. Also, verify that the Use New
    // Product Page boolean field isset and is checked.
    if (!isset($product->field_product_machine_name)
      || !isset($product->field_downloads_page_content)
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
   * Build and return the content of a Product's Downloads page.
   */
  public function content($product_url_name) {
    // Retrieves an array of nids of nodes with a Product URL Name equal to
    // $product_url_name. This field should be unique, so there should be 1.
    $products = $this->downloadManagerApi->getProductNodesByProductUrlName($product_url_name);

    // Grab the first (and should be only) product loaded from the query.
    if ($product = reset($products)) {
      if ($this->hasDownloadsPage($product)) {
        // Get the render array for this Product and the product_download_page
        // entity view display.
        $product_view = $this->entityTypeManager
          ->getViewBuilder('node')
          ->view($product, 'product_download_page');
      }
    }

    return [
      '#markup' => $this->renderer->render($product_view),
    ];
  }

}
