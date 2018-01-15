<?php

use Phinx\Migration\AbstractMigration;

class RemoveProdLinks extends AbstractMigration
{
    public function up() {
        $this->execute('UPDATE lightning_node__body SET body_value = REPLACE(body_value, \'http://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
        $this->execute('UPDATE lightning_node__body SET body_value = REPLACE(body_value, \'https://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
        $this->execute('UPDATE lightning_node_revision__body SET body_value = REPLACE(body_value, \'http://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
        $this->execute('UPDATE lightning_node_revision__body SET body_value = REPLACE(body_value, \'https://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
        $this->execute('UPDATE lightning_paragraph__field_overview_main_content set field_overview_main_content_value = REPLACE(field_overview_main_content_value,\'https://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
        $this->execute('UPDATE lightning_paragraph__field_overview_main_content set field_overview_main_content_value = REPLACE(field_overview_main_content_value,\'https://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
        $this->execute('UPDATE lightning_paragraph_revision__field_overview_main_content set field_overview_main_content_value = REPLACE(field_overview_main_content_value,\'https://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
        $this->execute('UPDATE lightning_paragraph_revision__field_overview_main_content set field_overview_main_content_value = REPLACE(field_overview_main_content_value,\'http://developer-drupal.web.prod.ext.phx2.redhat.com\', \'\')');
    }
}
