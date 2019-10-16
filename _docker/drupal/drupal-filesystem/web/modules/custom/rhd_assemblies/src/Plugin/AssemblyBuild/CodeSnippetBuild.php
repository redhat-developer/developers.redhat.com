<?php

namespace Drupal\rhd_assemblies\Plugin\AssemblyBuild;

use Drupal\assembly\Entity\Assembly;
use Drupal\assembly\Plugin\AssemblyBuildBase;
use Drupal\assembly\Plugin\AssemblyBuildInterface;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Entity\Display\EntityViewDisplayInterface;
use Drupal\Core\Url;
use Drupal\node\Entity\Node;

/**
 * Provides a formatted code snippet.
 *
 * @AssemblyBuild(
 *   id = "code_snippet",
 *   types = { "code_snippet" },
 *   label = @Translation("Code Snippet")
 * )
 */
class CodeSnippetBuild extends AssemblyBuildBase implements AssemblyBuildInterface {

  /**
   * {@inheritdoc}
   */
  public function build(array &$build, EntityInterface $entity, EntityViewDisplayInterface $display, $view_mode) {
    // Verify that the field isset before retrieving the value.
    if (!empty($build['field_code']['#items'])) {
      if (!$build['field_code']['#items']->isEmpty()) {
        $field_code = $build['field_code']['#items']->getValue()[0]['value'];
        $build['code'] = $field_code;
        $build['#attached']['library'][] = 'rhdp2/highlight-js';
      }
    }
    // Verify that the field isset before retrieving the value.
    if (!empty($build['field_programming_language']['#items'])) {
      if (!$build['field_programming_language']['#items']->isEmpty()) {
        $language = $build['field_programming_language']['#items']->getValue()[0]['value'];
        $build['language'] = isset($language) ? $language : '';
      }
    }

    return $build;
  }

}
