<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\node\Entity\Node;
use Drupal\Core\HttpClient;

/**
 * Displays a list of recent content from Wordpress and Drupal with Disqus comments and related topics
 *  @AssemblyBuild(
 *   id = "dynamic_content_list",
 *   types = { "dynamic_content_list" },
 *   label = @Translation("Dynamic Content List")
 * )
 */
class DynamicContentListBuild extends DynamicContentFeedBuild {

  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $count = 6;
    $this->getItems($build, $entity, $count, 'teaser');
    $build['latest_comments'] = $this->getComments();
  }

  protected function getComments() {
    $config = \Drupal::config('rhd_disqus.disqussettings');
    $shortname = $config->get('rhd_disqus_shortname') ?: FALSE;
    $api_key = $config->get('rhd_disqus_api_key') ?: FALSE;

    if (!$api_key || !$shortname) {
      return false;
    }

    $comments = [
      '#type' => 'container',
    ];
    $comments['disqus'] = [
      '#markup' => '<div class="comment-wrapper">Waiting for Disqus&hellip;</div>',
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

    $comments['disqus']['#attached']['drupalSettings']['rhdDisqus']['recentComments'][] = [
      'element' => '.assembly-type-dynamic_content_list .disqus .comment-wrapper',
      'limit' => 4,
      'truncate' => TRUE,
    ];

    // if ($disqus_secret_key) {
      // $query = [
      //   'forum' => 'alloy-disqus-sandbox', // shortname
      //   'limit' => 4,
      //   'api_key' => 'h38QeFPPzhJ9DPrkavGIoOmMklThQUKNtmheFyhofu9zOadmlwLf1YbQceEnR9U9',
      // ];
      // $client = \Drupal::httpClient();
      // $url = 'https://disqus.com/api/3.0/posts/list.json';
      // $request = $client->request('GET', $url, ['query' => $query]);
      // $response = $request->getBody()->getContents();
      // $results = json_decode($response);

      // if ($results && $results->response) {
      //   $comments['disqus'] = [];
      //   foreach ($results->response as $result) {
      //     // format date
      //     $timestamp = strtotime($result->createdAt);
      //     $date = date('F j, Y', $timestamp);

      //     // truncate message
      //     $message = $result->raw_message;
      //     $length = 177;
      //     if (strlen($message) > $length) {
      //       $message = substr($message, 0, $length) . '&hellip;';
      //     }

      //     $comments['disqus'][] = [
      //       '#theme' => 'latest_disqus_comment',
      //       '#title' => 'Title here',
      //       '#comment' => ['#markup' => $message ],
      //       '#date' => $date,
      //       // '#reply-url' => $result['reply-url']
      //     ];
      //   }
      // }

      // Figure out data structure returned and put it into the build for the template to handle
      return $comments;
    // }
    // else {
    //   return false;
    // }
  }

}
