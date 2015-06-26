<?php

/**
 * @file
 * Convert data from Nodewords to Metatag.
 */

// The Nodwords record types.
define('NODEWORDS_TYPE_DEFAULT',    1);
define('NODEWORDS_TYPE_ERRORPAGE',  2);
define('NODEWORDS_TYPE_FRONTPAGE',  3);
define('NODEWORDS_TYPE_NONE',       0);
define('NODEWORDS_TYPE_NODE',       5);
define('NODEWORDS_TYPE_PAGE',      10);
define('NODEWORDS_TYPE_PAGER',      4);
define('NODEWORDS_TYPE_TERM',       6);
define('NODEWORDS_TYPE_TRACKER',    7);
define('NODEWORDS_TYPE_USER',       8);
define('NODEWORDS_TYPE_VOCABULARY', 9);

/**
 * Form generator for the migration selection form.
 */
function metatag_importer_form($form, &$form_state) {
  $types = array();
  if (db_table_exists('nodewords')) {
    $types += _metatag_importer_list_nodewords();
  }

  if (!empty($types)) {
    $form['types'] = array(
      '#type' => 'checkboxes',
      '#title' => t('Records to import'),
      '#description' => t('Notes') . ':'
        . '<ul>'
        . '  <li>' . t('All compatible records will be imported.') . '</li>'
        . '  <li>' . t('Records <strong>will be removed</strong> from the {nodewords} table upon completion, make sure to keep a backup of the table in case needed.') . '</li>'
        . '  <li>' . t('The import process may take some time, please be patient.') . '</li>'
        . '  <li>' . t('Nodewords stored each meta tag as a separate record, so there were many records for each entity or configuration.') . '</li>'
        . '  <li>' . t('Empty values will be removed, no additional logic is added to verify them.') . '</li>'
        . '  <li>' . t('Only node, taxonomy term, user, global, front page and error page records will be converted.') . '</li>'
        . '  <li>' . t('Custom paths, trackers, pagers and vocabularies are not supported yet.') . '</li>'
        . '</ul>',
      '#options' => $types,
      '#disabled' => TRUE,
    );

    $form['actions']['migrate'] = array(
      '#type' => 'submit',
      '#value' => t('Migrate all records'),
    );
  }
  else {
    $form['ohbother'] = array(
      '#markup' => t('Nothing has been found that needs to be imported.'),
      '#prefix' => '<p>',
      '#suffix' => '</p>',
    );
  }

  return $form;
}

/**
 * Handles submission of the Nodewords migration form.
 */
function metatag_importer_form_submit($form, &$form_state) {
  $types = array_filter($form_state['values']['types']);
  _metatag_importer_import($types);
}

function _metatag_importer_list_nodewords() {
  $keys = array(
    NODEWORDS_TYPE_DEFAULT => t('Default'),
    NODEWORDS_TYPE_ERRORPAGE => t('Error page'),
    NODEWORDS_TYPE_FRONTPAGE => t('Front page'),
    NODEWORDS_TYPE_NONE => t('None'),
    NODEWORDS_TYPE_NODE => t('Node'),
    NODEWORDS_TYPE_PAGE => t('Page'),
    NODEWORDS_TYPE_PAGER => t('Pager'),
    NODEWORDS_TYPE_TERM => t('Taxonomy term'),
    NODEWORDS_TYPE_TRACKER => t('Tracker'),
    NODEWORDS_TYPE_USER => t('User'),
    NODEWORDS_TYPE_VOCABULARY => t('Vocabulary'),
  );

  // Get a list of all records grouped by type.
  $query = db_select('nodewords', 'nw')
    ->fields('nw', array('type'))
    ->orderBy('nw.type')
    ->orderBy('nw.id')
    // Exclude records that are empty.
    ->condition('nw.content', 'a:1:{s:5:"value";s:0:"";}', '<>')
    ->groupBy('nw.type');
  // Group-by.
  $query->addExpression('COUNT(nw.id)', 'id_count');
  $filtered = $query->execute();

  // Get a list of all records grouped by type.
  $query = db_select('nodewords', 'nw')
    ->fields('nw', array('type'))
    ->orderBy('nw.type')
    ->orderBy('nw.id')
    ->groupBy('nw.type');
  // Group-by.
  $query->addExpression('COUNT(nw.id)', 'id_count');
  $all = $query->execute()->fetchAllKeyed();

  $types = array();
  foreach ($filtered as $record) {
    $types['nodewords:' . $record->type] = t('Nodewords: @type - @non_empty records with values, @total total.',
      array(
        '@type' => $keys[$record->type],
        '@non_empty' => $record->id_count,
        '@total' => $all[$record->type],
      ));
  }

  return $types;
}

