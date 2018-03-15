<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;

/**
 * Adds recent blog posts to the built entity
 *  @AssemblyBuild(
 *   id = "blog_posts",
 *   types = { "blog_posts" },
 *   label = @Translation("Blog Posts")
 * )
 */
class BlogPostsBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    // get selected categories
    $category_filters = $entity->get('field_category_filter')->getValue();

    // grab category ids
    $categories = [];
    if (!empty($category_filters)) {
      foreach ($category_filters as $category_filter) {
        $categories[] = $category_filter['value'];
      }
    }

    $page_max = 3;
    $feed_url = 'https://developers.redhat.com/blog/wp-json/wp/v2/posts';
    $query = ['per_page' => $page_max];

    // Add the category filter if applicable
    if (!empty($categories)) {
      $query['categories'] = $categories;
    }

    // retrieve posts
    $client = \Drupal::httpClient();
    $request = $client->request('GET', $feed_url, ['query' => $query]);
    $response = $request->getBody()->getContents();
    $results = json_decode($response);

    if (!empty($results)) {
      // make list of posts
      $build['posts'] = [
        '#theme' => 'item_list',
        '#list_type' => 'ul',
        '#items' => [],
        '#attributes' => ['class' => 'blog-post-teaser-list'],
      ];

      foreach ($results as $result) {
        $build['posts']['#items'][$result->id] = ['#theme' => 'wordpress_post_teaser', '#post' => $result, '#media' => FALSE, '#categories' => FALSE];

        // retrieve categories
        if (!empty($result->categories)) {
          $feed_url = 'https://developers.redhat.com/blog/wp-json/wp/v2/categories';

          $request = $client->request('GET', $feed_url);
          $response = $request->getBody()->getContents();
          $categories = json_decode($response);

          $build['posts']['#items'][$result->id]['#categories'] = $categories;
        }

        // retrieve images
        if ($result->featured_media) {
          $feed_url = 'https://developers.redhat.com/blog/wp-json/wp/v2/media/' . $result->featured_media;

          $request = $client->request('GET', $feed_url);
          $response = $request->getBody()->getContents();
          $media = json_decode($response);

          $build['posts']['#items'][$result->id]['#media'] = $media;
        }
      }
    }
  }
}
