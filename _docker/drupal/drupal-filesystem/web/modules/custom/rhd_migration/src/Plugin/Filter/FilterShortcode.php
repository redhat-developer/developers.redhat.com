<?php

namespace Drupal\rhd_migration\Plugin\Filter;

use Drupal\Component\Utility\Xss;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Component\Utility\Html;
use Drupal\filter\FilterProcessResult;
use Drupal\filter\Plugin\FilterBase;

/**
 * Provides a filter to replace WP-style shortcodes.
 *
 * @Filter(
 *   id = "filter_shortcode",
 *   title = @Translation("Remove or replace WP-style shortcodes"),
 *   type = Drupal\filter\Plugin\FilterInterface::TYPE_MARKUP_LANGUAGE,
 *   settings = {
 *     "shortcode_removals" = "",
 *     "shortcode_replacements" = ""
 *   },
 *   weight = -10
 * )
 */
class FilterShortcode extends FilterBase {

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $form['shortcode_removals'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Shortcodes to remove'),
      '#default_value' => $this->settings['shortcode_removals'],
      '#description' => $this->t('A list of shortcodes to be removed, one per line, eg:<br>[vc_row]<br>[/vc_row]')
    ];
    $form['shortcode_replacements'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Shortcode Replacements'),
      '#default_value' => $this->settings['shortcode_replacements'],
      '#description' => $this->t('A list of shortcodes to allow to be displayed in key|value format, one per line, eg:<br>[blockquote]|&lt;blockquote&gt;<br>[/blockquote]|&lt;/blockquote&gt;')
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function process($text, $langcode) {
    return new FilterProcessResult($text);

    $remove = $this->settings['shortcode_removals'];
    $remove = explode(PHP_EOL, $remove);
    $replace = $this->settings['shortcode_replacements'];
    $replace = explode(PHP_EOL, $replace);

    $from = [];
    $to = [];
    foreach($remove as $value) {
      $r = $this->getRegex($value);
      if (isset($r['simple'])) {
        $from['simple'][] = $r['simple'];
        $to['simple'][] = '';
      }
      if (isset($r['regex'])) {
        $from['regex'][] = $r['regex'];
        $to['regex'][] = '';
      }
    }
    foreach($replace as $value) {
      $value = explode('|', $value);
      $r = $this->getRegex($value[0]);
      if (isset($r['simple'])) {
        $from['simple'][] = $r['simple'];
        $to['simple'][] = trim($value[1]);
      }
      if (isset($r['regex'])) {
        $from['regex'][] = $r['regex'];
        $to['regex'][] = trim($value[1]);
      }
    }

    $text = str_replace($from['simple'], $to['simple'], $text);
    $text = preg_replace($from['regex'], $to['regex'], $text);

    return new FilterProcessResult($text);
  }

  private function getRegex($text) {
    $text = trim($text);
    $first = substr($text, 0, 1);
    $second = substr($text, 1, 1);
    $last = substr($text, strlen($text) - 1, 1);
    if ($first !== '[') {
      \Drupal::messenger()->addError("Invalid value " . $text . " given to FilterShortcode");
      return false;
    }
    if ($last !== ']') {
      \Drupal::messenger()->addError("Invalid value " . $text . " given to FilterShortcode");
      return false;
    }

    if ($second == '/') {
      return ['simple' => $text];
    }
    else {
      $text = substr($text, 1, strlen($text) - 2);
      return ['regex' => '/\[' . $text . '[\S\s\n]*?\]/'];
    }
  }

  // This is used as a migration process callback to fix line breaks
  public static function transform($text) {
    return _filter_autop($text);
  }
}
