<?php
/**
 * @file
 * Admin settings page for Metatag Context.
 */

/**
 * Provides administration overview page for metatags by path settings.
 */
function metatag_context_context_overview() {
  $contexts = context_enabled_contexts(TRUE);
  $header = array(t('Name'), t('Paths'), t('Operations'));
  $rows = array();

  $caption = t('Values assigned here inherit from the <a href="@url" title="Edit the global default meta tags.">global defaults</a> and will override any other meta tags assigned elsewhere.', array('@url' => url('admin/config/search/metatags/config/global')));

  foreach ($contexts as $name => $context) {
    // Only show context items that are specifically selected to be "Shown on
    // metatag admin page".
    if (isset($context->reactions['metatag_context_reaction']['metatag_admin']) &&  $context->reactions['metatag_context_reaction']['metatag_admin']) {
      $ops = array(
        l(t('Edit'), 'admin/config/search/metatags/context/' . $context->name, array('query' => array('destination' => 'admin/config/search/metatags/context'))),
        l(t('Delete'), 'admin/config/search/metatags/context/' . $context->name . '/delete', array('query' => array('destination' => 'admin/config/search/metatags/context'))),
      );
      $rows[] = array(
        $context->name,
        isset($context->conditions['path']) ? htmlspecialchars(implode(', ', $context->conditions['path']['values'])) : t('No path condition.'),
        implode(' | ', $ops),
      );
    }
  }
  return theme('table', array('header' => $header, 'rows' => $rows, 'caption' => $caption));
}

/**
 * FormAPI callback to build the 'config_add' form.
 */
function metatag_context_config_add_form($form, &$form_state) {
  $form['name'] = array(
    '#title' => 'Name',
    '#type' => 'textfield',
    '#default_value' => '',
    '#description' => 'The unique ID for this metatag path context rule. This must contain only lower case letters, numbers and underscores.',
    '#required' => 1,
    '#maxlength' => 255,
    '#element_validate' => array('metatag_context_edit_name_validate'),
  );

  $form['actions']['#type'] = 'actions';
  $form['actions']['save'] = array(
    '#type' => 'submit',
    '#value' => t('Add and configure'),
  );
  $form['actions']['cancel'] = array(
    '#type' => 'link',
    '#title' => t('Cancel'),
    '#href' => isset($_GET['destination']) ? $_GET['destination'] : 'admin/config/search/metatags/context',
  );
  return $form;
}

/**
 * FormAPI callback to validate the 'edit_name' field.
 */
function metatag_context_edit_name_validate($element, &$form_state) {
  // Check for string identifier sanity.
  if (!preg_match('!^[a-z0-9_-]+$!', $element['#value'])) {
    form_error($element, t('The name can only consist of lowercase letters, underscores, dashes, and numbers.'));
    return;
  }

  // Ensure the CTools exportables system is loaded.
  ctools_include('export');

  // Check for name collision.
  if ($exists = ctools_export_crud_load('context', $element['#value'])) {
    form_error($element, t('A context with this name already exists. Please choose another name or delete the existing item before creating a new one.'));
  }
}

/**
 * FormAPI callback to save the 'edit_name' form.
 */
function metatag_context_config_add_form_submit($form, &$form_state) {
  $context = metatag_context_load_default_context();
  $context->name = $form_state['values']['name'];
  context_save($context);
  $form_state['redirect'] = 'admin/config/search/metatags/context/' . $context->name;
}

/**
 * FormAPI callback to build the edit form.
 */
