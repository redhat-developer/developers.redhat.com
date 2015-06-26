<?php
/**
 * @file
 * Feeds mapping implementation for the Metatag module.
 */

/**
 * Implements hook_feeds_processor_targets_alter().
 */
function metatag_feeds_processor_targets_alter(&$targets, $entity_type, $bundle) {
  if (metatag_entity_supports_metatags($entity_type)) {
    $info = metatag_get_info();
    foreach ($info['tags'] as $name => $tag) {
      $targets['meta_' . $name] = array(
        'name' => 'Meta tag: ' . check_plain($tag['label']),
        'callback' => 'metatag_feeds_set_target',
        'description' => $tag['description'],
      );
    }
  }
}

/**
 * Callback function to set value of a metatag tag.
 */
function metatag_feeds_set_target($source, $entity, $target, $values) {
  // Don't do anything if we weren't given any data.
  if (empty($values)) {
    return;
  }

  // The Feed API was changed so that the $values are passed as an array rather
  // than a single value. For backwards compatibility, support both.
  if (!is_array($values)) {
    $values = array($values);
  }

  // Strip the prefix that was added above.
  $name = str_replace('meta_', '', $target);

  // Identify the type of entity being imported.
  $entity_type = $entity->feeds_item->entity_type;

  // Check for any existing data that may not have been loaded already.
  if (!isset($entity->metatags) && !empty($entity->feeds_item->entity_id) && is_numeric($entity->feeds_item->entity_id)) {
    $entity->metatags = array();
    $entity_id = $entity->feeds_item->entity_id;

    // Load the existing entity.
    $stored_entities = entity_load($entity_type, array($entity_id));
    if (!empty($stored_entities)) {
      $stored_entity = reset($stored_entities);
      if (!empty($stored_entity)) {
        // This function returns all values for all revisions.
        $metatags = metatag_metatags_load($entity_type, $entity_id);
        if (!empty($metatags)) {
          // Only load meta tags for the current revision.
          list(, $revision_id) = entity_extract_ids($entity_type, $stored_entity);
          if (!empty($metatags[$revision_id])) {
            // Just copy all meta tags for all languages.
            $entity->metatags = $metatags[$revision_id];
          }
        }
      }
    }
  }

  // Assign the value.
  $langcode = metatag_entity_get_language($entity_type, $entity);
  $entity->metatags[$langcode][$name]['value'] = $values[0];
}
