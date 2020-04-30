<?php

namespace Drupal\rhd_assemblies\Service;

use Drupal\Component\Utility\Html;
use Drupal\Core\Cache\CacheBackendInterface;
use Drupal\Core\Config\ConfigFactory;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
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
   * @param \Drupal\Core\Cache\CacheBackendInterface $cache_bin
   *   Wordpress API cache bin service.
   * @param \Drupal\Core\Logger\LoggerChannelFactoryInterface $logger_factory
   *   Logger factory service.
   * @param \Drupal\Core\Config\ConfigFactory $config_factory
   *   Config factory service.
   */
  public function __construct(ClientInterface $client, CacheBackendInterface $cache_bin, LoggerChannelFactoryInterface $logger_factory, ConfigFactory $config_factory) {
    // If, for some reason, we want to bypass Akamai, change the value of this
    // attribute to 'https://origin-developers.redhat.com/blog'.
    $this->apiUrl = 'https://developers.redhat.com/blog';
    $this->client = $client;
    $this->cacheBin = $cache_bin;
    $this->loggerFactory = $logger_factory;
    $this->configFactory = $config_factory;
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
    $cid = 'wordpress_api:post:' . $id;
    $ttl = $this->configFactory->get('redhat_developers')->get('wordpressApi.ttl') ?? 3600;
    $feed_url = $this->apiUrl . '/wp-json/wp/v2/posts/' . $id;

    // Serve the cached Wordpress API data if available.
    if ($cache = $this->cacheBin->get($cid)) {
      $data = $cache->data;
    }
    // If this is uncached or the cache is invalid, fetch fresh data.
    else {
      try {
        $request = $this->client->request('GET', $feed_url);
        $response = $request->getBody()->getContents();
        $data = json_decode($response);
        // Persist this data to the wordpress_api cache bin for an hour.
        $this->cacheBin->set($cid, $data, time() + $ttl);
      }
      catch (\Exception $e) {
        $this->loggerFactory->get('rhd_assemblies')->error(
          "Exception while calling Wordpress API: @message", [
            '@message' => $e->getMessage(),
          ]
        );

        return FALSE;
      }
    }

    return $this->getContentComposite($data);
  }

  /**
   * Fetches WP post(s) by category. Returns up to $max_results posts.
   *
   * @param array $categories
   *   An array of strings of the WP post categories.
   * @param string|int $max_results
   *   Maximum number of items to be returned in result set.
   * @param string $select_logic
   *   Logic to be used for searching posts by categories can be 'and|or'.
   *
   * @return array
   *   Returns an array of objects of the WP posts if the fetch is successful.
   *   Otherwise, returns an empty array.
   */
  public function getContentByCategory(array $categories, $max_results, $select_logic) {
    $items = [];
    $select_logic_tmp = "or";
    $feed_url = $this->apiUrl . '/wp-json/rhd-frontend-blog-theme/v1/posts-by-category';
    $ttl = $this->configFactory->get('redhat_developers')->get('wordpressApi.ttl') ?? 3600;
    $query['per_page'] = $max_results;
    $query['logic'] = $select_logic_tmp;

    if ($select_logic) {
      $select_logic_tmp = $select_logic[0]['value'] == "1" ? "and" : "or";
    }

    if (!empty($categories)) {
      $query['categories'] = implode(",", $categories);
      $imploded_categories = implode('', $categories);
      $cid = "wordpress_api:by_category:per_page_{$query['per_page']}-logic_{$query['logic']}-categories_{$imploded_categories}";
    }
    else {
      $cid = "wordpress_api:by_category:per_page_{$query['per_page']}-logic_{$query['logic']}";
    }

    // Serve the cached Wordpress API data if available.
    if ($cache = $this->cacheBin->get($cid)) {
      $data = $cache->data;
    }
    // If this is uncached or the cache is invalid, fetch fresh data.
    else {
      try {
        // Retrieve the WP posts from the $feed_url and decode the JSON into a
        // $results array.
        $request = $this->client->request('GET', $feed_url, ['query' => $query]);
        $response = $request->getBody()->getContents();
        $results = json_decode($response);
        // Pass the WP posts returned in $results, and get the
        // processed/formatted results from getContentCompositeMultiple().
        $data = $this->getContentCompositeMultiple($results);

        if (!empty($data)) {
          // Persist this data to the wordpress_api cache bin for an hour.
          $this->cacheBin->set($cid, $data, time() + $ttl);
        }
      }
      catch (\Exception $e) {
        $this->loggerFactory->get('rhd_assemblies')->error(
          "Exception while calling Wordpress API: @message", [
            '@message' => $e->getMessage(),
          ]
        );

        return [];
      }
    }

    return $data;
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
    $cid = 'wordpress_api:search:' . $search;
    $ttl = $this->configFactory->get('redhat_developers')->get('wordpressApi.ttl') ?? 3600;

    // Serve the cached Wordpress API data if available.
    if ($cache = $this->cacheBin->get($cid)) {
      $data = $cache->data;
    }
    // If this is uncached or the cache is invalid, fetch fresh data.
    else {
      try {
        // Tries to retrieve WP posts from $feed_url using the $query params.
        $request = $this->client->request('GET', $feed_url, ['query' => $query]);
        $response = $request->getBody()->getContents();
        $data = json_decode($response);
        // Persist this data to the wordpress_api cache bin for an hour.
        $this->cacheBin->set($cid, $data, time() + $ttl);
      }
      catch (\Exception $e) {
        $this->loggerFactory->get('rhd_assemblies')->error(
          "Exception while calling Wordpress API: @message", [
            '@message' => $e->getMessage(),
          ]
        );

        return [];
      }
    }

    return $this->formatAutocompleteContentOptions($data, $max_results);
  }

  /**
   * Returns formatted HTML output of the autocomplete options.
   *
   * @param string $api_results
   *   The titles/results returned from the Wordpress API.
   * @param int $max_results
   *   The maximum number of results to provide in the autocomplete options.
   *
   * @return string[]
   *   Returns the formatted HTML output.
   */
  public function formatAutocompleteContentOptions($api_results, $max_results) {
    // We need to verify that we've successfully fetched posts in $api_results.
    if (empty($api_results)) {
      return [];
    }
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
    $cid = 'wordpress_api:categories';
    $ttl = $this->configFactory->get('redhat_developers')->get('wordpressApi.ttl') ?? 3600;

    // Serve the cached Wordpress API data if available.
    if ($cache = $this->cacheBin->get($cid)) {
      $data = $cache->data;
    }
    // If this is uncached or the cache is invalid, fetch fresh data.
    else {
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

        $data = $results;
        // Persist this data to the wordpress_api cache bin for an hour.
        $this->cacheBin->set($cid, $data, time() + $ttl);
      }
      catch (\Exception $e) {
        $this->loggerFactory->get('rhd_assemblies')->error(
          "Exception while calling Wordpress API: @message", [
            '@message' => $e->getMessage(),
          ]
        );

        return [];
      }
    }

    return $data;
  }

  /**
   * Fetches WP category options.
   *
   * @return array
   *   Returns an array of categories.
   */
  public function getCategoryOptions() {
    $categories = $this->getCategories();

    foreach ($categories as $id => $category) {
      $categories[$id] = $category->name;
    }

    return $categories;
  }

  /**
   * Formats a Wordpress post response from WP JSON API.
   *
   * @return object
   *   Returns an object of \stdClass().
   *   The object holds all of post content we will eventually render
   *   such as title, content, media, categories, date, etc.
   */
  private function getContentComposite($content) {
    $item = new \stdClass();
    $item->content = $content;
    $item->media = FALSE;
    $item->categories = FALSE;
    $item->date = date('F j, Y', strtotime($content->date));

    if (isset($content->featured_media) && $content->featured_media) {
      $content_media = $this->getContentMedia([$content->featured_media]);

      if (!empty($content_media)) {
        $item->media = reset($content_media);
        $aspect_ratio = $item->media->media_details->height / $item->media->media_details->width;
        $item->media->scale_orientation = ($aspect_ratio > .58) ? 'vertical' : 'horizontal';
      }
    }

    if (isset($content->categories) && count($content->categories)) {
      $item->categories = $this->getContentCategoryLinks($content->categories);
    }

    return $item;
  }

  /**
   * Formats multiple Wordpress posts, returned from WP JSON API.
   *
   * @return array
   *   This is just like getContentComposite(), pass multiple posts and formats
   *   and returns those multiple posts.
   */
  private function getContentCompositeMultiple($contents) {
    $items = [];
    $media_ids = [];
    $category_ids = [];

    for ($i = 0; $i < count($contents); $i++) {
      $items[$i] = new \stdClass();
      $items[$i]->content = $contents[$i];
      $items[$i]->media = FALSE;
      $items[$i]->categories = FALSE;
      $items[$i]->date = date('F j, Y', strtotime($contents[$i]->date));
      // Store the Media entity IDs and Category entity IDs which will be used
      // to retrieve the entities from the Wordpress REST API.
      $media_ids[] = (!empty($contents[$i]->featured_media)) ? $contents[$i]->featured_media : NULL;
      $category_ids[] = (!empty($contents[$i]->categories)) ? $contents[$i]->categories : NULL;
    }

    // Referenced Media entities.
    $medias = $this->getContentMedia($media_ids);
    $sorted_medias = [];

    // We have to iterate through all of the Media entities in a nested for-loop
    // to reindex the array such that it matches the sorting we originally set
    // in $media_ids.
    //
    // We have to use count($contents) instead of count($medias) because
    // multiple post entities could reference the same media entity.
    for ($i = 0; $i < count($contents); $i++) {
      for ($j = 0; $j < count($medias); $j++) {
        if ($medias[$j]->id === $media_ids[$i]) {
          $sorted_medias[$i] = $medias[$j];
        }
      }
    }

    for ($i = 0; $i < count($contents); $i++) {
      if (!empty($contents[$i]->featured_media)) {
        if (isset($sorted_medias[$i])) {
          $items[$i]->media = $sorted_medias[$i];
          $aspect_ratio = $sorted_medias[$i]->media_details->height / $sorted_medias[$i]->media_details->width;
          $items[$i]->media->scale_orientation = ($aspect_ratio > .58) ? 'vertical' : 'horizontal';
        }
      }
    }

    // Referenced Category entities/terms.
    $links = [];
    $categories_list = $this->getCategories();

    for ($i = 0; $i < count($contents); $i++) {
      if (isset($contents[$i]->categories) && count($contents[$i]->categories)) {

        foreach ($contents[$i]->categories as $category_id) {
          if (array_key_exists($category_id, $categories_list)) {
            $items[$i]->categories[] = [
              'link' => $categories_list[$category_id]->link,
              'name' => $categories_list[$category_id]->name,
            ];
          }
        }
      }
    }

    return $items;
  }

  /**
   * Retrieves WP media by the $ids of the media.
   *
   * @param array $ids
   *   The IDs of the WP media.
   *
   * @return array
   *   Returns an array of metadata for the media entity if successfully
   *   fetched. Otherwise, returns an empty array.
   */
  private function getContentMedia(array $ids) {
    $cid = 'wordpress_api:content_media:' . implode('', $ids);
    $ttl = $this->configFactory->get('redhat_developers')->get('wordpressApi.ttl') ?? 3600;

    // Serve the cached Wordpress media if available.
    if ($cache = $this->cacheBin->get($cid)) {
      $data = $cache->data;
    }
    // If this is uncached or the cache is invalid, fetch fresh data.
    else {
      try {
        // Filters out any values in $ids equivalent to FALSE and then implodes.
        $ids_string = implode(",", array_filter($ids));
        // Retrieves the WP Media entities by their IDs.
        $feed_url = $this->apiUrl . '/wp-json/wp/v2/media?include=' . $ids_string;
        $request = $this->client->request('GET', $feed_url);
        $response = $request->getBody()->getContents();
        $data = json_decode($response);
        // Persist this data to the wordpress_api cache bin for an hour.
        $this->cacheBin->set($cid, $data, time() + $ttl);
      }
      catch (\Exception $e) {
        $this->loggerFactory->get('rhd_assemblies')->error(
          "Exception while calling Wordpress API: @message", [
            '@message' => $e->getMessage(),
          ]
        );

        return [];
      }
    }

    return $data;
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
  private function getContentCategoryLinks(array $categories) {
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