/**
 * Migrates Nodewords data to the Metatag module.
 */
function _metatag_importer_import(array $types = array()) {
  $batch = array(
    'title' => t('Importing Nodewords data..'),
    'operations' => array(
      array('_metatag_importer_migrate', array($types)),
    ),
    'finished' => '_metatag_importer_finished',
    'file' => drupal_get_path('module', 'metatag_importer') . '/metatag_importer.admin.inc',
  );
  batch_set($batch);

  // Kick off the batch.
  batch_process();
}

/**
 * Migrates Nodewords data to the Metatag module.
 */
function _metatag_importer_migrate(array $types = array(), &$context = array()) {
  // Process this number of {nodewords} records at a time.
  $limit = 50;

  if (empty($context['sandbox'])) {
    // @todo Expand this so it can handle other types of things.
    foreach ($types as $key => $val) {
      $types[$key] = str_replace('nodewords:', '', $val);
    }

    $context['sandbox']['progress'] = 0;
    $context['sandbox']['current'] = 0;
    $query = db_select('nodewords', 'nw')
      ->fields('nw', array('mtid'))
      ->orderBy('nw.mtid');
    if (!empty($types)) {
      $query->condition('nw.type', $types, 'IN');
    }
    $context['sandbox']['dataset'] = array_keys($query->execute()->fetchAllAssoc('mtid', PDO::FETCH_ASSOC));
    $context['sandbox']['max'] = count($context['sandbox']['dataset']);

    // Track all of the entities that could not be loaded.
    $context['sandbox']['skipped'] = array();
  }

  // Retrieve Nodewords data.
  $query = db_select('nodewords', 'nw')
    ->fields('nw', array('mtid', 'type', 'id', 'name', 'content'))
    // Continue on from the last record that was processed.
    ->condition('nw.mtid', $context['sandbox']['current'], '>')
    ->orderBy('nw.mtid');
  // @todo Finish off / test the $types handling.
  // if (!empty($types)) {
  //   $query->condition('nw.type', $types, 'IN');
  // }
  $query->range(0, $limit);
  $results = $query->execute();

  // Records that are being converted.
  $records = array();

  // Track records that are converted and will be ready to be deleted.
  $to_delete = array();

  // Convert Nodewords data into the Metatag format.
  foreach ($results as $result) {
    // Log the progress.
    $context['sandbox']['current'] = $result->mtid;
    $context['sandbox']['progress']++;

    // Convert the Nodewords record 'type' into something Metatag can use.
    $type = _metatag_importer_convert_type($result->type);

    // Skip record types we're not handling just yet.
    if (empty($type)) {
      continue;
    }

    // This could be an entity ID, but also possibly just a placeholder integer.
    $record_id = $result->id;

    // Check if this record was skipped previously.
    if (isset($context['sandbox']['skipped'][$type][$record_id])) {
      // Delete this record anyway.
      $to_delete[] = $result->mtid;
      continue;
    }

    // If this record is for an entity, verify that the entity exists.
    if (in_array($type, array('node', 'taxonomy_term', 'user'))) {
      $entity = entity_load($type, array($record_id));
      if (empty($entity)) {
        $context['sandbox']['skipped'][$type][$record_id] = $record_id;
        watchdog('metatag_importer', 'Unable to load @entity_type ID @id', array('@entity_type' => $type, '@id' => $record_id), WATCHDOG_WARNING);

        // Delete this record anyway.
        $to_delete[] = $result->mtid;
        continue;
      }
    }

    // Process the meta tag value, possibly also rename the meta tag name
    // itself.
    list($meta_tag, $value) = _metatag_importer_convert_data($result->name, unserialize($result->content));

    // Don't import empty values.
    if (!empty($value)) {
      // Add the value to the stack.
      $records[$type][$record_id][$meta_tag] = $value;
    }

    // Note that this record is ready to be deleted.
    $to_delete[] = $result->mtid;
  }

  // Update or create Metatag records.
  foreach ($records as $type => $data) {
    foreach ($data as $record_id => $values) {
      switch ($type) {
        // Standard D7 entities are converted to {metatag} records using
        // metatag_metatags_save().
        case 'node':
        case 'taxonomy_term':
        case 'user':
          // watchdog('metatag_importer', 'Importing meta tags for @entity_type ID @id..', array('@entity_type' => $type, '@id' => $record_id), WATCHDOG_INFO);
          $entity = entity_load($type, array($record_id));
          $entity = reset($entity);
          $langcode = metatag_entity_get_language($type, $entity);
          list($entity_id, $revision_id, $bundle) = entity_extract_ids($type, $entity);

          // Add these meta tags to the entity, overwriting anything that's
          // already there.
          foreach ($values as $name => $value) {
            $entity->metatags[$langcode][$name] = $value;
          }
          metatag_metatags_save($type, $entity_id, $revision_id, $entity->metatags, $langcode);
          // watchdog('metatag_importer', 'Imported meta tags for @entity_type ID @id.', array('@entity_type' => $type, '@id' => $record_id), WATCHDOG_INFO);
          break;

        // Other Nodewords settings are converted to {metatag_config} records
        // using metatag_config_save().
        case 'global':
        case 'global:frontpage':
        case 'global:404':
          $config = metatag_config_load($type);

          // If a configuration was not found create a config object.
          if (empty($config)) {
            $config = (object) array(
              'instance' => $type,
            );
          }

          // Add these meta tags to the configuration, overwriting anything
          // that's already there.
          foreach ($values as $name => $value) {
            $config->config[$name] = $value;
          }

          // Save the configuration.
          metatag_config_save($config);
          break;

        // // A 'vocabulary' setting becomes a default configuration.
        // case 'vocabulary':
        //   $metatags = metatag_metatags_load($record->entity_type, $record->entity_id);
        //   $metatags = array_merge($metatags, $record->data);
        //   $vocabulary = taxonomy_vocabulary_load($record->entity_id);
        //   metatag_metatags_save($record->entity_type, $record->entity_id, $vocabulary->vid, $metatags, $vocabulary->language);
        //   break;
      }
    }
  }

  // Delete some records.
  if (!empty($to_delete)) {
    db_delete('nodewords')
      ->condition('mtid', $to_delete)
      ->execute();
  }

  $context['finished'] = (empty($context['sandbox']['max']) || $context['sandbox']['progress'] >= $context['sandbox']['max']) ? TRUE : ($context['sandbox']['progress'] / $context['sandbox']['max']);

  if ($context['finished'] === TRUE) {
    drupal_set_message(t('Imported @imported Nodewords records.', array('@imported' => $context['sandbox']['progress'])));
    if (!empty($context['sandbox']['skipped'])) {
      drupal_set_message(t('@skipped records were skipped because the corresponding entities were previously deleted.', array('@skipped' => count($context['sandbox']['skipped']))));
    }
  }
}

