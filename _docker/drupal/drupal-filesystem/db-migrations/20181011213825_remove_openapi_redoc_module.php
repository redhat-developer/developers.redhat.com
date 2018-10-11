<?php

use Phinx\Migration\AbstractMigration;

class RemoveOpenapiRedocModule extends AbstractMigration
{
    /**
     * Migrate up.
     */
    public function up()
    {
        $this->execute("DELETE FROM lightning_key_value WHERE collection='system.schema' AND name='openapi_redoc';");
    }

    /**
     * Migrate down.
     */
    public function down()
    {
        $this->execute("INSERT INTO lightning_key_value (collection, name) VALUES ('system.schema', 'openapi_redoc');");
    }
}
