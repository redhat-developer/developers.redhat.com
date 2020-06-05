<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\node\Entity\Node;

/**
 * Adds recent blog posts to the built entity.
 *
 *  @AssemblyBuild(
 *   id = "video_hero",
 *   types = { "video_hero" },
 *   label = @Translation("On Page Navigation")
 * )
 */
class VideoHeroBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  /**
   * {@inheritdoc}
   */
  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    // Get the target video resource node.
    $resource_id = $entity->get('field_video_resource')->target_id;
    if (!empty($resource_id) && !($resource_id === FALSE)) {
      $node = Node::load($resource_id);

      // Add video to build.
      if ($node && isset($node->field_video_resource)) {
        $viewBuilder = \Drupal::entityTypeManager()->getViewBuilder('node');
        $output = $viewBuilder->viewField($node->field_video_resource, 'full');
        $output['#cache']['tags'] = $node->getCacheTags();
        $output['#weight'] = -100;
        $build['video'] = $output;
      }
      // Add authors to build.
      if ($node && isset($node->field_video_author)) {
        $viewBuilder = \Drupal::entityTypeManager()->getViewBuilder('node');
        $output = $viewBuilder->viewField($node->field_video_author, [
          'label' => 'hidden',
          'type' => 'entity_reference_entity_view',
          'settings' => ['view_mode' => 'tile', 'link' => FALSE],
        ]);
        $output['#cache']['tags'] = $node->getCacheTags();
        $output['#weight'] = 100;
        $build['authors'] = $output;
      }
    }

    // Get the secondary target video resource node.
    $secondary_resource_id = $entity->get('field_secondary_video_resource')->target_id;
    if (!empty($secondary_resource_id) && !($secondary_resource_id === FALSE)) {
      $node = Node::load($secondary_resource_id);

      // Add video to build.
      if ($node && isset($node->field_video_resource)) {
        $viewBuilder = \Drupal::entityTypeManager()->getViewBuilder('node');
        $output = $viewBuilder->viewField($node->field_video_resource, 'full');
        $output['#cache']['tags'] = $node->getCacheTags();
        $output['#weight'] = -100;
        $build['secondary_video'] = $output;
      }

      // Add authors to build.
      if ($node && isset($node->field_video_author)) {
        $viewBuilder = \Drupal::entityTypeManager()->getViewBuilder('node');
        $output = $viewBuilder->viewField($node->field_video_author, [
          'label' => 'hidden',
          'type' => 'entity_reference_entity_view',
          'settings' => ['view_mode' => 'tile', 'link' => FALSE],
        ]);
        $output['#cache']['tags'] = $node->getCacheTags();
        $output['#weight'] = 100;
        $build['secondary_video_authors'] = $output;
      }
    }
  }

}
