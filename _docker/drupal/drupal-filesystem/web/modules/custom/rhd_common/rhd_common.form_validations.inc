<?php
use Drupal\Core\Form\FormStateInterface;


/**
 * Implements hook_form_FORM_ID_alter().
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 * @param string $form_id
 */
function rhd_common_form_node_events_form_alter(&$form, FormStateInterface $form_state, $form_id)
{
  $form['#validate'][] = 'add_events_validations';
}

/**
 * Implements hook_form_FORM_ID_alter().
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 * @param string $form_id
 */
function rhd_common_form_node_events_edit_form_alter(&$form, FormStateInterface $form_state, $form_id)
{
  $form['#validate'][] = 'add_events_validations';
}

/**
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function add_events_validations(array &$form, FormStateInterface $form_state)
{
  // Basic date comparison
  $end_before_start = $form_state->getValue('field_end_date')[0]['value']->getTimeStamp() < $form_state->getValue('field_start_date')[0]['value']->getTimeStamp();
  if ($end_before_start === TRUE)
  {
    $form_state->setErrorByName('field_end_date', t('End Date must be after Start Date')); // Create the error
  }

  $title = $form_state->getValue('title')[0]['value'];

  if (strlen($title) < 5 || strlen($title) > 45)
  {
    $form_state->setErrorByName('title', t('Title must be greater than 5 characters and less than 45'));
  }

  $desc = $form_state->getValue('field_description')[0]['value'];

  if (strlen($desc) < 50 || strlen($desc) > 400)
  {
    $form_state->setErrorByName('field_description', t('Description must be greater than 50 characters and less than 400'));
  }
}

/**
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 * @param string $form_id
 */
function rhd_common_form_node_books_form_alter(&$form, FormStateInterface $form_state, $form_id)
{
  $form['#validate'][] = 'add_books_validations';
}

/**
 * Implements hook_form_FORM_ID_alter().
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 * @param string $form_id
 */
function rhd_common_form_node_books_edit_form_alter(&$form, FormStateInterface $form_state, $form_id)
{
  $form['#validate'][] = 'add_books_validations';
}

/**
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function add_books_validations(array &$form, FormStateInterface $form_state)
{
  // Simple validation to test that the end date is after the start date
  $isbn_number = $form_state->getValue('field_isbn')[0]['value'];
  if (!is_numeric($isbn_number) && !empty($isbn_number))
  {
    $form_state->setErrorByName('field_isbn', t('The ISBN field must be a number!')); // Create the error
  }
  if (strlen($isbn_number) != 13 && strlen($isbn_number) != 10 && !empty($isbn_number))
  {
    $form_state->setErrorByName('field_isbn', t('The ISBN field must be a valid 10 or 13 digit number!')); // Create the error
  }

  // Checks for books that need pages
  $needs_own_page_value = (bool) $form_state->getValue('field_needs_own_page')['value'];

  if ($needs_own_page_value === TRUE) {
    if (empty($form_state->getValue('field_book_excerpt')[0]['value'])) {
      $form_state->setErrorByName('field_book_excerpt',
        t('Book excerpt is required'));
    }
    if (empty($form_state->getValue('field_pdf_link')[0]['uri'])) {
      $form_state->setErrorByName('field_pdf_link',
        t('PDF link is required'));
    }
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 * @param $form array
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 * @param string $form_id
 */
function rhd_common_form_node_connectors_form_alter(&$form, FormStateInterface $form_state, $form_id)
{
  $form['#validate'][] = 'add_connectors_validations';
}

/**
 * Implements hook_form_FORM_ID_alter().
 * @param $form array
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 * @param string $form_id
 */
function rhd_common_form_node_connectors_edit_form_alter(&$form, FormStateInterface $form_state, $form_id)
{
  $form['#validate'][] = 'add_connectors_validations';
}

/**
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function add_connectors_validations(array &$form, FormStateInterface $form_state)
{
  $title = $form_state->getValue('title')[0]['value'];

  if (strlen($title) < 1 || strlen($title) > 50)
  {
    $form_state->setErrorByName('title', t('Title must be greater than 1 character and less than 50'));
  }

  // Check that Short Description is between 50 and 150 characters long
  $short_description = $form_state->getValue('field_connector_short_descriptio')[0]['value'];

  if (strlen($short_description) < 50 || strlen($short_description) > 150)
  {
    $form_state->setErrorByName('field_connector_short_descriptio', t('Short description must be greater than 50 characters and less than 150'));
  }

  // Check that Long Description is between 50 and 150 characters long
  $long_description = $form_state->getValue('field_connector_long_description')[0]['value'];

  if (strlen($long_description) < 100 || strlen($long_description) > 500)
  {
    $form_state->setErrorByName('field_connector_long_description', t('Long description must be greater than 100 characters and less than 500'));
  }
}

function rhd_common_form_node_learning_path_form_alter(&$form, FormStateInterface $form_state, $form_id)
{
  $form['#validate'][] = 'add_learning_path_validations';
}

/**
 * Implements hook_form_FORM_ID_alter().
 * @param $form array
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 * @param string $form_id
 */
function rhd_common_form_node_learning_path_edit_form_alter(&$form, FormStateInterface $form_state, $form_id)
{
  $form['#validate'][] = 'add_learning_path_validations';
}

/**
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function add_learning_path_validations(array &$form, FormStateInterface $form_state)
{
    $short_description = $form_state->getValue('field_short_description')[0]['value'];

    if (strlen($short_description) > 140)
    {
        $form_state->setErrorByName('field_short_description', t('The short description must be less than 140 characters!'));
    }

  // Check that Short Description is between 50 and 150 characters long
    $long_description = $form_state->getValue('field_long_description')[0]['value'];

    if (strlen($long_description) > 500)
    {
        $form_state->setErrorByName('field_long_description', t('The long description must be less than 500 characters!'));
    }
}


/**
 * Custom form validator.
 * @param array $element
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function rhd_common_custom_form_validator(array &$element, FormStateInterface $form_state)
{
  // Trim the submitted value of whitespace and slashes.
  $alias = rtrim(trim($element['alias']['#value']), " \\/");
  $element['alias']['#attached']['library'][] = 'rhd_common/sample_library';
  if (empty($element['pathauto']['#checked']) && empty($alias)) {
    $form_state->setError($element, t('please add a url alias.'));
  }

  if (!empty($alias)) {
    // Check if alias already has a slash.
    if (substr($alias, 0, 1) !== '/') {
      $alias = '/' . $alias;
    }
    $form_state->setValueForElement($element['alias'], $alias);
    // Validate that the submitted alias does not exist yet.
    $is_exists = \Drupal::service('path.alias_storage')
      ->aliasExists($alias, $element['langcode']['#value'], $element['source']['#value']);
    if ($is_exists) {
      $form_state->setError($element, t('The alias is already in use.'));
    }
  }

  if ($alias && $alias[0] !== '/') {
    $form_state->setError($element, t('The alias needs to start with a slash.'));
  }
}
