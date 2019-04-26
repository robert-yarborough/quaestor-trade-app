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

    // Create Question Item.
    if (isset($step_data['paragraph'])) {
      $p = $step_data['paragraph'];
      $pid = $p->id();

      // Create Answer Item.
      if ($p->hasField('field_title') && !$p->field_title->isEmpty()) {

        if ($p->hasField('field_paragraphs') && !$p->field_paragraphs->isEmpty()) {
          $answers = $p->field_paragraphs->referencedEntities();

          $form['answer'] = [
            '#type' => 'container',
            '#tree' => TRUE,
          ];

          $answer_option = [];
          foreach ($answers as $answer) {
            if (($answer->hasField('field_answer') && !$answer->field_answer->isEmpty()) &&
              ($answer->hasField('field_answer_rate') && !$answer->field_answer_rate->isEmpty())) {
              $answer_option[$answer->field_answer_rate->value] = $answer->field_answer->value;
            }
          }

          if ($p->hasField('field_question_type') && !$p->field_question_type->isEmpty() && $p->field_question_type->value == 'multi') {
            $form['answer'][$pid]['#type'] = 'checkboxes';
            $form['answer'][$pid]['#attributes']['class'][] = 'quiz-multi-question';
          }
          else {
            $form['answer'][$pid]['#type'] = 'radios';
            $form['answer'][$pid]['#attributes']['class'][] = 'quiz-single-question';
          }

          $form['answer'][$pid]['#title'] = $p->field_title->value;
          $form['answer'][$pid]['#options'] = $answer_option;
          $form['answer'][$pid]['#default_value'] = isset($this->getValues()['answer'][$pid]) ? $this->getValues()['answer'][$pid] : [];
        }
      }
    }

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function getFieldNames() {
    return [
      'answer',
    ];
  }

}
