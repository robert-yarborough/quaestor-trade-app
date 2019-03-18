<?php

namespace Drupal\q8_domain\Plugin\views\argument_default;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\domain\DomainNegotiator;
use Drupal\views\Plugin\views\argument_default\ArgumentDefaultPluginBase;

/**
 * Current Domain.
 *
 * @ViewsArgumentDefault(
 *   id = "current_domain",
 *   title = @Translation("Current Domain")
 * )
 */
class CurrentDomain extends ArgumentDefaultPluginBase {

  /**
   * The domain negotiator.
   *
   * @var \Drupal\domain\DomainNegotiator
   */
  protected $domainNegotiator;

  /**
   * {@inheritdoc}
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, DomainNegotiator $domain_negotiator) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->domainNegotiator = $domain_negotiator;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('domain.negotiator')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getArgument() {
    return $this->domainNegotiator->getActiveId();;
  }

}
