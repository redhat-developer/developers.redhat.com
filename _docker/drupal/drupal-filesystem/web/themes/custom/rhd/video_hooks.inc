<?php

function process_node_for_hero_card(\Drupal\node\Entity\Node $node, array &$variables) {
  $variables['video_thumbnail_url'] = $node->field_video_thumbnail_url->value;
}