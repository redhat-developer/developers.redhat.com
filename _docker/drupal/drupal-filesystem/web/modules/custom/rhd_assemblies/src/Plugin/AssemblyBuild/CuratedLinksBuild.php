<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\assembly\Entity\Assembly;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;

/**
 * Provides a curated list of links.
 *
 * @AssemblyBuild(
 *   id = "curated_links",
 *   types = { "curated_links" },
 *   label = @Translation("Curated Links")
 * )
 */
class CuratedLinksBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  /**
   * {@inheritdoc}
   */
  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $parent_entity = $build['#parent']['entity'];
    $content_list = $entity->get('field_content_list')->getValue();
    $target_ids = [];
    $build['links'] = [];

    // Get the target ids of assemblies referenced from the Content List field.
    foreach ($content_list as $content) {
      $target_ids[] = $content['target_id'];
    }

    // Fetch the Assembly entities by their ids.
    $assemblies = Assembly::loadMultiple($target_ids);

    // Iterate over the assemblies and build the Link render arrays.
    foreach ($assemblies as $assembly) {
      $type = $assembly->bundle();

      // Node Reference assembly type.
      if ($type == 'node_reference') {
        // Ensure we have a node id before retrieving the Node object with it.
        if (!empty($assembly->get('field_node_reference')->getValue()[0]['target_id'])) {
          // Get the node id and build the Node object from that id.
          $nid = $assembly->get('field_node_reference')->getValue()[0]['target_id'];
          $node = Node::load($nid);
          // Retrieve the Link render array from the Node object.
          $build['links'][] = $node->toLink()->toRenderable();
        }
      }
      // Static Item assembly type.
      elseif ($type == 'static_item') {
        // Ensure the Static Item title and URL fields are not empty before
        // accessing them.
        if (!empty($assembly->get('field_title')->getValue()[0]['value'])
          && !empty($assembly->get('field_url')->getValue()[0]['uri'])) {
          // Retrieve the title and build the URL.
          $title = $assembly->get('field_title')->getValue()[0]['value'];
          $url = Url::fromUri($assembly->get('field_url')->getValue()[0]['uri']);

          // Build the Link render array.
          $build['links'][] = [
            '#title' => $title,
            '#type' => 'link',
            '#url' => $url,
          ];
        }
      }
      // Wordpress Post Reference assembly type.
      elseif ($type == 'wordpress_post_reference') {
        // Ensure we have the WP post id and title before accessing them.
        if (!empty($assembly->get('field_post_reference')->getValue()[0]['target_id'])
          && !empty($assembly->get('field_post_reference')->getValue()[0]['title'])) {
          // Get the Wordpress post id and post title.
          $target_id = $assembly->get('field_post_reference')->getValue()[0]['target_id'];
          $title = $assembly->get('field_post_reference')->getValue()[0]['title'];
          // Build the URL object to the Wordpress post.
          $options = ['query' => ['p' => $target_id]];
          $base_url = \Drupal::request()->getSchemeAndHttpHost();
          $url = Url::fromUri("$base_url/blog", $options);

          // Build the Link render array.
          $build['links'][] = [
            '#title' => $title,
            '#type' => 'link',
            '#url' => $url,
          ];
        }
      }
    }
  }

}
