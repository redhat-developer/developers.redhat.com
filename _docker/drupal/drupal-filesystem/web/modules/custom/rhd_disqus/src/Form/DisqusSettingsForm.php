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
    $config = $this->config('rhd_disqus.disqussettings');
    $form['rhd_disqus_api_key'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Disqus API Key'),
      '#maxlength' => 64,
      '#size' => 64,
      '#default_value' => $config->get('rhd_disqus_api_key'),
    ];
    $form['rhd_disqus_shortname'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Disqus Shortname'),
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
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('rhd_disqus.disqussettings')
      ->set('rhd_disqus_shortname', $form_state->getValue('rhd_disqus_shortname'))
      ->set('rhd_disqus_api_key', $form_state->getValue('rhd_disqus_api_key'))
      ->save();
  }

}
