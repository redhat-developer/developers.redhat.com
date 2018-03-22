<?php

namespace Drupal\rhd_assemblies\Controller;

use Drupal\Component\Utility\Html;
use Drupal\Component\Utility\Tags;
use Drupal\Component\Utility\Unicode;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Defines a route controller for entity autocomplete form elements.
 */
class WppostAutocompleteController extends ControllerBase {

  /**
   * Handler for autocomplete request.
   */
  public function handleAutocomplete(Request $request, $field_name, $count) {
    $results = [];

    // Get the typed string from the URL, if it exists.
    if ($input = $request->query->get('q')) {
      $typed_string = Tags::explode($input);
      $typed_string = Unicode::strtolower(array_pop($typed_string));
      if (strlen($typed_string) >= 3) {
        $results = $this->wppost_by_title($typed_string, 10);
      }
    }

    return new JsonResponse($results);
  }

  function wppost_by_title($title, $max_results) {
    $feed_url = 'https://developers.redhat.com/blog/wp-json/wp/v2/posts';
    $query = [
      'per_page' => 100,
      'page' => 1,
      'context' => 'embed',
      'search' => $title
    ];
    $client = \Drupal::httpClient();
    $pages_to_query = 1;
    $results = [];
    try {
      for ($i = 1; $i <= $pages_to_query; $i++) {
        $query['page'] = $i;
        $request = $client->request('GET', $feed_url, ['query' => $query]);
        $request_headers = $request->getHeaders();
        $pages_to_query = reset($request_headers['X-WP-TotalPages']);

        $response = $request->getBody()->getContents();
        $api_results = json_decode($response);
        foreach ($api_results as $api_result) {
          if (stripos($api_result->title->rendered, $title) !== FALSE) {
            $results[] = [
              'value' => Html::escape($api_result->title->rendered) . ' (' . $api_result->id . ')',
              'label' => Html::escape($api_result->title->rendered) . ' (' . $api_result->id . ')'
            ];
            if (count($results) >= $max_results) {
              return $results;
            }
          }
        }
      }
    }
    catch (\Exception $e) {
      \Drupal::logger('rhd_assemblies')->error("Exception while calling Wordpress API: " . $e->getMessage());
      return [];
    }
    return $results;
  }


}
