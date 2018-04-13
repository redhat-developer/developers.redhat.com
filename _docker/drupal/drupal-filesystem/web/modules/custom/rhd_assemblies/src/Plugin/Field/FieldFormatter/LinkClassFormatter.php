<?php

namespace Drupal\rhd_assemblies\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\link\Plugin\Field\FieldFormatter\LinkFormatter;

/**
 * Plugin implementation of the 'link class' formatter.
 *
 * @FieldFormatter(
 *   id = "link_class",
 *   label = @Translation("Link with Class"),
 *   field_types = {
 *     "link"
 *   }
 * )
 */
class LinkClassFormatter extends LinkFormatter {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'class' => '',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = parent::settingsForm($form, $form_state);
    $elements['class'] = [
      '#type' => 'textfield',
      '#title' => t('Classes on link element'),
      '#default_value' => $this->getSetting('class'),
      '#required' => FALSE,
    ];
    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = parent::viewElements($items, $langcode);
    $class = $this->getSetting('class');
    if ($class) {
      foreach($element as $delta => $item) {
        $element[$delta]['#options']['attributes']['class'][] = $class;
      }
    }
    return $element;
  }
}
