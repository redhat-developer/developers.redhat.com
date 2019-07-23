<?php

namespace Drupal\rhd_disqus\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class DisqusSettingsForm.
 */
class DisqusSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'rhd_disqus.disqussettings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'rhd_disqus_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = \Drupal::config('rhd_disqus.disqussettings');
    $form['rhd_disqus_shortname'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Disqus Shortname'),
      '#attributes' => array('readonly' => 'readonly'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('rhd_disqus_shortname'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
  }

}
