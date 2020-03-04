<?php

/**
 * @file
 * Contains Drupal\q8_questionnaire_customization\Form\AlgorithmSettingsForm.
 */

namespace Drupal\q8_questionnaire_customization\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class SettingsForm.
 *
 * @package Drupal\q8_questionnaire_customization\Form
 */
class AlgorithmSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return [
      'q8_questionnaire_customization.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'algorithm_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('q8_questionnaire_customization.settings');

  $form['algorithm'] = array(
	'#type' => 'radios',
	'#title' => t('Topic'),
	'#required' => TRUE,
	'#default_value' => $config->get('algorithm'),
	'#options' => array('q8_algorithm'=>t('Q8 algorithm'),'q8_advanced_algorithm'=>t('Q8 Advanced Algorithm'),'Others'=>t('Others')),
	);

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);

    $this->config('q8_questionnaire_customization.settings')
      ->set('algorithm', $form_state->getValue('algorithm'))
      ->save();
  }

}
