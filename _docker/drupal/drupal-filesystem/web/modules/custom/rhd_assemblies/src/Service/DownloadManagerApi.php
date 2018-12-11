<?php

namespace Drupal\rhd_assemblies\Service;

use Drupal\Core\Entity\EntityTypeManager;
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
   * @var \Drupal\Core\Entity\EntityTypeManager
   */
  protected $entityTypeManager;

  /**
   * Constructor.
   *
   * @param GuzzleHttp\ClientInterface $client
   *   The Guzzle client.
   * @param Drupal\Core\Entity\EntityTypeManager $entity_type_manager
   *   Drupal's entity type manager.
   */
  public function __construct(ClientInterface $client, EntityTypeManager $entity_type_manager) {
    $this->apiUrl = 'https://developers.redhat.com/download-manager/rest/available/';
    $this->client = $client;
    $this->entityTypeManager = $entity_type_manager;
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
    try {
      $feed_url = $this->apiUrl . $id;
      $request = $this->client->request('GET', $feed_url);
      $response = $request->getBody()->getContents();

      return json_decode($response);
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error(
        "Exception while calling Download Manager API: @message", [
          '@message' => $e->getMessage(),
        ]
      );

      return FALSE;
    }
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
