<?php

namespace Drupal\q8_search\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\q8_search\SearchConstantsInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class SearchSimpleForm.
 */
class SimpleSearchForm extends FormBase {


  /**
   * Current request.
   *
   * @var \Symfony\Component\HttpFoundation\RequestStack
   */
  protected $request;

  /**
   * Drupal\Core\Session\AccountProxy definition.
   *
   * @var \Drupal\Core\Session\AccountProxy
   */
  protected $currentUser;

  /**
   * Constructs a new SearchProjectSimpleForm object.
   */
  public function __construct(Request $request_stack) {
    $this->request = $request_stack;
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
    return 'search_simple_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['search'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Search'),
      '#title_display' => 'hidden',
      '#default_value' => $this->request->get('search'),
      '#attributes' => [
        'placeholder' => $this->t('Search'),
        'maxlength' => SearchConstantsInterface::SEARCH_MAX_LENGTH,
        'class' => [
          'header-search__field',
        ],
      ],
      '#required' => TRUE,
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#attributes' => [
        'class' => [
          'header-search__action',
        ],
      ],
      '#value' => $this->t('Submit'),
    ];

    $form['icon'] = [
      '#markup' => '<div class="header-search__action--icon"><svg class="q-icon"><use xlink:href="#icon-search"></use></svg></div>',
      '#allowed_tags' => [
        'div',
        'svg',
        'use',
      ],
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    /*$form_state->setRedirect(
    SearchConstantsInterface::SEARCH_ROUTE,
    [
    'search' => $form_state->getValue('search'),
    ]
    );*/
  }

}
