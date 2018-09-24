<?php
/**
 * @file
 * Contains \Drupal\rhd_eloqua_embed\Controller\EloquaEmbedController.
 */

namespace Drupal\rhd_eloqua_embed\Controller;

use Drupal\assembly\Entity\Assembly;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class EloquaEmbedController {

  public function getForm(Assembly $assembly) {
    if($assembly->hasField('field_eloqua_json')) {
      $eloqua_json = $assembly->get('field_eloqua_json')->value;
      if(!$eloqua_json) {
        throw new NotFoundHttpException();
      }
      $build = [
        '#theme' => 'rhd_eloqua_embed_page',
        '#eloqua_json' => $eloqua_json,
      ];
      $output = \Drupal::service('renderer')->renderRoot($build);
      $response = new Response();
      $response->setContent($output);
      return $response;
    }
    throw new NotFoundHttpException();
  }
}
