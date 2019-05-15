let moduleIsInited = false;

const setHeaderActions = (($) => {
	return (context) => {
		if (moduleIsInited) {
			return;
		}
		moduleIsInited = true;

		let $w = $(window);

		// Header Helper:

		const header_create_helper = () => {
			let $main_header = $('.js-main-header', context);
			let $h_main_header = $main_header.height();
			let $main_header_helper = $('.js-main-header-helper', context);
			if ($main_header.length && $main_header_helper.length) {
				$main_header_helper.css('height', $h_main_header);
			}
		};
		header_create_helper();
		$w.on('resize', header_create_helper);

		// Language Toggle:

		let $menu_lang_list = $('.js-menu-lang-list, ' +
			'.js-sh--lang .js-h-lang-drop', context);
		let $lang_drop = $('.js-menu-lang-list li:not(.is-current), ' +
			'.js-sh--lang .js-h-lang-drop li:not(.is-active)', context);

		$menu_lang_list.on({
			click: function (e) {
				$(this).toggleClass('is-active');
				$lang_drop.slideToggle();
			}
		});

		// Search Toggle:

		let $h_search_toggle = $('.js-h-search-toggle', context);
		let $h_search_box = $('.js-h-search-box', context);

		$h_search_toggle.on({
			click: function (e) {
				e.preventDefault();
				let $that = $(this);
				let $box = $that.parent().find($h_search_box);
				$that.toggleClass('is-active');
				$box.toggleClass('is-opened');
			}
		});

		// Mobile Toggle:

		let $h_toggle_btn = $('.js-h-toggle-btn', context);
		let $h_toggle_close = $('.js-h-toggle-close', context);
		let $h_toggle_drop = $('.js-h-menu-main', context);

		$h_toggle_btn.on({
			click: function (e) {
				e.preventDefault();
				$(this).toggleClass('is-active');
				$h_toggle_drop.toggleClass('is-opened');
			}
		});
		$h_toggle_close.on({
			click: function (e) {
				e.preventDefault();
				$(this).removeClass('is-active');
				$h_toggle_drop.removeClass('is-opened');
			}
		});

		// Alternative Language Toggle:

		let $h_lang_toggle = $('.js-h-lang-toggle', context);
		let $h_lang_drop = $('.js-h-lang-drop', context);
		$h_lang_toggle.on({
			click: function (e) {
				e.preventDefault();
				$(this).toggleClass('is-active');
				$h_lang_drop.slideToggle();
			}
		});

		// Header Menu Relocate:

		let $h_menu_links = $('.js-h-menu-links', context);
		let $h_menu_main = $('.js-h-menu-main', context);
		let $h_search = $('.js-h-search', context);

		const header_relocate_m = () => {
			if ($h_menu_links.length) {
				$h_menu_links.prependTo($h_menu_main);
				$h_menu_links.addClass('is-visible');
			}
		};

		const header_relocate_d = () => {
			if ($h_menu_links.length) {
				$h_menu_links.insertBefore($h_search);
				$h_menu_links.removeClass('is-visible');
			}
		};

		// Tablet:
		addMediaQueryListener(devicesMQ.desktopMMQ, function (match) {
			if (match) {
				header_relocate_m();
			}
			else if (match == false) {
				header_relocate_d();
			}
		});
	};
})(window.jQuery);
export default setHeaderActions;