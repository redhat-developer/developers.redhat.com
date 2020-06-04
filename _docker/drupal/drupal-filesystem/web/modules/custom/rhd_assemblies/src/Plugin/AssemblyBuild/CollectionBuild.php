<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\assembly\Plugin\AssemblyBuildView;

/**
 * Displays recent content from Drupal based on chosen vocabulary terms.
 *
 *  @AssemblyBuild(
 *   id = "collection",
 *   types = { "collection" },
 *   label = @Translation("Collection")
 * )
 */
class CollectionBuild extends AssemblyBuildView {

  /**
   * {@inheritdoc}
   */
  protected function views() {
    return ['collection' => ['view' => 'collection', 'display' => 'default']];
  }

  /**
   * {@inheritdoc}
   */
  protected function argumentMappings() {
    return [
      'field_drupal_term_filter' => [
        'index' => 0,
        'view' => 'collection',
        'multiple' => 'or',
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  protected function prepareView($view, $build, $entity, $display, $view_mode) {
    $show_pagination = ($entity->get('field_show_pagination')->value) ? $entity->get('field_show_pagination')->value : FALSE;
    $total_posts = ($entity->get('field_total_posts')->value) ? $entity->get('field_total_posts')->value : 4;
    $view->setItemsPerPage($total_posts);
    if ($show_pagination) {
      $view->display_handler->options['pager']['type'] = 'full';
    }

    return $view;
  }

}
