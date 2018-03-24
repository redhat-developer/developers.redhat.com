<?php

namespace Drupal\rhd_assemblies\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\options\Plugin\Field\FieldType\ListIntegerItem;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'list_integer' field type.
 *
 * @FieldType(
 *   id = "list_wpcategories",
 *   label = @Translation("List (Wordpress Category)"),
 *   description = @Translation("This field stores Wordpress category IDs."),
 *   category = @Translation("Reference"),
 *   default_widget = "wpcategories_options_select",
 *   default_formatter = "list_default",
 * )
 */
class ListWpcategoriesItem extends ListIntegerItem {

  /**
   * {@inheritdoc}
   */
  public static function defaultStorageSettings() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties['value'] = DataDefinition::create('integer')
      ->setLabel(t('Integer value'))
      ->setRequired(FALSE);

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function getSettableOptions(AccountInterface $account = NULL) {
    return \Drupal::service('rhd_assemblies.wordpress_api')->getCategoryOptions();
  }

  /**
   * {@inheritdoc}
   */
  public function storageSettingsForm(array &$form, FormStateInterface $form_state, $has_data) {
    $form = parent::storageSettingsForm($form, $form_state, $has_data);
    unset($form['allowed_values']);
  }

}
