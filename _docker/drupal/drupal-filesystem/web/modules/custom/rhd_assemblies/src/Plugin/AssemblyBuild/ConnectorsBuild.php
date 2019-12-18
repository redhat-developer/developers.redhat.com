<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\assembly\Plugin\AssemblyBuildView;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\node\Entity\Node;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Adds all Connector nodes displayed as a List View.
 *  @AssemblyBuild(
 *   id = "connectors",
 *   types = { "connectors" },
 *   label = @Translation("Connectors")
 * )
 */
class ConnectorsBuild extends AssemblyBuildBase implements AssemblyBuildInterface {
  /**
   * {@inheritdoc}
   */
  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $this->getItems($build, 'list_view');
  }

  /**
   * Sets a build array, $build['nodes'], of rendered nodes.
   *
   * @param array &$build
   * @param string $view_mode
   */
  protected function getItems(array &$build, $view_mode) {
    $items = $this->getDrupalNodes();
    if (count($items)) {
      foreach ($items as $item) {
        $view_builder = \Drupal::entityTypeManager()->getViewBuilder('node');
        $build['nodes'][] = $view_builder->view($item, $view_mode);
      }
    }
  }

  /**
   * Gets an array of Node objects keyed by node id.
   */
  protected function getDrupalNodes() {
    $query = \Drupal::entityTypeManager()->getStorage('node')->getQuery();
    // Returns an array of nids keyed by revision ids.
    $query_results = $query
      ->condition('status', 1)
      ->condition('type', 'connectors')
      ->sort('title', 'ASC')
      ->execute();    

    $nodes = [];
    // Iterate through the array of nids and get an array of Node objects.
    foreach ($query_results as $nid) {
      $nodes[$nid] = Node::load($nid);
    }

    // An array of connector Node objects keyed by node id.
    return $nodes;
  }
}
