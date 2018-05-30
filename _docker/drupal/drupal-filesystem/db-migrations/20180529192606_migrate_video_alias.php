<?php

use Phinx\Migration\AbstractMigration;

class MigrateVideoAlias extends AbstractMigration
{
  /**
   * @inheritDoc
   */
  public function up() {
    $this->execute("UPDATE lightning_url_alias SET alias = REPLACE(alias, 'video', 'videos') WHERE alias LIKE '/video/%'");
  }

  /**
   * @inheritDoc
   */
  public function down() {
    $this->execute("UPDATE lightning_url_alias SET alias = REPLACE(alias, 'videos', 'video') WHERE alias LIKE '/videos/%'");
  }
}
