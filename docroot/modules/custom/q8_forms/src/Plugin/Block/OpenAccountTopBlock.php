<?php

namespace Drupal\q8_forms\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'OpenAccountBlock' block.
 *
 * @Block(
 *  id = "open_account_top_block",
 *  admin_label = @Translation("Open account top block"),
 * )
 */
class OpenAccountTopBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    // Load config.
    $config = config_pages_config('open_an_account');

    // Fallback if empty.
    if (empty($config)) {
      return [
        '#theme' => 'open_account_page_top',
        '#title' => $this->t('Open an Account'),
      ];
    }

    // Get fields from config form.
    $title = $background = '';
    if ($config->hasField('field_title') && !$config->get('field_title')->isEmpty()) {
      $title = [
        '#type' => 'processed_text',
        '#text' => $config->get('field_title')[0]->value,
        '#format' => $config->get('field_title')[0]->format,
      ];
    }
    if ($config->hasField('field_title_background') && !$config->get('field_title_background')->isEmpty()) {
      $background = $config->get('field_title_background')->view('default')[0];
    }

    return [
      '#theme' => 'open_account_page_top',
      '#title' => $title,
      '#background' => $background,
    ];
  }

}
