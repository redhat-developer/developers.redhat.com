(function ($, Drupal, drupalSettings, CKEDITOR) {

    'use strict';

    /**
     * Add new command for setting the data of a ckeditor instance.
     */
    Drupal.AjaxCommands.prototype.ckeditorSetData = function (ajax, response, status) {
        CKEDITOR.instances[response.editor].setData(response.data);
    };
})(jQuery, Drupal, drupalSettings, CKEDITOR);