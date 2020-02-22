<?php

namespace Drupal\rhd_eloqua_embed\Controller;

/**
 * @file
 * Contains \Drupal\rhd_eloqua_embed\Controller\EloquaEmbedController.
 */

use Drupal\assembly\Entity\Assembly;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Drupal\Core\Template\Attribute;
use Drupal\Component\Utility\Html;

/**
 * Controller to render the eloqua embed form.
 */
class EloquaEmbedController {

  /**
   * Renders the form for the route.
   *
   * @param Drupal\assembly\Entity\Assembly $assembly
   *   The assembly to render.
   */
  public function getForm(Assembly $assembly) {
    if ($assembly->hasField('field_eloqua_json')) {

      $eloqua_json = $assembly->get('field_eloqua_json')->value;
      if (!$eloqua_json) {
        throw new NotFoundHttpException();
      }

      $field_url_array = $assembly->get('field_url')->getValue();
      $redirect_url = FALSE;
      if (isset($field_url_array[0])) {
        $redirect_url = ($field_url_array[0]['uri']) ? $field_url_array[0]['uri'] : FALSE;
      }

      $options = \Drupal::request()->query->get('options');
      $build = [
        '#theme' => 'rhd_eloqua_embed_page',
        '#eloqua_json' => $eloqua_json,
        '#redirect_url' => $redirect_url,
        '#overlabel' => isset($options['class']) && is_array($options['class']) && in_array('overlabel', $options['class']),
      ];

      if (is_array($options) && isset($options['class'])) {
        $attributes = new Attribute(['class' => $options['class']]);
        foreach ($options['class'] as $class) {
          $attributes->addClass(Html::cleanCssIdentifier($class));
        }
        $build['#html_attributes'] = $attributes;
      }

      $output = \Drupal::service('renderer')->renderRoot($build);
      $response = new Response();
      $response->setContent($output);
      return $response;

    }
    throw new NotFoundHttpException();
  }

}
