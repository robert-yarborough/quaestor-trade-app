<?php

namespace Drupal\q8_quiz\Step;

/**
 * Class StepResult.
 *
 * @package Drupal\q8_quiz\Step
 */
class StepResult extends BaseStep {

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

    return $form;
  }

}
