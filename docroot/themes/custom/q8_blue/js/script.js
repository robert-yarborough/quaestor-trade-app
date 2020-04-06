/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "scripts/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mediaQueries = __webpack_require__(1);

var _header = __webpack_require__(2);

var _header2 = _interopRequireDefault(_header);

var _main = __webpack_require__(3);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mediaQueries.addMqTriggers)();
(0, _header2.default)();
(0, _main2.default)();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var $ = window.jQuery;
var desktopN = 1616;
var desktopNM = 1224;
var tabletNL = 1024;
var tabletN = 768;
var mobileMNBT = 576;
var mobileMN = 544;
var devicesMQ = {
    touch: 'ontouchstart' in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0,
    desktopN: desktopN,
    desktopNM: desktopNM,
    tabletNL: tabletNL,
    tabletN: tabletN,
    mobileMNBT: mobileMNBT,
    mobileMN: mobileMN,
    mqBaseTxt: 'only screen and ',
    desktopMQ: 'only screen and (min-width: ' + desktopN + 'px)',
    desktopMMQ: 'only screen and (max-width: ' + desktopNM + 'px)',
    tabletMLQ: 'only screen and (max-width: ' + (tabletNL - 1) + 'px)',
    tabletMQ: 'only screen and (min-width: ' + tabletN + 'px) and (max-width: ' + (desktopN - 1) + 'px)',
    mobileMQ: 'only screen and (max-width: ' + (tabletN - 1) + 'px)',
    mobileMBTQ: 'only screen and (max-width: ' + (mobileMNBT - 1) + 'px)',
    mobileMMQ: 'only screen and (max-width: ' + (mobileMN - 1) + 'px)',
    desktop: false,
    desktopM: false,
    tabletL: false,
    tablet: false,
    mobile: false,
    mobileM: false,
    mobileMBT: false
};

window.devicesMQ = devicesMQ;

var $w = $(window);
$(document.documentElement).addClass((devicesMQ.touch ? '' : 'no-') + 'touch');

var addMediaQueryListener = function addMediaQueryListener(query, callback) {
    var host = {};
    var res = window.matchMedia(query);

    callback.apply(host, [res.matches, res.media]);
    res.addListener(function (changed) {
        callback.apply(host, [changed.matches, changed.media]);
    });
};
window.addMediaQueryListener = addMediaQueryListener;

var mq = addMediaQueryListener;

var addMqTriggers = function addMqTriggers() {
    // desktop
    addMediaQueryListener(devicesMQ.desktopMQ, function (match) {
        devicesMQ.desktop = match;
        $w.trigger('desktop.mq', [match]);
    });
    // desktop less
    addMediaQueryListener(devicesMQ.desktopMMQ, function (match) {
        devicesMQ.desktopM = match;
        $w.trigger('desktopM.mq', [match]);
    });
    // tablet large
    addMediaQueryListener(devicesMQ.tabletMLQ, function (match) {
        devicesMQ.tabletL = match;
        $w.trigger('tabletL.mq', [match]);
    });
    // tablet
    addMediaQueryListener(devicesMQ.tabletMQ, function (match) {
        devicesMQ.tablet = match;
        $w.trigger('tablet.mq', [match]);
    });
    // mobile
    addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
        devicesMQ.mobile = match;
        $w.trigger('mobile.mq', [match]);
    });
    // mobile less for Bootstrap
    addMediaQueryListener(devicesMQ.mobileMBTQ, function (match) {
        devicesMQ.mobileMBT = match;
        $w.trigger('mobileMBT.mq', [match]);
    });
    // mobile less
    addMediaQueryListener(devicesMQ.mobileMMQ, function (match) {
        devicesMQ.mobileM = match;
        $w.trigger('mobileM.mq', [match]);
    });
};

exports.$w = $w;
exports.devicesMQ = devicesMQ;
exports.mq = mq;
exports.addMqTriggers = addMqTriggers;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var moduleIsInited = false;

