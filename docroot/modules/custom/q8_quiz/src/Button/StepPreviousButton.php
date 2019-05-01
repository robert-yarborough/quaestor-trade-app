<?php

namespace Drupal\q8_quiz\Button;

/**
 * Class StepOneNextButton.
 *
 * @package Drupal\q8_quiz\Button
 */
class StepPreviousButton extends BaseButton {

  /**
   * {@inheritdoc}
   */
  public function getKey() {
    return 'previous';
  }

  /**
   * {@inheritdoc}
   */
  public function build($step_id) {
    return [
      '#type' => 'submit',
      '#value' => t('Previous'),
      '#goto_step' => $step_id - 1,
      '#skip_validation' => TRUE,
    ];
  }

}
