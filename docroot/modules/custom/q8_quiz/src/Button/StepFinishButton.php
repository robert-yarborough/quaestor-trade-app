<?php

namespace Drupal\q8_quiz\Button;

/**
 * Class StepFinishButton.
 *
 * @package Drupal\q8_quiz\Button
 */
class StepFinishButton extends BaseButton {

  /**
   * {@inheritdoc}
   */
  public function getKey() {
    return 'finish';
  }

  /**
   * {@inheritdoc}
   */
  public function build($steo_id) {
    return [
      '#type' => 'submit',
      '#value' => t('Finish'),
      '#goto_step' => $steo_id + 1,
    ];
  }

}
