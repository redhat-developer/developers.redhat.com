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

    $imageUri = 'https://www.patternfly.org/assets/images/img_avatar.svg';
    $imageAlt = 'avatar';

    if ($entity->hasField('field_bonus_content_type') && !$entity->get('field_bonus_content_type')->isEmpty()) {

      $term = Term::load($entity->field_bonus_content_type->target_id);
      if ($term && $term instanceof Term) {
        // Update the imageURI and imageAlt.
        if ($term->hasField('field_content_type_image') && !$term->get('field_content_type_image')->isEmpty()) {
          $termTargetFile = $term->field_content_type_image->target_id;
          $termTargetFileUri = File::load($termTargetFile)->getFileUri();
          $termTargetFileStyled = ImageStyle::load('bonus_thumb')->buildUrl($termTargetFileUri);
          $imageUri = $termTargetFileStyled;
          $imageAlt = $term->field_content_type_image->alt ?? '';
        }

        // Add icon style.
        if ($term->hasField('field_content_type_icon_style') && !$term->get('field_content_type_icon_style')->isEmpty()) {
          $build['icon_style'] = [
            '#type' => 'markup',
            '#markup' => $term->get('field_content_type_icon_style')->value,
          ];
        }

        // Add term name.
        if ($term_name = $term->getName()) {
          $build['term_name'] = [
            '#type' => 'markup',
            '#markup' => $term_name,
          ];
        }
      }
    }

    $build['term_image_url'] = [
      '#type' => 'markup',
      '#markup' => $imageUri,
    ];

    $build['term_image_url_alt'] = [
      '#type' => 'markup',
      '#markup' => $imageAlt,
    ];

    return $build;

  }

}
