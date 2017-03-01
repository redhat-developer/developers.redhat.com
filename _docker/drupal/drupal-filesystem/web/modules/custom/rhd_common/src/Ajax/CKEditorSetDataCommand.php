<?php
/**
 * Created by PhpStorm.
 * User: jporter
 * Date: 2/3/17
 * Time: 5:31 PM
 */

namespace Drupal\rhd_common\Ajax;

use Drupal\Core\Ajax\CommandInterface;


class CKEditorSetDataCommand implements CommandInterface
{
    /** @var string */
    protected $data = '';

    /** @var string */
    protected $editor = '';

    /**
     * CKEditorSetDataCommand constructor.
     * @param null $data
     */
    public function __construct($data, $editor)
    {
        $this->data = $data;
        $this->editor = $editor;
    }


    /**
     * Return an array to be run through json_encode and sent to the client.
     */
    public function render()
    {
        return [
          'command' => 'ckeditorSetData',
          'data' => $this->data,
          'editor' => $this->editor
        ];
    }
}