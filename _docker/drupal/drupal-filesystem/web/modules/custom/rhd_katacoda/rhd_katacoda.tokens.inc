<?php

/**
 * @file
 * Implements custom token functionality.
 * 
 * This creates a token specifically to show a "parent" content type for a "child"
 * content type's URL alias. The content type name and field/machine names must be copied 
 * from the RHD Site in order for this to function properly.
 * 
 * To create this custom token, 4 things must happen:
 *
 * 1. Two content-types must exist, with one being the "parent" of the other
 *    by setting an entity reference in the parent field to find entries for the content type of the "child"
 * 2. The "parent" content type must have a field for a (custom URL slug)
 * 3. The slug name must exist in order for the token placement to work successfully.
 * 4. Once the alias is created, the token 'rhd_katacoda_parent_course_token' (or whatever is preferred) must be used as a the alias value.
 *  
 */

use Drupal\Core\Render\BubbleableMetadata;

/**
 * Implements hook_token_info().
 * 
 * Declare a token name as part of the node. No new token group is declared
 * since some other node values (namely, the :nid) are needed when the nodes are
 * created.
 */
function rhd_katacoda_token_info() {
  $info['tokens']['node']['rhd_katacoda_parent_course_token'] = [
    'name' => t('RHD Katacoda Parent Course'),
    'description' => t('This is the URL slug for the parent course of a child lesson entity reference')
  ];

  return $info;
}
 
/**
 * Implements hook_tokens().
 * 
 * Find the parent content type course entry of a child content type lesson
 * entry by way of a data query and insert the URL slug value of the parent as
 * the rendered token content in the URL path alias.
 */
function rhd_katacoda_tokens($type, $tokens, array $data, array $options, BubbleableMetadata $bubbleable_metadata)
{
  $replacements = [];

  if (empty($data['node'])) {
    return $replacements;
  }

  if (!empty($data['node'])) {
    $node = $data['node'];

    // Retrieve associated values for IDs of entity reference Katacoda course lessons.
    $connection = \Drupal::database();
    $result = $connection->query(
          "SELECT DISTINCT
          c.field_katacoda_course_lessons_target_id,
          c.entity_id,
          p.field_katacoda_course_url_slug_value
          FROM {node_revision__field_katacoda_course_lessons} AS c
          JOIN {node_revision__field_katacoda_course_url_slug} AS p
          WHERE c.entity_id = p.entity_id 
          "
    );

    // Create result set by combining retrieved entity_id results with category
    // URL slugs IDs of affected node entities.
    $parent_slug_id = [];
    // Category URL alias slug names.
    $parent_slug_nm = [];

    while ($row = $result->fetchAssoc()) {
      if (!empty($row['field_katacoda_course_url_slug_value'])) {
        $parent_slug_id[] = $row['field_katacoda_course_lessons_target_id'];
        $parent_slug_nm[] = $row['field_katacoda_course_url_slug_value'];
      }
    }

    // Combine the two sets so that the matching ID becomes the key to the slug
    // value in a key-value pair.
    $parent_slug_set = array_combine($parent_slug_id,$parent_slug_nm);

    if (!empty($parent_slug_set)) {
      foreach ($tokens as $name=>$original) {
        switch ($name) {
          case 'rhd_katacoda_parent_course_token';
            $str = $parent_slug_set[$node->id()];
            $replacements[$original] = $str;
            break;
        }
      }
    }   
  }

  return $replacements;     
}
