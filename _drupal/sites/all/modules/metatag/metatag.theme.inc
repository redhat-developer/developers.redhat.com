<?php

/**
 * @file
 * Theme callbacks for the metatag module.
 */

/**
 * Theme callback for a normal meta tag.
 *
 * The format is:
 * <meta name="[name]" content="[value]" />
 */
function theme_metatag($variables) {
  $element = &$variables['element'];
  $args = array(
    '#name'  => 'name',
    '#value' => 'content',
  );
  element_set_attributes($element, $args);
  unset($element['#value']);
  return theme('html_tag', $variables);
}

/**
 * Theme callback for a normal meta tag.
 *
 * The format is:
 * <meta http-equiv="[name]" content="[value]" />
 */
function theme_metatag_http_equiv($variables) {
  $element = &$variables['element'];
  $args = array(
    '#name' => 'http-equiv',
    '#value' => 'content',
  );
  element_set_attributes($element, $args);
  unset($element['#value']);
  return theme('html_tag', $variables);
}

/**
 * Theme callback for a rel link tag.
 *
 * The format is:
 * <link rel="[name]" href="[value]" />
 */
function theme_metatag_link_rel($variables) {
  $element = &$variables['element'];
  $args = array(
    '#name' => 'rel',
    '#value' => 'href',
  );
  element_set_attributes($element, $args);
  unset($element['#value']);
  return theme('html_tag', $variables);
}

/**
 * Theme callback for a rev link tag.
 *
 * The format is:
 * <link rev="[name]" href="[value]" />
 */
function theme_metatag_link_rev($variables) {
  $element = &$variables['element'];
  $args = array(
    '#name' => 'rev',
    '#value' => 'href',
  );
  element_set_attributes($element, $args);
  unset($element['#value']);
  return theme('html_tag', $variables);
}

/**
 * Theme callback for a proprty meta tag.
 *
 * The format is:
 * <meta property="[name]" content="[value]" />
 */
function theme_metatag_property($variables) {
  $element = &$variables['element'];
  $args = array(
    '#name' => 'property',
    '#value' => 'content',
  );
  element_set_attributes($element, $args);
  unset($element['#value']);
  return theme('html_tag', $variables);
}
