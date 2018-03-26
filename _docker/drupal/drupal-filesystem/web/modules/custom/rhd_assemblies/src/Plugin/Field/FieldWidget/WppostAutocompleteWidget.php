<?php

namespace Drupal\rhd_assemblies\Plugin\Field\FieldWidget;

use Drupal\Component\Utility\Html;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'wppost_autocomplete' widget.
 *
 * @FieldWidget(
 *   id = "wppost_autocomplete",
 *   label = @Translation("Wordpress Post Autocomplete"),
 *   field_types = {
 *     "wppost",
 *   },
 *   multiple_values = FALSE
 * )
 */
class WppostAutocompleteWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'result_count' => 10,
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements['result_count'] = [
      '#type' => 'number',
      '#title' => t('Number of results'),
      '#default_value' => $this->getSetting('result_count'),
      '#required' => TRUE,
      '#min' => 1,
      '#max' => 100
    ];
    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];
    $summary[] = t('Matches shown: @count', ['@count' => $this->getSetting('result_count')]);
    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $output['value'] = $element;
    $output['value'] += [
      '#type' => 'textfield',
      '#autocomplete_route_name' => 'rhd_assemblies.wppost_autocomplete',
      '#autocomplete_route_parameters' => ['field_name' => $this->fieldDefinition->getLabel(), 'count' => $this->getSetting('result_count')],
    ];

    if (!$items[$delta]->isEmpty()) {
      $id = $items[$delta]->getValue()['target_id'];
      $title = $items[$delta]->getValue()['title'];
      $output['value']['#default_value'] = $title . ' (' . $id . ')';
    }

    return $output;
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {
    foreach ($values as $key => $value) {
      $target_id = $this->extractWpIdFromAutocompleteInput($value['value']);
      $title = str_replace(' (' . $target_id . ')', '', $value['value']);
      $values[$key] = [
        'target_id' => $target_id,
        'title' => $title
      ];
    }
    return $values;
  }

  /**
   * Copied directly from Drupal\Core\Entity\Element\EntityAutocomplete,
   * only this will look for the last match, instead of the second (in case
   * there are titles with parentheses)
   */
  public function extractWpIdFromAutocompleteInput($input) {
    $match = NULL;
    if (preg_match("/.+\s\(([^\)]+)\)/", $input, $matches)) {
      $match = $matches[count($matches)-1];
    }
    return $match;
  }

  public function extractWpTitleFromAutocompleteInput($input) {
    $id = $this->extractWpTitleFromAutocompleteInput($input);
    $match = str_replace(' (' . $id . ')', '', $input);
    return $match;
  }

}
