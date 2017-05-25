<?php

use Phinx\Migration\AbstractMigration;

class VideoMigration extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * http://docs.phinx.org/en/latest/migrations.html#the-abstractmigration-class
     *
     * The following commands can be used in this method and Phinx will
     * automatically reverse them when rolling back:
     *
     *    createTable
     *    renameTable
     *    addColumn
     *    renameColumn
     *    addIndex
     *    addForeignKey
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change()
    {
        $this->adapter->beginTransaction();
            $this->execute('CREATE TEMPORARY TABLE video_id (  nid INT(10),  INDEX(nid))AS  SELECT SUBSTR(source, 7) AS nid FROM `url_alias` WHERE alias LIKE "/video%";');
            $this->execute('DELETE FROM `node_field_revision` WHERE nid IN (SELECT nid FROM video_id);');
            $this->execute('DELETE FROM `node__body` WHERE entity_id IN (SELECT nid FROM video_id);');
            $this->execute('DELETE FROM `node_field_data` WHERE nid IN (SELECT nid FROM video_id);');
            $this->execute('DELETE FROM `node_revision__body` WHERE entity_id IN (SELECT nid FROM video_id);');
            $this->execute('DELETE FROM `node_revision` WHERE nid IN (SELECT nid FROM video_id);');
            $this->execute('DELETE FROM `url_alias` WHERE alias LIKE "/video%";');
            $this->execute('DROP TABLE video_id;');
        $this->adapter->commitTransaction();
    }
}
