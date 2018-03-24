<?php

namespace Drupal\rhd_assemblies\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;

/**
 * Plugin implementation of the 'wppost_teaser' formatter.
 *
 * @FieldFormatter(
 *   id = "wppost_teaser",
 *   label = @Translation("Wordpress post teaser"),
 *   field_types = {
 *     "wppost"
 *   }
 * )
 */
class WppostTeaserFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = [];
    $entity = $items->getEntity();
    $settings = $this->getSettings();

    foreach ($items as $delta => $item) {
      $id = $items[$delta]->get('target_id')->getCastedValue();
      $post = \Drupal::service('rhd_assemblies.wordpress_api')->getContentById($id);
      if ($post) {
        $element[$delta] = [
          '#theme' => 'wordpress_post_teaser',
          '#post' => $post->content,
          '#media' => $post->media,
          '#categories' => $post->categories
        ];
      }
    }

    return $element;
  }
}
