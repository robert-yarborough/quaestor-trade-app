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
          //'#type' => 'item',
          //'#markup' => '$p->field_description->value',
        ];
      }
    }

    // Questionarie Alogorithm
    $data = array_values(array_filter($_SESSION['q8_quiz_questionnaire']));
    unset($_SESSION['q8_quiz_questionnaire']);

    foreach($data as $key=>$result){
      $answers[] = (int) array_column($result, 'weight')[0];
    }
    foreach($data as $key=>$result){
      $questionSet = array_column($result, 'question_set')[0];
      $total_number_answer = array_column($result, 'total_number_answer')[0];
      $question = array_column($result, 'question_number')[0];
          $totalsum = [];

          for ($i = 1; $i <= count($answers); $i++) {
              $questionWeight = 1;
              $answersLength = $total_number_answer;
              $calcValue = $questionWeight * $answers[$i] * $questionSet / $answersLength;

              if (array_key_exists($questionSet, $totalsum)) {
                  $previous = $totalsum[$questionSet];
                  $totalsum[$questionSet] = array($previous[0] + $calcValue, $previous[1] + $questionWeight);
              } else {
                  $totalsum[$questionSet] = array($calcValue, $questionWeight);
              }
          }
    }

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
    // Line chart values
    $profile_state = $modport;
    $view = \Drupal\views\Views::getView('profile_list');
    $view->setArguments([$profile_state]);
    $view->setDisplay('block_1');
    $view->execute();
    $data = $view->result;
    foreach ($data as $result) {
      $node = $result->_relationship_entities;
      $target_return = $node['field_chart_data']->get('field_chart_number')->value;
    }
    $initalValue = 100000;
    $values = [];
    $values[] = $initalValue;
    for($i=0;$i<20;$i++){
      $initalValue = $initalValue * (1+($target_return/100));
      $values[] = round($initalValue);
    }

    $xx = ['', '1 year', '2 years', '3 years', '4 years', '5 years', '6 years', '7 years', '8 years', '9 years', '10 years', '11 years', '12 years', '13 years', '14 years', '15 years', '16 years', '17 years', '18 years', '19 years', '20 years'];
    $yy = $values;

    $form['#attached']['drupalSettings']['projected_values'] = $yy;
    $form['#attached']['drupalSettings']['target_return'] = $target_return;
    // Pie chart data values
    $profile_state = 1;
    $view = \Drupal\views\Views::getView('profile_list');
    $view->setArguments([$profile_state]);
    $view->setDisplay('block_3');
    $view->execute();
    $data = $view->result;
    $chart_name = [];
    $chart_number= [];
    $chart_color = [];

    foreach ($data as $results) {
      $node = $results->_relationship_entities;
      $chart_name[] = $node['field_final_chart_data_values']->get('field_chart_name')->value;
      $chart_number[] = $node['field_final_chart_data_values']->get('field_chart_number')->value;
      $chart_color[] = $node['field_final_chart_data_values']->get('field_chart_color')->value;
    }
    $form['#attached']['drupalSettings']['chart_name'] = $chart_name;
    $form['#attached']['drupalSettings']['chart_number'] = $chart_number;
    $form['#attached']['drupalSettings']['chart_color'] = $chart_color;

    //Get profile name,description and icon
    $name = $data[0]->_entity->get('name')->value;
    $description = $data[0]->_entity->get('description')->value;
    $fid = $data[0]->_entity->get('field_icon')->getValue()[0]['target_id'];
    $file = \Drupal\file\Entity\File::load($fid); // load File entity object
    $file_url = $file->url(); // get the URL.
    $final_profile_data = array($name,$description,$file_url);
    $form['final_card'] = [
      '#type' => 'item',
      '#markup' => $this->getfinalStaticResult($final_profile_data),
    ];
    return $form;
  }
  public function getfinalStaticResult($final_profile_data) {
    $step_data = $this->getStepData();
    if (isset($step_data['paragraph'])) {
      $p = $step_data['paragraph'];
      if ($p->hasField('field_description') && !$p->field_description->isEmpty()) {
        $description = $p->field_description->value;
      }
    }

    $page = [
      'data' => [
        '#theme' => 'final-result',
        '#items' => $final_profile_data,
      ],
    ];
    return render($page);
  }

}
