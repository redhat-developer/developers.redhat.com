<?php
/**
 * @file
 * Custom display extender plugin for Views.
 */

class metatag_views_plugin_display_extender_metatags extends views_plugin_display_extender {

  /**
   * Default values.
   */
  function options_definition() {
    $options = parent::option_definition();
    $options['metatags'] = array('default' => '');
    return $options;
  }
  function options_definition_alter(&$options) {
    $options['metatags'] = array('default' => array());
  }

  /**
   * Defines where within the Views admin UI the new settings will be visible.
   */
  function options_summary(&$categories, &$options) {
    $categories['metatags'] = array(
      'title' => t('Meta tags'),
      'column' => 'second',
    );
    $options['metatags'] = array(
      'category' => 'metatags',
      'title' => t('Meta tags'),
      'value' => $this->has_metatags() ? t('Overridden') : t('Using defaults'),
    );
  }

  /**
   * Defines the form.
   */
  function options_form(&$form, &$form_state) {
    if ($form_state['section'] == 'metatags') {
      $form['#title'] .= t('The meta tags for this display');
      $metatags = $this->get_metatags();

      // Build/inject the Metatag form.
      $instance = 'view:' . $form_state['view']->name;
      $options['token types'] = array('view');
      $options['context'] = 'view';
      metatag_metatags_form($form, $instance, $metatags[LANGUAGE_NONE], $options);

      $form['metatags']['#type'] = 'container';
    }
  }

  /**
   * Saves the form values.
   */
  function options_submit(&$form, &$form_state) {
    if ($form_state['section'] == 'metatags') {
      $metatags = $form_state['values']['metatags'];

      // Leave some possibility for future versions to support translation.
      foreach ($metatags as $langcode => $values) {
        if (!empty($form['metatags'][$langcode]['#metatag_defaults'])) {
          metatag_filter_values_from_defaults($form_state['values']['metatags'][$langcode], $form['metatags'][$langcode]['#metatag_defaults']);
        }
      }

      $this->display->set_option('metatags', $metatags);
    }
  }

  /**
   * Identify whether or not the current display has custom meta tags defined.
   */
  protected function has_metatags() {
    $metatags = $this->get_metatags();
    return !empty($metatags[LANGUAGE_NONE]);
  }

  /**
   * Get the Metatag configuration for this display.
   *
   * @return array
   *   The meta tag values, keys by language (default LANGUAGE_NONE).
   */
  private function get_metatags() {
    $metatags = $this->display->get_option('metatags');

    // Leave some possibility for future versions to support translation.
    if (empty($metatags)) {
      $metatags = array(LANGUAGE_NONE => array());
    }
    if (!isset($metatags[LANGUAGE_NONE])) {
      $metatags = array(LANGUAGE_NONE => $metatags);
    }

    return $metatags;
  }
}
