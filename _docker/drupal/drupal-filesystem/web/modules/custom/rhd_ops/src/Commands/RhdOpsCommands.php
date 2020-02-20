<?php

namespace Drupal\rhd_ops\Commands;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drush\Commands\DrushCommands;
use Drush\Log\LogLevel;

/**
 * RHD drush commands.
 */
class RhdOpsCommands extends DrushCommands {

  /**
   * The Config Factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * Constructor.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   */
  public function __construct(ConfigFactoryInterface $config_factory) {
    $this->configFactory = $config_factory;
  }

  /**
   * Makes certain users administrators in pre-prod environments.
   *
   * @param string $user_ids
   *   Space-separated string of user IDs (users) that should have the admin
   *   role in pre-Prod environments.
   *
   * @command rhd_ops:preProdAdmins
   * @aliases rhd_ops:ppadmins
   * @usage rhd_ops:preProdAdmins '1'
   * @usage rhd_ops:preProdAdmins '1 2 3'
   */
  public function preProdAdmins(string $user_ids) {
    // If this is Prod, do nothing.
    if (!$this->isPreProd()) {
      $this->logger()->log(LogLevel::CANCEL, dt('rhd_ops:preProdAdmins will take no action(s) in this environment'));
    }
    // If this is a pre-Prod environment, grant the users with $user_ids the
    // administrator role.
    else {
      $users_changed = [];
      $users_failed = [];
      $entity_type_repository = \Drupal::service('entity_type.repository');
      $entity_type_manager = \Drupal::entityTypeManager();
      $storage = $entity_type_manager->getStorage('user');

      foreach (explode(' ', $user_ids) as $uid) {
        $user = $storage->load($uid);

        // If we can successfully load a User entity, grant that User the
        // administrator role, persist the changes to the User entity and
        // pushes $uid onto $users_changed.
        if ($user) {
          $user->addRole('administrator');
          $user->save();
          $users_changed[] = $uid;
        }
        // Log a warning if we cannot load a User entity for some uid passed in
        // $user_ids and pushes $uid onto $users_failed.
        else {
          $users_failed[] = $uid;
        }
      }

      $this->logPreProdAdmins($users_changed, $users_failed);
    }
  }

  /**
   * Is this a pre-Prod environment?
   *
   * @return bool
   *   Return TRUE if this is a pre-Prod environment, otherwise FALSE.
   */
  private function isPreProd() {
    $environment = $this->configFactory->get('redhat_developers')->get('environment');

    // If we cannot succesfully retrieve the redhat_developers.environment
    // config object, throw an exception.
    if (empty($environment)) {
      throw new \Exception('rhd_ops:preProdAdmin failed because the redhat_developers.environment config object could not be retrieved.');
    }
    else {
      if ($environment != 'prod') {
        return TRUE;
      }

      return FALSE;
    }
  }

  /**
   * Generates a log entry for the execution of rhd_ops:preProdAdmins.
   *
   * @param array $users_changed
   *   An array of uids of users that were successfully made admins.
   * @param array $users_failed
   *   An array of uids of users that failed to be made admins.
   */
  private function logPreProdAdmins(array $users_changed, array $users_failed) {
    $success_message = '';
    $failure_message = '';

    if ($users_changed) {
      $success_message .= 'rhd_ops:preProdAdmins successfully assigned the administrator role to users with uids: @users_changed.';
    }
    if ($users_failed) {
      $failure_message .= 'rhd_ops:preProdAdmins failed to assign the Administrator role to user(s) with uid(s): @users_failed because a User could not be retrieved by those uid(s).';
    }

    // Remove any empty messages/values.
    $messages = implode(' ', array_filter([$success_message, $failure_message]));

    $this->logger()->log(LogLevel::OK, dt($messages, [
      '@users_changed' => implode(' ', $users_changed) ?: 'n/a',
      '@users_failed' => implode(' ', $users_failed) ?: 'n/a',
    ]));
  }

}
