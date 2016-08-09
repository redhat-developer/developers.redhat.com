<?php

/**
 * @file
 * Contains \Drupal\redhat_developers\Twig\ValidPathExtension.
 */

namespace Drupal\redhat_developers\Twig;

class RedHatDevelopersTagsExtension extends \Twig_Extension {

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName() {
        return 'red_hat_developers_tags';
    }

    /**
     * {@inheritdoc}
     */
    public function getFunctions() {
        return array(
            new \Twig_SimpleFunction('valid_path', array($this, 'valid_path')),
            new \Twig_SimpleFunction('body_classes', array($this, 'body_classes')),
            new \Twig_SimpleFunction('active_page_class', array($this, 'active_page_class')));
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

    public function active_page_class(string $current_path) {
        $request_uri = \Drupal::request()->getUri();
        return strpos($request_uri, $current_path) !== FALSE ? 'active' : '';
    }

    public function body_classes() {
        $path = str_replace('/', '', \Drupal::request()->getPathInfo());
        $classes = array();

        if (empty($path)) {
            $classes[] = 'fullbleed';
            $classes[] = 'home';
        } else {
            $classes[] = $path;
        }

        return $classes;
    }
}