function metatag_context_config_edit_form($form, &$form_state, $context) {
  $form_state['metatag_context']['context'] = $context;

  // Empty form to start with.
  $form = array();
  // Don't care about the instance name, the data is being managed by Context
  // and not Metatag.
  $instance = "";
  $options = array();

  $metatags = $context->reactions['metatag_context_reaction']['metatags'];
  if (!isset($metatags[LANGUAGE_NONE])) {
    $metatags = array(
      LANGUAGE_NONE => $metatags,
    );
  }

  // Load the METATAG form.
  metatag_metatags_form($form, $instance, $metatags[LANGUAGE_NONE], $options);

  $form['paths'] = array(
    '#title' => 'Path',
    '#description' => t('Set this metatag context when any of the paths above match the page path. Put each path on a separate line. You can use the <code>*</code> character (asterisk) as a wildcard and the <code>~</code> character (tilde) to exclude one or more paths. Use <code>&lt;front&gt;</code> for the site front page. Only local paths (e.g. "example/page") will work, do not use relative URLs ("/example/page") or absolute URLs ("http://example.com/example/page").'),
    '#type' => 'textarea',
    '#default_value' => isset($context->conditions['path']['values']) ? html_entity_decode(implode('&#13;&#10;', $context->conditions['path']['values'])) : '',
    '#required' => 1,
    '#weight' => -100,
  );

  // If other conditions are assigned, mention it.
  $conditions = array_keys($context->conditions);
  foreach ($conditions as $key => $condition) {
    if ($condition == 'path') {
      unset($conditions[$key]);
    }
  }
  if (!empty($conditions)) {
    $form['other_conditions'] = array(
      '#prefix' => '<p><em>',
      '#markup' => t('Other conditions have been assigned that must be controlled through the main Context settings page.'),
      '#suffix' => '</em></p>',
      '#weight' => -99.9,
    );
  }

  $form['help'] = array(
    '#prefix' => '<hr /><p><em>',
    '#markup' => t('Values assigned here inherit from the <a href="@url" title="Edit the global default meta tags.">global defaults</a> and will override any other meta tags assigned elsewhere.', array('@url' => url('admin/config/search/metatags/config/global'))),
    '#suffix' => '</em></p>',
    '#weight' => -99,
  );

  // Show all tokens.
  $form['metatags']['tokens']['#token_types'] = 'all';

  $form['metatags']['#type'] = 'container';
  unset($form['metatags']['#collapsed']);
  unset($form['metatags']['#collapsible']);

  $form['actions']['#type'] = 'actions';
  $form['actions']['save'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );
  $form['actions']['cancel'] = array(
    '#type' => 'link',
    '#title' => t('Cancel'),
    '#href' => isset($_GET['destination']) ? $_GET['destination'] : 'admin/config/search/metatags/context',
  );
  $form['#submit'][] = 'metatag_context_config_edit_form_submit';

  return $form;
}

/**
 * FormAPI callback for the final submission.
 */
function metatag_context_config_edit_form_submit($form, &$form_state) {
  $context = $form_state['metatag_context']['context'];
  $context->reactions['metatag_context_reaction']['metatags'] = $form_state['values']['metatags'];
  $paths = explode("\n", str_replace("\r", "", $form_state['values']['paths']));
  $paths = array_combine($paths, $paths);
  $context->conditions['path']['values'] = $paths;
  context_save($context);
  $form_state['redirect'] = 'admin/config/search/metatags/context';
}

/**
 * FormAPI callback to build the 'delete' form.
 */
function metatag_context_delete_form($form, &$form_state, $context) {
  $form_state['metatag_context']['context'] = $context;

  $form['delete'] = array(
    '#value' => 'This action will permanently remove this item from your database.'
  );

  $form['actions']['#type'] = 'actions';
  $form['actions']['save'] = array(
    '#type' => 'submit',
    '#value' => t('Delete'),
  );
  $form['actions']['cancel'] = array(
    '#type' => 'link',
    '#title' => t('Cancel'),
    '#href' => isset($_GET['destination']) ? $_GET['destination'] : 'admin/config/search/metatags/context',
  );
  $form['#submit'][] = 'metatag_context_delete_form_submit';

  return $form;
}

/**
 * FormAPI submission callback for the 'delete' form.
 */
function metatag_context_delete_form_submit($form, &$form_state) {
  context_delete($form_state['metatag_context']['context']);
  $form_state['redirect'] = 'admin/config/search/metatags/context';
}

/**
 * Create a default Metatag-focused context.
 *
 * @return object
 *   A context structure in the form of a StdClass object.
 */
function metatag_context_load_default_context() {
  $context = new stdClass();
  $context->disabled = FALSE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'default_metatag_context';
  $context->description = '';
  $context->tag = 'Metatag';
  $context->metatag = TRUE;
  $context->conditions = array(
    'path' => array(
      'values' => array(
      ),
    ),
  );
  $context->reactions = array(
    'metatag_context_reaction' => array(
      'metatags' => array(),
      'metatag_admin' => 1,
    ),
  );
  $context->condition_mode = 0;
  $context->weight = 0;

  // Translatables
  // Included for use with string extractors like potx.
  t('Metatag');
  return $context;
}
