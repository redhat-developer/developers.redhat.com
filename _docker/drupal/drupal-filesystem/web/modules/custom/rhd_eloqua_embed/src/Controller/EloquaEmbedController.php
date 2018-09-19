<?php
/**
 * @file
 * Contains \Drupal\rhd_eloqua_embed\Controller\EloquaEmbedController.
 */

namespace Drupal\rhd_eloqua_embed\Controller;

use Drupal\assembly\Entity\Assembly;

class EloquaEmbedController {

  public function getForm($assembly_id) { //2548
    $entity = Assembly::load($assembly_id);
    if($entity->hasField('field_eloqua_json')) {
      $eloqua_json = $entity->get('field_eloqua_json')->value;
      $build['#title'] = $eloqua_json;
      return $build;
    }

    // $eloqua_json = '{
    //   "showAdditionalFields": [],
    //   "hideStandardFields": [],
    //   "CustomQuestions": [],
    //   "offer_id": "70160000000Qf1SAAS",
    //   "language": "en",
    //   "FormTitle": "Sallie Test form ",
    //   "FormIntro": "This is a test intro paragraph ",
    //   "NameOrder": "western",
    //   "FormCallToAction": "DOWNLOAD NOW",
    //   "ThanksTitle": "Thank you",
    //   "ThanksText": "Thank you paragraph",
    //   "ShowThanksButton": "true",
    //   "leadActivity": 1,
    //   "disableVisitorContactLookups": false
    // }';
  }

}
