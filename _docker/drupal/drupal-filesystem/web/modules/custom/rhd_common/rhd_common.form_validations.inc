<?php

/**
 * @file
 * Provides custom form validation for various forms.
 */

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Datetime\DrupalDateTime;

/**
 * Implements hook_form_alter().
 */
function rhd_common_form_alter(&$form, &$form_state, $form_id) {
  switch ($form_id) {
    case 'node_events_form':
    case 'node_events_edit_form':
      $form['#validate'][] = 'add_events_validations';
      break;

    case 'node_books_form':
    case 'node_books_edit_form':
      $form['#validate'][] = 'add_books_validations';
      break;

    case 'node_connectors_form':
    case 'node_connectors_edit_form':
      $form['#validate'][] = 'add_connectors_validations';
      break;

    case 'node_learning_path_form':
    case 'node_learning_path_edit_form':
      $form['#validate'][] = 'add_learning_path_validations';
      break;

    // Form element validation for the path alias of Articles.
    case 'node_article_form':
    case 'node_article_edit_form':
      if ($form_id != 'node_article_edit_form') {
        $form['path']['widget'][0]['pathauto']['#default_value'] = 0;
      }
      $form['path']['widget'][0]['alias']['#states']['disabled']['input[name="path[0][pathauto]"]']['checked'] = 0;
      // Override default validator with custom validator.
      if (!empty($form['path'])) {
        // Check if widget array is not empty.
        if (!empty($form['path']['widget'])) {
          $form['path']['widget'][0]['#element_validate'][0] = 'rhd_common_custom_form_validator';
        }
      }
      break;
  }

  // Require a revision log message for published nodes.
  if (isset($form['revision_log']) && isset($form['moderation_state'])) {
    $entity = $form_state->getFormObject()->getEntity();

    // We need to verify that this form has a moderation_state field.
    if ($entity->hasField('moderation_state') && !empty($entity->get('moderation_state')->getValue())) {
      $form['#validate'][] = 'check_moderation_state_validations';
      $is_published = ($entity->get('moderation_state')->getValue()[0]['value'] === 'published');

      if ($is_published) {
        $form['revision_log']['widget']['#required'] = TRUE;
        $form['revision_log']['widget'][0]['#required'] = TRUE;
        $form['revision_log']['widget'][0]['value']['#required'] = TRUE;
      }
    }

    unset($form['revision_log']['#group']);
  }
}

