<?php
/**
 * @file
 * Contains \Drupal\rhd_eloqua_embed\Controller\EloquaEmbedController.
 */

namespace Drupal\rhd_eloqua_embed\Controller;

use Drupal\assembly\Entity\Assembly;

class EloquaEmbedController {

  public function getForm($assembly_id) {
    $entity = Assembly::load($assembly_id);
    if($entity->hasField('field_eloqua_json')) {
      $eloqua_json = $entity->get('field_eloqua_json')->value;
      $build['#title'] = $eloqua_json;
      return $build;
    }
  }

}
