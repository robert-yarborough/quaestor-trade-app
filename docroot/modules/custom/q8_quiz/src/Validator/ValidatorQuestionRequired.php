<?php

namespace Drupal\q8_quiz\Validator;

/**
 * Class ValidatorRequired.
 *
 * @package Drupal\ms_ajax_form_example\Validator
 */
class ValidatorQuestionRequired extends BaseValidator {

  /**
   * {@inheritdoc}
   */
  public function validates($value) {
    return is_array($value['weight']) ? !empty(array_filter($value['weight'])) : !empty($value['weight']);
  }

}