/**
 * BatchAPI callback for when the import finishes.
 */
function _metatag_importer_finished($success, $results, $operations) {
  if ($success) {
    // Here we do something meaningful with the results.
    $message = t("!count items were processed.", array(
      '!count' => count($results),
    ));
    $message .= theme('item_list', array('items' => $results));
    drupal_set_message($message);
  }
  else {
    // An error occurred.
    // $operations contains the operations that remained unprocessed.
    $error_operation = reset($operations);
    $message = t('An error occurred while processing %error_operation with arguments: @arguments', array(
      '%error_operation' => $error_operation[0],
      '@arguments' => print_r($error_operation[1], TRUE),
    ));
    drupal_set_message($message, 'error');
  }
}

/**
 * Converts the Nodewords type to a Metatag entity or Metatag config instance.
 *
 * @param $type
 *   Nodewords type.
 *
 * @return
 *   Metatag entity type or configuration instance.
 */
function _metatag_importer_convert_type($type) {
  // define('NODEWORDS_TYPE_DEFAULT',    1);
  // define('NODEWORDS_TYPE_ERRORPAGE',  2);
  // define('NODEWORDS_TYPE_FRONTPAGE',  3);
  // define('NODEWORDS_TYPE_NONE',       0);
  // define('NODEWORDS_TYPE_NODE',       5);
  // define('NODEWORDS_TYPE_PAGE',      10);
  // define('NODEWORDS_TYPE_PAGER',      4);
  // define('NODEWORDS_TYPE_TERM',       6);
  // define('NODEWORDS_TYPE_TRACKER',    7);
  // define('NODEWORDS_TYPE_USER',       8);
  // define('NODEWORDS_TYPE_VOCABULARY', 9);
  switch ($type) {
    case 1:
      return 'global';

    case 2:
      return 'global:404';

    case 3:
      return 'global:frontpage';

    // @todo Not yet sure how to handle pager items?
    // case 4:
    //   return 'pager';

    case 5:
      return 'node';

    case 6:
      return 'taxonomy_term';

    // @todo Not sure what to do with tracker pages.
    // case 7:
    //   return 'tracker';

    case 8:
      return 'user';

    // @todo Vocabulary records need to be converted to a config for that entity
    // bundle.
    // case 9:
    //   return 'vocabulary';

    // @todo Page records need to be converted to Context definitions.
    // case 10:
    //   return 'page';
  }

  return FALSE;
}

