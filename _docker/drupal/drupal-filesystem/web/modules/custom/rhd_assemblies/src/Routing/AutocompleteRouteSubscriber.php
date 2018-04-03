<?php

namespace Drupal\rhd_assemblies\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

class AutocompleteRouteSubscriber extends RouteSubscriberBase {

  public function alterRoutes(RouteCollection $collection) {
    if ($route = $collection->get('system.entity_autocomplete')) {
      $route->setDefault('_controller', '\Drupal\rhd_assemblies\Controller\EntityBundleAutocompleteController::handleAutocomplete');
    }
  }

}
