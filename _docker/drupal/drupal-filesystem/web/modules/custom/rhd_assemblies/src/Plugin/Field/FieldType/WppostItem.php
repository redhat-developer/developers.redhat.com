<?php

namespace Drupal\rhd_assemblies\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\TypedData\DataDefinition;
use Drupal\Core\TypedData\OptionsProviderInterface;

/**
 * Plugin implementation of the 'wppost' field type.
 *
 * @FieldType(
 *   id = "wppost",
 *   label = @Translation("Wordpress Post"),
 *   description = @Translation("This field stores a Wordpress post ID."),
 *   category = @Translation("Reference"),
 *   default_widget = "wppost_autocomplete",
 *   default_formatter = "wppost_teaser",
 * )
 */
class WppostItem extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties = [];
    $properties['target_id'] = DataDefinition::create('integer')
      ->setLabel(t('Wordpress post ID'))
      ->setRequired(TRUE);
    $properties['title'] = DataDefinition::create('string')
      ->setLabel(t('Wordpresspost title'))
      ->setRequired(TRUE);
    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      // columns contains the values that the field will store
      'columns' => [
        // List the values that the field will save. This
        // field will only save a single value, 'value'
        'target_id' => [
          'description' => 'The Wordpress post ID.',
          'type' => 'int',
          'not null' => TRUE,
        ],
        'title' => [
          'description' => 'The title of the Wordpress post at time of selection.',
          'type' => 'text',
        ]
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $value = $this->get('target_id')->getValue();
    return $value === NULL || $value === '';
  }
}
