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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($, Drupal, drupalSettings) {
	Drupal.behaviors.featureSlider = {
		attach: function attach(context, settings) {
			var init_slider_class = 'slider-initialized';
			var $feature_slider = $('.js-block-slider');
			var $feature_slider_wrap = $feature_slider.find('.features-block__grid', context);
			var $feature_slider_item = $feature_slider.find('.features-block__col', context);
			var $nav_prev = $('<div class="swiper-button-prev js-ft-sl-btn-prev"/>');
			var $nav_next = $('<div class="swiper-button-next js-ft-sl-btn-next"/>');

			var featureSwiper = void 0;

			if ($feature_slider.length) {
				$feature_slider_wrap.addClass('swiper-wrapper', context);
				$feature_slider_item.addClass('swiper-slide', context);
				$feature_slider_wrap.wrap('<div class="swiper-container" />');
				$nav_prev.insertAfter($feature_slider_wrap);
				$nav_next.insertAfter($feature_slider_wrap);
			}

			var feature_slider_init = function feature_slider_init() {
				if ($feature_slider.length && !$feature_slider.hasClass(init_slider_class)) {
					var $feature_slider_box = $feature_slider.find('.swiper-container', context);
					featureSwiper = new Swiper($feature_slider_box, {
						speed: 750,
						navigation: {
							nextEl: '.js-ft-sl-btn-next',
							prevEl: '.js-ft-sl-btn-prev'
						},
						a11y: {
							prevSlideMessage: 'Previous slide',
							nextSlideMessage: 'Next slide'
						}
					});
					$feature_slider.addClass(init_slider_class);
				}
			};

			var feature_slider_destroy = function feature_slider_destroy() {
				if ($feature_slider.length && $feature_slider.hasClass(init_slider_class)) {
					featureSwiper.destroy(false, true);
					$feature_slider.removeClass(init_slider_class);
				}
			};

			// Mobile:
			addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
				if (match) {
					feature_slider_init();
				} else if (match == false) {
					feature_slider_destroy();
				}
			});
		}
	};
})(jQuery, Drupal, drupalSettings);

/***/ })

/******/ });
//# sourceMappingURL=module-features-slider.js.map