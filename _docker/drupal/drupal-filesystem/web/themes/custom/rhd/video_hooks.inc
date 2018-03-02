<?php

use Drupal\profile\Entity\Profile;

function process_node_for_hero_card(\Drupal\node\Entity\Node $node, array &$variables) {
  $variables['video_thumbnail_url'] = $node->field_video_thumbnail_url->value;
}

function add_speaker_profile(\Drupal\node\Entity\Node $node, array &$variables) {
  /** @var \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager */
  $entity_type_manager = \Drupal::entityTypeManager();

  /** @var \Drupal\profile\ProfileViewBuilder $view_builder */
  $view_builder = $entity_type_manager->getViewBuilder('profile');

  /** @var \Drupal\profile\ProfileStorageInterface $storage */
  $storage = $entity_type_manager->getStorage('profile');

  $speakers = $node->field_speakers_user->referencedEntities();

  if (count($speakers) > 0) {
    $variables['speakers'] = [];
    /** @var \Drupal\user\Entity\User $speaker */
    foreach ($speakers as $index => $speaker) {
      /** @var Profile $profile */
      $profile = $storage->loadByUser($speaker, 'speaker_profile', TRUE);
      $variables['speakers'][] = ['profile' => $view_builder->view($profile)];
    }
  }
}