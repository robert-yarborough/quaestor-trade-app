<?php

namespace Drupal\q8_forms\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class AccountForm.
 */
class OpenAccountForm extends FormBase {

  /**
   * Current request.
   *
   * @var \Symfony\Component\HttpFoundation\Request
   */
  protected $request;

  /**
   * Constructs a new HowCanWeHelpForm object.
   */
  public function __construct(Request $request) {
    $this->requestStack = $request;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('request_stack')->getCurrentRequest()
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'open_account_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {

    $form['client_type'] = [
      '#type' => 'radios',
      '#title' => $this->t('Are you an individual or institution'),
      '#options' => ['Individual' => $this->t('Individual'), 'Institution' => $this->t('Institution')],
      '#default_value' => 'Individual',
      '#required' => TRUE,
    ];

    $label = $this->t('First Name');
    $form['first_name'] = [
      '#type' => 'textfield',
      '#title' => $label,
      '#title_display' => 'invisible',
      '#required' => TRUE,
      '#attributes' => [
        'placeholder' => $label,
      ],
    ];

    $label = $this->t('Last name');
    $form['last_name'] = [
      '#type' => 'textfield',
      '#title' => $label,
      '#title_display' => 'invisible',
      '#required' => TRUE,
      '#attributes' => [
        'placeholder' => $label,
      ],
    ];

    $label = $this->t('Email');
    $form['email'] = [
      '#type' => 'email',
      '#title' => $label,
      '#title_display' => 'invisible',
      '#required' => TRUE,
      '#attributes' => [
        'placeholder' => $label,
      ],
    ];

    $label = $this->t('Phone');
    $form['phone'] = [
      '#type' => 'tel',
      '#title' => $label,
      '#title_display' => 'invisible',
      '#required' => TRUE,
      '#attributes' => [
        'placeholder' => $label,
      ],
    ];

    $label = $this->t("Phone's Country Code");
    $form['country_code'] = [
      '#type' => 'textfield',
      '#title' => $label,
      '#title_display' => 'invisible',
      '#required' => TRUE,
      '#attributes' => [
        'placeholder' => $label,
      ],
    ];

    $form['language'] = [
      '#type' => 'radios',
      '#title' => $this->t('Preferred language'),
      '#options' => ['English' => $this->t('English'), 'Arabic' => $this->t('Arabic')],
      '#default_value' => 'English',
      '#required' => TRUE,
    ];
    $form['interests'] = [
      '#type' => 'radios',
      '#title' => $this->t('What markets are you interested in?'),
      '#options' => [
        'Kuwait' => $this->t('Kuwait'),
        'US' => $this->t('US'),
        'Both' => $this->t('Both'),
      ],
      '#default_value' => 'Both',
      '#required' => TRUE,
    ];
    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

  }

}
