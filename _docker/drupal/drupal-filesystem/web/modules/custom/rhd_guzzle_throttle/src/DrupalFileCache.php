<?php
/**
 * Created by PhpStorm.
 * User: jporter
 * Date: 6/4/18
 * Time: 5:00 PM
 */

namespace Drupal\rhd_guzzle_throttle;

use DateTime;
use Drupal\Core\StreamWrapper\PublicStream;
use function GuzzleHttp\Psr7\copy_to_string;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Stream;
use function GuzzleHttp\Psr7\stream_for;
use hamburgscleanest\GuzzleAdvancedThrottle\Cache\Helpers\RequestHelper;
use hamburgscleanest\GuzzleAdvancedThrottle\Cache\Interfaces\StorageInterface;
use hamburgscleanest\GuzzleAdvancedThrottle\RequestInfo;
use Illuminate\Config\Repository;
use Psr\Http\Message\RequestInterface;
use Psr\Http\Message\ResponseInterface;

class DrupalFileCache implements StorageInterface {

  const RSPNS = '.rspns';
  const BDY = '.bdy';

  /** @var string */
  private $mainDirectory = '';

  /** @var array */
  private $requestInfo = [];

  /**
   * StorageInterface constructor.
   * @param Repository|null $config
   * @param string $saveDir|null base location of the save directory
   */
  const REQUEST_INFO = 'request_info';

  public function __construct(?\Illuminate\Config\Repository $config = NULL, string $saveDir = NULL) {
    $this->mainDirectory = ($saveDir ?? PublicStream::basePath()) . '/guzzle_cache';
  }

  /**
   * @param string $host
   * @param string $key
   * @param int $requestCount
   * @param DateTime $expiresAt
   * @param int $remainingSeconds
   */
  public function save(string $host, string $key, int $requestCount,
    DateTime $expiresAt, int $remainingSeconds): void {

//    $requestInfo = RequestInfo::create($requestCount,
//      $expiresAt->getTimestamp(), $remainingSeconds);
//
//    $rHost = preg_replace("@http(s?)://@", '', $host);
//    $directory = "{$this->mainDirectory}/{${self::REQUEST_INFO}}/{$rHost}";
//
//    $this->saveFileContents($directory, $key, \serialize($requestInfo));
    $this->requestInfo[$host][$key] = RequestInfo::create($requestCount, $expiresAt->getTimestamp(), $remainingSeconds);
  }

  /**
   * @param string $host
   * @param string $key
   * @return RequestInfo|null
   */
  public function get(string $host, string $key): ?RequestInfo {
//    $rHost = preg_replace("@http(s?)://@", '', $host);
//    $directory = "{$this->mainDirectory}/{${self::REQUEST_INFO}}/{$rHost}";
//
//    return $this->loadFileContents($directory, $key);
    return $this->_storage[$host][$key] ?? null;
  }

  /**
   * @param RequestInterface $request
   * @param ResponseInterface $response
   */
  public function saveResponse(RequestInterface $request,
    ResponseInterface $response): void {
    [$host, $path] = RequestHelper::getHostAndPath($request);
    $directory = $this->mainDirectory . '/response';
    $filename = md5($host . '' . $path);

    // We need to know when we cached this
    $currentTimeStamp = (new DateTime())->getTimestamp();
    $cachedResponse = $response->withAddedHeader('cached-datetime', $currentTimeStamp);

    // Resist the body
    $body = copy_to_string($response->getBody());

    $this->saveFileContents($directory, $filename. self::RSPNS, \serialize($cachedResponse));
    $this->saveFileContents($directory, $filename. self::BDY, \serialize($body));
  }

  /**
   * @param RequestInterface $request
   * @return ResponseInterface|null
   * @throws \Exception
   */
  public function getResponse(RequestInterface $request): ?ResponseInterface {
    [$host, $path] = RequestHelper::getHostAndPath($request);
    $directory = $this->mainDirectory . '/response';
    $filename = md5($host . '' . $path);

    $env = \Drupal::config('redhat_developers')->get('environment');
    $anHourAgoTimestamp = new DateTime('1 hour ago');

    /** @var ResponseInterface $response */
    $response = $this->loadFileContents($directory, $filename . self::RSPNS);
    $body = $this->loadFileContents($directory, $filename . self::BDY);

    if (isset($response)) {
      // Add the body to the request
      $response = $response->withBody(stream_for($body));

      // Remove if we're in prod and data is old, otherwise return cached copy
      if ($env === 'prod') {
        $cachedDateTime = (new DateTime())->setTimestamp($response->getHeader('cached-datetime')[0]);

        if ($cachedDateTime < $anHourAgoTimestamp) {
          $this->deleteFile($filename, $filename . self::RSPNS);
          $this->deleteFile($filename, $filename . self::BDY);
          return NULL;
        }
      } else {
        return $response;
      }
    }
    return NULL;
  }

