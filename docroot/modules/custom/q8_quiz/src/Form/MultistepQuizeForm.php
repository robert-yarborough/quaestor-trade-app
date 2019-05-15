<?php

namespace Drupal\q8_quiz\Form;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Render\Element\StatusMessages;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\q8_quiz\Manager\StepManager;
use Drupal\q8_quiz\Step\StepIntermediateResult;

/**
 * Provides multi step ajax Quiz form.
 *
 * @package Drupal\q8_quiz\Form
 */
class MultistepQuizeForm extends FormBase {
  use StringTranslationTrait;

  /**
   * Step Id.
   *
   * @var int
   */
  protected $stepId;

  /**
   * Multi steps of the form.
   *
   * @var \Drupal\q8_quiz\Step\StepInterface
   */
  protected $step;

  /**
   * Step manager instance.
   *
   * @var \Drupal\q8_quiz\Manager\StepManager
   */
  protected $stepManager;

  /**
   * Drupal\Core\Entity\EntityTypeManagerInterface definition.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $etm;

  /**
   * {@inheritdoc}
   */
  public function __construct(EntityTypeManagerInterface $entity_type_manager) {
    $this->etm = $entity_type_manager;
    $this->stepId = 0;
    $this->stepManager = new StepManager();
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'q8_quiz';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state, $node_id = NULL) {
    $form = [];

    // Initializing data for testing steps and Progress Bar from node content.
    if (empty($this->stepManager->getAllSteps()) && ($this->stepId == 0)) {
      $node = $this->etm->getStorage('node')->load($node_id);
      $paragraphs = $node->field_paragraph->referencedEntities();
      $this->initStepsDataByParagraphs($paragraphs);
    }

    // Get step from step manager.
    $this->step = $this->stepManager->getStep($this->stepId);

    $form['progress_bar'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'progress-bar',
        'class' => 'questionnaire__progress-bar'
      ],
    ];

