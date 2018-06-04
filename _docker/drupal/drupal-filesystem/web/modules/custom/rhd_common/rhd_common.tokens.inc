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
  $tokens['related_product_code'] = [
    'name' => 'related_product_code',
    'description' => 'Product code for the associated product'
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

  if (empty($data['node']) && empty($data['entity'])) {
    return $replacements;
  }

  /** @var \Drupal\node\Entity\Node $node */
  $node = empty($data['node']) ? $data['entity'] : $data['node'];

  array_walk($tokens, function ($val, $key) use (&$replacements, $node) {
    if ($key === 'initiator') {
      $replacements[$val] = $node->getRevisionUser()->getDisplayName();
    }

    if ($key === 'related_product_code') {
      /** @var \Drupal\node\Entity\Node $product */
      if (isset($node->field_related_product)) {
        $product = $node->field_related_product->referencedEntities()[0];
        $replacements[$val] = $product->field_url_product_name->value;
      }
    }
  });

  return $replacements;
}