<?php

/**
 * Implements hook_token_info
 */
function rhd_common_token_info() {
  $types['node'] = [
    'name' => t('Node'),
    'needs-data' => 'node'
  ];

  $tokens['initiator'] = [
    'name' => 'initiator',
    'description' => 'User who initiated the change.'
  ];

  return [
    'types' => $types,
    'tokens' => ['node' => $tokens],
  ];
}

/**
 * Implements hook_tokens
 */
function rhd_common_tokens($type, $tokens, array $data, array $options,
  \Drupal\Core\Render\BubbleableMetadata $bubbleable_metadata) {
  $replacements = [];
  
  if (!array_key_exists('initiator', $tokens)) {
    return $replacements;
  }

  if (empty($data['node']) && empty($data['entity'])) {
    return $replacements;
  }

  /** @var \Drupal\node\Entity\Node $node */
  $node = empty($data['node']) ? $data['entity'] : $data['node'];

  array_walk($tokens, function ($val, $key) use (&$replacements, $node) {
    if ($key === 'initiator') {
      $replacements[$val] = $node->getRevisionUser()->getDisplayName();
    }
  });

  return $replacements;
}