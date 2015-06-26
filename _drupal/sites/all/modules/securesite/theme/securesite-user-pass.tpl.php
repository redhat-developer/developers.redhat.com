<?php

/**
 * @file
 * Template for Secure Site password reset form.
 *
 * @see template_preprocess_securesite_user_pass()
 */
?>
<h1><?php print t('Password reset') ?></h1>
<p><?php print $title ?></p>
<?php print drupal_render($form['name']); ?>
<?php print drupal_render($form['submit']); ?>
<?php print drupal_render_children($form) ?>
