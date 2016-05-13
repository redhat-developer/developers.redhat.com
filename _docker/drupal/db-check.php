<?php
/**
 * Basic database connectivity test
 *
 * @category Script
 * @package  None
 * @author   Jason Porter <jporter@redhat.com>
 * @license  http://example.com None
 * @link     None
 */
try {
    $DBH = new PDO(
        "mysql:host=drupalmysql;dbname=$_ENV[DB_NAME]",
        $_ENV[DB_USER], $_ENV[DB_PASSWORD]
    );
    $DBH->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    exit(1);
}
?>
