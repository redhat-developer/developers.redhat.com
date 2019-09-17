<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\taxonomy\Entity\Term;
use Drupal\file\Entity\File;
use Drupal\image\Entity\ImageStyle;

/**
 * Adds download manager data to the built entity.
 *
 * @AssemblyBuild(
 *   id = "bonus_content_item",
 *   types = { "bonus_content_item" },
 *   label = @Translation("Bonus Content Item")
 * )
 */
class BonusContentItemBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  /**
   * {@inheritdoc}
   */
  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $build['term_image_url'] = 'https://www.patternfly.org/assets/images/img_avatar.svg';

    if ($entity->hasField('field_bonus_content_type')) {
      $tid = (int) $entity->get('field_bonus_content_type')->getValue()[0]['target_id'];
      $term = Term::load($tid);

      if ($term_image_value = $term->get('field_content_type_image')->getValue()) {
        $file_id = $term_image_value[0]['target_id'];
        $uri = File::load($file_id)->getFileUri();

        if ($term_image_url = ImageStyle::load('bonus_thumb')->buildUrl($uri)) {
          $build['term_image_url'] = $term_image_url;
        }

        if ($term_image_url_alt = $term_image_value[0]['alt']) {
          $build['term_image_url_alt'] = $term_image_url_alt;
        }
      }

      if ($content_type_icon_style = $term->get('field_content_type_icon_style')->value) {
        $build['icon_style'] = $content_type_icon_style;
      }

      if ($term_name = $term->getName()) {
        $build['term_name'] = $term_name;
      }

    }
  }
}
