<?php

/**
 * @file
 * Preprocessing for the forms.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function template_preprocess_how_can_we_help_form(array &$variables) {
  if ($config = config_pages_config('overview_page')) {
    if ($config->hasField('field_title') && !$config->get('field_title')->isEmpty()) {
      $variables['title'] = [
        '#type' => 'processed_text',
        '#text' => $config->get('field_title')[0]->value,
        '#format' => $config->get('field_title')[0]->format,
      ];
    }
    if ($config->hasField('field_title_background') && !$config->get('field_title_background')->isEmpty()) {
      $variables['background'] = $config->get('field_title_background')->view('default')[0];
    }
  }
}
