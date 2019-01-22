(($, Drupal, drupalSettings) => {
	Drupal.behaviors.tabsFilters = {
		attach: (context, settings) => {

			// Toggle filters drop for mobile
			let $tabs_filters = $('.js-tabs-filters', context);
			if($tabs_filters.length) {
				$tabs_filters.each(function () {
					let $that = $(this);
					let $label = $that.find('.js-selected');
					let $option = $that.find('.bef-link-active a');
					if($label.length) {
						$label.append($option.text());
					}
				})
			}

			$tabs_filters.find('.js-selected').on({
				click: function (e) {
					e.preventDefault();
					let $that = $(this);
					$that.toggleClass('is-active');
					$that.closest($tabs_filters).find('.js-drop')
						.toggleClass('is-visible');
				}
			});

			$tabs_filters.find('.js-drop').on({
				click: function (e) {
					let $that = $(this);
					$that.removeClass('is-visible');
					$that.closest($tabs_filters).find('.js-selected')
						.removeClass('is-active');
				}
			});

		},
	};
})(jQuery, Drupal, drupalSettings);
