(($, Drupal, drupalSettings) => {
	Drupal.behaviors.ratesSlider = {
		attach: (context, settings) => {
			let init_slider_class = 'slider-initialized';

			let $rate_slider = $('.js-rates-block-slider', context);
			let rateSwiper;


			const rate_slider_init = () => {
				if ($rate_slider.length) {
					rateSwiper = new Swiper($rate_slider, {
						slidesPerView: 2,
						speed: 750,
						navigation: {
							nextEl: '.js-rate-sl-btn-next',
							prevEl: '.js-rate-sl-btn-prev',
						},
						breakpoints: {
							550: {
								slidesPerView: 1,
							}
						},
					});
					$rate_slider.addClass(init_slider_class);
				}
			};

			const rate_slider_destroy = () => {
				if ($rate_slider.length && $rate_slider.hasClass(init_slider_class)) {
					rateSwiper.destroy(false, true);
					$rate_slider.removeClass(init_slider_class);
				}
			};

			// Mobile:
			addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
				if (match) {
					rate_slider_init();
				}
				else if (match == false) {
					rate_slider_destroy();
				}
			});
		},
	};
})(jQuery, Drupal, drupalSettings);