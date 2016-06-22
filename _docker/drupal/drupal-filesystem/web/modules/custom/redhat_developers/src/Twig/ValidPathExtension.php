<?php

/**
 * @file
 * Contains \Drupal\redhat_developers\Twig\ValidPathExtension.
 */

namespace Drupal\redhat_developers\Twig;

class ValidPathExtension extends \Twig_Extension {

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName() {
        return 'valid_path';
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions() {
        return array(
            new \Twig_SimpleFunction('valid_path', array($this, 'valid_path')));
    }

    /**
     * Function that checks if a provided link is a valid path.
     * @param string $path_to_check link to validate
     */
    public function valid_path(string $path_to_check) {
        \Drupal::logger('redhat_developers')->debug("path to check: @path",
            array('@path' => $path_to_check));
        return \Drupal::service('path.validator')->isValid($path_to_check);
    }
}