(($, Drupal, drupalSettings) => {
	Drupal.behaviors.featureSlider = {
		attach: (context, settings) => {
			let init_slider_class = 'slider-initialized';
			let $feature_slider = $('.js-block-slider');
			let $feature_slider_wrap = $feature_slider.find('.features-block__grid', context);
			let $feature_slider_item = $feature_slider.find('.features-block__col', context);
			let $nav_prev = $('<div class="swiper-button-prev js-ft-sl-btn-prev"/>');
			let $nav_next = $('<div class="swiper-button-next js-ft-sl-btn-next"/>');

			let featureSwiper;

			if ($feature_slider.length) {
				$feature_slider_wrap.addClass('swiper-wrapper', context);
				$feature_slider_item.addClass('swiper-slide', context);
				$feature_slider_wrap.wrap('<div class="swiper-container" />');
				$nav_prev.insertAfter($feature_slider_wrap);
				$nav_next.insertAfter($feature_slider_wrap);
			}

			const feature_slider_init = () => {
				if ($feature_slider.length && !$feature_slider.hasClass(init_slider_class)) {
					let $feature_slider_box = $feature_slider.find('.swiper-container', context);
					featureSwiper = new Swiper($feature_slider_box, {
						speed: 750,
						navigation: {
							nextEl: '.js-ft-sl-btn-next',
							prevEl: '.js-ft-sl-btn-prev',
						},
					});
					$feature_slider.addClass(init_slider_class);
				}
			};

			const feature_slider_destroy = () => {
				if ($feature_slider.length && $feature_slider.hasClass(init_slider_class)) {
					featureSwiper.destroy(false, true);
					$feature_slider.removeClass(init_slider_class);
				}
			};

			// Mobile:
			addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
				if (match) {
					feature_slider_init();
				}
				else if (match == false) {
					feature_slider_destroy();
				}
			});
		},
	};
})(jQuery, Drupal, drupalSettings);