<?php
/**
 * @file
 * awestruct_push.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function awestruct_push_user_default_roles() {
  $roles = array();

  // Exported role: awestruct.
  $roles['awestruct'] = array(
    'name' => 'awestruct',
    'weight' => 3,
  );

  return $roles;
}
