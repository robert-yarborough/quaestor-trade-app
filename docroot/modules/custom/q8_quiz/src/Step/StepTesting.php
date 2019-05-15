<?php

namespace Drupal\q8_quiz\Step;

/**
 * Class StepTesting.
 *
 * @package Drupal\q8_quiz\Step
 */
class StepTesting extends BaseStep {

  /**
   * {@inheritdoc}
   */
  public function buildStepFormElements() {
    $step_data = $this->getStepData();
    $form = [];

    if (isset($step_data['paragraph'])) {
      $p = $step_data['paragraph'];

      $form['step_testing'] = [
        '#type' => 'container',
        '#attributes' => [
          'class' => 'q8-quiz-step-testing',
        ],
      ];

      if ($p->hasField('field_description') && !$p->field_description->isEmpty()) {
        $form['step_testing']['description'] = [
          '#type' => 'item',
          '#markup' => $p->field_description->value,
        ];
      }

      if ($p->hasField('field_image') && !$p->field_image->isEmpty()) {
        $field_image = $p->field_image->referencedEntities();
        $path = file_create_url($field_image[0]->getFileUri());

        $form['step_testing']['image'] = [
          '#type' => 'item',
          '#markup' => $path,
        ];
      }
    }

    return $form;
  }

}
