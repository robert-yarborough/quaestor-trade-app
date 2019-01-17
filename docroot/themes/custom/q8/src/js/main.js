let moduleIsInited = false;

const setMain = (($) => {
	return (context) => {
		if (moduleIsInited) {
			return;
		}
		moduleIsInited = true;
		let $root = $('html, body', context);

		let $next_scroll_link = $('.js-scroll-next-link', context);

		$next_scroll_link.on({
			click: function (e) {
				e.preventDefault();
				let $next = $(this).closest('.block-section').next().offset().top;
				$root.animate({scrollTop: $next}, 'slow');
			}
		});

		let $chat_widget = $('#chat-widget-container', context);
		setTimeout(function () {
			if ($chat_widget.length) {
				$root.addClass('is-cart');
			}
		}, 3000);

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


		const animate_init = () => {
			skrollr.init();
		};
		const animate_destroy = () => {
			skrollr.init().destroy();
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


		// Tablet:
		addMediaQueryListener(devicesMQ.desktopMMQ, function (match) {
			if (match) {
				animate_destroy();
			}
			else if (match == false) {
				animate_init();
			}
		});
	};
})(window.jQuery);
export default setMain;