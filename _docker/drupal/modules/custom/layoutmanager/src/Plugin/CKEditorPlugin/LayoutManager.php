<?php

/**
 * @file
 * Definition of \Drupal\ckeditor\Plugin\CKEditorPlugin\LayoutManager.
 */

namespace Drupal\layoutmanager\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "LayoutManager" plugin.
 *
 * @CKEditorPlugin(
 *   id = "layoutmanager",
 *   label = @Translation("LayoutManager"),
 *   module = "ckeditor"
 * )
 */
class LayoutManager extends CKEditorPluginBase {
  /**
   * Gets a path to module.
   *
   * @return string
   *   Full path to module.
   */
  private function path() {
    return drupal_get_path('module', 'layoutmanager');
  }

  /**
   * Implements CKEditorPluginInterface::getDependencies().
   */
  public function getDependencies(Editor $editor) {
    return array('basewidget');
  }

  /**
   * Implements CKEditorPluginInterface::getLibraries().
   */
  public function getLibraries(Editor $editor) {
    return array();
  }

  /**
   * Implements CKEditorPluginInterface::isInternal().
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * Implements CKEditorPluginInterface::getFile().
   */
  public function getFile() {
    return $this->path() . "/js/plugins/layoutmanager/plugin.js";
  }

  /**
   * Implements CKEditorPluginButtonsInterface::getButtons().
   */
  public function getButtons() {
    return array(
      'AddLayout' => array(
        'label' => t('Layouts'),
        'image' => $this->path() . '/js/plugins/layoutmanager/icons/addlayout.png',
      ),
    );
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getConfig().
   */
  public function getConfig(Editor $editor) {
    return array();
  }

}

