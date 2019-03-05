(($, Drupal, drupalSettings) => {
	Drupal.behaviors.selectsStyle = {
		attach: (context, settings) => {
			let $selectDefault = $('select:not(.view-filters select)', context);
			let $selectFilter = $('.view-filters select', context);
			$selectDefault
				.once('selectsStyle')
				.select2({
					minimumResultsForSearch: -1,
					theme: 'default-q8',
					width: '100%',
			});
			$selectFilter
				.once('selectsStyle')
				.select2({
					minimumResultsForSearch: -1,
					theme: 'filter-q8',
					width: '100%',
			});
		},
	};
})(jQuery, Drupal, drupalSettings);
