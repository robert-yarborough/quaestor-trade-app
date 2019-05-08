<?php

namespace Drupal\q8_quiz\Button;

/**
 * Class StepOneNextButton.
 *
 * @package Drupal\q8_quiz\Button
 */
class StepNextButton extends BaseButton {

  /**
   * {@inheritdoc}
   */
  public function getKey() {
    return 'next';
  }

  /**
   * {@inheritdoc}
   */
  public function build($steo_id) {
    return [
      '#type' => 'submit',
      '#value' => t('Next'),
      '#goto_step' => $steo_id + 1,
    ];
  }

}
