<?php

namespace Drupal\q8_forms\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Form\FormBuilderInterface;

/**
 * Provides a 'HowCanWeHelpBlock' block.
 *
 * @Block(
 *  id = "how_can_we_help_block",
 *  admin_label = @Translation("How can we help block"),
 * )
 */
class HowCanWeHelpBlock extends BlockBase implements ContainerFactoryPluginInterface {

  /**
   * Drupal\Core\Form\FormBuilderInterface definition.
   *
   * @var \Drupal\Core\Form\FormBuilderInterface
   */
  protected $formBuilder;
  /**
   * Constructs a new HowCanWeHelpBlock object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param string $plugin_definition
   *   The plugin implementation definition.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    FormBuilderInterface $form_builder
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->formBuilder = $form_builder;
  }
  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('form_builder')
    );
  }
  /**
   * {@inheritdoc}
   */
  public function build() {
    return $this->formBuilder->getForm('how_can_we_help_form');
  }

}