/**
 * Validation for node_form and node_edit_form.
 *
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function check_moderation_state_validations(array &$form, FormStateInterface $form_state) {
  $is_published = ($form_state->getValue('moderation_state')[0]['value'] === 'published');
  if ($is_published) {
    $form['revision_log']['widget']['#required'] = TRUE;
    $form['revision_log']['widget'][0]['#required'] = TRUE;
    $form['revision_log']['widget'][0]['value']['#required'] = TRUE;

    if (empty($form_state->getValue('revision_log')[0]['value'])) {
      $form_state->setErrorByName('revision_log', 'Revision Log is required.');
    }

  }
}

/**
 * Validation for node_events_form and node_events_edit_form.
 *
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function add_events_validations(array &$form, FormStateInterface $form_state) {
  // Start and End date checks.
  $end_date = $form_state->getValue('field_end_date')[0]['value'];
  if ($end_date instanceof DrupalDateTime) {
    $start_date = $form_state->getValue('field_start_date')[0]['value'];
    if ($start_date instanceof DrupalDateTime) {
      $start_timestamp = $start_date->getTimeStamp();
      $end_timestamp = $end_date->getTimeStamp();
      if ($start_timestamp > $end_timestamp) {
        $form_state->setErrorByName(
          'field_end_date',
          t('End Date must be on or after Start Date')
        );
      }
    }
  }

  $title = $form_state->getValue('title')[0]['value'];
  if (strlen($title) <= 5 || strlen($title) >= 60) {
    $form_state->setErrorByName(
      'title',
      t('Title must be greater than 5 characters and less than 60')
    );
  }

  $desc = $form_state->getValue('field_description')[0]['value'];
  if (strlen($desc) < 50 || strlen($desc) > 400) {
    $form_state->setErrorByName(
      'field_description',
      t('Description must be greater than 50 characters and less than 400')
    );
  }

  if (isset($form_state->getValue('field_ics_addevent_id')[0]['value'])) {
    $field_ics_addevent_id = $form_state->getValue('field_ics_addevent_id')[0]['value'];
    if ($field_ics_addevent_id !== '' && ctype_alnum($field_ics_addevent_id) === FALSE) {
      $form_state->setErrorByName(
        'field_ics_addevent_id',
        t('ICS AddEvent ID must be alphanumeric.')
      );
    }
  }
}

/**
 * Validation for node_books_form and node_books_edit_form.
 *
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function add_books_validations(array &$form, FormStateInterface $form_state) {
  // Retrieve the value of the ISBN field in the form state.
  $isbn_number = $form_state->getValue('field_isbn')[0]['value'];

  if (!is_numeric($isbn_number) && !empty($isbn_number)) {
    // Set an error if the ISBN value is set and isn't numeric.
    $form_state->setErrorByName(
      'field_isbn',
      t('The ISBN field must be a number!')
    );
  }

  if (strlen($isbn_number) != 13 && strlen($isbn_number) != 10 && !empty($isbn_number)) {
    // Set an error if the ISBN value is set and isn't 10 or 13 digits.
    $form_state->setErrorByName(
      'field_isbn',
      t('The ISBN field must be a valid 10 or 13 digit number!')
    );
  }

  // Checks for books that need pages.
  $needs_own_page_value = (bool) $form_state->getValue('field_needs_own_page')['value'];
  // Determines if the moderation state is 'published'.
  $is_published = ($form_state->getValue('moderation_state')[0]['value'] === 'published');

  // If the Needs Own Page field is checked and the node is published, verify
  // the Book Excerpt and PDF Link fields are not empty.
  if ($needs_own_page_value === TRUE && $is_published === TRUE) {
    if (empty($form_state->getValue('field_book_excerpt')[0]['value'])) {
      // Set an error if the Book Excerpt field is empty.
      $form_state->setErrorByName(
        'field_book_excerpt',
        t('Book excerpt is required')
      );
    }
    if (empty($form_state->getValue('field_pdf_link')[0]['uri'])) {
      // Set an error if the PDF Link field is empty.
      $form_state->setErrorByName(
        'field_pdf_link',
        t('PDF link is required')
      );
    }
  }
}

/**
 * Validation for node_connectors_form and node_connectors_edit_form.
 *
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function add_connectors_validations(array &$form, FormStateInterface $form_state) {
  $title = $form_state->getValue('title')[0]['value'];

  if (strlen($title) < 1 || strlen($title) > 50) {
    $form_state->setErrorByName(
      'title',
      t('Title must be greater than 1 character and less than 50')
    );
  }

  // Check that Short Description is between 50 and 150 characters long.
  $short_description = $form_state->getValue('field_connector_short_descriptio')[0]['value'];

  if (strlen($short_description) < 50 || strlen($short_description) > 150) {
    $form_state->setErrorByName(
      'field_connector_short_descriptio',
      t('Short description must be greater than 50 characters and less than 150')
    );
  }

  // Check that Long Description is between 50 and 150 characters long.
  $long_description = $form_state->getValue('field_connector_long_description')[0]['value'];

  if (strlen($long_description) < 100 || strlen($long_description) > 500) {
    $form_state->setErrorByName(
      'field_connector_long_description',
      t('Long description must be greater than 100 characters and less than 500')
    );
  }
}

/**
 * Validation for node_learning_path_form and node_learning_path_edit_form.
 *
 * @param array $form
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function add_learning_path_validations(array &$form, FormStateInterface $form_state) {
  $short_description = $form_state->getValue('field_short_description')[0]['value'];

  if (strlen($short_description) > 140) {
    $form_state->setErrorByName(
      'field_short_description',
      t('The short description must be less than 140 characters!')
    );
  }

  // Check that Short Description is between 50 and 150 characters long.
  $long_description = $form_state->getValue('field_long_description')[0]['value'];

  if (strlen($long_description) > 500) {
    $form_state->setErrorByName(
      'field_long_description',
      t('The long description must be less than 500 characters!')
    );
  }
}

/**
 * Custom form validator.
 *
 * @param array $element
 * @param \Drupal\Core\Form\FormStateInterface $form_state
 */
function rhd_common_custom_form_validator(array &$element, FormStateInterface $form_state) {
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
