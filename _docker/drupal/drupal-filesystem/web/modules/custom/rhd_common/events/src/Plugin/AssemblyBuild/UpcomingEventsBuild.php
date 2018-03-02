<?php
/**
 * Created by PhpStorm.
 * User: jporter
 * Date: 2/26/18
 * Time: 2:56 PM
 */

namespace Drupal\events\Plugin\AssemblyBuild;

use Drupal\assembly\Plugin\AssemblyBuildView;


/**
 * Adds upcoming events to the built entity
 *  @AssemblyBuild(
 *   id = "upcoming_events",
 *   types = { "rich_text" },
 *   label = @Translation("Upcoming Events View")
 * )
 */
class UpcomingEventsBuild extends AssemblyBuildView {

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
   * @return array The list of views
   */
  protected function views() {
    return ['devnation_events' => ['view' => 'upcoming_events', 'display' => 'default', 'weight' => 99]];
  }
}