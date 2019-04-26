<?php

namespace Drupal\q8_quiz\Manager;

use Drupal\q8_quiz\Step\StepInterface;
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
   * @var
   */
  protected $progressBar;

  /**
   * StepManager constructor.
   */
  public function __construct() {
  }

  /**
   * Fetches step from steps property.
   */
  public function getStep($step_id) {
    if (isset($this->steps[$step_id])) {
      // If step was already initialized, use that step.
      // Chance is there are values stored on that step.
      $step = $this->steps[$step_id];
      return $step;
    }

    return NULL;
  }

  /**
   * Set step from steps property.
   *
   * @param \Drupal\q8_quiz\Step\StepInterface $step
   *   Step of the form.
   * @param $step_id
   *    Step ID.
   */
  public function setStep(StepInterface $step, $step_id) {
    $this->steps[$step_id] = $step;
  }

  /**
   * Add a step to the steps property.
   *
   * @param \Drupal\q8_quiz\Step\StepInterface $step
   *   Step of the form.
   */
  public function addStep(StepInterface $step) {
    $this->steps[$step->getStep()] = $step;
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
   * Get progress bar.
   */
  public function getProgressBar() {
    return $this->progressBar;
  }

  /**
   * Set progress bar.
   */
  public function setProgressBar($progress_bar) {
    $this->progressBar = $progress_bar;
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
   * Map steps for classes.
   *
   * @param int $step
   *   Step class name.
   *
   * @return bool
   *   Return true if exist.
   */
  public function map($step_class_name) {
    $map = [
      'StepTesting' => 'Drupal\\q8_quiz\\Step\\StepTesting',
      'StepIntermediateResult' => 'Drupal\\q8_quiz\\Step\\StepIntermediateResult',
      'StepResult' => 'Drupal\\q8_quiz\\Step\\StepResult',
      'StepQuestion' => 'Drupal\\q8_quiz\\Step\\StepQuestion',
    ];

    return isset($map[$step_class_name]) ? $map[$step_class_name] : FALSE;
  }

}
