<?php
/**
 * @file
 * Contains \Drupal\rhd_styleguide\Controller\StyleGuideController.
 */
namespace Drupal\rhd_styleguide\Controller;
class StyleGuideController {
  public function content() {
    return [
        '#theme' => 'rhd_styleguide',
    ];
  }
}