/**
 * Converts a meta tag's name and value from Nodewords to Metatag format.
 *
 * @param $name
 *   Meta tag name.
 * @param $value
 *   Meta tag value in Nodewords format.
 *
 * @return
 *   The two arguments returned after being converted, in an array.
 */
function _metatag_importer_convert_data($name, $value) {
  // Initial simplification of simple values.
  if (is_array($value) && isset($value['value']) && count($value) === 1 && empty($value['value'])) {
    $value = FALSE;
  }

  // Reformat the meta tag data, and possibly name.
  switch ($name) {
    // The Dublin Core date value was stored as three separarate strings.
    case 'dcterms.date':
      // Skip this value if it doesn't contain an array of three values.
      if (!is_array($value) || empty($value['month']) || empty($value['day']) || empty($value['year'])) {
        $value = FALSE;
      }
      else {
        $date = mktime(0, 0, 0, $value['month'], $value['day'], $value['year']);
        $value = date('Y-m-d\TH:iP', $date);
      }
      break;

    // The location meta tag gets renamed and converted to a semi-colon
    // -separated string.
    case 'location':
      // Catch empty values.
      if (!is_array($value) || empty($value['latitutde']) || empty($value['longitude'])) {
        $value = FALSE;
      }
      else {
        $name = 'geo.position';
        $value = implode(';', $value);
      }
      break;

    // These values always seem to be wrong, just use the Metatag defaults.
    case 'og:type':
      $value = FALSE;
      break;

    // Nodewords handle the title tag differently.
    case 'page_title':
      $name = 'title';
      // Remove two options that are no longer used.
      unset($value['append']);
      unset($value['divider']);
      break;

    // A bug in Nodewords resulted in lots of junk data for this meta tag.
    case 'revisit-after':
      if (isset($value['value']) && intval($value['value']) === 1) {
        $value = FALSE;
      }

    // Robots needs some extra processing.
    case 'robots':
      if (is_array($value)) {
        $robot_data = array();

        // Convert each value to display the name if it is "on" and 0 if it is
        // off.
        foreach ($value as $robot_key => $robot_val) {
          // Ignore junk values.
          if ($robot_key == 'value') {
            continue;
          }
          $robot_data[$robot_key] = ($robot_val == 0 ? 0 : $robot_key);
        }

        // Filter out empty values.
        $robot_data = array_filter($robot_data);

        // Catch empty values.
        if (empty($robot_data)) {
          $value = FALSE;
        }
        // Return any data that's remaining.
        else {
          $value = $robot_data;
        }
      }
      else {
        $value = FALSE;
      }
      break;

    // This meta tag was renamed.
    case 'shorturl':
      $name = 'shortlink';
      break;

    // Everything else should be ok.
    default:
      // Nothing to see here.
  }

  // A final tidy-up.
  if (is_array($value)) {
    foreach ($value as $key => $val) {
      $value[$key] = trim($val);
    }
    $value = array_filter($value);
  }

  return array($name, $value);
}


/**
 * The following will not be converted because they refer to site-wide defaults
 * that should be customized appropriately based on the D7 site's content type
 * architecture.
 */

// 'nodewords_metatags_generation_method_' . $type:
// 0 - NODEWORDS_GENERATION_NEVER - never auto-generate the string.
// 1 - NODEWORDS_GENERATION_WHEN_EMPTY - when the field is empty. Default.
// 2 - NODEWORDS_GENERATION_ALWAYS - always use the generated string.

// 'nodewords_metatags_generation_method_' . $type:
// 1 - NODEWORDS_GENERATION_BODY - use the body field.
// 2 - NODEWORDS_GENERATION_TEASER - use the node teaser. Default.
// 3 - NODEWORDS_GENERATION_TEASER_BODY - use teaser, failover to body if empty.
