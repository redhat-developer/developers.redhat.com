<?php

use Phinx\Migration\AbstractMigration;

class RenameRedhatDevelopers extends AbstractMigration
{

    // Update all instances of Red Hat Developers with Red Hat Developer Program
    public function up() {
        $this->execute('UPDATE lightning_node__body SET body_value = REPLACE(body_value, 'Red Hat Developers', 'Red Hat Developer Program')');
    }

    public function down() {
        $this->execute('UPDATE lightning_node__body SET body_value = REPLACE(body_value, 'Red Hat Developer Program', 'Red Hat Developers')');
    }

}
