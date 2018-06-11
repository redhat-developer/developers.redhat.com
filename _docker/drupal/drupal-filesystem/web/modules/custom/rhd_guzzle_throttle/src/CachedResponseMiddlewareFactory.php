<?php
/**
 * Created by PhpStorm.
 * User: jporter
 * Date: 6/8/18
 * Time: 11:48 AM
 */

namespace Drupal\rhd_guzzle_throttle;


use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Site\Settings;
use function GuzzleHttp\Psr7\copy_to_string;
use GuzzleHttp\Psr7\Response;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

class CachedResponseMiddlewareFactory {

  /*** @var \Drupal\Core\Site\Settings */
  private $settings;

  /** @var ConfigFactoryInterface */
  private $config;

  /**
   * @inheritDoc
   */
  public function __construct(Settings $settings, ConfigFactoryInterface $configFactory) {
    $this->settings = $settings;
    $this->config = $configFactory;
  }

  /**
   * @inheritDoc
   */
  public function __invoke() {
    return function(callable $handler) {
      return function(RequestInterface $request, array $options) use ($handler) {
        /** @var callable $promise */
        $promise = $handler($request, $options);

        return $promise->then(function (ResponseInterface $response) use ($request) {
          if ($response->getStatusCode() >= 400) {
            $cache = new DrupalFileCache();

            /** @var ResponseInterface $cachedResponse */
            $cachedResponse = $cache->getResponse($request);

            // If we actually have a valid cached response, return it
            if (isset($cachedResponse)) {
              return $cachedResponse;
            }
          }
          // We want to mod the request here so the body saves
          /** @var ResponseInterface $modRequest */
          $modRequest = new Response($response->getStatusCode(),
            $response->getHeaders(), $response->getBody()->getContents());

          return $modRequest;
        });
      };
    };
  }


}