<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\node\Entity\Node;

/**
 * Displays a list of recent content from Wordpress and Drupal
 *  @AssemblyBuild(
 *   id = "dynamic_content_feed",
 *   types = { "dynamic_content_feed" },
 *   label = @Translation("Dynamic Content Feed")
 * )
 */
class DynamicContentFeedBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $count = $entity->get('field_number_of_posts')->getValue();
    $count = reset($count)['value'];
    $this->getItems($build, $entity, $count, 'tile');
  }

  protected function getItems(&$build, $entity, $count, $mode) {
    $posts = $this->getWordpressPosts($entity, $count);
    $nodes = $this->getDrupalNodes($entity, $count);
    $items = $this->orderItems($posts, $nodes);
    $items = array_slice($items, 0, $count);

    if (count($items)) {
      $build['posts'] = [
        '#theme' => 'item_list',
        '#list_type' => 'ul',
        '#items' => [],
        '#attributes' => ['class' => 'content-' . $mode . '-list count-' . $count],
      ];
      foreach ($items as $item) {
        if (isset($item['post'])) {
          $build['posts']['#items'][] = [
            '#theme' => 'wordpress_post_' . $mode,
            '#post' => $item['post']->content,
            '#media' => $item['post']->media,
            '#categories' => $item['post']->categories
          ];
        }
        else if (isset($item['node'])) {
          $view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');
          $storage = \Drupal::entityTypeManager()->getStorage('node');
          $build['posts']['#items'][] = $view_builder->view($item['node'], $mode);
        }
      }
    }

  }

  protected function orderItems($posts, $nodes) {
    $items = [];

    // Combine into a single list, ordered by date. Use double array in case
    // items share a creation time.
    foreach ($posts as $post) {
      $date = strtotime($post->content->date);
      $items[$date][] = [
        'post' => $post
      ];
    }
    foreach ($nodes as $node) {
      $date = $node->getCreatedTime();
      $items[$date][] = [
        'node' => $node
      ];
    }

    // Flatten array
    $flat_items = [];
    foreach($items as $date) {
      foreach ($date as $item) {
        $flat_items[] = $item;
      }
    }

    return $flat_items;
  }

  protected function getWordpressPosts(EntityInterface $entity, $count) {
    $category_filters = $entity->get('field_category_filter')->getValue();
    if (empty($category_filters)) {
      return [];
    }

    $categories = [];
    if (!empty($category_filters)) {
      foreach ($category_filters as $category_filter) {
        $categories[] = $category_filter['value'];
      }
    }

    if (count($categories)) {
      $posts = \Drupal::service('rhd_assemblies.wordpress_api')->getContentByCategory($categories, $count);
      return $posts;
    }

    return [];
  }

  protected function getDrupalNodes(EntityInterface $entity, $count) {
    $term_filters = $entity->get('field_drupal_term_filter')->getValue();
    if (empty($term_filters)) {
      return [];
    }

    $terms = [];
    if (!empty($term_filters)) {
      foreach ($term_filters as $term_filter) {
        $terms[] = $term_filter['target_id'];
      }
    }

    $valid_node_types = [
      'video_resource'
    ];

    $query = \Drupal::database()->select('node__field_topics', 't');
    $query->fields('t', ['entity_id']);
    $query->condition('t.field_topics_target_id', $terms, 'in');
    $query->leftJoin('node', 'n', 'n.nid = t.entity_id');
    $query->condition('n.type', $valid_node_types, 'in');
    $query->range(0, $count);
    $query->orderBy('t.entity_id', 'desc');
    $results = $query->execute();

    $nodes = [];
    foreach ($results as $result) {
      $node_id = $result->entity_id;
      $nodes[$node_id] = Node::load($node_id);
    }

    return $nodes;
  }
}
