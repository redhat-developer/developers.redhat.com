<?php
use Drupal\Core\Config\FileStorage;
use Drupal\Core\Config\DatabaseStorage;

$fileStorage = Drupal::service('config.storage.active');
if($fileStorage instanceof FileStorage) {
    $configContent = $fileStorage->listAll();

    $databaseStorage = new DatabaseStorage(Drupal::database(), 'config');
    $databaseStorage->deleteAll();

    foreach ($fileStorage->readMultiple($configContent) as $name => $data) {
        $databaseStorage->write($name, $data);
    }

    echo "Migrated [" . count($databaseStorage->listAll()) ."] configuration items into the database.";
} else {
    echo "The storage configured is not an instance of FileStorage. Failing the migration attempt.";
    exit(1);
}