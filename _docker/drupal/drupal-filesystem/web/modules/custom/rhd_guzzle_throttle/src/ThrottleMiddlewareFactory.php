<?php
/**
 * Created by PhpStorm.
 * User: jporter
 * Date: 6/7/18
 * Time: 2:04 PM
 */

namespace Drupal\rhd_guzzle_throttle;


use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Site\Settings;
use Drupal\Core\StreamWrapper\PublicStream;
use hamburgscleanest\GuzzleAdvancedThrottle\Cache\Adapters\LaravelAdapter;
use hamburgscleanest\GuzzleAdvancedThrottle\Middleware\ThrottleMiddleware;
use hamburgscleanest\GuzzleAdvancedThrottle\RequestLimitRuleset;
use Illuminate\Config\Repository;

class ThrottleMiddlewareFactory {

  /*** @var \Drupal\Core\Site\Settings */
  private $settings;

  /** @var \Illuminate\Config\Repository */
  private $laravelConfig;
  /** @var \hamburgscleanest\GuzzleAdvancedThrottle\Middleware\ThrottleMiddleware */
  private $throttle;

  /**
   * @inheritDoc
   */
  public function __construct(Settings $settings, Repository $laravelRepository) {
    $this->settings = $settings;
    $this->laravelConfig = $laravelRepository;

    $wpLocation = $this->settings->get('wp_loc') ?? 'https://origin-developers.redhat.com';
    $rules = [
      $wpLocation => [
        [
          'max_requests' => 30,
          'request_interval' => 2
        ],
        [
          'max_requests'     => 400,
          'request_interval' => 120
        ]
      ]
    ];

    // TODO: Consider creating a custom Laravel adapter that I can also use/expose for the CachedResponseMiddlewareFactory
    // I could expose this config out Drupal and inject as well to create new instances with the same configuration -- probably safe

    $ruleset = new RequestLimitRuleset($rules, 'force-cache',
      DrupalLaravelAdapter::class, $this->laravelConfig);

    $this->throttle = new ThrottleMiddleware($ruleset);
  }

  /**
   * @return callable
   * @throws \Exception
   */
  public function __invoke() : callable {
    return $this->throttle->handle();
  }
}