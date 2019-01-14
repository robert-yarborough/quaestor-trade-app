
let moduleIsInited = false;

const setMain = (($) => {
    return (context) => {
        if (moduleIsInited) {
            return;
        }
        moduleIsInited = true;
        let $root = $('html, body');

        let $next_scroll_link = $('.js-scroll-next-link');

        $next_scroll_link.on({
            click: function (e) {
                e.preventDefault();
                let $next = $(this).closest('.block-section').next().offset().top;
                $root.animate({scrollTop: $next}, 'slow');
            }
        });

        let $chat_widget = $('#chat-widget-container');
        setTimeout(function () {
            if ($chat_widget.length) {
                $root.addClass('is-cart');
            }
        }, 3000);

        let init_slider_class = 'slider-initialized';
        let $finance_slider = $('.js-finance-block-slider');
        let financeSwiper;

        let $rate_slider = $('.js-rates-block-slider');
        let rateSwiper;
        const finance_slider_init = () => {
            if ($finance_slider.length && !$finance_slider.hasClass(init_slider_class)) {
                financeSwiper = new Swiper($finance_slider, {
                    slidesPerView: 2,
                    speed: 750,
                    navigation: {
                        nextEl: '.js-fin-sl-btn-next',
                        prevEl: '.js-fin-sl-btn-prev',
                    },
                    breakpoints: {
                        550: {
                            slidesPerView: 1,
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

        let $feature_slider = $('.js-block-slider');
        let $feature_slider_wrap = $feature_slider.find('.features-block__grid');
        let $feature_slider_item = $feature_slider.find('.features-block__col');
        let $nav_prev = $('<div class="swiper-button-prev js-ft-sl-btn-prev"/>');
        let $nav_next = $('<div class="swiper-button-next js-ft-sl-btn-next"/>');
        let featureSwiper;

        if ($feature_slider.length) {
            $feature_slider_wrap.addClass('swiper-wrapper');
            $feature_slider_item.addClass('swiper-slide');
            $feature_slider_wrap.wrap('<div class="swiper-container" />');
            $nav_prev.insertAfter($feature_slider_wrap);
            $nav_next.insertAfter($feature_slider_wrap);
        }

        const feature_slider_init = () => {
            if ($feature_slider.length && !$feature_slider.hasClass(init_slider_class)) {
                let $feature_slider_box = $feature_slider.find('.swiper-container');
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
                rate_slider_init();
                feature_slider_init();
            }
            else if (match == false) {
                finance_slider_destroy();
                rate_slider_destroy();
                feature_slider_destroy();
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
    };
})(window.jQuery);
export default setMain;