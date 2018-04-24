<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\node\Entity\Node;

/**
 * Displays a list of recent content from Wordpress and Drupal with Disqus comments and related topics
 *  @AssemblyBuild(
 *   id = "dynamic_content_list",
 *   types = { "dynamic_content_list" },
 *   label = @Translation("Dynamic Content List")
 * )
 */
class DynamicContentListBuild extends DynamicContentFeedBuild {

  protected $disqus_secret_key = false;

  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    $count = 6;
    $this->getItems($build, $entity, $count, 'teaser');
    $build['latest_comments'] = $this->getComments();
  }

  protected function getComments() {
    $comments = [
      '#type' => 'container',
    ];
    $comments['disqus'] = [
      '#markup' => 'disqus comments appear here'
    ];

    if ($disqus_secret_key) {
      $query = [
        'api_secret' => 'secret_key', // api key
        'forum' => 'red-hat-developers-blog', // shortname
        // 'thread' => 'disqus_identifier' // disqus identifier, maybe optional?
        'limit' => 4,
      ];
      $client = new HttpClient();
      $url = 'https://disqus.com/api/3.0/threads/listPosts.json';
      $request = $this->client->request('GET', $url, ['query' => $query]);
      $response = $request->getBody()->getContents();
      $results = json_decode($response);

      // Figure out data structure returned and put it into the build for the template to handle
      return $comments;
    }
    else {

      $results = [
        [
          'title' => 'RH Container Developer Kit with Nested KVM',
          'comment' => 'What\'s the advantage to using the CKD over downloading open-source Minishift straight from GitHub? Even though we have an enterprise subscription that gives us access to the CDK...',
          'date' => 'March 8, 2018',
          'reply-url' => '/'
        ],
        [
          'title' => 'Java Class Metadata: A User Guide',
          'comment' => 'Does it work with Arquillian? How can i test it?',
          'date' => 'February 22, 2018',
          'reply-url' => '/'
        ],
        [
          'title' => 'Microservices with Java EE',
          'comment' => 'Great Presentation',
          'date' => 'February 6, 2018',
          'reply-url' => '/'
        ],
        [
          'title' => 'Java Class Metadata: A User Guide',
          'comment' => 'Does it work with Arquillian? How can i test it?',
          'date' => 'February 22, 2018',
          'reply-url' => '/'
        ]
      ];

      $comments['disqus'] = [];
      foreach ($results as $result) {
        $comments['disqus'][] = [
          '#theme' => 'latest_disqus_comment',
          '#title' => $result['title'],
          '#comment' => $result['comment'],
          '#date' => $result['date'],
          '#reply-url' => $result['reply-url']
        ];
      }
      return $comments;
    }

    return false;

  }

}
