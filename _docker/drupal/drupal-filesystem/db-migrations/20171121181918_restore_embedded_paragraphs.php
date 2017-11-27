<?php

use Phinx\Migration\AbstractMigration;

class RestoreEmbeddedParagraphs extends AbstractMigration
{
  /**
   * @inheritdoc
   */
  public function up()
  {
    $this->execute('INSERT INTO lightning_paragraph_r__0ca8410f1f SELECT * FROM paragraph_r__6f2dd98480');
    $this->execute('INSERT INTO lightning_paragraph_r__b9da1b8cc0 SELECT * FROM paragraph_r__c886f1e8cf');
    $this->execute('INSERT INTO lightning_paragraph_r__f668e2da93 SELECT * FROM paragraph_r__da9017ab2b');
    $this->execute('INSERT INTO lightning_paragraph_r__e01ba33653 SELECT * FROM paragraph_r__dd681f0e75');
  }

  /**
   * @inheritDoc
   */
  public function down()
  {
    // There isn't anything to do here that wouldn't cause more problems
  }
}
