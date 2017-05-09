<?php

/**
 * @file
 * Contains \Acquia\Lightning\ScriptHandler.
 */

namespace Acquia\Lightning;

use Composer\Script\Event;
use Composer\Util\ProcessExecutor;

class ScriptHandler {

  /**
   * Moves front-end libraries to Lightning's installed directory.
   *
   * @param \Composer\Script\Event $event
   *   The script event.
   */
  public static function deployLibraries(Event $event) {
    $extra = $event->getComposer()->getPackage()->getExtra();

    if (isset($extra['installer-paths'])) {
      foreach ($extra['installer-paths'] as $path => $criteria) {
        if (array_intersect(['drupal/lightning', 'type:drupal-profile'], $criteria)) {
          $lightning = $path;
        }
      }
      if (isset($lightning)) {
        $lightning = str_replace('{$name}', 'lightning', $lightning);

        $executor = new ProcessExecutor($event->getIO());
        $output = NULL;
        $executor->execute('npm run install-libraries', $output, $lightning);
      }
    }

//    // Prepare the settings file for installation
//    if (!$fs->exists($root . '/sites/default/settings.php')) {
//      $fs->copy($root . '/sites/default/default.settings.php', $root . '/sites/default/settings.php');
//      $fs->chmod($root . '/sites/default/settings.php', 0666);
//      $event->getIO()->write("Create a sites/default/settings.php file with chmod 0666");
//    }
//
//    // Prepare the services file for installation
//    if (!$fs->exists($root . '/sites/default/services.yml')) {
//      $fs->copy($root . '/sites/default/default.services.yml', $root . '/sites/default/services.yml');
//      $fs->chmod($root . '/sites/default/services.yml', 0666);
//      $event->getIO()->write("Create a sites/default/services.yml file with chmod 0666");
//    }
//
//    // Create the files directory with chmod 0777
//    if (!$fs->exists($root . '/sites/default/files')) {
//      $oldmask = umask(0);
//      $fs->mkdir($root . '/sites/default/files', 0777);
//      umask($oldmask);
//      $event->getIO()->write("Create a sites/default/files directory with chmod 0777");
//    }
  }
}

