<?php
/**
 * @file
 * Displey the node form's Metatag fieldset in a pane. 
 */

$plugin = array(
  'single' => TRUE,
  'title' => t('Node form meta tags'),
  'icon' => 'icon_node_form.png',
  'description' => t('Meta tags on the node form.'),
  'required context' => new ctools_context_required(t('Form'), 'node_form'),
  'category' => t('Form'),
);

function metatag_panels_node_form_metatags_content_type_render($subtype, $conf, $panel_args, &$context) {
  $block = new stdClass();

  $block->title = t('Meta tags');
  $block->module = t('metatag_panels');
  $block->delta = 'metatag';

  if (isset($context->form)) {
    if (isset($context->form['metatags'])) {
      $block->content['metatags'] = $context->form['metatags'];
      unset($block->content['metatags']['#pre_render']);
      unset($block->content['metatags']['#theme_wrappers']);
      $block->content['metatags']['#type'] = '';

      // Set access to false on the original rather than removing so that
      // vertical tabs doesn't clone it. I think this is due to references.
      $context->form['metatags']['#access'] = FALSE;
    }
  }
  else {
    $block->content = t('Meta tags options.');
  }
  return $block;
}

function metatag_panels_node_form_metatags_content_type_admin_title($subtype, $conf, $context) {
  return t('"@s" node form meta tags', array('@s' => $context->identifier));
}

function metatag_panels_node_form_metatags_content_type_edit_form($form, &$form_state) {
  // Provide a blank form so we have a place to have context setting.
  return $form;
}
