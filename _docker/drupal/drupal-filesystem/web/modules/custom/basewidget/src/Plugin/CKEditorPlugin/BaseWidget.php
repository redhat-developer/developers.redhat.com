<?php

/**
 * @file
 * Definition of \Drupal\ckeditor\Plugin\CKEditorPlugin\BaseWidget.
 */

namespace Drupal\basewidget\Plugin\CKEditorPlugin;

use Drupal\Core\Plugin\PluginBase;
use Drupal\ckeditor\CKEditorPluginInterface;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "BaseWidget" plugin.
 *
 * @CKEditorPlugin(
 *   id = "basewidget",
 *   label = @Translation("basewidget"),
 *   module = "ckeditor"
 * )
 */
class BaseWidget extends PluginBase implements CKEditorPluginInterface {
  /**
   * Gets a path to module.
   *
   * @return string
   *   Full path to module.
   */
  private function path() {
    return drupal_get_path('module', 'basewidget');
  }

  /**
   * Implements CKEditorPluginInterface::getDependencies().
   */
  public function getDependencies(Editor $editor) {
    return array();
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
    return $this->path() . "/js/plugins/basewidget/plugin.js";
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getConfig().
   */
  public function getConfig(Editor $editor) {
    return array();
  }

}

