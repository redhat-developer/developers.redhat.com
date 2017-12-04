<?php

function rhd_common_preprocess_field(&$variables, $hook) {
  if ($variables['field_name'] === 'field_video_resource_tags') {
    video_tags($variables);
  }
}

function video_tags(&$variables){
  $variables['video_tags'];
  foreach ($variables['#items'] as $item) {
    $variables['video_tags'][] = $item->referencedEntities()[0]->get("name");
  }
}
