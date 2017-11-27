<?php

use Phinx\Migration\AbstractMigration;

class RevisionsNotDisplaying extends AbstractMigration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
      $this->execute('UPDATE lightning_paragraphs_item_field_data SET revision_translation_affected = 1 WHERE revision_translation_affected IS NULL');
      $this->execute('UPDATE lightning_paragraphs_item_revision_field_data SET revision_translation_affected = 1 WHERE revision_translation_affected IS NULL');
      $this->execute('UPDATE lightning_node_field_data SET revision_translation_affected = 1 WHERE revision_translation_affected IS NULL');
      $this->execute('UPDATE lightning_node_field_revision SET revision_translation_affected = 1 WHERE revision_translation_affected IS NULL');
    }

    /**
     * @inheritDoc
     */
    public function down()
    {
      // There isn't anything to do here that wouldn't cause more problems
    }
}
