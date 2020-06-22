<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\node\Entity\Node;

/**
 * Displays a list of recent content from Wordpress and Drupal.
 *
 *  @AssemblyBuild(
 *   id = "dynamic_content_feed",
 *   types = { "dynamic_content_feed" },
 *   label = @Translation("Dynamic Content Feed")
 * )
 */
class DynamicContentFeedBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  /**
   * {@inheritdoc}
   */
  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $count = $entity->get('field_number_of_posts')->getValue();
    $count = reset($count)['value'];
    $this->getItems($build, $entity, $count, 'card');
  }

  /**
   * {@inheritdoc}
   */
  protected function getItems(&$build, $entity, $count, $mode) {
    $posts = $this->getWordpressPosts($entity, $count);
    $nodes = $this->getDrupalNodes($entity, $count);
    $items = $this->orderItems($posts, $nodes);
    $items = array_slice($items, 0, $count);

    if (count($items)) {
      if ($mode != 'card') {
        $build['posts'] = [
          '#type' => 'container',
        ];
      }
      foreach ($items as $item) {
        if (isset($item['post'])) {
          $build['posts'][] = [
            '#theme' => 'wordpress_post_' . $mode,
            '#post' => $item['post']->content,
            '#media' => $item['post']->media,
            '#categories' => $item['post']->categories,
            '#date' => $item['post']->date,
          ];
        }
        elseif (isset($item['node'])) {
          $view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');
          $build['posts'][] = $view_builder->view($item['node'], $mode);
        }
      }
    }

  }

  /**
   * {@inheritdoc}
   */
  protected function orderItems($posts, $nodes) {
    $items = [];

    // Combine into a single list, ordered by date. Use double array in case
    // items share a creation time.
    foreach ($posts as $post) {
      $date = strtotime($post->content->date);
      $items[$date][] = ['post' => $post];
    }
    foreach ($nodes as $node) {
      $date = $node->getCreatedTime();
      $items[$date][] = ['node' => $node];
    }

    // Actually sort the array, by key desc.
    krsort($items);

    // Flatten array.
    $flat_items = [];
    foreach ($items as $date) {
      foreach ($date as $item) {
        $flat_items[] = $item;
      }
    }

    return $flat_items;
  }

  /**
   * {@inheritdoc}
   */
  protected function getWordpressPosts(EntityInterface $entity, $count) {
    // Get selected categories.
    $category_filters = $entity->get('field_category_filter')->getValue();

    // Get category logic.
    if ($entity->hasField('field_wordpress_category_logic')) {
      $category_logic = $entity->get('field_wordpress_category_logic')->getValue();
    }
    else {
      $category_logic = NULL;
    }

    // Grab category ids.
    $categories = [];
    if (!empty($category_filters)) {
      foreach ($category_filters as $category_filter) {
        $categories[] = $category_filter['value'];
      }
    }

    $posts = \Drupal::service('rhd_assemblies.wordpress_api')->getContentByCategory($categories, $count, $category_logic);

    return $posts;
  }

  /**
   * {@inheritdoc}
   */
  protected function getDrupalNodes(EntityInterface $entity, $count) {
    $term_filters = $entity->get('field_drupal_term_filter')->getValue();
    $terms = [];
    $valid_node_types = [
      'video_resource',
      'article',
    ];

    if (!empty($term_filters)) {
      foreach ($term_filters as $term_filter) {
        $terms[] = $term_filter['target_id'];
      }
    }

    if (!empty($terms)) {
      $query = \Drupal::database()->select('taxonomy_index', 't');
      $query->fields('t', ['nid']);
      $query->condition('t.tid', $terms, 'in');
      $query->leftJoin('node', 'n', 'n.nid = t.nid');
      $query->condition('n.type', $valid_node_types, 'in');
      $query->join('node_field_data', 'nfd', 'n.nid = nfd.nid');
      $query->condition('nfd.status', 1);
      $query->range(0, $count);
      $query->orderBy('nfd.created', 'desc');
      $results = $query->execute();
    }
    else {
      $query = \Drupal::entityQuery('node')
        ->condition('status', 1)
        ->condition('type', $valid_node_types, 'in')
        ->range(0, $count)
        ->sort('created', 'DESC');

      $results = $query->execute();

      // Format results in an array of stdClasses with a nid attribute.
      foreach ($results as $key => $result) {
        $nid = $result;
        $results[$key] = new \stdClass();
        $results[$key]->nid = $nid;
      }
    }

    $nodes = [];

    foreach ($results as $result) {
      $node_id = $result->nid;
      $nodes[$node_id] = Node::load($node_id);
    }

    return $nodes;
  }

}
