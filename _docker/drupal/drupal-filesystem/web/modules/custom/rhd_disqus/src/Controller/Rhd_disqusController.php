<?php
namespace Drupal\rhd_disqus\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use \Drupal\Core\Url;

class Rhd_disqusController extends ControllerBase {

    /**
     * Returns a render-able array for a email service.
     */
    public function rhd_disqus_email() {

        $tmp_output = "";

        //temp array for output
        $build = array();

        //Disqus config
        $disqus_config = \Drupal::config('rhd_disqus.disqussettings');
        $disqusApiSecret = $disqus_config->get('rhd_disqus_secret_key') ?: "";
        $commentId = $_POST['comment'];
        $postId = $_POST['post'];
        $postAuthorEmail = "";

        //$build['postId'] = $postId;
        //$build['commentId'] = $commentId;

        // Load the node from the $postId
        $urlAlias = $postId;
        if($urlAlias) {
            $path = \Drupal::service('path.alias_manager')->getPathByAlias($urlAlias);
            if(preg_match('/node\/(\d+)/', $path, $matches)) {
                $node_storage = \Drupal::entityTypeManager()->getStorage('node');
                $node = $node_storage->load($matches[1]);
                //$build['debug'] = $matches[1];
            }
        }

        if($node != NULL) {
            $postTitle = $node->get('title')->value;
            $authorTmp = $node->getOwner();
            $postAuthor = $authorTmp->getDisplayName(); 
            $postAuthorEmail = $authorTmp->getEmail(); 
        }

        //check we have a valid email and return error if not
        if (filter_var($postAuthorEmail, FILTER_VALIDATE_EMAIL)) {
            //grab the comment info from Disqus
            $session = curl_init('http://disqus.com/api/3.0/posts/details.json?api_secret=' . $disqusApiSecret .'&post=' . $commentId . '&related=thread');
            curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($session);
            curl_close($session);

            // decode the json data to make it easier to parse the php
            $results = json_decode($result);

            // Handle errors otherwise send the email
            if ($results === NULL)  {
                $build['error'] = 'Failed to get comment information from Disqus';
            } else {
                if ($results->code !== 0) {
                    $build['error'] = $results->response;
                } else {
                    if ($results->response) {
                        //set the comment details
                        $author = $results->response->author;
                        $thread = $results->response->thread;
                        $comment = $results->response->raw_message;

                        // Build the email message
                        $mailManager = \Drupal::service('plugin.manager.mail');
                        $module = 'rhd_disqus';
                        $key = 'disqus_comment_mail';
                        $to = $postAuthorEmail;
                        $params['message'] = '<h3>A comment was posted on <a href="' . $thread->link . '#comment-' . $commentId . '">' . $thread->title . '</a></h3><p>' . $author->name . ' wrote:</p><blockquote>' . $comment .'</blockquote><p><a href="http://' . $results->response->forum . '.disqus.com/admin/moderate/#/approved/search/id:' . $commentId . '">Moderate comment</a></p>';
                        $params['subject'] = $thread->title;
                        $langcode = \Drupal::currentUser()->getPreferredLangcode();
                        $send = true;
                        $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
                        if ($result['result'] !== true) {
                            $build['error'] = 'There was a problem sending your message and it was not sent.';
                        }
                        else {
                            $build['success'] = "Post: " . $postTitle . ", author notified";
                        }
                    }
                }
            }
        } else {
            $build['error'] =  'no email associated with this content item:';
        }

        return new JsonResponse( $build );
    }
    

  }
?>