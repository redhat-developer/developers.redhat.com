<?php
/**
 * Created by PhpStorm.
 * User: jporter
 * Date: 6/8/18
 * Time: 11:48 AM
 */

namespace Drupal\rhd_guzzle_throttle;


use Drupal\Core\Config\ConfigFactoryInterface;
use GuzzleHttp\Psr7\Response;
use Illuminate\Contracts\Config\Repository;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

class CachedResponseMiddlewareFactory {

  /** @var Repository */
  private $config;

  /**
   * @inheritDoc
   */
  public function __construct(Repository $config) {
    $this->config = $config;
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
            $cache = new DrupalLaravelAdapter($this->config);

            /** @var ResponseInterface $cachedResponse */
            $cachedResponse = $cache->getResponse($request);

            // If we actually have a valid cached response, return it
            if (isset($cachedResponse)) {
              // FIXME: Should we return a fulfilled promise here?
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