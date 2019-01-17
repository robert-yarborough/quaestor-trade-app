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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($, Drupal, drupalSettings) {
	Drupal.behaviors.financeSlider = {
		attach: function attach(context, settings) {
			var init_slider_class = 'slider-initialized';
			var $finance_slider = $('.js-finance-block-slider', context);
			var financeSwiper = void 0;
			var finance_slider_init = function finance_slider_init() {
				if ($finance_slider.length && !$finance_slider.hasClass(init_slider_class)) {
					financeSwiper = new Swiper($finance_slider, {
						slidesPerView: 2,
						speed: 750,
						navigation: {
							nextEl: '.js-fin-sl-btn-next',
							prevEl: '.js-fin-sl-btn-prev'
						},
						breakpoints: {
							550: {
								slidesPerView: 1
							}
						}
					});
					$finance_slider.addClass(init_slider_class);
				}
			};

			var finance_slider_destroy = function finance_slider_destroy() {
				if ($finance_slider.length && $finance_slider.hasClass(init_slider_class)) {
					financeSwiper.destroy(false, true);
					$finance_slider.removeClass(init_slider_class);
				}
			};

			// Mobile:
			addMediaQueryListener(devicesMQ.mobileMQ, function (match) {
				if (match) {
					finance_slider_init();
				} else if (match == false) {
					finance_slider_destroy();
				}
			});
		}
	};
})(jQuery, Drupal, drupalSettings);

/***/ })

/******/ });
//# sourceMappingURL=module-finance-slider.js.map