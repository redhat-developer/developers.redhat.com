<?php

namespace Drupal\rhd_assemblies\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;

/**
 * Plugin implementation of the 'wppost_teaser' formatter.
 *
 * @FieldFormatter(
 *   id = "wppost_teaser",
 *   label = @Translation("Wordpress post teaser"),
 *   field_types = {
 *     "wppost"
 *   }
 * )
 */
class WppostTeaserFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = [];
    $entity = $items->getEntity();
    $settings = $this->getSettings();

    $client = \Drupal::httpClient();
    foreach ($items as $delta => $item) {
      $id = $items[$delta]->get('target_id')->getCastedValue();
      $feed_url = 'https://developers.redhat.com/blog/wp-json/wp/v2/posts/' . $id;
      try {
        $request = $client->request('GET', $feed_url);
        $request_headers = $request->getHeaders();
        $response = $request->getBody()->getContents();
        $result = json_decode($response);

        $element[$delta] = [
          '#theme' => 'wordpress_post_teaser',
          '#post' => $result,
          '#media' => FALSE,
          '#categories' => FALSE
        ];
      }
      catch (\Exception $e) {
        \Drupal::logger('rhd_assemblies')->error("Exception while calling Wordpress API: " . $e->getMessage());
      }
    }

    return $element;
  }

  function wppost_by_id($ids) {
    $feed_url = 'https://developers.redhat.com/blog/wp-json/wp/v2/posts';
    $query = [
      'per_page' => count($ids),
      'page' => 1,
      'context' => 'view',
      'include'
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
