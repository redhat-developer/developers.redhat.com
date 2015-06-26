<?php
/**
 * @file
 * Context reaction for Metatag.
 */

class metatag_context_reaction extends context_reaction {
  function options_form($context) {
    $form = array();

    // Don't care about the instance name, the data is being managed by
    // Context and not Metatag.
    $instance = "";

    // Load the previously saved settings.
    $data = $this->fetch_from_context($context);
    if (!isset($data['metatags'])) {
      $data['metatags'] = array();
    }

    // Support the pre-v1.0 data structures that were not nested with the
    // language code.
    if (!isset($data['metatags'][LANGUAGE_NONE])) {
      $data['metatags'] = array(
        LANGUAGE_NONE => $data['metatags'],
      );
    }

    // No options currently available.
    $options = array();

    $form['help'] = array(
      '#prefix' => '<p><em>',
      '#markup' => t('Values assigned here inherit from the <a href="@url" title="Edit the global default meta tags.">global defaults</a> and will override any other meta tags assigned elsewhere.', array('@url' => url('admin/config/search/metatags/config/global'))),
      '#suffix' => '</em></p>',
    );

    $form['basic_header'] = array(
      '#prefix' => '<hr /><h3>',
      '#markup' => t('Basic tags'),
      '#suffix' => '</h3>',
    );

    // Load the basic Metatag form.
    metatag_metatags_form($form, $instance, $data['metatags'][LANGUAGE_NONE], $options);

    // Stop the meta tag fields appearing within a fieldset.
    $form['metatags']['#type'] = 'container';
    unset($form['metatags']['#collapsed']);
    unset($form['metatags']['#collapsible']);
    unset($form['#submit']);

    // Flatten the fieldsets because otherwise the Context module will not save
    // them properly.
    foreach (element_children($form['metatags'][LANGUAGE_NONE]) as $fieldset) {
      $child = $form['metatags'][LANGUAGE_NONE][$fieldset];
      if (isset($child['#type']) && $child['#type'] == 'fieldset') {
        $form['metatags'][LANGUAGE_NONE][$fieldset . '_heading'] = array(
          '#prefix' => '<hr /><h3>',
          '#markup' => $form['metatags'][LANGUAGE_NONE][$fieldset]['#title'],
          '#suffix' => '</h3>',
        );
        if (isset($form['metatags'][LANGUAGE_NONE][$fieldset]['#description'])) {
          $form['metatags'][LANGUAGE_NONE][$fieldset . '_description'] = array(
            '#prefix' => '<p>',
            '#markup' => $form['metatags'][LANGUAGE_NONE][$fieldset]['#description'],
            '#suffix' => '</p>',
          );
        }
        foreach ($form['metatags'][LANGUAGE_NONE][$fieldset] as $key => $value) {
          if (substr($key, 0, 1) == '#') {
            unset($form['metatags'][LANGUAGE_NONE][$fieldset][$key]);
            continue;
          }
          $form['metatags'][LANGUAGE_NONE][$key] = $value;
          unset($form['metatags'][LANGUAGE_NONE][$key]['#parents']);
          unset($form['metatags'][LANGUAGE_NONE][$fieldset][$key]);
        }
        unset($form['metatags'][LANGUAGE_NONE][$fieldset]);
      }
    }

    // Show all takens.
    $form['metatags']['tokens']['#token_types'] = 'all';

    $form['metatag_admin'] = array(
      '#type' => 'checkbox',
      '#title' => t('Show on metatag admin page.'),
      '#weight' => -98,
      '#default_value' => isset($data['metatag_admin']) ? $data['metatag_admin'] : '',
    );

    return $form;
  }

  /**
   * Output a list of active contexts.
   */
  function execute() {
    $output = &drupal_static('metatag_context');

    if (!isset($output)) {
      $metatags = array();
      $output = array();
      $contexts = context_active_contexts();
      $options = array();
      $instance_names = array();

      foreach ($contexts as $context) {
        if (!empty($context->reactions['metatag_context_reaction']['metatags'])) {
          $metadata_array = $context->reactions['metatag_context_reaction']['metatags'];
          if (isset($metadata_array[LANGUAGE_NONE])) {
            $metadata_array = $metadata_array[LANGUAGE_NONE];
          }
          foreach ($metadata_array as $key => $data) {
            if (!empty($data['value'])) {
              $metatags[$key] = $data;//t(check_plain($data['value']));
            }
          }

          // Add this context to the list of instances.
          $instance_names[] = $context->name;
        }
      }

      // Only proceed if metatags were assigned.
      if (!empty($metatags)) {
        // Load the global defaults.
        $metatags += metatag_config_load_with_defaults('');

        // Compile the identifier for this combination based on the context
        // names.
        asort($instance_names);
        $instance = 'context:' . implode(',', $instance_names);
        $options['instance'] = $instance;

        foreach ($metatags as $metatag => $data) {
          if ($metatag_instance = metatag_get_instance($metatag, $data)) {
            $output[$metatag] = $metatag_instance->getElement($options);
          }
        }

        // Allow the output meta tags to be modified using
        // hook_metatag_metatags_view_alter().
        drupal_alter('metatag_metatags_view', $output, $instance);
      }
    }
  }
}

