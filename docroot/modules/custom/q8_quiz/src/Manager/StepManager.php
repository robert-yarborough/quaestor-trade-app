<?php

namespace Drupal\q8_quiz\Manager;

use Drupal\q8_quiz\Button\StepNextButton;
use Drupal\q8_quiz\Button\StepPreviousButton;
use Drupal\q8_quiz\Button\StepFinishButton;

/**
 * Class StepManager.
 *
 * @package Drupal\q8_quiz\Manager
 */
class StepManager {

  /**
   * Multi steps of the form.
   *
   * @var \Drupal\q8_quiz\Step\StepInterface
   */
  protected $steps;

  /**
   * StepManager constructor.
   */
  public function __construct() {
  }

  /**
   * Fetches step from steps property, If it doesn't exist, create step object.
   */
  public function getStep($step_id) {
    // Get class.
    $class = $this->map($this->steps[$step_id]['class']);

    // Init step.
    $step = new $class($this);
    $step->setStep($step_id);
    $step->setStepData($this->steps[$step_id]);

    return $step;
  }

  /**
   * Get all steps.
   */
  public function getAllSteps() {
    return $this->steps;
  }

  /**
   * Set all steps.
   */
  public function setAllSteps($steps) {
    $this->steps = $steps;
  }

  /**
   * Returns buttons on step.
   */
  public function getButtons($step_id) {
    // First Item.
    if ($step_id == 0) {
      return [
        new StepNextButton(),
      ];
    }
    // Last but one Item.
    elseif($step_id == (count($this->steps) - 2)) {
      return [
        new StepPreviousButton(),
        new StepFinishButton(),
      ];
    }
    // Last Item.
    elseif($step_id == (count($this->steps) - 1)) {
      return [];
    }
    else {
      return [
        new StepPreviousButton(),
        new StepNextButton(),
      ];
    }
  }

  /**
   * Map steps to it's class.
   *
   * @param int $step
   *   Step number.
   *
   * @return bool
   *   Return true if exist.
   */
  public function map($step) {
    $map = [
      'StepTesting' => 'Drupal\\q8_quiz\\Step\\StepTesting',
      'StepIntermediateResult' => 'Drupal\\q8_quiz\\Step\\StepIntermediateResult',
      'StepResult' => 'Drupal\\q8_quiz\\Step\\StepResult',
    ];

    return isset($map[$step]) ? $map[$step] : FALSE;
  }

}
