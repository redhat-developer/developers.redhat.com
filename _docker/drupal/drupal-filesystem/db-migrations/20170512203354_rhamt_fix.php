<?php

use Phinx\Migration\AbstractMigration;

class RhamtFix extends AbstractMigration
{
  /**
   * @inheritDoc
   */
  public function up() {
    $this->execute('UPDATE node_field_data SET _deleted = 1 WHERE nid IN (37115, 37135)');
    $this->execute('UPDATE node_field_revision SET _deleted = 1 WHERE nid IN (37115, 37135)');
    $this->execute("UPDATE node__field_url_product_name SET field_url_product_name_value = 'rhamt' WHERE entity_id = 37375");
    $this->execute("UPDATE node_revision__field_url_product_name SET field_url_product_name_value = 'rhamt' WHERE entity_id = 37375");
    $this->execute("UPDATE node_field_revision SET moderation_state = 'published' WHERE nid = 37375;");
    $this->execute("UPDATE node_field_data SET moderation_state = 'published' WHERE nid = 37375;");
  }

  /**
   * @inheritDoc
   */
  public function down() {
    $this->execute('UPDATE node_field_data SET _deleted = 0 WHERE nid IN (37135)'); // 37115 was also broken, or deleted before, leaved it deleted
    $this->execute('UPDATE node_field_revision SET _deleted = 0 WHERE nid IN (37135)');
    $this->execute("UPDATE node__field_url_product_name SET field_url_product_name_value = 'rhamt-new' WHERE entity_id = 37375");
    $this->execute("UPDATE node_revision__field_url_product_name SET field_url_product_name_value = 'rhamt-new' WHERE entity_id = 37375");
    $this->execute("UPDATE node_field_revision SET moderation_state = 'draft' WHERE nid = 37375;");
    $this->execute("UPDATE node_field_data SET moderation_state = 'draft' WHERE nid = 37375;");
  }

}
