<?php

namespace Drupal\rhd_assemblies\Service;

use Drupal\Component\Utility\Html;
use GuzzleHttp\ClientInterface;

/**
 * Retrieves Wordpress content from an wp-json endpoint.
 */
class WordpressApi implements RemoteContentApiInterface {

  /**
   * The base URL of the Wordpress blog.
   *
   * @var string
   */
  private $apiUrl;

  /**
   * The Guzzle HTTP Client.
   *
   * @var GuzzleHttp\ClientInterface
   */
  private $client;

  /**
   * {@inheritdoc}
   */
  public function __construct(ClientInterface $client) {
    // This URL bypasses Akamai. If, for some reason, we do not want to bypass
    // Akamai, change the value of this attribute to
    // 'https://developers.redhat.com/blog'.
    // Used for local testing
    //$this->apiUrl = 'http://localhost:8000';
    //$this->apiUrl = 'https://developers.redhat.com/blog';
    $this->apiUrl = 'https://origin-developers.redhat.com/blog';
    $this->client = $client;
  }

  /**
   * Fetches a WP post in JSON from a wp-json endpoint using the post ID.
   *
   * @param string $id
   *   The ID of the WP post.
   *
   * @return object|false
   *   Returns a stdClass of the WP post data if the fetch is successful.
   *   Otherwise, this method return FALSE.
   */
  public function getContentById($id) {
    try {
      $feed_url = $this->apiUrl . '/wp-json/wp/v2/posts/' . $id;
      $request = $this->client->request('GET', $feed_url);
      $response = $request->getBody()->getContents();
      $result = json_decode($response);
      return $this->getContentComposite($result);
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error(
        "Exception while calling Wordpress API: @message", [
          '@message' => $e->getMessage(),
        ]
      );

      return FALSE;
    }
  }

  /**
   * Fetches WP post(s) by their category. Returns as many as $max_results posts.
   *
   * @param array $categories
   *   An array of strings of the WP post categories.
   * @param string|int $max_results
   *   Maximum number of items to be returned in result set.
   * @param string $select_logic
   *   Logic to be used for searching posts by categories can be 'and|or'.
   * @return array
   *   Returns an array of objects of the WP posts if the fetch is successful.
   *   Otherwise, returns an empty array.
   */
  public function getContentByCategory($categories, $max_results, $select_logic) {
    $items = [];

    $select_logic_tmp = "or";

    if($select_logic) {
      $select_logic_tmp = $select_logic[0]['value'] == "1" ? "and" : "or";
    }

    //$feed_url = $this->apiUrl . '/wp-json/wp/v2/posts';
    //$feed_url = 'http://localhost:8000/wp-json/wp/v2/posts';
    $feed_url = $this->apiUrl . '/wp-json/rhd-frontend-blog-theme/v1/posts-by-category';

    $query['per_page'] = $max_results;
    $query['logic'] = $select_logic_tmp;

    if($categories){
      if (count($categories) > 0) {
        $query['categories'] = implode(",", $categories);
      }
    }

    try {
      // Retrieve the WP posts from the $feed_url and decode the JSON into a
      // $results array.
      $request = $this->client->request('GET', $feed_url, ['query' => $query]);

      $response = $request->getBody()->getContents();

      $results = json_decode($response);


      // Iterate of the WP results returned in $results, and get the
      // processed/formatted results from getContentComposite().
      foreach ($results as $result) {
        $items[] = $this->getContentComposite($result);
      }

      return $items;
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error(
        "Exception while calling Wordpress API: @message", [
          '@message' => $e->getMessage(),
        ]
      );

      return [];
    }
  }

  /**
   * Returns $max_results-many autocomplete options based upon a $search value.
   *
   * @param string $search
   *   A search query to use to filter WP posts by title.
   * @param int $max_results
   *   The maximum number of results to provide in the autocomplete options.
   *
   * @return array
   *   Return an array of autocomplete options if posts can be successfully
   *   fetched. Otherwise, returns an empty array.
   */
  public function getAutocompleteContentOptions($search, $max_results) {
    $feed_url = $this->apiUrl;
    $query = [
      'rest_route' => '/rh/v1/posts-by-title',
      'search' => $search,
    ];
    $results = [];

    try {
      // Tries to retrieve WP posts from $feed_url using the $query params.
      $request = $this->client->request('GET', $feed_url, ['query' => $query]);
      $response = $request->getBody()->getContents();
      $api_results = json_decode($response);

      foreach ($api_results as $api_result) {
        $label = Html::escape($api_result->post_title) . ' (' . $api_result->ID . ')';
        $results[] = [
          'value' => $label,
          'label' => $label,
        ];

        if (count($results) >= $max_results) {
          // If we already have $max_results-many WP posts in $results, then we
          // return $results.
          return $results;
        }
      }

      // If no WP posts were returned in the response, return the empty $results
      // array here.
      return $results;
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error(
        "Exception while calling Wordpress API: @message", [
          '@message' => $e->getMessage(),
        ]
      );

      return [];
    }
  }

  /**
   * Fetches WP post categories from the wp-json endpoint.
   *
   * @return array
   *   Returns an array of categories and metadata if the data is successfully
   *   fetched. Otherwise, returns an empty array.
   */
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
      \Drupal::logger('rhd_assemblies')->error(
        "Exception while calling Wordpress API: @message", [
          '@message' => $e->getMessage(),
        ]
      );

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
    $item->media = FALSE;
    $item->categories = FALSE;
    $item->date = date('F j, Y', strtotime($content->date));

    if (isset($content->featured_media) && $content->featured_media) {
      $item->media = $this->getContentMedia($content->featured_media);
      $aspect_ratio = $item->media->media_details->height / $item->media->media_details->width;
      $item->media->scale_orientation = ($aspect_ratio > .58) ? 'vertical' : 'horizontal';
    }

    if (isset($content->categories) && count($content->categories)) {
      $item->categories = $this->getContentCategoryLinks($content->categories);
    }

    return $item;
  }

  /**
   * Retrieves WP media by the $id of the media.
   *
   * @param string $id
   *   The ID of the WP media.
   *
   * @return array
   *   Returns an array of metadata for the media entity if successfully
   *   fetched. Otherwise, returns an empty array.
   */
  private function getContentMedia($id) {
    try {
      $feed_url = $this->apiUrl . '/wp-json/wp/v2/media/' . $id;
      $request = $this->client->request('GET', $feed_url);
      $response = $request->getBody()->getContents();

      return json_decode($response);
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error(
        "Exception while calling Wordpress API: @message", [
          '@message' => $e->getMessage(),
        ]
      );

      return [];
    }
  }

  /**
   * Retrieves categories from WP, then extracts links and names.
   *
   * @param array $categories
   *   An array of category IDs.
   *
   * @return array
   *   If successful, this returns an array of category links and names indexed
   *   by the category ID. Otherwise, this returns an empty array.
   */
  private function getContentCategoryLinks($categories) {
    $links = [];
    $categories_list = $this->getCategories();
    
    foreach ($categories as $category_id) {
      if (array_key_exists($category_id, $categories_list)) {
        $links[] = [
          'link' => $categories_list[$category_id]->link,
          'name' => $categories_list[$category_id]->name,
        ];
      }
    }

      return $links;
  }

}
