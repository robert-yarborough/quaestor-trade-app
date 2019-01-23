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
      $response->addCommand($this->buildDialog($this->t('Your form has an error(s)'), $content));

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
          $response->addCommand($this->buildDialog(
            $this->t('You are already registered'),
            $this->t('You are already registered! Please use another email or contact us with another method')
          ));
          return $response;
        }

        // Create contact.
        // Build variables array.
        $properties = [
          [
            'property' => 'email',
            'value' => $formState->getValue('email'),
          ],
          [
            'property' => 'firstname',
            'value' => $formState->getValue('first_name'),
          ],
          [
            'property' => 'lastname',
            'value' => $formState->getValue('last_name'),
          ],
          [
            'property' => 'phone',
            'value' => $formState->getValue('phone'),
          ],

        ];

        // Create contact or return error.
        try {
          $contacts->create($properties);
          $title = $this->t('Success');
          $content = [
            '#theme' => 'open_account_dialog_success',
            '#name' => $formState->getValue('first_name') . ' ' . $formState->getValue('last_name'),
            '#title' => $title,
            '#subtitle' => $this->t('your request was submitted'),
          ];
          $response->addCommand(
            $this->buildDialog(
              $title,
              $content
            )
          );
          return $response;
        }
        catch (\Exception $exception) {
          // ToDo. Parse error from the response body.
          // Looks like the property(ies) doesn't exist.
          $this->logger('open_account_form')->critical('Looks like property doesn`t exists. ERROR: @error', ['@error' => $exception->getMessage()]);
          $response->addCommand(
            $this->buildDialog(
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
          $this->buildDialog(
            $this->t('Your form has an error(s)'),
            $this->t('Cannot connect to Hubspot server. Please contact us in another method')
          )
        );
        return $response;
      }
    }
  }

  /**
   * Helper function for building popup.
   *
   * @param string|object|array $title
   *   Popup title.
   * @param string|object|array $content
   *   Popup content.
   *
   * @return \Drupal\Core\Ajax\OpenModalDialogCommand
   *   Ajax command for the response.
   */
  protected function buildDialog($title, $content) {
    return new OpenModalDialogCommand(
      $title,
      $content,
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
