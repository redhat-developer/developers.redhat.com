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
      'events_collection' => [
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

      // Get all sessions for events with available category filter.
      if ($display_option == 'all_sessions_ungrouped') {

        // Show exposed filter based on assembly input.
        if ($entity->hasField('field_show_filter') && !$entity->get('field_show_filter')->isEmpty()) {
          if ($show_filters = $entity->get('field_show_filter')->getValue()) {

            // Check if there are exposed filters.
            if (isset($show_filters[0]['value']) && $show_filters[0]['value'] == 1) {

              // Show exposed filters.
              $view->display_handler->options['filters']['field_tax_event_categories_target_id']['exposed'] = TRUE;
              $view->display_handler->options['filters']['field_language_value']['exposed'] = TRUE;

              // Check if there is a term filter (Event Categories).
              if ($entity->hasField('field_drupal_term_filter') && !$entity->get('field_drupal_term_filter')->isEmpty()) {

                // Set contextual filter from term filter.
                if ($event_categories = $entity->get('field_drupal_term_filter')->getValue()) {
                  $tids = [];
                  foreach ($event_categories as $event_category) {
                    $tid = (int) $event_category['target_id'];
                    $tids[$tid] = $tid;
                  }
                  $args = implode('+', $tids);
                  $view->setArguments([$args]);

                  // Set taxonomy filter select options on the exposed form.
                  if (!empty($view->display_handler->options['filters']['field_tax_event_categories_target_id'])) {
                    $view->display_handler->options['filters']['field_tax_event_categories_target_id']['value'] = $tids;
                    $view->setExposedInput(['field_tax_event_categories_target_id' => 'All']);
                  }
                }
              }
              // Reset exposed filter to show all options if no term is set.
              else {
                $view->display_handler->options['filters']['field_tax_event_categories_target_id']['value'] = [];
                $view->display_handler->options['filters']['field_tax_event_categories_target_id']['expose']['reduce'] = FALSE;
                $view->setExposedInput(['field_tax_event_categories_target_id' => 'All']);
              }

            }
            // Hide exposed filters.
            else {
              $view->display_handler->options['filters']['field_tax_event_categories_target_id']['exposed'] = FALSE;
              $view->display_handler->options['filters']['field_language_value']['exposed'] = FALSE;
            }
          }
        }

        // Set filter options.
        $view->display_handler->setOption('filters', $view->display_handler->options['filters']);
        // Add a loaded value for hook_views_post_build()
        $view->display_handler->options['fields']['field_tax_event_categories']['first_load'] = TRUE;

      }

    }

    return $view;
  }

}
