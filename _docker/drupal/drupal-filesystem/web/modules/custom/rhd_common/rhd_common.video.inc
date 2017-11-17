<?php

function video_tags(&$variables) {
  /** @var \Drupal\taxonomy\Entity\Term $tag */
  foreach($variables['node']->field_video_resource_tags->referencedEntities() as $tag) {
    $variables['video_tags'][] = $tag->label();
  }
}