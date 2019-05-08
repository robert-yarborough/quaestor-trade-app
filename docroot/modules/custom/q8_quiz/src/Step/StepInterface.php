<?php

namespace Drupal\q8_quiz\Step;

/**
 * Interface StepInterface.
 *
 * @package Drupal\q8_quiz\Step
 */
interface StepInterface {

  /**
   * Gets the step.
   */
  public function getStep();

  /**
   * Sets the step.
   */
  public function setStep($step_id);

  /**
   * Gets the step data.
   */
  public function getStepData();

  /**
   * Sets the step data.
   */
  public function setStepData($step_data);

  /**
   * Gets filled out values of step.
   */
  public function getValues();

  /**
   * Sets filled out values of step.
   */
  public function setValues($values);

  /**
   * Returns a renderable form array that defines a step.
   */
  public function buildStepFormElements();

  /**
   * All field validators.
   *
   * @returns array of fields with their validation requirements.
   */
  public function getFieldsValidators();

  /**
   * All fields name.
   *
   * @returns array of all field names.
   */
  public function getFieldNames();

}
