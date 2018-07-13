<?php
/**
 * Created by PhpStorm.
 * User: jporter
 * Date: 6/13/18
 * Time: 1:18 PM
 */

namespace Drupal\rhd_guzzle_throttle;


use Illuminate\Config\Repository;
use Illuminate\Database\MySqlConnection;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class LaravelConfigFactory implements ContainerAwareInterface {
  use ContainerAwareTrait;

  public function create() : Repository {
    $dbconn = \Drupal::database()::open(\Drupal\Core\Database\Database::getConnectionInfo()['default']);
    $database = \Drupal\Core\Database\Database::getConnectionInfo()['default']['database'];
    return new Repository([
      'cache' => [
        'driver' => 'database',
        'options' => [
          'table' => 'laravel_cache',
          'connection' => new MysqlConnection($dbconn, $database),
        ]
      ]
    ]);
  }
}