    $form['wrapper-messages'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'messages-wrapper',
        'class' => 'questionnaire__messages'
      ],
    ];

    $form['wrapper'] = [
      '#type' => 'container',
      '#attributes' => [
        'id' => 'form-wrapper',
        'class' => 'questionnaire__form'
      ],
    ];

    // Set active item in progress bar.
    $progress_bar = $this->stepManager->getProgressBar();
    $current_progress_bar_id = $this->step->getStepData()['progress_bar_id'];
    $progress_bar[$current_progress_bar_id]['#wrapper_attributes']['class'][] = 'is-active';
    $form['progress_bar']['list'] = [
      '#theme' => 'item_list',
      '#items' => $progress_bar,
      '#wrapper_attributes' => ['class' => 'questionnaire__steps-list'],
    ];

    // Attach step form elements.
    $form['wrapper'] += $this->step->buildStepFormElements();

    // Attach buttons.
    $form['wrapper']['actions']['#type'] = 'actions';
    $buttons = $this->stepManager->getButtons($this->stepId);
    foreach ($buttons as $button) {
      /** @var \Drupal\q8_quiz\Button\ButtonInterface $button */
      $form['wrapper']['actions'][$button->getKey()] = $button->build($this->stepId);

      if ($button->ajaxify()) {
        // Add ajax to button.
        $form['wrapper']['actions'][$button->getKey()]['#ajax'] = [
          'callback' => [$this, 'loadStep'],
          'wrapper' => 'form-wrapper',
          'effect' => 'fade',
        ];
      }
    }

    return $form;
  }

  /**
   * Form the steps data and progress bar by paragraphs from the node.
   */
  public function initStepsDataByParagraphs($paragraphs) {
    $step_data = [];
    $progress_bar = [];

    $step_id = 0;
    foreach ($paragraphs as $delta => $p) {
      $progress_bar[$delta]['#children'] = $p->field_title->value;

      $step_data['paragraph'] = $p;
      $step_data['progress_bar_id'] = $delta;
      switch ($p->bundle()) {
        case 'step_testing':
          $step_data['class'] = 'StepTesting';
          break;

        case 'initial_allocation':
          $step_data['class'] = 'StepIntermediateResult';
          break;

        case 'tactical_allocation':
          $step_data['class'] = 'StepResult';
          break;
      }
      $this->initStepData($step_data['class'], $step_id, $step_data);
      $step_id++;

      if ($p->hasField('field_paragraphs') && !$p->field_paragraphs->isEmpty()) {
        $sub_paragraphs = $p->field_paragraphs->referencedEntities();

        foreach ($sub_paragraphs as $sub_p) {
          $step_data['paragraph'] = $sub_p;
          $step_data['progress_bar_id'] = $delta;

          switch ($sub_p->bundle()) {
            case 'question':
              $step_data['class'] = 'StepQuestion';
              break;
          }
          $this->initStepData($step_data['class'], $step_id, $step_data);
          $step_id++;
        }
      }
    }
    $this->stepManager->setProgressBar($progress_bar);
  }

  /**
   * Init Step Data.
   */
  public function initStepData($className, $stepId, $stepData) {
    // Init step.
    $class = $this->stepManager->map($className);
    $step = new $class($this->stepManager);
    $step->setStep($stepId);
    $step->setStepData($stepData);

    $this->stepManager->addStep($step);
  }

  /**
   * Ajax callback to load new step.
   *
   * @param array $form
   *   Form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   Form state interface.
   *
   * @return \Drupal\Core\Ajax\AjaxResponse
   *   Ajax response.
   */
  public function loadStep(array &$form, FormStateInterface $form_state) {
    $response = new AjaxResponse();

    $messages = StatusMessages::renderMessages();
    if (!empty($messages)) {
      $response->addCommand(new HtmlCommand('#messages-wrapper', $messages));
    }
    else {
      // Remove messages.
      $response->addCommand(new HtmlCommand('#messages-wrapper', ''));
    }

    // Update Form.
    $response->addCommand(new HtmlCommand('#form-wrapper',
      $form['wrapper']));

    // Update ProgressBar.
    $response->addCommand(new HtmlCommand('#progress-bar',
      $form['progress_bar']));

    return $response;
  }

  /**
   * Returns all messages that have been set with message().
   */
  public function getMessage($type = NULL, $clear_queue = TRUE) {
    if ($messages = $this->messenger->all()) {
      if ($type) {
        if ($clear_queue) {
          $this->messenger->deleteByType($type);
        }
        if (isset($messages[$type])) {
          return [$type => $messages[$type]];
        }
      }
      else {
        if ($clear_queue) {
          $this->messenger->deleteAll();
        }
        return $messages;
      }
    }
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $triggering_element = $form_state->getTriggeringElement();
    // Only validate if validation doesn't have to be skipped.
    // For example on "previous" button.
    if (empty($triggering_element['#skip_validation']) && $fields_validators = $this->step->getFieldsValidators()) {
      // Validate fields.
      foreach ($fields_validators as $field => $validators) {
        // Validate all validators for field.
        $field_value = $form_state->getValue($field);
        foreach ($validators as $validator) {
          if (!$validator->validates($field_value)) {
            $form_state->setErrorByName($field, $validator->getErrorMessage());
          }
        }
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Save filled values to step. So we can use them as default_value later on.
    $values = [];
    foreach ($this->step->getFieldNames() as $name) {
      $values[$name] = $form_state->getValue($name);
    }
    $this->step->setValues($values);

    // Add step to manager.
    $this->stepManager->addStep($this->step);

    // Set step to navigate to.
    $triggering_element = $form_state->getTriggeringElement();
    $this->stepId = $triggering_element['#goto_step'];

    // If an extra submit handler is set, execute it.
    // We already tested if it is callable before.
    if (isset($triggering_element['#submit_handler'])) {
      $this->{$triggering_element['#submit_handler']}($form, $form_state);
    }

    // Set steps for intermediate results.
    $steps = $this->stepManager->getAllSteps();
    $next_step = $steps[$this->stepId + 1];
    if ($next_step instanceof StepIntermediateResult) {
      $next_step->setSteps($steps);
    }

    $form_state->setRebuild(TRUE);
  }

  /**
   * Submit handler for last step of form.
   *
   * @param array $form
   *   Form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   Form state interface.
   */
  public function submitValues(array &$form, FormStateInterface $form_state) {
    // Submit all values to DB or do whatever you want on submit.
  }

}
