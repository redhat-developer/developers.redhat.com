<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Entity\EntityInterface;

/**
 * Displays recent content from WP and Drupal with Disqus and related topics.
 *
 *  @AssemblyBuild(
 *   id = "dynamic_content_list",
 *   types = { "dynamic_content_list" },
 *   label = @Translation("Dynamic Content List")
 * )
 */
class DynamicContentListBuild extends DynamicContentFeedBuild {

  /**
   * {@inheritdoc}
   */
  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $count = 6;
    $this->getItems($build, $entity, $count, 'dynamic_content_list_item');
    $build['latest_comments'] = $this->getComments();
  }

  /**
   * {@inheritdoc}
   */
  protected function getComments() {
    $config = \Drupal::config('rhd_disqus.disqussettings');
    $shortname = $config->get('rhd_disqus_shortname') ?: FALSE;
    $api_key = $config->get('rhd_disqus_api_key') ?: FALSE;

    if (!$api_key || !$shortname) {
      return FALSE;
    }

    $comments = [
      '#type' => 'container',
    ];
    $comments['disqus'] = [
      '#markup' => '<div class="comment-wrapper" data-rhd-disqus-recent-comments data-rhd-disqus-limit="4" data-rhd-disqus-truncate>Waiting for Disqus&hellip;</div>',
      'comment_template' => [
        '#theme' => 'rhd_disqus__comment__latest',
        '#thread_title' => 'Example thread title',
        '#message' => 'Comment body goes here.',
        '#date' => date('F j, Y', time()),
        '#prefix' => '<div class="hidden template--rhd-disqus--comment--latest">',
        '#suffix' => '</div>',
      ],
      '#attached' => [
        'library' => ['rhd_disqus/rhd-disqus'],
      ],
    ];

    $comments['disqus']['comment_template']['#attributes']['class'][] = 'hidden';

    $comments['disqus']['#attached']['drupalSettings']['rhdDisqus']['apiKey'] = $api_key;
    $comments['disqus']['#attached']['drupalSettings']['rhdDisqus']['shortName'] = $shortname;

    return $comments;
  }

}
