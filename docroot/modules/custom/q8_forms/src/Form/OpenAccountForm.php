<?php

namespace Drupal\q8_forms\Form;

use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\OpenModalDialogCommand;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\hubspot_api\Manager;
use SevenShores\Hubspot\Factory;
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
   * Hubspot handler.
   *
   * @var \Drupal\hubspot_api\Manager
   */
  protected $hubspot;

  /**
   * Constructs a new HowCanWeHelpForm object.
   */
  public function __construct(Request $request, Manager $hubspot) {
    $this->requestStack = $request;
    $this->hubspot = $hubspot;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('request_stack')->getCurrentRequest(),
      $container->get('hubspot_api.manager')
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
      '#options' => ['Individual' => $this->t('Individual'), 'Institutional' => $this->t('Institution')],
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
      '#attributes' => [
        'placeholder' => $label,
      ],
    ];

    $form['language_preference'] = [
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

    $form['captcha'] = [
      '#type' => 'captcha',
      '#captcha_type' => 'recaptcha/reCAPTCHA',
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#ajax' => [
        'callback' => '::ajaxSubmit',
      ],
      '#value' => $this->t('Submit'),
    ];

    return $form;
  }

  /**
   * Ajax submit for the call.
   */
  public function ajaxSubmit(array &$form, FormStateInterface $formState) {

    // Hide messages.
    $this->messenger()->deleteAll();

    // Rebuild form after submit.
    $formState->setRebuild(TRUE);

    // Init response.
    $response = new AjaxResponse();

    // First process errors.
    if ($errors = $formState->getErrors()) {
      $content = [
        '#theme' => 'item_list',
        '#items' => $errors,
      ];
      $response->addCommand(
        $this->buildErrorDialog(
          $this->t('Your form has an error(s)'),
          $content
        )
      );

      return $response;
    }
    // Otherwise check hubspot.
    else {
      $handler = $this->hubspot->getHandler();
      if ($handler instanceof Factory) {
        // Base resource.
        $contacts = $handler->contacts();

        // Validate if the user is already exists.
        $search = $contacts->search($formState->getValue('email'));
        if ($search->data->total) {
          $response->addCommand($this->buildErrorDialog(
            $this->t('You are already registered'),
            $this->t('You are already registered! Please use another email or contact us with another method')
          ));
          return $response;
        }

        // Create contact.
        $properties = $this->buildProperties($formState->getValues());

        // Create contact or return error.
        try {
          $contacts->create($properties);
          $response->addCommand(
            $this->buildSuccessDialog(
              $this->t('Success'),
              $formState->getValue('first_name') . ' ' . $formState->getValue('last_name'),
              $this->t('your request was submitted')
            )
          );
          return $response;
        }
        catch (\Exception $exception) {
          // ToDo. Parse error from the response body.
          // Looks like the property(ies) doesn't exist.
          $this->logger('open_account_form')->critical('Looks like property doesn`t exists. ERROR: @error', ['@error' => $exception->getMessage()]);
          $response->addCommand(
            $this->buildErrorDialog(
              $this->t('Hubspot error'),
              $this->t('Hubspot server error. Please contact us in another method')
            )
          );
          return $response;
        }
      }
      // Return message if something went wrong with Hubspot.
      else {
        $this->logger('open_account_form')->critical('Cannot connect to hubspot server.');
        $response->addCommand(
          $this->buildErrorDialog(
            $this->t('Your form has an error(s)'),
            $this->t('Cannot connect to Hubspot server. Please contact us in another method')
          )
        );
        return $response;
      }
    }
  }

  /**
   * Map variables array for hubspot.
   *
   * @param array $values
   *   Form values.
   *
   * @return array
   *   Returns Hubspot-style parameters array.
   */
  public function buildProperties(array $values) {
    return [
      // ToDo. Add new parameters when create add them in the UI.
      [
        'property' => 'email',
        'value' => $values['email'],
      ],
      [
        'property' => 'firstname',
        'value' => $values['first_name'],
      ],
      [
        'property' => 'lastname',
        'value' => $values['last_name'],
      ],
      [
        'property' => 'phone',
        'value' => $values['phone'],
      ],
      [
        'property' => 'client_type',
        'value' => $values['client_type'],
      ],
      [
        'property' => 'phone_country_code',
        'value' => $values['country_code'],
      ],
      [
        'property' => 'language_preference',
        'value' => $values['language_preference'],
      ],
      [
        'property' => 'what_markets_are_you_interested_in_',
        'value' => $values['interests'],
      ],
    ];
  }

  /**
   * Helper function for building success popup.
   *
   * @param string|object|array $title
   *   Popup title.
   * @param string $name
   *   User name.
   * @param string $subtitle
   *   Status description.
   *
   * @return \Drupal\Core\Ajax\OpenModalDialogCommand
   *   Ajax command for the response.
   */
  protected function buildSuccessDialog($title, $name, $subtitle) {
    return new OpenModalDialogCommand(
      $title,
      [
        '#theme' => 'open_account_dialog_success',
        '#name' => $name,
        '#title' => $title,
        '#subtitle' => $subtitle,
      ],
      // ToDo. Add correct options here.
      [
        'width' => 700,
        'height' => 500,
      ]
    );
  }

  /**
   * Helper function for building error popup.
   *
   * @param string|object|array $title
   *   Error title.
   * @param string|object|array $text
   *   Error text.
   *
   * @return \Drupal\Core\Ajax\OpenModalDialogCommand
   *   Ajax command for the response.
   */
  protected function buildErrorDialog($title, $text) {
    return new OpenModalDialogCommand(
      $title,
      [
        '#theme' => 'open_account_dialog_fail',
        '#title' => $title,
        '#text' => $text,
      ],
      // ToDo. Add correct options here.
      [
        'width' => 700,
        'height' => 500,
      ]
    );
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {

  }

}
