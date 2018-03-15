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
    $count = 0;
    $page = 1;
    $page_max = 100;
    $results = [];
    do {
      $feed_url = 'https://developers.redhat.com/blog/wp-json/wp/v2/categories?per_page=' . $page_max . '&page=' . $page;
      $client = \Drupal::httpClient();
      $request = $client->request('GET', $feed_url, ['query' => ['per_page' => $page_max, 'page' => $page]]);
      $response = $request->getBody()->getContents();
      $page_results = json_decode($response);
      $count = count($page_results);
      $results = array_merge($page_results, $results);
      $page++;
    } while ($count == $page_max);

    // $build['title'] = ['#markup' => '<h2>' . $results->title . '</h2>'];
    $options = [];
    if (!empty($results)) {
      foreach ($results as $category) {
        $options[$category->id] = $category->name;
      }
    }
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function storageSettingsForm(array &$form, FormStateInterface $form_state, $has_data) {
    $form = parent::storageSettingsForm($form, $form_state, $has_data);
    unset($form['allowed_values']);
  }

}
