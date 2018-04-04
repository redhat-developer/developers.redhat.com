<?php

namespace Drupal\rhd_assemblies\Service;

use Drupal\Component\Utility\Html;
use GuzzleHttp\ClientInterface;

/**
 * Class WordpressApi
 */
class WordpressApi implements RemoteContentApiInterface {

  private $apiUrl;
  private $client;

  public function __construct(ClientInterface $client) {
    $this->apiUrl = 'https://developers.redhat.com/blog';
    $this->client = $client;
  }

  public function getContentById($id) {
    try {
      $feed_url = $this->apiUrl . '/wp-json/wp/v2/posts/' . $id;
      $request = $this->client->request('GET', $feed_url);
      $response = $request->getBody()->getContents();
      $result = json_decode($response);
      return $this->getContentComposite($result);
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error("Exception while calling Wordpress API: " . $e->getMessage());
      return false;
    }
  }

  public function getContentByCategory($categories, $count) {
    $items = [];
    $feed_url = $this->apiUrl . '/wp-json/wp/v2/posts';
    $query['per_page'] = $count;

    if (!empty($categories)) {
      $query['categories'] = $categories;
    }

    try {
      $request = $this->client->request('GET', $feed_url, ['query' => $query]);
      $response = $request->getBody()->getContents();
      $results = json_decode($response);
      foreach ($results as $result) {
        $items[] = $this->getContentComposite($result);
      }
      return $items;
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error("Exception while calling Wordpress API: " . $e->getMessage());
      return [];
    }
  }

  public function getAutocompleteContentOptions($search, $max_results) {
    $feed_url = $this->apiUrl;
    $query = [
      'rest_route' => '/rh/v1/posts-by-title',
      'search' => $search
    ];
    $results = [];
    try {
      $request = $this->client->request('GET', $feed_url, ['query' => $query]);
      $response = $request->getBody()->getContents();
      $api_results = json_decode($response);
      foreach ($api_results as $api_result) {
        $label = Html::escape($api_result->post_title) . ' (' . $api_result->ID . ')'
        $results[] = [
          'value' => $label,
          'label' => $label
        ];
        if (count($results) >= $max_results) {
          return $results;
        }
      }
      return $results;
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error("Exception while calling Wordpress API: " . $e->getMessage());
      return [];
    }
  }

  public function getCategories() {
    $feed_url = $this->apiUrl . '/wp-json/wp/v2/categories';
    $query = [
      'per_page' => 100,
      'page' => 1,
    ];
    $pages_to_query = 1;
    $results = [];
    try {
      for ($i = 1; $i <= $pages_to_query; $i++) {
        $query['page'] = $i;
        $request = $this->client->request('GET', $feed_url, ['query' => $query]);
        $request_headers = $request->getHeaders();
        $pages_to_query = reset($request_headers['X-WP-TotalPages']);
        $response = $request->getBody()->getContents();
        $api_results = json_decode($response);
        foreach ($api_results as $api_result) {
          $results[$api_result->id] = $api_result;
        }
      }
      return $results;
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error("Exception while calling Wordpress API: " . $e->getMessage());
      return [];
    }
  }

  public function getCategoryOptions() {
    $categories = $this->getCategories();
    foreach ($categories as $id => $category) {
      $categories[$id] = $category->name;
    }
    return $categories;
  }

  private function getContentComposite($content) {
    $item = new \stdClass();
    $item->content = $content;
    $item->media = false;
    $item->categories = false;

    if (isset($content->featured_media) && $content->featured_media) {
      $item->media = $this->getContentMedia($content->featured_media);
    }

    if (isset($content->categories) && count($content->categories)) {
      $item->categories = $this->getContentCategoryLinks($content->categories);
    }

    return $item;
  }

  private function getContentMedia($id) {
    $feed_url = $this->apiUrl . '/wp-json/wp/v2/media/' . $id;
    $request = $this->client->request('GET', $feed_url);
    $response = $request->getBody()->getContents();
    return json_decode($response);
  }

  private function getContentCategoryLinks($categories) {
    $links = [];
    $categories_list = $this->getCategories();
    foreach($categories as $category_id) {
      $links[] = [
        'link' => $categories_list[$category_id]->link,
        'name' => $categories_list[$category_id]->name,
      ];
    }
    return $links;
  }


}
