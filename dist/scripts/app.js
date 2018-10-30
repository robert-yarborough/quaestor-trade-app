webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {\n\nvar _mediaQueries = __webpack_require__(3);\n\n//import setFinanceApi from './plugins/jquery-yahoo-finance-api';\n\nvar $root = $('html, body');\n\nvar $menu_lang_list = $('.js-menu-lang-list');\nvar $lang_drop = $('.js-menu-lang-list li:not(.is-current)');\n\n$menu_lang_list.on({\n    click: function click(e) {\n        $(this).toggleClass('is-active');\n        $lang_drop.slideToggle();\n    }\n});\n\nvar $next_scroll_link = $('.js-scroll-next-link');\n\n$next_scroll_link.on({\n    click: function click(e) {\n        e.preventDefault();\n        var $next = $(this).closest('.block-section').next().offset().top;\n        $root.animate({ scrollTop: $next }, 'slow');\n    }\n});\n\nvar $h_search_toggle = $('.js-h-search-toggle');\nvar $h_search_box = $('.js-h-search-box');\n\n$h_search_toggle.on({\n    click: function click(e) {\n        e.preventDefault();\n        var $that = $(this);\n        var $box = $that.parent().find($h_search_box);\n        $that.toggleClass('is-active');\n        $box.toggleClass('is-opened');\n    }\n});\n\nvar $h_toggle_btn = $('.js-h-toggle-btn');\nvar $h_toggle_close = $('.js-h-toggle-close');\nvar $h_toggle_drop = $('.js-h-menu-main');\n\n$h_toggle_btn.on({\n    click: function click(e) {\n        e.preventDefault();\n        $(this).toggleClass('is-active');\n        $h_toggle_drop.toggleClass('is-opened');\n    }\n});\n$h_toggle_close.on({\n    click: function click(e) {\n        e.preventDefault();\n        $(this).removeClass('is-active');\n        $h_toggle_drop.removeClass('is-opened');\n    }\n});\n\nvar $h_lang_toggle = $('.js-h-lang-toggle');\nvar $h_lang_drop = $('.js-h-lang-drop');\n$h_lang_toggle.on({\n    click: function click(e) {\n        e.preventDefault();\n        $(this).toggleClass('is-active');\n        $h_lang_drop.slideToggle();\n    }\n});\n\nvar init_slider_class = 'slider-initialized';\nvar $finance_slider = $('.js-finance-block-slider');\nvar financeSwiper = void 0;\n\nvar finance_slider_init = function finance_slider_init() {\n    if ($finance_slider.length && !$finance_slider.hasClass(init_slider_class)) {\n        financeSwiper = new Swiper($finance_slider, {\n            slidesPerView: 3,\n            speed: 750,\n            navigation: {\n                nextEl: '.js-fin-sl-btn-next',\n                prevEl: '.js-fin-sl-btn-prev'\n            },\n            breakpoints: {\n                550: {\n                    slidesPerView: 2\n                }\n            }\n        });\n        $finance_slider.addClass(init_slider_class);\n    }\n};\n\nvar finance_slider_destroy = function finance_slider_destroy() {\n    if ($finance_slider.length && $finance_slider.hasClass(init_slider_class)) {\n        financeSwiper.destroy(false, true);\n        $finance_slider.removeClass(init_slider_class);\n    }\n};\n\nvar $feature_slider = $('.js-features-block-slider');\nvar $feature_slider_wrap = $feature_slider.find('.features-block__grid');\nvar $feature_slider_item = $feature_slider.find('.features-block__col');\nvar $nav_prev = $('<div class=\"swiper-button-prev js-ft-sl-btn-prev\"/>');\nvar $nav_next = $('<div class=\"swiper-button-next js-ft-sl-btn-next\"/>');\nvar featureSwiper = void 0;\n\nif ($feature_slider.length) {\n    $feature_slider_wrap.addClass('swiper-wrapper');\n    $feature_slider_item.addClass('swiper-slide');\n    $feature_slider_wrap.wrap('<div class=\"swiper-container\" />');\n    $nav_prev.insertAfter($feature_slider_wrap);\n    $nav_next.insertAfter($feature_slider_wrap);\n}\n\nvar feature_slider_init = function feature_slider_init() {\n    if ($feature_slider.length && !$feature_slider.hasClass(init_slider_class)) {\n        var $feature_slider_box = $feature_slider.find('.swiper-container');\n        featureSwiper = new Swiper($feature_slider_box, {\n            speed: 750,\n            navigation: {\n                nextEl: '.js-ft-sl-btn-next',\n                prevEl: '.js-ft-sl-btn-prev'\n            }\n        });\n        $feature_slider.addClass(init_slider_class);\n    }\n};\n\nvar feature_slider_destroy = function feature_slider_destroy() {\n    if ($feature_slider.length && $feature_slider.hasClass(init_slider_class)) {\n        featureSwiper.destroy(false, true);\n        $feature_slider.removeClass(init_slider_class);\n    }\n};\n\nvar animate_init = function animate_init() {\n    skrollr.init();\n};\nvar animate_destroy = function animate_destroy() {\n    skrollr.init().destroy();\n};\n\n// Mobile:\naddMediaQueryListener(devicesMQ.mobileMQ, function (match) {\n    if (match) {\n        finance_slider_init();\n        feature_slider_init();\n    } else if (match == false) {\n        finance_slider_destroy();\n        feature_slider_destroy();\n    }\n});\n\nvar $h_menu_links = $('.js-h-menu-links');\nvar $h_menu_main = $('.js-h-menu-main');\nvar $h_search = $('.js-h-search');\n\nvar header_relocate_m = function header_relocate_m() {\n    if ($h_menu_links.length) {\n        $h_menu_links.prependTo($h_menu_main);\n    }\n};\n\nvar header_relocate_d = function header_relocate_d() {\n    if ($h_menu_links.length) {\n        $h_menu_links.insertBefore($h_search);\n    }\n};\n\n// Tablet:\naddMediaQueryListener(devicesMQ.desktopMMQ, function (match) {\n    if (match) {\n        header_relocate_m();\n        animate_destroy();\n    } else if (match == false) {\n        header_relocate_d();\n        animate_init();\n    }\n});\n\n(0, _mediaQueries.addMqTriggers)();\n//setFinanceApi();\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvc2NyaXB0cy9hcHAuanM/ODVmMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhZGRNcVRyaWdnZXJzIH0gZnJvbSAnLi9wbHVnaW5zL21lZGlhLXF1ZXJpZXMnO1xuLy9pbXBvcnQgc2V0RmluYW5jZUFwaSBmcm9tICcuL3BsdWdpbnMvanF1ZXJ5LXlhaG9vLWZpbmFuY2UtYXBpJztcblxubGV0ICRyb290ID0gJCgnaHRtbCwgYm9keScpO1xuXG5sZXQgJG1lbnVfbGFuZ19saXN0ID0gJCgnLmpzLW1lbnUtbGFuZy1saXN0Jyk7XG5sZXQgJGxhbmdfZHJvcCA9ICQoJy5qcy1tZW51LWxhbmctbGlzdCBsaTpub3QoLmlzLWN1cnJlbnQpJyk7XG5cbiRtZW51X2xhbmdfbGlzdC5vbih7XG5cdGNsaWNrOiBmdW5jdGlvbiAoZSkge1xuXHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXHRcdCRsYW5nX2Ryb3Auc2xpZGVUb2dnbGUoKTtcblx0fVxufSk7XG5cbmxldCAkbmV4dF9zY3JvbGxfbGluayA9ICQoJy5qcy1zY3JvbGwtbmV4dC1saW5rJyk7XG5cbiRuZXh0X3Njcm9sbF9saW5rLm9uKHtcblx0Y2xpY2s6IGZ1bmN0aW9uIChlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGxldCAkbmV4dCA9ICQodGhpcykuY2xvc2VzdCgnLmJsb2NrLXNlY3Rpb24nKS5uZXh0KCkub2Zmc2V0KCkudG9wO1xuXHRcdCRyb290LmFuaW1hdGUoe3Njcm9sbFRvcDogJG5leHR9LCAnc2xvdycpO1xuXHR9XG59KTtcblxubGV0ICRoX3NlYXJjaF90b2dnbGUgPSQoJy5qcy1oLXNlYXJjaC10b2dnbGUnKTtcbmxldCAkaF9zZWFyY2hfYm94ID0kKCcuanMtaC1zZWFyY2gtYm94Jyk7XG5cbiRoX3NlYXJjaF90b2dnbGUub24oe1xuICAgIGNsaWNrOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGxldCAkdGhhdCA9ICQodGhpcyk7XG4gICAgICAgIGxldCAkYm94ID0gJHRoYXQucGFyZW50KCkuZmluZCgkaF9zZWFyY2hfYm94KTtcbiAgICAgICAgJHRoYXQudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICAkYm94LnRvZ2dsZUNsYXNzKCdpcy1vcGVuZWQnKTtcbiAgICB9XG59KTtcblxubGV0ICRoX3RvZ2dsZV9idG4gPSAkKCcuanMtaC10b2dnbGUtYnRuJyk7XG5sZXQgJGhfdG9nZ2xlX2Nsb3NlID0gJCgnLmpzLWgtdG9nZ2xlLWNsb3NlJyk7XG5sZXQgJGhfdG9nZ2xlX2Ryb3AgPSAkKCcuanMtaC1tZW51LW1haW4nKTtcblxuJGhfdG9nZ2xlX2J0bi5vbih7XG4gICAgY2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICRoX3RvZ2dsZV9kcm9wLnRvZ2dsZUNsYXNzKCdpcy1vcGVuZWQnKTtcbiAgICB9XG59KTtcbiRoX3RvZ2dsZV9jbG9zZS5vbih7XG4gICAgY2xpY2s6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICRoX3RvZ2dsZV9kcm9wLnJlbW92ZUNsYXNzKCdpcy1vcGVuZWQnKTtcbiAgICB9XG59KTtcblxubGV0ICRoX2xhbmdfdG9nZ2xlID0gJCgnLmpzLWgtbGFuZy10b2dnbGUnKTtcbmxldCAkaF9sYW5nX2Ryb3AgPSAkKCcuanMtaC1sYW5nLWRyb3AnKTtcbiRoX2xhbmdfdG9nZ2xlLm9uKHtcbiAgICBjbGljazogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJGhfbGFuZ19kcm9wLnNsaWRlVG9nZ2xlKCk7XG4gICAgfVxufSk7XG5cbmxldCBpbml0X3NsaWRlcl9jbGFzcyA9ICdzbGlkZXItaW5pdGlhbGl6ZWQnO1xubGV0ICRmaW5hbmNlX3NsaWRlciA9ICQoJy5qcy1maW5hbmNlLWJsb2NrLXNsaWRlcicpO1xubGV0IGZpbmFuY2VTd2lwZXI7XG5cbmNvbnN0IGZpbmFuY2Vfc2xpZGVyX2luaXQgPSAoKSA9PiB7XG5cdGlmICgkZmluYW5jZV9zbGlkZXIubGVuZ3RoICYmICEkZmluYW5jZV9zbGlkZXIuaGFzQ2xhc3MoaW5pdF9zbGlkZXJfY2xhc3MpKSB7XG5cdFx0ZmluYW5jZVN3aXBlciA9IG5ldyBTd2lwZXIgKCRmaW5hbmNlX3NsaWRlciwge1xuXHRcdFx0c2xpZGVzUGVyVmlldzogMyxcblx0XHRcdHNwZWVkOiA3NTAsXG5cdFx0XHRuYXZpZ2F0aW9uOiB7XG5cdFx0XHRcdG5leHRFbDogJy5qcy1maW4tc2wtYnRuLW5leHQnLFxuXHRcdFx0XHRwcmV2RWw6ICcuanMtZmluLXNsLWJ0bi1wcmV2Jyxcblx0XHRcdH0sXG5cdFx0XHRicmVha3BvaW50czoge1xuXHRcdFx0XHQ1NTA6IHtcblx0XHRcdFx0XHRzbGlkZXNQZXJWaWV3OiAyLFxuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdH0pO1xuXHRcdCRmaW5hbmNlX3NsaWRlci5hZGRDbGFzcyhpbml0X3NsaWRlcl9jbGFzcyk7XG5cdH1cbn07XG5cbmNvbnN0IGZpbmFuY2Vfc2xpZGVyX2Rlc3Ryb3kgPSAoKSA9PiB7XG5cdGlmICgkZmluYW5jZV9zbGlkZXIubGVuZ3RoICYmICRmaW5hbmNlX3NsaWRlci5oYXNDbGFzcyhpbml0X3NsaWRlcl9jbGFzcykpIHtcblx0XHRmaW5hbmNlU3dpcGVyLmRlc3Ryb3koZmFsc2UsIHRydWUpO1xuXHRcdCRmaW5hbmNlX3NsaWRlci5yZW1vdmVDbGFzcyhpbml0X3NsaWRlcl9jbGFzcyk7XG5cdH1cbn07XG5cbmxldCAkZmVhdHVyZV9zbGlkZXIgPSAkKCcuanMtZmVhdHVyZXMtYmxvY2stc2xpZGVyJyk7XG5sZXQgJGZlYXR1cmVfc2xpZGVyX3dyYXAgPSAkZmVhdHVyZV9zbGlkZXIuZmluZCgnLmZlYXR1cmVzLWJsb2NrX19ncmlkJyk7XG5sZXQgJGZlYXR1cmVfc2xpZGVyX2l0ZW0gPSAkZmVhdHVyZV9zbGlkZXIuZmluZCgnLmZlYXR1cmVzLWJsb2NrX19jb2wnKTtcbmxldCAkbmF2X3ByZXYgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLWJ1dHRvbi1wcmV2IGpzLWZ0LXNsLWJ0bi1wcmV2XCIvPicpO1xubGV0ICRuYXZfbmV4dCA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItYnV0dG9uLW5leHQganMtZnQtc2wtYnRuLW5leHRcIi8+Jyk7XG5sZXQgZmVhdHVyZVN3aXBlcjtcblxuaWYgKCRmZWF0dXJlX3NsaWRlci5sZW5ndGgpIHtcbiAgICAkZmVhdHVyZV9zbGlkZXJfd3JhcC5hZGRDbGFzcygnc3dpcGVyLXdyYXBwZXInKTtcbiAgICAkZmVhdHVyZV9zbGlkZXJfaXRlbS5hZGRDbGFzcygnc3dpcGVyLXNsaWRlJyk7XG4gICAgJGZlYXR1cmVfc2xpZGVyX3dyYXAud3JhcCgnPGRpdiBjbGFzcz1cInN3aXBlci1jb250YWluZXJcIiAvPicpO1xuICAgICRuYXZfcHJldi5pbnNlcnRBZnRlcigkZmVhdHVyZV9zbGlkZXJfd3JhcCk7XG4gICAgJG5hdl9uZXh0Lmluc2VydEFmdGVyKCRmZWF0dXJlX3NsaWRlcl93cmFwKTtcbn1cblxuY29uc3QgZmVhdHVyZV9zbGlkZXJfaW5pdCA9ICgpID0+IHtcbiAgICBpZiAoJGZlYXR1cmVfc2xpZGVyLmxlbmd0aCAmJiAhJGZlYXR1cmVfc2xpZGVyLmhhc0NsYXNzKGluaXRfc2xpZGVyX2NsYXNzKSkge1xuICAgICAgICBsZXQgJGZlYXR1cmVfc2xpZGVyX2JveCA9ICRmZWF0dXJlX3NsaWRlci5maW5kKCcuc3dpcGVyLWNvbnRhaW5lcicpO1xuICAgICAgICBmZWF0dXJlU3dpcGVyID0gbmV3IFN3aXBlciAoJGZlYXR1cmVfc2xpZGVyX2JveCwge1xuICAgICAgICAgICAgc3BlZWQ6IDc1MCxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6ICcuanMtZnQtc2wtYnRuLW5leHQnLFxuICAgICAgICAgICAgICAgIHByZXZFbDogJy5qcy1mdC1zbC1idG4tcHJldicsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgJGZlYXR1cmVfc2xpZGVyLmFkZENsYXNzKGluaXRfc2xpZGVyX2NsYXNzKTtcbiAgICB9XG59O1xuXG5jb25zdCBmZWF0dXJlX3NsaWRlcl9kZXN0cm95ID0gKCkgPT4ge1xuICAgIGlmICgkZmVhdHVyZV9zbGlkZXIubGVuZ3RoICYmICRmZWF0dXJlX3NsaWRlci5oYXNDbGFzcyhpbml0X3NsaWRlcl9jbGFzcykpIHtcbiAgICAgICAgZmVhdHVyZVN3aXBlci5kZXN0cm95KGZhbHNlLCB0cnVlKTtcbiAgICAgICAgJGZlYXR1cmVfc2xpZGVyLnJlbW92ZUNsYXNzKGluaXRfc2xpZGVyX2NsYXNzKTtcbiAgICB9XG59O1xuXG5jb25zdCBhbmltYXRlX2luaXQgPSAoKSA9PiB7XG4gICAgc2tyb2xsci5pbml0KCk7XG59O1xuY29uc3QgYW5pbWF0ZV9kZXN0cm95ID0gKCkgPT4ge1xuICAgIHNrcm9sbHIuaW5pdCgpLmRlc3Ryb3koKTtcbn07XG5cbi8vIE1vYmlsZTpcbmFkZE1lZGlhUXVlcnlMaXN0ZW5lcihkZXZpY2VzTVEubW9iaWxlTVEsIGZ1bmN0aW9uIChtYXRjaCkge1xuXHRpZiAobWF0Y2gpIHtcblx0XHRmaW5hbmNlX3NsaWRlcl9pbml0KCk7XG4gICAgICAgIGZlYXR1cmVfc2xpZGVyX2luaXQoKTtcblx0fVxuXHRlbHNlIGlmIChtYXRjaCA9PSBmYWxzZSkge1xuXHRcdGZpbmFuY2Vfc2xpZGVyX2Rlc3Ryb3koKTtcbiAgICAgICAgZmVhdHVyZV9zbGlkZXJfZGVzdHJveSgpO1xuXHR9XG59KTtcblxubGV0ICRoX21lbnVfbGlua3MgPSAkKCcuanMtaC1tZW51LWxpbmtzJyk7XG5sZXQgJGhfbWVudV9tYWluID0gJCgnLmpzLWgtbWVudS1tYWluJyk7XG5sZXQgJGhfc2VhcmNoID0gJCgnLmpzLWgtc2VhcmNoJyk7XG5cbmNvbnN0IGhlYWRlcl9yZWxvY2F0ZV9tID0gKCkgPT4ge1xuICAgIGlmICgkaF9tZW51X2xpbmtzLmxlbmd0aCkge1xuICAgICAgICAkaF9tZW51X2xpbmtzLnByZXBlbmRUbygkaF9tZW51X21haW4pO1xuICAgIH1cbn07XG5cbmNvbnN0IGhlYWRlcl9yZWxvY2F0ZV9kID0gKCkgPT4ge1xuICAgIGlmICgkaF9tZW51X2xpbmtzLmxlbmd0aCkge1xuICAgICAgICAkaF9tZW51X2xpbmtzLmluc2VydEJlZm9yZSgkaF9zZWFyY2gpO1xuICAgIH1cbn07XG5cbi8vIFRhYmxldDpcbmFkZE1lZGlhUXVlcnlMaXN0ZW5lcihkZXZpY2VzTVEuZGVza3RvcE1NUSwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIGhlYWRlcl9yZWxvY2F0ZV9tKCk7XG4gICAgICAgIGFuaW1hdGVfZGVzdHJveSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChtYXRjaCA9PSBmYWxzZSkge1xuICAgICAgICBoZWFkZXJfcmVsb2NhdGVfZCgpO1xuICAgICAgICBhbmltYXRlX2luaXQoKTtcbiAgICB9XG59KTtcblxuYWRkTXFUcmlnZ2VycygpO1xuLy9zZXRGaW5hbmNlQXBpKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9zY3JpcHRzL2FwcC5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBUEE7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nvar $ = __webpack_provided_window_dot_jQuery;\nvar desktopN = 1616;\nvar desktopNM = 1224;\nvar tabletNL = 1024;\nvar tabletN = 768;\nvar mobileMNBT = 576;\nvar mobileMN = 544;\nvar devicesMQ = {\n    touch: 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,\n    desktopN: desktopN,\n    desktopNM: desktopNM,\n    tabletNL: tabletNL,\n    tabletN: tabletN,\n    mobileMNBT: mobileMNBT,\n    mobileMN: mobileMN,\n    mqBaseTxt: 'only screen and ',\n    desktopMQ: 'only screen and (min-width: ' + desktopN + 'px)',\n    desktopMMQ: 'only screen and (max-width: ' + desktopNM + 'px)',\n    tabletMLQ: 'only screen and (max-width: ' + (tabletNL - 1) + 'px)',\n    tabletMQ: 'only screen and (min-width: ' + tabletN + 'px) and (max-width: ' + (desktopN - 1) + 'px)',\n    mobileMQ: 'only screen and (max-width: ' + (tabletN - 1) + 'px)',\n    mobileMBTQ: 'only screen and (max-width: ' + (mobileMNBT - 1) + 'px)',\n    mobileMMQ: 'only screen and (max-width: ' + (mobileMN - 1) + 'px)',\n    desktop: false,\n    desktopM: false,\n    tabletL: false,\n    tablet: false,\n    mobile: false,\n    mobileM: false,\n    mobileMBT: false\n};\n\nwindow.devicesMQ = devicesMQ;\n\nvar $w = $(window);\n$(document.documentElement).addClass((devicesMQ.touch ? '' : 'no-') + 'touch');\n\nvar addMediaQueryListener = function addMediaQueryListener(query, callback) {\n    var host = {};\n    var res = window.matchMedia(query);\n\n    callback.apply(host, [res.matches, res.media]);\n    res.addListener(function (changed) {\n        callback.apply(host, [changed.matches, changed.media]);\n    });\n};\nwindow.addMediaQueryListener = addMediaQueryListener;\n\nvar mq = addMediaQueryListener;\n\nvar addMqTriggers = function addMqTriggers() {\n    // desktop\n    addMediaQueryListener(devicesMQ.desktopMQ, function (match) {\n        devicesMQ.desktop = match;\n        $w.trigger('desktop.mq', [match]);\n    });\n    // desktop less\n    addMediaQueryListener(devicesMQ.desktopMMQ, function (match) {\n        devicesMQ.desktopM = match;\n        $w.trigger('desktopM.mq', [match]);\n    });\n    // tablet large\n    addMediaQueryListener(devicesMQ.tabletMLQ, function (match) {\n        devicesMQ.tabletL = match;\n        $w.trigger('tabletL.mq', [match]);\n    });\n    // tablet\n    addMediaQueryListener(devicesMQ.tabletMQ, function (match) {\n        devicesMQ.tablet = match;\n        $w.trigger('tablet.mq', [match]);\n    });\n    // mobile\n    addMediaQueryListener(devicesMQ.mobileMQ, function (match) {\n        devicesMQ.mobile = match;\n        $w.trigger('mobile.mq', [match]);\n    });\n    // mobile less for Bootstrap\n    addMediaQueryListener(devicesMQ.mobileMBTQ, function (match) {\n        devicesMQ.mobileMBT = match;\n        $w.trigger('mobileMBT.mq', [match]);\n    });\n    // mobile less\n    addMediaQueryListener(devicesMQ.mobileMMQ, function (match) {\n        devicesMQ.mobileM = match;\n        $w.trigger('mobileM.mq', [match]);\n    });\n};\n\nexports.$w = $w;\nexports.devicesMQ = devicesMQ;\nexports.mq = mq;\nexports.addMqTriggers = addMqTriggers;\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvc2NyaXB0cy9wbHVnaW5zL21lZGlhLXF1ZXJpZXMuanM/MGViMyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCAkID0gd2luZG93LmpRdWVyeTtcclxuY29uc3QgZGVza3RvcE4gPSAxNjE2O1xyXG5jb25zdCBkZXNrdG9wTk0gPSAxMjI0O1xyXG5jb25zdCB0YWJsZXROTCA9IDEwMjQ7XHJcbmNvbnN0IHRhYmxldE4gPSA3Njg7XHJcbmNvbnN0IG1vYmlsZU1OQlQgPSA1NzY7XHJcbmNvbnN0IG1vYmlsZU1OID0gNTQ0O1xyXG5jb25zdCBkZXZpY2VzTVEgPSB7XHJcbiAgICB0b3VjaDogKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IChuYXZpZ2F0b3IuTWF4VG91Y2hQb2ludHMgPiAwKSB8fCAobmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwKSksXHJcbiAgICBkZXNrdG9wTixcclxuICAgIGRlc2t0b3BOTSxcclxuICAgIHRhYmxldE5MLFxyXG4gICAgdGFibGV0TixcclxuICAgIG1vYmlsZU1OQlQsXHJcbiAgICBtb2JpbGVNTixcclxuICAgIG1xQmFzZVR4dDogJ29ubHkgc2NyZWVuIGFuZCAnLFxyXG4gICAgZGVza3RvcE1ROiBgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICR7ZGVza3RvcE59cHgpYCxcclxuICAgIGRlc2t0b3BNTVE6IGBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtkZXNrdG9wTk19cHgpYCxcclxuICAgIHRhYmxldE1MUTogYG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3RhYmxldE5MIC0gMX1weClgLFxyXG4gICAgdGFibGV0TVE6IGBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJHt0YWJsZXROfXB4KSBhbmQgKG1heC13aWR0aDogJHtkZXNrdG9wTiAtIDF9cHgpYCxcclxuICAgIG1vYmlsZU1ROiBgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7dGFibGV0TiAtIDF9cHgpYCxcclxuICAgIG1vYmlsZU1CVFE6IGBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHttb2JpbGVNTkJUIC0gMX1weClgLFxyXG4gICAgbW9iaWxlTU1ROiBgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7bW9iaWxlTU4gLSAxfXB4KWAsXHJcbiAgICBkZXNrdG9wOiBmYWxzZSxcclxuICAgIGRlc2t0b3BNOiBmYWxzZSxcclxuICAgIHRhYmxldEw6IGZhbHNlLFxyXG4gICAgdGFibGV0OiBmYWxzZSxcclxuICAgIG1vYmlsZTogZmFsc2UsXHJcbiAgICBtb2JpbGVNOiBmYWxzZSxcclxuICAgIG1vYmlsZU1CVDogZmFsc2UsXHJcbn07XHJcblxyXG53aW5kb3cuZGV2aWNlc01RID0gZGV2aWNlc01RO1xyXG5cclxuY29uc3QgJHcgPSAkKHdpbmRvdyk7XHJcbiQoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5hZGRDbGFzcyhgJHsoZGV2aWNlc01RLnRvdWNoID8gJycgOiAnbm8tJyl9dG91Y2hgKTtcclxuXHJcbmNvbnN0IGFkZE1lZGlhUXVlcnlMaXN0ZW5lciA9IChxdWVyeSwgY2FsbGJhY2spID0+IHtcclxuICAgIGNvbnN0IGhvc3QgPSB7fTtcclxuICAgIGNvbnN0IHJlcyA9IHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KTtcclxuXHJcbiAgICBjYWxsYmFjay5hcHBseShob3N0LCBbcmVzLm1hdGNoZXMsIHJlcy5tZWRpYV0pO1xyXG4gICAgcmVzLmFkZExpc3RlbmVyKChjaGFuZ2VkKSA9PiB7XHJcbiAgICAgICAgY2FsbGJhY2suYXBwbHkoaG9zdCwgW2NoYW5nZWQubWF0Y2hlcywgY2hhbmdlZC5tZWRpYV0pO1xyXG4gICAgfSk7XHJcbn07XHJcbndpbmRvdy5hZGRNZWRpYVF1ZXJ5TGlzdGVuZXIgPSBhZGRNZWRpYVF1ZXJ5TGlzdGVuZXI7XHJcblxyXG5jb25zdCBtcSA9IGFkZE1lZGlhUXVlcnlMaXN0ZW5lcjtcclxuXHJcbmNvbnN0IGFkZE1xVHJpZ2dlcnMgPSAoKSA9PiB7XHJcbiAgICAvLyBkZXNrdG9wXHJcbiAgICBhZGRNZWRpYVF1ZXJ5TGlzdGVuZXIoXHJcbiAgICAgICAgZGV2aWNlc01RLmRlc2t0b3BNUSxcclxuICAgICAgICAobWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgZGV2aWNlc01RLmRlc2t0b3AgPSBtYXRjaDtcclxuICAgICAgICAgICAgJHcudHJpZ2dlcignZGVza3RvcC5tcScsIFttYXRjaF0pO1xyXG4gICAgICAgIH0sXHJcbiAgICApO1xyXG4gICAgLy8gZGVza3RvcCBsZXNzXHJcbiAgICBhZGRNZWRpYVF1ZXJ5TGlzdGVuZXIoXHJcbiAgICAgICAgZGV2aWNlc01RLmRlc2t0b3BNTVEsXHJcbiAgICAgICAgKG1hdGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGRldmljZXNNUS5kZXNrdG9wTSA9IG1hdGNoO1xyXG4gICAgICAgICAgICAkdy50cmlnZ2VyKCdkZXNrdG9wTS5tcScsIFttYXRjaF0pO1xyXG4gICAgICAgIH0sXHJcbiAgICApO1xyXG4gICAgLy8gdGFibGV0IGxhcmdlXHJcbiAgICBhZGRNZWRpYVF1ZXJ5TGlzdGVuZXIoXHJcbiAgICAgICAgZGV2aWNlc01RLnRhYmxldE1MUSxcclxuICAgICAgICAobWF0Y2gpID0+IHtcclxuICAgICAgICAgICAgZGV2aWNlc01RLnRhYmxldEwgPSBtYXRjaDtcclxuICAgICAgICAgICAgJHcudHJpZ2dlcigndGFibGV0TC5tcScsIFttYXRjaF0pO1xyXG4gICAgICAgIH0sXHJcbiAgICApO1xyXG4gICAgLy8gdGFibGV0XHJcbiAgICBhZGRNZWRpYVF1ZXJ5TGlzdGVuZXIoXHJcbiAgICAgICAgZGV2aWNlc01RLnRhYmxldE1RLFxyXG4gICAgICAgIChtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBkZXZpY2VzTVEudGFibGV0ID0gbWF0Y2g7XHJcbiAgICAgICAgICAgICR3LnRyaWdnZXIoJ3RhYmxldC5tcScsIFttYXRjaF0pO1xyXG4gICAgICAgIH0sXHJcbiAgICApO1xyXG4gICAgLy8gbW9iaWxlXHJcbiAgICBhZGRNZWRpYVF1ZXJ5TGlzdGVuZXIoXHJcbiAgICAgICAgZGV2aWNlc01RLm1vYmlsZU1RLFxyXG4gICAgICAgIChtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBkZXZpY2VzTVEubW9iaWxlID0gbWF0Y2g7XHJcbiAgICAgICAgICAgICR3LnRyaWdnZXIoJ21vYmlsZS5tcScsIFttYXRjaF0pO1xyXG4gICAgICAgIH0sXHJcbiAgICApO1xyXG4gICAgLy8gbW9iaWxlIGxlc3MgZm9yIEJvb3RzdHJhcFxyXG4gICAgYWRkTWVkaWFRdWVyeUxpc3RlbmVyKFxyXG4gICAgICAgIGRldmljZXNNUS5tb2JpbGVNQlRRLFxyXG4gICAgICAgIChtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBkZXZpY2VzTVEubW9iaWxlTUJUID0gbWF0Y2g7XHJcbiAgICAgICAgICAgICR3LnRyaWdnZXIoJ21vYmlsZU1CVC5tcScsIFttYXRjaF0pO1xyXG4gICAgICAgIH0sXHJcbiAgICApO1xyXG4gICAgLy8gbW9iaWxlIGxlc3NcclxuICAgIGFkZE1lZGlhUXVlcnlMaXN0ZW5lcihcclxuICAgICAgICBkZXZpY2VzTVEubW9iaWxlTU1RLFxyXG4gICAgICAgIChtYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBkZXZpY2VzTVEubW9iaWxlTSA9IG1hdGNoO1xyXG4gICAgICAgICAgICAkdy50cmlnZ2VyKCdtb2JpbGVNLm1xJywgW21hdGNoXSk7XHJcbiAgICAgICAgfSxcclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgeyAkdywgZGV2aWNlc01RLCBtcSwgYWRkTXFUcmlnZ2VycyB9O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3NjcmlwdHMvcGx1Z2lucy9tZWRpYS1xdWVyaWVzLmpzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXRCQTtBQUNBO0FBd0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///3\n");

/***/ })
],[2]);