var setHeaderActions = function ($) {
    return function (context) {
        if (moduleIsInited) {
            return;
        }
        moduleIsInited = true;

        var $w = $(window);

        // Header Helper:

        var header_create_helper = function header_create_helper() {
            var $main_header = $('.js-main-header', context);
            var $h_main_header = $main_header.height();
            var $main_header_helper = $('.js-main-header-helper', context);
            if ($main_header.length && $main_header_helper.length) {
                $main_header_helper.css('height', $h_main_header);
            }
        };
        header_create_helper();
        $w.on('resize', header_create_helper);

        // Language Toggle:

        var $menu_lang_list = $('.js-menu-lang-list, ' + '.js-sh--lang .js-h-lang-drop', context);
        var $lang_drop = $('.js-menu-lang-list li:not(.is-current), ' + '.js-sh--lang .js-h-lang-drop li:not(.is-active)', context);

        $menu_lang_list.on({
            click: function click(e) {
                $(this).toggleClass('is-active');
                $lang_drop.slideToggle();
            }
        });

        // Search Toggle:

        var $h_search_toggle = $('.js-h-search-toggle', context);
        var $h_search_box = $('.js-h-search-box', context);

        $h_search_toggle.on({
            click: function click(e) {
                e.preventDefault();
                var $that = $(this);
                var $box = $that.parent().find($h_search_box);
                $that.toggleClass('is-active');
                $box.toggleClass('is-opened');
            }
        });

        // Mobile Toggle:

        var $h_toggle_btn = $('.js-h-toggle-btn', context);
        var $h_toggle_close = $('.js-h-toggle-close', context);
        var $h_toggle_drop = $('.js-h-menu-main', context);
        var $h_search = $('.js-h-search', context);
        var $h_logo = $('div.logo', context);
        var $h_logo_branding = $('#block-q8-tur-branding', context);
        $h_toggle_btn.on({
            click: function click(e) {
                e.preventDefault();
                $(this).toggleClass('is-active');
                $h_toggle_drop.toggleClass('is-opened');
                $h_search.insertAfter($h_toggle_close);
                $h_logo.appendTo($h_toggle_drop);
            }
        });
        $h_toggle_close.on({
            click: function click(e) {
                e.preventDefault();
                $(this).removeClass('is-active');
                $h_toggle_drop.removeClass('is-opened');
                $h_search.insertAfter($h_toggle_btn);
                $h_logo.appendTo($h_logo_branding);
            }
        });

        // Alternative Language Toggle:

        var $h_lang_toggle = $('.js-h-lang-toggle', context);
        var $h_lang_drop = $('.js-h-lang-drop', context);
        $h_lang_toggle.on({
            click: function click(e) {
                e.preventDefault();
                $(this).toggleClass('is-active');
                $h_lang_drop.slideToggle();
            }
        });

        // Header Menu Relocate:

        var $h_menu_links = $('.js-h-menu-links', context);
        var $h_menu_main = $('.js-h-menu-main', context);
        var $h_menu_main_menu = $('.js-h-menu-main div.menu--main', context);

        var header_relocate_m = function header_relocate_m() {
            if ($h_menu_links.length) {
                $h_menu_links.insertAfter($h_menu_main_menu);
                $h_menu_links.addClass('is-visible');
            }
        };

        var header_relocate_d = function header_relocate_d() {
            if ($h_menu_links.length) {
                $h_menu_links.insertBefore($h_toggle_btn);
                $h_menu_links.removeClass('is-visible');
            }
        };

        // Tablet:
        addMediaQueryListener(devicesMQ.desktopMMQ, function (match) {
            if (match) {
                header_relocate_m();
            } else if (match == false) {
                header_relocate_d();
            }
        });
    };
}(window.jQuery);
exports.default = setHeaderActions;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var moduleIsInited = false;

var setMain = function ($) {
  return function (context) {
    if (moduleIsInited) {
      return;
    }
    moduleIsInited = true;
    var $root = $('html, body', context);

    var $next_scroll_link = $('.js-scroll-next-link', context);

    $next_scroll_link.on({
      click: function click(e) {
        e.preventDefault();
        var $next = $(this).closest('.block-section').next().offset().top;
        $root.animate({ scrollTop: $next }, 'slow');
      }
    });

    var $chat_widget = $('#chat-widget-container', context);
    setTimeout(function () {
      if ($chat_widget.length) {
        $root.addClass('is-cart');
      }
    }, 3000);

    // Animate forms placeholder:

    var $animate_placeholder = $('.js-animate-placeholder', context);
    var $fields = 'input[type="text"],' + 'input[type="password"],' + 'input[type="email"],' + 'input[type="number"],' + 'input[type="month"],' + 'input[type="date"],' + 'input[type="time"],' + 'input[type="search"],' + 'input[type="tel"], ' + 'textarea';
    var $field = $animate_placeholder.find($fields);
    if ($animate_placeholder.length) {
      $field.each(function () {
        var $that = $(this);
        var $holder = $that.attr('placeholder');
        var $value = $that.val();
        if ($holder.length) {
          $('<div class="placeholder-label">' + $holder + '</div>').insertBefore($that);
          if ($value) {
            $that.prev('.placeholder-label').addClass('is-active');
            return;
          }
          $that.prev('.placeholder-label').removeClass('is-active');
        }
      });
    }

    $field.on('keydown keyup', function () {
      var $that = $(this);
      var $value = $that.val();
      var $holder = $that.prev('.placeholder-label');
      if ($holder.length) {
        if ($value) {
          $holder.addClass('is-active');
          return;
        }
        $holder.removeClass('is-active');
      }
    });

    var animate_init = function animate_init() {
      skrollr.init();
    };
    var animate_destroy = function animate_destroy() {
      skrollr.init().destroy();
    };

    // Mobile:
    addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
      if (match) {} else if (match == false) {}
    });

    // Tablet:
    addMediaQueryListener(devicesMQ.desktopMMQ, function (match) {
      if (match) {
        animate_destroy();
      } else if (match == false) {
        animate_init();
      }
    });
  };
}(window.jQuery);
exports.default = setMain;


jQuery(document).on('click', '.video-component .play-btn', function (e) {
  e.preventDefault();
  jQuery(this).parent().find('iframe')[0].src += "?autoplay=1";
  jQuery(this).parent().find('iframe').show();
  jQuery(this).parent().find('img').hide();
  jQuery(this).hide();
});
jQuery(document).ready(function () {
  jQuery(document).find('.general-cms table .check').html('');
  jQuery(document).find('.general-cms table .cross').html('<span></span>');
  jQuery(document).find('.form-type-textarea label').appendTo('.form-type-textarea .form-textarea-wrapper');
  jQuery('.webform-submission-contact-add-form').find('input:not(.webform-button--submit):not(.required),textarea').each(function () {
    addclasses(this);
  });
  jQuery('.webform-submission-contact-add-form').find('input:not(.webform-button--submit):not(.required),textarea').blur(function () {
    addclasses(this);
  });
});
function addclasses(el) {
  if (jQuery(el).val()) {
    jQuery(el).addClass('valid');
  } else {
    jQuery(el).addClass('notvalid');
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map