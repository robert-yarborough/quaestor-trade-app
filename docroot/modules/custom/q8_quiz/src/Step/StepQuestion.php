<?php

namespace Drupal\q8_quiz\Step;

use Drupal\q8_quiz\Validator\ValidatorRequired;

/**
 * Class StepQuestion.
 *
 * @package Drupal\q8_quiz\Step
 */
class StepQuestion extends BaseStep {

  /**
   * Id entity Question.
   *
   * @var int
   */
  private $questionId;

  /**
   * Number Question.
   *
   * @var int
   */
  private $questionNumber;

  /**
   * {@inheritdoc}
   */
  public function buildStepFormElements() {
    $step_data = $this->getStepData();
    $form = [];

    // Create Question Item.
    if (isset($step_data['paragraph'])) {
      $p = $step_data['paragraph'];

      // Create Answer Item.
      if ($p->hasField('field_title') && !$p->field_title->isEmpty()) {

        if ($p->hasField('field_paragraphs') && !$p->field_paragraphs->isEmpty()) {
          $answers = $p->field_paragraphs->referencedEntities();
          $this->questionId = $p->id();
          $values = $this->getValues();

          $form[$this->questionId] = [
            '#type' => 'container',
            '#tree' => TRUE,
          ];

          $form[$this->questionId]['question_set'] = [
            '#type' => 'value',
            '#value' => '5',
          ];

          $answer_option = [];
          foreach ($answers as $answer) {
            if (($answer->hasField('field_answer') && !$answer->field_answer->isEmpty()) &&
              ($answer->hasField('field_answer_rate') && !$answer->field_answer_rate->isEmpty())) {
              $answer_option[$answer->field_answer_rate->value] = $answer->field_answer->value;
            }
          }

          if ($p->hasField('field_question_type') && !$p->field_question_type->isEmpty() && $p->field_question_type->value == 'multi') {
            $form[$this->questionId]['weight']['#type'] = 'checkboxes';
            $form[$this->questionId]['weight']['#attributes']['class'][] = 'quiz-multi-question';
          }
          else {
            $form[$this->questionId]['weight']['#type'] = 'radios';
            $form[$this->questionId]['weight']['#attributes']['class'][] = 'quiz-single-question';
          }

          $form[$this->questionId]['weight']['#title'] = $p->field_title->value;
          $form[$this->questionId]['weight']['#options'] = $answer_option;
          $form[$this->questionId]['weight']['#default_value'] = (isset($values) && (isset($values[$this->questionId]['weight'])))
            ? $values[$this->questionId]['weight'] : [];

          $form[$this->questionId]['total_number_answer'] = [
            '#type' => 'value',
            '#value' => count($answer_option),
          ];
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
      $this->questionId,
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFieldsValidators() {
    return [
      $this->questionId => [
        new ValidatorRequired("Answer the question. Select one or more values."),
      ],
    ];
  }

}
