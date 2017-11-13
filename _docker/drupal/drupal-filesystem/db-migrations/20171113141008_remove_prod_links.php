<?php

use Phinx\Migration\AbstractMigration;

class RemoveProdLinks extends AbstractMigration
{
    public function up() {
        $this->execute('UPDATE node_revision__body SET body_value = REPLACE(body_value, \'http://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
        $this->execute('UPDATE node__body SET body_value = REPLACE(body_value, \'http://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
    }
}
