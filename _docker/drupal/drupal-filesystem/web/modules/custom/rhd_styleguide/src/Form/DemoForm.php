<?php

namespace Drupal\rhd_styleguide\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class DemoForm extends FormBase {

  /**
   * @inheritdoc
   */
  public function getFormId() {
    return 'rhd_styleguide_demo';
  }

  /**
   * @inheritdoc
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['description'] = [
      '#type' => 'item',
      '#markup' => $this->t('This basic example shows a single text input element and a submit button'),
    ];

    $form['title'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Title'),
      '#description' => $this->t('Title must be at least 5 characters in length.'),
      '#required' => TRUE,
    ];

    $form['text'] = [
      '#type' => 'textarea',
      '#title' => 'Long text',
      '#description' => 'This is a long text field',
    ];

    $options = [
      'option1' => 'Option 1',
      'option2' => 'Option 2',
      'option3' => 'Option 3',
    ];

    $form['select'] = [
      '#type' => 'select',
      '#title' => 'Select',
      '#options' => $options,
      '#description' => 'This is a select field',
    ];

    $form['radios'] = [
      '#type' => 'radios',
      '#title' => 'Radios',
      '#options' => $options,
    ];

    $form['checkboxes'] = [
      '#type' => 'checkboxes',
      '#title' => 'Checkboxes',
      '#options' => $options,
    ];

    // Group submit handlers in an actions element with a key of "actions" so
    // that it gets styled correctly, and so that other modules may add actions
    // to the form. This is not required, but is convention.
    $form['actions'] = [
      '#type' => 'actions',
    ];

    // Add a submit button that handles the submission of the form.
    $form['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;

  }

  /**
   * @inheritdoc
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {

  }

  /**
   * @inheritdoc
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

  }
}
