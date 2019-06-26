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

    // get category logic
    if($entity->hasField('field_wordpress_category_logic')) {
      $category_logic = $entity->get('field_wordpress_category_logic')->getValue();
    } else {
      $category_logic = NULL;
    }

    // grab category ids
    $categories = [];
    if (!empty($category_filters)) {
      foreach ($category_filters as $category_filter) {
        $categories[] = $category_filter['value'];
      }
    }

    // Get the posts
    $posts = \Drupal::service('rhd_assemblies.wordpress_api')->getContentByCategory($categories, 3, $category_logic);

    // Build the posts
    if (!empty($posts)) {
      $build['posts'] = [
        '#theme' => 'item_list',
        '#list_type' => 'ul',
        '#items' => [],
        '#attributes' => ['class' => 'blog-post-teaser-list'],
      ];

      foreach ($posts as $post) {
        $build['posts']['#items'][] = [
          '#theme' => 'wordpress_post_teaser',
          '#post' => $post->content,
          '#media' => $post->media,
          '#categories' => $post->categories
        ];
      }
    }
  }
}
