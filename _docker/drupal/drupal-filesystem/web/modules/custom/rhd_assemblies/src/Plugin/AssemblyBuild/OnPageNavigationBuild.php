<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\Core\Url;
use Drupal\Core\Link;
use Drupal\assembly\Entity\Assembly;
use Drupal\Component\Utility\Html;

/**
 * Adds recent blog posts to the built entity
 *  @AssemblyBuild(
 *   id = "on_page_navigation",
 *   types = { "on_page_navigation" },
 *   label = @Translation("On Page Navigation")
 * )
 */
class OnPageNavigationBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    if ($build['#parent']) {
      // Get all assemblies referenced in the same field
      $items = $build['#parent']['entity']->get($build['#parent']['field_name'])->getValue();

      $assemblies = [];
      foreach ($items as $item) {
        // Exclude the current assembly
        if ($item['target_id'] == $entity->id()) {
          continue;
        }
        $id = $item['target_id'];
        $assemblies[$id] = Assembly::load($id);
      }
    }

    if (!empty($assemblies)) {
      $nav_items = [];
      foreach ($assemblies as $id => $assembly) {
        // Only include links to published assemblies
        if (!$assembly->isPublished() || !$assembly->hasField('field_navigation_title')) {
          continue;
        }

        $link_text = $assembly->get('field_navigation_title')->value;
        if (empty($link_text)) {
          continue;
        }
        $css_id = Html::cleanCssIdentifier('assembly-' . $build['#parent']['field_name'] . '-' . $id);
        $nav_items[$id] = ['#markup' => '<a href="#' . $css_id . '"><span class="vcenter">' . $link_text . '</span></a>'];
      }
      if (!empty($nav_items)) {
        $build['nav'] = [
          '#theme' => 'item_list',
          '#list_type' => 'ul',
          '#items' => $nav_items,
          '#attributes' => ['class' => 'on-page-nav-list'],
        ];
      }
    }
  }
}
