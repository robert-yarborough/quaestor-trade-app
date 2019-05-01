<?php

namespace Drupal\q8_quiz\Validator;

/**
 * Interface ValidatorInterface.
 *
 * @package Drupal\ms_ajax_form_example\Validator
 */
interface ValidatorInterface {

  /**
   * Returns bool indicating if validation is ok.
   */
  public function validates($value);

  /**
   * Returns error message.
   */
  public function getErrorMessage();

}
