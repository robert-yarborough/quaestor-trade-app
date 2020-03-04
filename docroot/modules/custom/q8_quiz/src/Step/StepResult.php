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
    $form['final_card'] = [
      '#type' => 'item',
      '#markup' => $this->getfinalStaticResult(),
    ];

    // Line chart  $modportdata values
  $profile_state = 1;
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
    //print_r($node);
    $chart_name[] = $node['field_final_chart_data_values']->get('field_chart_name')->value;
    $chart_number[] = $node['field_final_chart_data_values']->get('field_chart_number')->value;
    $chart_color[] = $node['field_final_chart_data_values']->get('field_chart_color')->value;
  }
  $form['#attached']['drupalSettings']['chart_name'] = $chart_name;
  $form['#attached']['drupalSettings']['chart_number'] = $chart_number;
  $form['#attached']['drupalSettings']['chart_color'] = $chart_color;
    return $form;
  }
  public function getfinalStaticResult() {
     //return '<canvas id="piechart" width="400" aria-label="Hello ARIA World" style="width: 400px;height: auto;" role="img"></canvas>';
   // return '<div class="test">Hello world</div>';
$step_data = $this->getStepData();
    //$form = [];

    if (isset($step_data['paragraph'])) {
      $p = $step_data['paragraph'];

      if ($p->hasField('field_description') && !$p->field_description->isEmpty()) {
        $description = $p->field_description->value;
      }
    }

    $page = [
      'data' => [
        '#theme' => 'final-result',
        '#items' => $description,
      ],
    ];

    return render($page);
  }

}
