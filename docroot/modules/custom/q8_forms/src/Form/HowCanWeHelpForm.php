<?php

namespace Drupal\q8_forms\Form;

use Drupal\q8_search\Form\SimpleSearchForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class HowCanWeHelpForm.
 */
class HowCanWeHelpForm extends SimpleSearchForm {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'how_can_we_help_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);

    $form['how_can_we_help']['#attributes'] = [
      'placeholder' => $this->t("Ask us anything. We're Experts!"),
    ];

    return $form;
  }

}
