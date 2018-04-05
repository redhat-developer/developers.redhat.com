<?php

namespace Drupal\rhd_assemblies\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormStateInterface;

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
  public static function defaultSettings() {
    return [
      'view_mode' => 'teaser',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements['view_mode'] = [
      '#type' => 'select',
      '#title' => t('View mode'),
      '#default_value' => $this->getSetting('view_mode'),
      '#required' => TRUE,
      '#options' => ['teaser' => 'Teaser', 'tile' => 'Tile']
    ];
    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $summary[] = t('Display as @mode', ['@mode' => $this->getSetting('view_mode')]);
    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = [];
    $theme = 'wordpress_post_' . $this->getSetting('view_mode');

    foreach ($items as $delta => $item) {
      $id = $items[$delta]->get('target_id')->getCastedValue();
      $post = \Drupal::service('rhd_assemblies.wordpress_api')->getContentById($id);
      if ($post) {
        $element[$delta] = [
          '#theme' => $theme,
          '#post' => $post->content,
          '#media' => $post->media,
          '#categories' => $post->categories
        ];
      }
    }

    return $element;
  }
}
