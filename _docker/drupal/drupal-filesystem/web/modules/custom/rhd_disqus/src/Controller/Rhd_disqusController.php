<?php
namespace Drupal\rhd_disqus\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

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
        $disqus_secret_key = $disqus_config->get('rhd_disqus_secret_key') ?: "";

        //My custom code here can now access the entire Drupal API
        $disqusApiSecret = $disqus_secret_key; 
        $commentId = $_POST['comment'];
        $postId = $_POST['post'];
        $postAuthorEmail = "";

        $build['postId'] = $postId;
        $build['commentId'] = $commentId;

        // Load the node from the $postId
        $nid = (int) $postId;
        if($nid) {
            $node_storage = \Drupal::entityTypeManager()->getStorage('node');
            $node = $node_storage->load($nid);
        }

        if($node != NULL) {
            $postTitle = $node->get('title')->value;
            $author = $node->getOwner();
            $postAuthor = $author->getDisplayName(); 
            $postAuthorEmail = $author->getEmail(); 
        }

        $build['articleTitle'] = $postTitle;

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
                        $headers  = 'MIME-Version: 1.0' . "\r\n";
                        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
                        $headers .= 'From:developers-redhat-com@redhat.com' . '\r\n';
                        $subject = 'New comment on ' . $thread->title;
                        $message = '<h3>A comment was posted on <a href="' . $thread->link . '#comment-' . $commentId . '">' . $thread->title . '</a></h3><p>' . $author->name . ' wrote:</p><blockquote>' . $comment .'</blockquote><p><a href="http://' . $results->response->forum . '.disqus.com/admin/moderate/#/approved/search/id:' . $commentId . '">Moderate comment</a></p>';
                        
                        // Send the email		
                        mail($postAuthor,$subject,$message,$headers);
                        // Success
                        $build['success'] = "Post: " . $postTitle . ", author notified";
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