/**
 * Implements hook_context_default_contexts().
 */
function metatag_context_context_default_contexts() {
  $defaults = array();

  $context = new stdClass();
  $context->disabled = TRUE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'user_login';
  $context->description = 'A default Metatag:Context definition for the user login page. This needs to be enabled and then it can be customized as needed.';
  $context->tag = 'Metatag';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'user' => 'user',
        'user/login' => 'user/login',
      ),
    ),
    'user' => array(
      'values' => array(
        'anonymous user' => 'anonymous user',
      ),
    ),
  );
  $context->reactions = array(
    'metatag_context_reaction' => array(
      'metatags' => array(
        'title' => array(
          'value' => '[current-page:title] | [site:name]',
          'default' => '[current-page:title] | [site:name]',
        ),
      ),
      'metatag_admin' => 1,
    ),
  );
  $context->condition_mode = 1;
  $defaults[$context->name] = $context;

  $context = new stdClass();
  $context->disabled = TRUE; /* Edit this to true to make a default context disabled initially */
  $context->api_version = 3;
  $context->name = 'user_register';
  $context->description = 'A default Metatag:Context definition for the user registration page. This needs to be enabled and then it can be customized as needed.';
  $context->tag = 'Metatag';
  $context->conditions = array(
    'path' => array(
      'values' => array(
        'user/register' => 'user/register',
      ),
    ),
    'user' => array(
      'values' => array(
        'anonymous user' => 'anonymous user',
      ),
    ),
  );
  $context->reactions = array(
    'metatag_context_reaction' => array(
      'metatags' => array(
        'title' => array(
          'value' => '[current-page:title] | [site:name]',
          'default' => '[current-page:title] | [site:name]',
        ),
      ),
      'metatag_admin' => 1,
    ),
  );
  $context->condition_mode = 1;
  $defaults[$context->name] = $context;

  if (module_exists('forum')) {
    $context = new stdClass();
    $context->disabled = TRUE; /* Edit this to true to make a default context disabled initially */
    $context->api_version = 3;
    $context->name = 'forum';
    $context->description = 'A default Metatag:Context definition for the main forum page. This needs to be enabled and then it can be customized as needed.';
    $context->tag = 'Metatag';
    $context->conditions = array(
      'path' => array(
        'values' => array(
          'forum' => 'forum',
        ),
      ),
    );
    $context->reactions = array(
      'metatag_context_reaction' => array(
        'metatags' => array(
          'title' => array(
            'value' => '[current-page:title] | [site:name]',
            'default' => '[current-page:title] | [site:name]',
          ),
        ),
        'metatag_admin' => 1,
      ),
    );
    $context->condition_mode = 1;
    $defaults[$context->name] = $context;
  }

  if (module_exists('blog')) {
    $context = new stdClass();
    $context->disabled = TRUE; /* Edit this to true to make a default context disabled initially */
    $context->api_version = 3;
    $context->name = 'blog';
    $context->description = 'A default Metatag:Context definition for the main blog page. This needs to be enabled and then it can be customized as needed. Note: this does not cover the individual user blog pages, only the main blog page.';
    $context->tag = 'Metatag';
    $context->conditions = array(
      'path' => array(
        'values' => array(
          'blog' => 'blog',
        ),
      ),
    );
    $context->reactions = array(
      'metatag_context_reaction' => array(
        'metatags' => array(
          'title' => array(
            'value' => '[current-page:title] | [site:name]',
            'default' => '[current-page:title] | [site:name]',
          ),
        ),
        'metatag_admin' => 1,
      ),
    );
    $context->condition_mode = 1;
    $defaults[$context->name] = $context;
  }

  // Translatables
  // Included for use with string extractors like potx.
  t('Metatag');

  return $defaults;
}
