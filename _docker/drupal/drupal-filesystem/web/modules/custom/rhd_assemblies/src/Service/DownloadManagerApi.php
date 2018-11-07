<?php

namespace Drupal\rhd_assemblies\Service;

use GuzzleHttp\ClientInterface;

/**
 * Class DownloadManagerApi.
 */
class DownloadManagerApi {

  private $apiUrl;
  private $client;

  /**
   * Constructor.
   *
   * @var GuzzleHttp\ClientInterface $client
   *   The Guzzle client.
   */
  public function __construct(ClientInterface $client) {
    $this->apiUrl = 'https://developers.redhat.com/download-manager/rest/available/';
    $this->client = $client;
  }

  /**
   * Retrieve Download Manager results by Product ID/code.
   *
   * @var string $id
   *   The Product ID/code.
   */
  public function getContentById($id) {
    try {
      $feed_url = $this->apiUrl . $id;
      $request = $this->client->request('GET', $feed_url);
      $response = $request->getBody()->getContents();
      return json_decode($response);
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error("Exception while calling Download Manager API: " . $e->getMessage());
      return FALSE;
    }
  }

}
