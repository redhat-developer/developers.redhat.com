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
        $debug = array();
        

        //Disqus config
        $disqus_config = \Drupal::config('rhd_disqus.disqussettings');
        $isDebug = $disqus_config->get('rhd_disqus_email_author_debug') ?: false;
        $disqusApiSecret = $disqus_config->get('rhd_disqus_secret_key') ?: "";
        $disqusEmailEnabled = $disqus_config->get('rhd_disqus_email_author_enabled') ?: false;
        $commentId = $_POST['comment'];
        $postId = $_POST['post'];
        $postAuthorEmail = "";

        $debug['postId'] = $postId;
        $debug['commentId'] = $commentId;

        // Load the node from the $postId
        $urlAlias = $postId;
        $debug['urlAlias'] = $urlAlias;
        $node = NULL;
        if($urlAlias) {
            $path = \Drupal::service('path.alias_manager')->getPathByAlias($urlAlias);
            $debug['drupalPath'] = $path;
            $params = \Drupal::service('path.validator')->getUrlIfValid($path)->getRouteParameters();
            $debug['drupalParams'] = $params;
            if (isset($params['node'])) {
                $node_storage = \Drupal::entityTypeManager()->getStorage('node');
                $node = $node_storage->load($params['node']);
            }
        }

        $debug['drupalNode'] = $node;

        if($node != NULL) {
            $postTitle = $node->get('title')->value;
            $authorTmp = $node->getOwner();
            $postAuthor = $authorTmp->getDisplayName(); 
            $postAuthorEmail = $authorTmp->getEmail(); 
        }

        //check we have a valid email and return error if not
        $debug['authorEmail'] = $postAuthorEmail;


        if($disqusEmailEnabled) {
            if (filter_var($postAuthorEmail, FILTER_VALIDATE_EMAIL)) {
                //grab the comment info from Disqus
                $session = curl_init('https://disqus.com/api/3.0/posts/details.json?api_secret=' . $disqusApiSecret .'&post=' . $commentId . '&related=thread');
                curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
                $result = curl_exec($session);
                curl_close($session);
    
                // decode the json data to make it easier to parse the php
                $results = json_decode($result);
    
                $debug['disqusResults'] = $results;
    
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
                            $params['message'] = '<p>A comment was posted on ' . $thread->link . '#comment-' . $commentId . '</p><p>' . $author->name . ' wrote:</p><p>' . $comment .'</p><p>You can moderate the comment at https://' . $results->response->forum . '.disqus.com/admin/moderate/#/approved/search/id:' . $commentId . '</p>';
                            $params['subject'] = $thread->title;
                            $langcode = \Drupal::currentUser()->getPreferredLangcode();
                            $send = true;
                            $result = $mailManager->mail($module, $key, $to, $langcode, $params, NULL, $send);
                            if ($result['result'] !== true) {
                                $build['error'] = 'There was a problem';
                            }
                            else {
                                $build['success'] = "Author notified";
                            }
                        }
                    }
                }
            } else {
                $build['error'] =  'There was a problem';
            }
        } else {
            $build['success'] = 'no email sent as sending email is disabled in config';
        }

        if($isDebug) {
            $build['debug'] = $debug;
        }

        return new JsonResponse( $build );
    }
    

  }
?>