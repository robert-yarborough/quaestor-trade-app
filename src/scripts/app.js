import { addMqTriggers } from './plugins/media-queries';
//import setFinanceApi from './plugins/jquery-yahoo-finance-api';

let $root = $('html, body');

let $menu_lang_list = $('.js-menu-lang-list');
let $lang_drop = $('.js-menu-lang-list li:not(.is-current)');

$menu_lang_list.on({
	click: function (e) {
		$(this).toggleClass('is-active');
		$lang_drop.slideToggle();
	}
});

let $next_scroll_link = $('.js-scroll-next-link');

$next_scroll_link.on({
	click: function (e) {
		e.preventDefault();
		let $next = $(this).closest('.block-section').next().offset().top;
		$root.animate({scrollTop: $next}, 'slow');
	}
});

let $h_search_toggle =$('.js-h-search-toggle');
let $h_search_box =$('.js-h-search-box');

$h_search_toggle.on({
    click: function (e) {
        e.preventDefault();
        let $that = $(this);
        let $box = $that.parent().find($h_search_box);
        $that.toggleClass('is-active');
        $box.toggleClass('is-opened');
    }
});

let $h_toggle_btn = $('.js-h-toggle-btn');
let $h_toggle_close = $('.js-h-toggle-close');
let $h_toggle_drop = $('.js-h-menu-main');

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

let $h_lang_toggle = $('.js-h-lang-toggle');
let $h_lang_drop = $('.js-h-lang-drop');
$h_lang_toggle.on({
    click: function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        $h_lang_drop.slideToggle();
    }
});

let init_slider_class = 'slider-initialized';
let $finance_slider = $('.js-finance-block-slider');
let financeSwiper;

const finance_slider_init = () => {
	if ($finance_slider.length && !$finance_slider.hasClass(init_slider_class)) {
		financeSwiper = new Swiper ($finance_slider, {
			slidesPerView: 3,
			speed: 750,
			navigation: {
				nextEl: '.js-fin-sl-btn-next',
				prevEl: '.js-fin-sl-btn-prev',
			},
			breakpoints: {
				550: {
					slidesPerView: 2,
				}
			},
		});
		$finance_slider.addClass(init_slider_class);
	}
};

const finance_slider_destroy = () => {
	if ($finance_slider.length && $finance_slider.hasClass(init_slider_class)) {
		financeSwiper.destroy(false, true);
		$finance_slider.removeClass(init_slider_class);
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
		finance_slider_init();
	}
	else if (match == false) {
		finance_slider_destroy();
	}
});

let $h_menu_links = $('.js-h-menu-links');
let $h_menu_main = $('.js-h-menu-main');
let $h_search = $('.js-h-search');

const header_relocate_m = () => {
    if ($h_menu_links.length) {
        $h_menu_links.prependTo($h_menu_main);
    }
};

const header_relocate_d = () => {
    if ($h_menu_links.length) {
        $h_menu_links.insertBefore($h_search);
    }
};

// Tablet:
addMediaQueryListener(devicesMQ.desktopMMQ, function (match) {
    if (match) {
        header_relocate_m();
        animate_destroy();
    }
    else if (match == false) {
        header_relocate_d();
        animate_init();
    }
});

addMqTriggers();
//setFinanceApi();