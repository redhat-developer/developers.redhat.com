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

  /**
   * {@inheritdoc}
   */
  protected function views() {
    $views = [
      'events_collection_grouped' => [
        'view' => 'events_collection',
        'display' => 'all_sessions_ungrouped',
      ],
    ];

    return $views;
  }

  /**
   * {@inheritdoc}
   */
  protected function prepareView($view, $build, $entity, $display, $view_mode) {

    if ($entity->hasField('field_display_option') && !$entity->get('field_display_option')->isEmpty()) {

      // Set view display based on the assembly Display Option field.
      $display_option = $entity->get('field_display_option')->value;
      $view->setDisplay($display_option);

      // Get sessions for a single event.
      if ($display_option == 'single_event_sessions') {

        // Get sessions from reference field on assembly.
        if ($entity->hasField('field_single_event_reference') && !$entity->get('field_single_event_reference')->isEmpty()) {
          if ($single_event_tid = $entity->get('field_single_event_reference')->getValue()[0]['target_id']) {
            $view->setArguments([$single_event_tid]);
          }
        }
        // Get sessions from the event node the assembly is used on.
        elseif ($assembly_references = assembly_get_references($entity->id())) {
          if (count($assembly_references['node']) == 1) {
            $view->setArguments([reset($assembly_references['node'])]);
          }
        }
      }
    }

    return $view;
  }

}
