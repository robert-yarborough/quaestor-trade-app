<?php

/**
 * @file
 * Preprocessing for the forms.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function template_preprocess_how_can_we_help_form(array &$variables) {
  $variables['title'] = $variables['background'] = [];
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

/**
 * Implements hook_preprocess_HOOK().
 */
function template_preprocess_open_account_form(array &$variables) {
  if ($config = config_pages_config('open_an_account')) {
    if ($config->hasField('field_form_title') && !$config->get('field_form_title')->isEmpty()) {
      $variables['title'] = [
        '#type' => 'processed_text',
        '#text' => $config->get('field_form_title')[0]->value,
        '#format' => $config->get('field_form_title')[0]->format,
      ];
    }
    if ($config->hasField('field_description') && !$config->get('field_description')->isEmpty()) {
      $variables['description'] = [
        '#type' => 'processed_text',
        '#text' => $config->get('field_description')[0]->value,
        '#format' => $config->get('field_description')[0]->format,
      ];
    }
  }
}
