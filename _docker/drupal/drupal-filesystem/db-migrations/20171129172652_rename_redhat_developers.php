<?php

use Phinx\Migration\AbstractMigration;

class RenameRedhatDevelopers extends AbstractMigration
{

    // Update all instances of Red Hat Developers with Red Hat Developer Program
    public function up() {
        $this->execute('UPDATE lightning_node__body SET body_value = REPLACE(body_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node_field_data SET title = REPLACE(title, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node__field_speakers SET field_speakers_value = REPLACE(field_speakers_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node_revision__field_speakers SET field_speakers_value = REPLACE(field_speakers_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node__body SET body_summary = REPLACE(body_summary, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node__field_content_author SET field_content_author_value = REPLACE(field_content_author_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_paragraph__field_body SET field_body_value = REPLACE(field_body_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_paragraph__field_overview_main_content SET field_overview_main_content_value = REPLACE(field_overview_main_content_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_paragraph_revision__field_body SET field_body_value = REPLACE(field_body_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_paragraph_revision__field_overview_main_content SET field_overview_main_content_value = REPLACE(field_overview_main_content_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node_field_revision SET title = REPLACE(title, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node_revision__field_blue_card_description SET field_blue_card_description_value = REPLACE(field_blue_card_description_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node_revision__field_description SET field_description_value = REPLACE(field_description_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node_revision__field_content_author SET field_content_author_value = REPLACE(field_content_author_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node_revision__field_containers_short_summary SET field_containers_short_summary_value = REPLACE(field_containers_short_summary_value, "Red Hat Developers", "Red Hat Developer Program")');
        $this->execute('UPDATE lightning_node_revision__field_cheat_sheet_author SET field_cheat_sheet_author_value = REPLACE(field_cheat_sheet_author_value, "Red Hat Developers", "Red Hat Developer Program")');

        $this->execute("UPDATE lightning_node_field_revision SET moderation_state = 'published', status = 1 WHERE (moderation_state = 'draft' OR moderation_state IS NULL) AND UPPER(title) LIKE '%BOM%'");
        $this->execute("UPDATE lightning_node_field_data SET moderation_state = 'published', status = 1 WHERE moderation_state IS NULL AND UPPER(title) LIKE '%BOM%'");
        $this->execute("UPDATE lightning_node_field_data SET moderation_state = 'published', status = 1 WHERE moderation_state IS NULL AND UPPER(title) LIKE 'JAVA EE 6%'");
    }

    public function down() {
        $this->execute('UPDATE lightning_node__body SET body_value = REPLACE(body_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node_field_data SET title = REPLACE(title, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node__field_speakers SET field_speakers_value = REPLACE(field_speakers_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node_revision__field_speakers SET field_speakers_value = REPLACE(field_speakers_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node__body SET body_summary = REPLACE(body_summary, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node__field_content_author SET field_content_author_value = REPLACE(field_content_author_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_paragraph__field_body SET field_body_value = REPLACE(field_body_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_paragraph__field_overview_main_content SET field_overview_main_content_value = REPLACE(field_overview_main_content_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_paragraph_revision__field_body SET field_body_value = REPLACE(field_body_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_paragraph_revision__field_overview_main_content SET field_overview_main_content_value = REPLACE(field_overview_main_content_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node_field_revision SET title = REPLACE(title, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node_revision__field_blue_card_description SET field_blue_card_description_value = REPLACE(field_blue_card_description_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node_revision__field_description SET field_description_value = REPLACE(field_description_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node_revision__field_content_author SET field_content_author_value = REPLACE(field_content_author_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node_revision__field_containers_short_summary SET field_containers_short_summary_value = REPLACE(field_containers_short_summary_value, "Red Hat Developer Program", "Red Hat Developers")');
        $this->execute('UPDATE lightning_node_revision__field_cheat_sheet_author SET field_cheat_sheet_author_value = REPLACE(field_cheat_sheet_author_value, "Red Hat Developer Program", "Red Hat Developers")');

    }

}
