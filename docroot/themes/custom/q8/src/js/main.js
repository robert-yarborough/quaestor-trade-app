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

		// Animate forms placeholer:

		let $animate_placeholder = $('.js-animate-placeholder', context);
		let $fields = 'input[type="text"],' +
			'input[type="password"],' +
			'input[type="email"],' +
			'input[type="number"],' +
			'input[type="month"],' +
			'input[type="date"],' +
			'input[type="time"],' +
			'input[type="search"],' +
			'input[type="tel"], ' +
			'textarea';
		let $field = $animate_placeholder.find($fields);
		if($animate_placeholder.length) {
			$field.each(function () {
				let $that = $(this);
				let $holder = $that.attr('placeholder');
				if($holder.length) {
					$('<div class="placeholder-label">' + $holder + '</div>')
						.insertBefore($that);
				}
			});
		}

		$field.on('keydown keyup', function() {
			let $that = $(this);
			let $value = $that.val();
			let $holder = $that.prev('.placeholder-label');
			if($holder.length) {
				if($value) {
					$holder.addClass('is-active');
					return
				}
				$holder.removeClass('is-active');
			}
		});

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