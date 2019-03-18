<?php

namespace Drupal\q8_domain\Plugin\ConfigPagesContext;

use Drupal\domain\DomainNegotiator;
use Drupal\config_pages\ConfigPagesContextBase;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a domain config pages context.
 *
 * @ConfigPagesContext(
 *   id = "domain",
 *   label = @Translation("Domain"),
 * )
 */
class Domain extends ConfigPagesContextBase {

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
   * Get the value of the context.
   *
   * @return mixed
   *   Retturn value of the context.
   */
  public function getValue() {
    return $this->domainNegotiator->getActiveId();
  }

}
