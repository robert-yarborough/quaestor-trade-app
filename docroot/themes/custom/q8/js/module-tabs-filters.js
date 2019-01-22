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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ({

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function ($, Drupal, drupalSettings) {
	Drupal.behaviors.tabsFilters = {
		attach: function attach(context, settings) {

			// Toggle filters drop for mobile
			var $tabs_filters = $('.js-tabs-filters', context);
			if ($tabs_filters.length) {
				$tabs_filters.each(function () {
					var $that = $(this);
					var $label = $that.find('.js-selected');
					var $option = $that.find('.bef-link-active a');
					if ($label.length) {
						$label.append($option.text());
					}
				});
			}

			$tabs_filters.find('.js-selected').on({
				click: function click(e) {
					e.preventDefault();
					var $that = $(this);
					$that.toggleClass('is-active');
					$that.closest($tabs_filters).find('.js-drop').toggleClass('is-visible');
				}
			});

			$tabs_filters.find('.js-drop').on({
				click: function click(e) {
					var $that = $(this);
					$that.removeClass('is-visible');
					$that.closest($tabs_filters).find('.js-selected').removeClass('is-active');
				}
			});
		}
	};
})(jQuery, Drupal, drupalSettings);

/***/ })

/******/ });
//# sourceMappingURL=module-tabs-filters.js.map