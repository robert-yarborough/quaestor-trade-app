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
    return '<div class="page-frame">
  <div class="questionnaire-step__assets">
    <div class="qsa--wrap">
      <div class="qsa--list">
        <div class="qsa--item">
          <div class="qsa--group">
            <div class="qsa--icon">
              <div class="image-holder"></div>
            </div>
            <div class="qsa--title">
              Guardian
            </div>
            <div class="qsa--text">
              Leggings live-edge dreamcatcher man braid
            </div>
            <div class="qsa--subtitle">
              Total Asset Allocation
            </div>
            <div class="qsa--values">
              <ul>
                <li><b>20%</b> Stocks</li>
                <li><b>55%</b> Stocks</li>
                <li><b>25%</b> Stocks</li>
              </ul>
            </div>
          </div>
          <div class="slider-line"></div>
        </div>
        <div class="qsa--item">
          <div class="qsa--group">
            <div class="qsa--icon">
              <div class="image-holder"></div>
            </div>
            <div class="qsa--title">
              Thinker
            </div>
            <div class="qsa--text">
              Leggings live-edge dreamcatcher man braid
            </div>
            <div class="qsa--subtitle">
              Total Asset Allocation
            </div>
            <div class="qsa--values">
              <ul>
                <li><b>20%</b> Stocks</li>
                <li><b>55%</b> Stocks</li>
                <li><b>25%</b> Stocks</li>
              </ul>
            </div>
          </div>
          <div class="slider-line"></div>
        </div>
        <div class="qsa--item">
          <div class="qsa--group">
            <div class="qsa--icon">
              <div class="image-holder"></div>
            </div>
            <div class="qsa--title">
              Independet
            </div>
            <div class="qsa--text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum.
            </div>
            <div class="qsa--subtitle">
              Total Asset Allocation
            </div>
            <div class="qsa--values">
              <ul>
                <li><b>20%</b> Stocks</li>
                <li><b>55%</b> Stocks</li>
                <li><b>25%</b> Stocks</li>
              </ul>
            </div>
          </div>
          <div class="slider-line"></div>
        </div>
        <div class="qsa--item trendspotter--active">
          <div class="qsa--group">
            <div class="qsa--icon">
              <div class="image-holder"></div>
            </div>
            <div class="qsa--title">
              Trendspotter
            </div>
            <div class="qsa--text">
              Leggings live-edge dreamcatcher man braid
            </div>
            <div class="qsa--subtitle">
              Total Asset Allocation
            </div>
            <div class="qsa--values">
              <ul>
                <li><b>20%</b> Stocks</li>
                <li><b>55%</b> Stocks</li>
                <li><b>25%</b> Stocks</li>
              </ul>
            </div>
          </div>
          <div class="slider-line"></div>
        </div>
        <div class="qsa--item">
          <div class="qsa--group">
            <div class="qsa--icon">
              <div class="image-holder"></div>
            </div>
            <div class="qsa--title">
              Adventurer
            </div>
            <div class="qsa--text">
              Leggings live-edge dreamcatcher man braid
            </div>
            <div class="qsa--subtitle">
              Total Asset Allocation
            </div>
            <div class="qsa--values">
              <ul>
                <li><b>20%</b> Stocks</li>
                <li><b>55%</b> Stocks</li>
                <li><b>25%</b> Stocks</li>
              </ul>
            </div>
          </div>
          <div class="slider-line"></div>
        </div>
      </div>
    </div>
  </div>
</div>';
  }

}
