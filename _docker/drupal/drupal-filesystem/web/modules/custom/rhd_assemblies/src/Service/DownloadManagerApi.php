<?php

namespace Drupal\rhd_assemblies\Service;

use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use GuzzleHttp\ClientInterface;

/**
 * Retrieves data from Download Manager endpoints.
 *
 * This is used to populate download data on Product nodes/pages.
 */
class DownloadManagerApi {

  /**
   * The URL path to the Download Manager API endpoint.
   *
   * @var string
   */
  protected $apiUrl;

  /**
   * The Guzzle HTTP Client.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $client;

  /**
   * Entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Download Manager cache bin.
   *
   * @var \Drupal\Core\Cache\CacheBackendInterface
   */
  protected $cacheBin;

  /**
   * Logger factory service.
   *
   * @var \Drupal\Core\Logger\LoggerChannelFactoryInterface
   */
  protected $loggerFactory;

  /**
   * Config factory service.
   *
   * @var \Drupal\Core\Config\ConfigFactory
   */
  protected $configFactory;

  /**
   * Constructor.
   *
   * @param GuzzleHttp\ClientInterface $client
   *   The Guzzle client.
   * @param Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_bin
   *   Download Manager cache bin service.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   Logger factory service.
   * @param \Drupal\Core\Config\ConfigFactory $config_factory
   *   Config factory service.
   */
  public function __construct(ClientInterface $client, EntityTypeManagerInterface $entity_type_manager, CacheBackendInterface $cache_bin, LoggerChannelFactoryInterface $logger_factory, ConfigFactory $config_factory) {
    $this->configFactory = $config_factory;
    // If there is a Download Manager baseUrl config object, use that to set
    // the apiUrl. Else, point the apiUrl to Download Manager Prod.
    if (!empty($this->configFactory->get('redhat_developers')->get('downloadManager.baseUrl'))) {
      $this->apiUrl = $this->configFactory->get('redhat_developers')->get('downloadManager.baseUrl') . '/download-manager/rest/available/';
    }
    else {
      $this->apiUrl = 'https://developers.redhat.com/download-manager/rest/available/';
    }
    $this->client = $client;
    $this->entityTypeManager = $entity_type_manager;
    $this->cacheBin = $cache_bin;
    $this->loggerFactory = $logger_factory;
  }

  /**
   * Retrieve Download Manager results by Product ID/code.
   *
   * @param string $id
   *   The Product ID/code.
   *
   * @return array|false
   *   Returns an array of the JSON response from Download Manager if
   *   sucessful. Otherwise, returns FALSE.
   */
  public function getContentById($id) {
    $data = &drupal_static(__FUNCTION__);

    // If there is nothing in this static variable, fetch the data.
    if (!isset($data)) {
      $cid = 'download_manager_api:product:' . $id;
      // Serve the cached Download Manager data if available.
      if ($cache = $this->cacheBin->get($cid)) {
        $data = $cache->data;
      }
      // If this is uncached or the cache is invalid, fetch fresh data.
      else {
        try {
          $feed_url = $this->apiUrl . $id;
          $request = $this->client->request('GET', $feed_url);
          $response = $request->getBody()->getContents();
          $data = json_decode($response);
          $ttl = $this->configFactory->get('redhat_developers')->get('downloadManager.ttl') ?? 3600;
          $this->cacheBin->set($cid, $data, time() + $ttl);
        }
        catch (\Exception $e) {
          $this->loggerFactory->get('rhd_assemblies')->error(
            "Exception while calling Download Manager API: @message", [
              '@message' => $e->getMessage(),
            ]
          );
          return FALSE;
        }
      }
    }

    return $data;
  }

  /**
   * Gets an array of Product nodes from the field_url_product_name field.
   *
   * @param string $product_url_name
   *   The value of the field_url_product_name field.
   *
   * @return array
   *   An array of Product nodes.
   */
  public function getProductNodesByProductUrlName($product_url_name) {
    $query = $this->entityTypeManager->getStorage('node')->getQuery();

    // Find the nid of the product with the matching field_url_product_name.
    $nids = $query->condition('type', 'product')
      ->condition('field_url_product_name', $product_url_name)
      ->execute();

    // Load the product using the nids returned from the query.
    // NOTE: field_url_product_name should be unique, so there should be one.
    return $this->entityTypeManager->getStorage('node')->loadMultiple($nids);
  }

}
