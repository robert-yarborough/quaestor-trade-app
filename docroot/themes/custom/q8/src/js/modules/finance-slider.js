(($, Drupal, drupalSettings) => {
    Drupal.behaviors.financeSlider = {
        attach: (context, settings) => {
            let init_slider_class = 'slider-initialized';
            let $finance_slider = $('.js-finance-block-slider', context);
            let financeSwiper;
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

            // Mobile:
            addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
                if (match) {
                    finance_slider_init();
                }
                else if (match == false) {
                    finance_slider_destroy();
                }
            });
        },
    };
})(jQuery, Drupal, drupalSettings);