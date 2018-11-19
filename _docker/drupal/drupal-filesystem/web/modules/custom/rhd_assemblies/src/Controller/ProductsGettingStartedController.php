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
   */
  protected function hasGettingStartedPage($product) {
    if (!isset($product->field_product_machine_name) || !isset($product->field_getting_started_content)) {
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
   * Build and return the content of a Product's Getting Started page.
   */
  public function content($product_url_name) {
    // Retrieves an array of nids of nodes with a Product URL Name equal to
    // $product_url_name. This field should be unique, so there should be 1.
    $products = $this->downloadManagerApi->getProductNodesByProductUrlName($product_url_name);

    // Grab the first (and should be only) product loaded from the query.
    if ($product = reset($products)) {
      if ($this->hasGettingStartedPage($product)) {
        // Get the render array for this Product and the product_download_page
        // entity view display.
        $product_view = $this->entityTypeManager
          ->getViewBuilder('node')
          ->view($product, 'product_getting_started_page');
      }
    }

    return [
      '#markup' => $this->renderer->render($product_view),
    ];
  }

}
