<?php

namespace Drupal\q8_quiz\Validator;

/**
 * Class ValidatorRequired.
 *
 * @package Drupal\ms_ajax_form_example\Validator
 */
class ValidatorRequired extends BaseValidator {

  /**
   * {@inheritdoc}
   */
  public function validates($value) {
    return is_array($value) ? !empty(array_filter($value)) : !empty($value);
  }

}