  /**
   * Deletes the given file from the disk
   * @param string $directory
   * @param string $filename
   */
  private function deleteFile(string $directory, string $filename): void {
    \unlink($directory . '/' . $filename);
  }

  /**
   * Saves the given contents into prescribed file
   * @param string $directory
   * @param string $fileName
   * @param string $contents
   */
  private function saveFileContents(string $directory, string $fileName,
    string $contents) : void {
    $this->ensureDirectory($directory);
    $filePath = $directory . '/' . $fileName;

    \file_put_contents($filePath, $contents);
  }

  /**
   * Returns the standard .htaccess lines that Drupal writes to file directories.
   *
   * @param bool $private
   *   (optional) Set to FALSE to return the .htaccess lines for an open and
   *   public directory. The default is TRUE, which returns the .htaccess lines
   *   for a private and protected directory.
   *
   * @return string
   *   The desired contents of the .htaccess file.
   *
   * @see file_create_htaccess()
   */
  private static function htaccessLines($private = TRUE) {
    $lines = <<<EOF
# Turn off all options we don't need.
Options -Indexes -ExecCGI -Includes -MultiViews

# Set the catch-all handler to prevent scripts from being executed.
SetHandler Drupal_Security_Do_Not_Remove_See_SA_2006_006
<Files *>
  # Override the handler again if we're run later in the evaluation list.
  SetHandler Drupal_Security_Do_Not_Remove_See_SA_2013_003
</Files>

# If we know how to do it safely, disable the PHP engine entirely.
<IfModule mod_php5.c>
  php_flag engine off
</IfModule>
EOF;

    if ($private) {
      $lines = <<<EOF
# Deny all requests from Apache 2.4+.
<IfModule mod_authz_core.c>
  Require all denied
</IfModule>

# Deny all requests from Apache 2.0-2.2.
<IfModule !mod_authz_core.c>
  Deny from all
</IfModule>
$lines
EOF;
    }

    return $lines;
  }

  /**
   * Ensures the directory exists, has the right permissions, and a .htaccess.
   *
   * For compatibility with open_basedir, the requested directory is created
   * using a recursion logic that is based on the relative directory path/tree:
   * It works from the end of the path recursively back towards the root
   * directory, until an existing parent directory is found. From there, the
   * subdirectories are created.
   *
   * @param string $directory
   *   The directory path.
   * @param int $mode
   *   The mode, permissions, the directory should have.
   */
  private function ensureDirectory($directory, $mode = 0777) {
    if ($this->createDirectory($directory, $mode)) {
      $htaccess_path = $directory . '/.htaccess';
      if (!\file_exists($htaccess_path) && \file_put_contents($htaccess_path, static::htaccessLines())) {
        @\chmod($htaccess_path, 0444);
      }
    }
  }

  /**
   * Ensures the requested directory exists and has the right permissions.
   *
   * For compatibility with open_basedir, the requested directory is created
   * using a recursion logic that is based on the relative directory path/tree:
   * It works from the end of the path recursively back towards the root
   * directory, until an existing parent directory is found. From there, the
   * subdirectories are created.
   *
   * @param string $directory
   *   The directory path.
   * @param int $mode
   *   The mode, permissions, the directory should have.
   *
   * @return bool
   *   TRUE if the directory exists or has been created, FALSE otherwise.
   */
  private function createDirectory($directory, $mode = 0777) {
    // If the directory exists already, there's nothing to do.
    if (\is_dir($directory)) {
      return TRUE;
    }

    // If the parent directory doesn't exist, try to create it.
    $parent_exists = \is_dir($parent = dirname($directory));
    if (!$parent_exists) {
      $parent_exists = $this->createDirectory($parent, $mode);
    }

    // If parent exists, try to create the directory and ensure to set its
    // permissions, because mkdir() obeys the umask of the current process.
    if ($parent_exists) {
      // We hide warnings and ignore the return because there may have been a
      // race getting here and the directory could already exist.
      @\mkdir($directory);
      // Only try to chmod() if the subdirectory could be created.
      if (\is_dir($directory)) {
        // Avoid writing permissions if possible.
        if (\fileperms($directory) !== $mode) {
          return @\chmod($directory, $mode);
        }
        return TRUE;
      }
      else {
        // Something failed and the directory doesn't exist.
        \trigger_error('mkdir(): Permission Denied', E_USER_WARNING);
      }
    }
    return FALSE;
  }


  /**
   * Returns the contents of a given file
   * @param string $directory
   * @param string $fileName
   * @return null|RequestInfo|ResponseInterface
   */
  private function loadFileContents(string $directory, string $fileName) {
    if (\file_exists($directory . '/' . $fileName)) {
      return \unserialize(\file_get_contents($directory . '/' . $fileName),
        ['allowed_classes' => [
          RequestInfo::class, ResponseInterface::class,
          DateTime::class, Response::class, Stream::class]]);
    }
    return NULL;
  }
}