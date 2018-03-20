<?php

namespace Drupal\rhd_assemblies\Plugin\Field\FieldWidget;

use Drupal\Component\Utility\Html;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Field\Plugin\Field\FieldWidget\OptionsSelectWidget;

/**
 * Plugin implementation of the 'options_select' widget.
 *
 * @FieldWidget(
 *   id = "wpcategories_options_select",
 *   label = @Translation("Wordpress Categories Select list"),
 *   field_types = {
 *     "list_wpcategories",
 *   },
 *   multiple_values = TRUE
 * )
 */
class WpcategoriesOptionsSelectWidget extends OptionsSelectWidget {
}
