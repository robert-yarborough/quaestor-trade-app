<?php

namespace Drupal\q8_quiz\Step;

/**
 * Class StepQuestion.
 *
 * @package Drupal\q8_quiz\Step
 */
class StepQuestion extends BaseStep {

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

      if (isset($step_data['sub_steps'])) {
        $form['question'] = [
          '#type' => 'container',
        ];

        $form['question'] += $this->buildSubStepFormElements($step_data['sub_steps']);
      }
    }

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  private function buildSubStepFormElements($paragraphs) {
    $form = [];

    // Create Question Item.
    foreach ($paragraphs as $question) {
      $id = $question->id();

      $form[$id] = [
        '#type' => 'container',
      ];

      // Create Answer Item.
      if ($question->hasField('field_title') && !$question->field_title->isEmpty()) {
        $form[$id]['answer'] = [
          '#type' => 'container',
        ];

        if ($question->hasField('field_paragraphs') && !$question->field_paragraphs->isEmpty()) {
          $answers = $question->field_paragraphs->referencedEntities();

          $answer_option = [];
          foreach ($answers as $answer) {
            if (($answer->hasField('field_answer') && !$answer->field_answer->isEmpty()) &&
              ($answer->hasField('field_answer_rate') && !$answer->field_answer_rate->isEmpty())) {
              $answer_option[$answer->field_answer_rate->value] = $answer->field_answer->value;
            }
          }

          if ($question->hasField('field_question_type') && !$question->field_question_type->isEmpty() && $question->field_question_type->value == 'multi') {
            $form[$id]['answer'] = [
              '#type' => 'checkboxes',
              '#title' => $question->field_title->value,
              '#options' => $answer_option,
              '#attributes' => [
                'class' => [
                  'quiz-multi-question'
                ],
              ],
            ];
          }
          else {
            $form[$id]['answer'] = [
              '#type' => 'radios',
              '#title' => $question->field_title->value,
              '#options' => $answer_option,
              '#attributes' => [
                'class' => [
                  'quiz-single-question'
                ],
              ],
            ];
          }
        }
      }
    }

    return $form;
  }

}
