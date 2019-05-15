<?php

namespace Drupal\q8_quiz\Button;

/**
 * Class BaseButton.
 *
 * @package Drupal\q8_quiz\Button
 */
abstract class BaseButton implements ButtonInterface {

  /**
   * {@inheritdoc}
   */
  public function ajaxify() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function getSubmitHandler() {
    return FALSE;
  }

}
