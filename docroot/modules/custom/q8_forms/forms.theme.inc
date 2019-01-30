<?php

/**
 * @file
 * Preprocessing for the forms.
 */

/**
 * Implements hook_preprocess_HOOK().
 */
function template_preprocess_how_can_we_help_form(array &$variables) {
  $variables['search_overview'] = $variables['title'] = $variables['background'] = [];
  // Load page title and background for overview pages.
  if ($config = config_pages_config('overview_page')) {
    if ($config->hasField('field_title') && !$config->get('field_title')->isEmpty()) {
      $variables['title'] = [
        '#type' => 'processed_text',
        '#text' => $config->get('field_title')[0]->value,
        '#format' => $config->get('field_title')[0]->format,
      ];
    }
    // Add background only to the overview page.
    if (
      \Drupal::routeMatch()->getRouteName() !== 'page_manager.page_view_overview_search_overview_search-panels_variant-0'
      && $config->hasField('field_title_background')
      && !$config->get('field_title_background')->isEmpty()
    ) {
      $variables['background'] = $config->get('field_title_background')->view('default')[0];
    }
    else {
      // Special parameter for search overview.
      $variables['search_overview'] = 'search-overview';
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
