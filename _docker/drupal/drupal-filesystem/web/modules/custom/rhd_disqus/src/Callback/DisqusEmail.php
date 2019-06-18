<?php
use Drupal\Core\DrupalKernel;
use Symfony\Component\HttpFoundation\Request;

//bootstrap drupal - need to figure out how to put this properly into the module. (testing only)
define('DRUPAL_DIR', '../../../../../');
$autoloader = require_once DRUPAL_DIR . '/autoload.php';
$kernel = new DrupalKernel('prod', $autoloader);
$request = Request::createFromGlobals();
chdir(DRUPAL_DIR);
$response = $kernel->handle($request);
$kernel->terminate($request, $response);

//Disqus config
$disqus_config = \Drupal::config('rhd_disqus.disqussettings');
$disqus_secret_key = $disqus_config->get('rhd_disqus_secret_key') ?: "";

//My custom code here can now access the entire Drupal API
$disqusApiSecret = $disqus_secret_key; 
$commentId = $_POST['comment'];
$postId = $_POST['post'];
$postAuthorEmail = "";

// Load the node from the $postId
$nid = (int) $postId;
if($nid) {
    $node_storage = \Drupal::entityTypeManager()->getStorage('node');
    $node = $node_storage->load($nid);
}

if($node) {
    $postTitle = $node->get('title')->value;
    $author = $node->getOwner();
    $postAuthor = $author->getDisplayName(); 
    $postAuthorEmail = $author->getEmail(); 
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
        echo 'Error: Failed to get comment information from Disqus';
    } else {
        if ($results->code !== 0) {
            echo 'Error: '.$results->response;
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
                echo "Post: " . $postTitle . ", author notified";
            }
        }
    }
} else {
    echo 'Error: no email associated with this content item:'.$postTitle;
}
?>