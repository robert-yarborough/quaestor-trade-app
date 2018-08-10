import { addMqTriggers } from './plugins/media-queries';

let $root = $("html, body");

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

addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
	if (match) {
		finance_slider_init();
	}
	else if (match == false) {
		finance_slider_destroy();
	}
});

addMqTriggers();