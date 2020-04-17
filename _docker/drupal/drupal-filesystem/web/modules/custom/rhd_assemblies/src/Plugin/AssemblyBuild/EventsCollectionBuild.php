<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\assembly\Plugin\AssemblyBuildView;

/**
 * Displays a list of recent content based on chosen vocabulary terms.
 *
 * @AssemblyBuild(
 *  id = "events_collection",
 *  types = { "events_collection" },
 *  label = @Translation("Events Collection")
 * )
 */
class EventsCollectionBuild extends AssemblyBuildView {
  /*
   * @TODO get field_display_option to either choose display
   * or set arguments/prepare args.
   * @TODO get sessions from field_single_event_reference if
   * field_display_option is set to single_event_sessions.
   */

  /**
   * Return a list of views that should get added to this view builder.
   *
   * Return value is an associative array structured like so:
   * return [
   *   'some_key' => [
   *     'view' => 'some_view_id',
   *     'display' => 'some_display_id' // optional, will use "default"
   *     'weight' => 99, // an optional weight value. defaults to 99
   *   ]
   * ];
   *
   * @return array
   *   The list of views
   */
  protected function views() {
    return ['events_collection' => ['view' => 'events_collection', 'display' => 'default']];
  }

  /**
   * An associative array of field names to argument mapping settings.
   *
   * Takes the values provided by fields in the assembly and feeds them
   * to the view as contextual filters (arguments).
   *
   * By way of example:
   *  return [
   *    'field_categories' => [
   *      'index' => 0, // the argument index to which it. Required
   *      'view' => 'some_view_id', // The id of the view to which
   *                                // this gets assigned.
   *                                // Optional if only one view is assigned
   *      'attribute' => 'target_id', // The attribute for each
   *                                  // field value to use.
   *                                  // Defaults to target_id
   *      'multiple' => 'or', // or 'and'. Defaults to 'or'
   *      'all_value' => 'all', // Defaults to 'all'
   *    ],
   *  ];
   *
   * @return array
   *   The argument mappings
   */
  // protected function argumentMappings() {
  //   return [
  //     'field_drupal_term_filter' => [
  //       'index' => 0,
  //       'view' => 'events_collection',
  //       'multiple' => 'or',
  //     ],
  //   ];
  // }

  // protected function prepareView($view, $build, $entity, $display, $view_mode) {
  //   $show_pagination = ($entity->get('field_show_pagination')->value) ? $entity->get('field_show_pagination')->value : FALSE;
  //   $total_posts = ($entity->get('field_total_posts')->value) ? $entity->get('field_total_posts')->value : 4;
  //   $view->setItemsPerPage($total_posts);
  //   if($show_pagination) {
  //     $view->display_handler->options['pager']['type'] = 'full';
  //   }
  // 
  //   return $view;
  // }

}
