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

    $form['static_card'] = [
      '#type' => 'item',
      '#markup' => $this->getStaticResult(),
    ];

    return $form;
  }

  /**
   * Set Steps.
   */
  public function setSteps($steps) {
    $this->steps = $steps;
  }

  /**
   * Static Card.
   */
  public function getStaticResult() {
    $path =  drupal_get_path('module', 'q8_quiz');
    $fquestions = $path."/Questions/Questions.csv";

  foreach($_SESSION['multistep'] as $key=>$result){
    foreach($result as $id=>$values){
          if ((!is_file($fquestions)) && (!file_exists($fquestions))) {
              return 1;
          }
          $questions = file($fquestions, FILE_IGNORE_NEW_LINES);
          $totalsum = [];
          $answers = $values['weight'];
          for ($i = 0; $i <= count($answers); $i++) {
              //$question = explode(',', $questions[$i]);
              $questionSet = 5;//$values['total_number_answer'];
              $questionWeight = 1;
              $answersLength = $values['question_number'];
              $calcValue = $questionWeight * $answers[$i] * $questionSet / $answersLength;

              if (array_key_exists($questionSet, $totalsum)) {
                  $previous = $totalsum[$questionSet];
                  $totalsum[$questionSet] = array($previous[0] + $calcValue, $previous[1] + $questionWeight);
              } else {
                  $totalsum[$questionSet] = array($calcValue, $questionWeight);
              }
          }
      }
    }
      unset($_SESSION['multistep']);
      $modport = -1;
        foreach ($totalsum as $key => $value) {
            $modport += round($totalsum[$key][0] / $totalsum[$key][1]);
        }
        if ($modport <=0) {
            $modport =1;
        }
        if ($modport > 5) {
            $modport =5;
        }
// Get the matched profile value
//ksm("Profile".$modport);
  $profile_state = $modport;
  //$profile_state = 1;
  $view = \Drupal\views\Views::getView('profile_list');
  $view->setArguments([$profile_state]);
  $view->setDisplay('block_2');
  $view->execute();
  $data = $view->result;
  $output = '<div class="page-frame">
  <div class="questionnaire-step__assets">
    <div class="qsa--wrap">
      <div class="qsa--list">';
  foreach ($data as $result) {
    $node = $result->_entity;
    $name = $node->get('name')->value;
    $description= $node->get('description')->value;
    $state = $node->get('field_state')->value;
    if($state == $modport){
      $active_state = "trendspotter--active";
    }else{
      $active_state = '';
    }
    $output .= '
        <div class="qsa--item '.$active_state.' ">
          <div class="qsa--group">
            <div class="qsa--icon">
              <div class="image-holder" style="background-image: url(../images/icons/icon-guardian.png);" ></div>
            </div>
            <div class="qsa--title">
              '.$name.'
            </div>
            <div class="qsa--text">
              '.$description.'
            </div>
            <div class="qsa--subtitle">
              Total Asset Allocation
            </div>
            <div class="qsa--values">
              <ul>
                <li><b>10%</b> Stocks</li>
                <li><b>55%</b> Bonds</li>
                <li><b>35%</b> Cash</li>
              </ul>
            </div>
          </div>
          <div class="slider-line"></div>
        </div>
    ';
  }
  $output .= ' </div>
    </div>
  </div>
</div>';
  return $output;
  }
}
