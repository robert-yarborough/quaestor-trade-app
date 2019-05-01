<?php

namespace Drupal\q8_quiz\Step;

/**
 * Class BaseStep.
 *
 * @package Drupal\q8_quiz\Step
 */
abstract class BaseStep implements StepInterface {

  /**
   * Multi steps of the form.
   *
   * @var StepInterface
   */
  protected $step;

  /**
   * Step data of the form.
   *
   * @var StepInterface
   */
  protected $stepData;

  /**
   * Values of element.
   *
   * @var array
   */
  protected $values;

  /**
   * BaseStep constructor.
   */
  public function __construct() {}

  /**
   * {@inheritdoc}
   */
  public function getStep() {
    return $this->step;
  }

  /**
   * {@inheritdoc}
   */
  public function setStep($step_id) {
    $this->step = $step_id;
  }

  /**
   * {@inheritdoc}
   */
  public function getStepData() {
    return $this->stepData;
  }

  /**
   * {@inheritdoc}
   */
  public function setStepData($step_data) {
    $this->stepData = $step_data;
  }

  /**
   * {@inheritdoc}
   */
  public function setValues($values) {
    $this->values = $values;
  }

  /**
   * {@inheritdoc}
   */
  public function getValues() {
    return $this->values;
  }

  /**
   * {@inheritdoc}
   */
  public function getFieldNames() {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getFieldsValidators() {
    return [];
  }

}
