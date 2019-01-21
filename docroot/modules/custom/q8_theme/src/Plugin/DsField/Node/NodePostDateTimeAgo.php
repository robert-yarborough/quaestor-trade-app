<?php

namespace Drupal\q8_theme\Plugin\DsField\Node;

use Drupal\ds\Plugin\DsField\Node\NodePostDate;

/**
 * Plugin that renders the post date of a node.
 *
 * @DsField(
 *   id = "node_post_date_time_ago",
 *   title = @Translation("Post date Time ago"),
 *   entity_type = "node",
 *   provider = "node"
 * )
 */
class NodePostDateTimeAgo extends NodePostDate {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $render_key = $this->getRenderKey();

    return [
      '#markup' => $this->t('@time ago', [
        '@time' => $this->dateFormatter->formatTimeDiffSince(
          $this->entity()->{$render_key}->value)
      ]),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function formatters() {
    return [];
  }

}
