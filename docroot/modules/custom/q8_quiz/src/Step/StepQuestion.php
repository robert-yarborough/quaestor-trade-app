<?php

namespace Drupal\q8_quiz\Step;

use Drupal\q8_quiz\Validator\ValidatorQuestionRequired;

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

          if ($p->hasField('field_question_set') && !$p->field_question_set->isEmpty()) {
            $form[$this->questionId]['question_set'] = [
              '#type' => 'value',
              '#value' => $p->field_question_set->value,
            ];
          }

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

          if (isset($step_data['questionNumber'])) {
            $form[$this->questionId]['question_number'] = [
              '#type' => 'value',
              '#value' => $step_data['questionNumber'],
            ];
          }
        }
      }

      if ($p->hasField('field_image') && !$p->field_image->isEmpty()) {
        $field_image = $p->field_image->referencedEntities();
        $path = file_create_url($field_image[0]->getFileUri());

        $form['step_testing'] = [
          '#type' => 'html_tag',
          '#tag' => 'img',
          '#attributes' => [
            'src' => ' '.$path .' ',
            'class' => 'decor-image',
            'alt' => 'Step',
          ],
        ];
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
        new ValidatorQuestionRequired("Answer the question. Select one or more values."),
      ],
    ];
  }

}
