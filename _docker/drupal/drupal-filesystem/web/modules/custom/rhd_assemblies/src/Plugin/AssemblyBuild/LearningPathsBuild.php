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
 *   id = "learning_paths",
 *   types = { "learning_paths" },
 *   label = @Translation("Learning Paths")
 * )
 */
class LearningPathsBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  /**
   * {@inheritdoc}
   */
  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $this->getItems($build, 'card');

    // Dunno why I can't just set the #weight property.
    $build['field_cta_link']['#weight'] = 10;
    $build['cta'] = $build['field_cta_link'];
    unset($build['field_cta_link']);
  }

  /**
   * {@inheritdoc}
   */
  protected function getItems(&$build, $mode) {
    $items = $this->getDrupalNodes();
    if (count($items)) {
      foreach ($items as $item) {
        $view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');
        $build['nodes'][] = $view_builder->view($item, $mode);
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  protected function getDrupalNodes() {
    $query = \Drupal::database()->select('node', 'n');
    $query->fields('n', ['nid']);
    $query->condition('n.type', 'learning_path');
    $query->leftJoin('node__field_title', 't', 'n.nid = t.entity_id');
    $query->orderBy('t.field_title_value', 'asc');
    $results = $query->execute();
    $nodes = [];
    foreach ($results as $result) {
      $node_id = $result->nid;
      $nodes[$node_id] = Node::load($node_id);
    }
    return $nodes;
  }

}
