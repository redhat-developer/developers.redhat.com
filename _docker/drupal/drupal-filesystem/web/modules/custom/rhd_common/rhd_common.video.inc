<?php

function rhd_common_preprocess_field(&$variables, $hook) {
  if ($variables['field_name'] === 'some_name') {
    // Do stuff
    // $variables['#node'] should be the actual node
    /** @var \Drupal\node\Entity\Node $node */
    $node = $variables['#node'];
    // then you can do things like
    /** @var \Drupal\node\Entity\Node $video */ // Could also be a Video from MediaEntity
    $video = $node->field_related_video->referencedEntities()[0];
    $variables['title'] = $video->label();
    $variables['field_video_resource'] = $video->field_video_url->value;
  }
}
