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

		const animate_init = () => {
			skrollr.init();
		};
		const animate_destroy = () => {
			skrollr.init().destroy();
		};

		// Mobile:
		addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
			if (match) {

			}
			else if (match == false) {

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