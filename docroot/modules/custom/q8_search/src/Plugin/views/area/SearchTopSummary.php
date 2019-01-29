<?php

namespace Drupal\q8_search\Plugin\views\area;

use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\views\Plugin\views\area\AreaPluginBase;

/**
 * Search view top summary handler.
 *
 * @ingroup views_area_handlers
 *
 * @ViewsArea("search_top_summary")
 */
class SearchTopSummary extends AreaPluginBase implements ContainerFactoryPluginInterface {

  /**
   * {@inheritdoc}
   */
  public function render($empty = FALSE) {
    if ($empty) {
      return [];
    }

    return [
      '#cache' => [
        'contexts' => ['url.query_args:how_can_we_help'],
      ],
      '#markup' => $this->t(
        '@total results for <em>"@query"</em>',
        [
          '@total' => isset($this->view->total_rows) ? $this->view->total_rows : count($this->view->result),
          '@query' => $this->view->getRequest()->get('how_can_we_help'),
        ]
      ),
    ];

  }

}
