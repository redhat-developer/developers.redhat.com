<?php

use Phinx\Migration\AbstractMigration;

class FuseOverviewFix extends AbstractMigration
{
  /**
   * @inheritDoc
   */
  public function up() {
    // INSERT INTO drupal.node__field_product_pages
    // (bundle, deleted, entity_id, revision_id, langcode, delta,
    //  field_product_pages_target_id, field_product_pages_target_revision_id)
    // VALUES ('product', 0, 33945, 14329315, 'en', 8, 2075, 62205);
    $fuse_overview_row = [
      'bundle' => 'product',
      'deleted' => 0,
      'entity_id' => 33945,
      'revision_id' => 14329315,
      'langcode' => 'en',
      'delta' => 8,
      'field_product_pages_target_id' => 2075,
      'field_product_pages_target_revision_id' => 62205
    ];

    $table = $this->table('node__field_product_pages');
    $table->insert($fuse_overview_row);
    $table->saveData();

    // Apparently we need to do the same in this table
    $table = $this->table('node_revision__field_product_pages');
    $table->insert($fuse_overview_row);
    $table->saveData();
  }

  /**
   * @inheritDoc
   */
  public function down() {
    $this->execute('DELETE FROM node__field_product_pages WHERE entity_id = 33945 AND revision_id = 14329315 AND delta = 8 AND langcode = "en"');
    $this->execute('DELETE FROM node_revision__field_product_pages WHERE entity_id = 33945 AND revision_id = 14329315 AND delta = 8 AND langcode = "en"');
  }

}
