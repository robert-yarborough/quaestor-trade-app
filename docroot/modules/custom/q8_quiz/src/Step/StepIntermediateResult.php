<?php

namespace Drupal\q8_quiz\Step;

/**
 * Class StepIntermediateResult.
 *
 * @package Drupal\q8_quiz\Step
 */
class StepIntermediateResult extends BaseStep {

  /**
   * Id entity Question.
   *
   * @var int
   */
  private $steps;

  /**
   * {@inheritdoc}
   */
  public function buildStepFormElements() {
    $step_data = $this->getStepData();
    $form = [];

    if (isset($step_data['paragraph'])) {
      $p = $step_data['paragraph'];

      if ($p->hasField('field_description') && !$p->field_description->isEmpty()) {
        $form['description'] = [
          '#type' => 'item',
          '#markup' => $p->field_description->value,
        ];
      }
    }

    // Get intermediate result.
    $service = \Drupal::service('q8_quiz.calculate');
    $question_csv_data = $service->getQuestionCsvDataBySteps($this->steps);
    //$result = $service->calculateQuizResult($question_csv, $first_answer_csv);

    return $form;
  }

  /**
   * Set Steps.
   */
  public function setSteps($steps) {
    $this->steps = $steps;
  }

}
