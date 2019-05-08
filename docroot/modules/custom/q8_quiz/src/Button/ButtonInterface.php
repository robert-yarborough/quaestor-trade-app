<?php

namespace Drupal\q8_quiz\Button;

/**
 * Interface ButtonInterface.
 *
 * @package Drupal\q8_quiz\Button
 */
interface ButtonInterface {

  /**
   * Get the key.
   *
   * @returns button key.
   */
  public function getKey();

  /**
   * Build the button.
   *
   * @returns renderable array.
   */
  public function build($step_id);

  /**
   * Set the button if it is ajaxified or not.
   *
   * @returns if button has to be ajaxified.
   */
  public function ajaxify();

  /**
   * Override submit callback.
   */
  public function getSubmitHandler();

}
