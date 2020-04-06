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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/menu.js":
/*!******************************!*\
  !*** ./resources/js/menu.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  "use strict";

  function navScroll() {
    var window_top = $(window).scrollTop();
    var div_top = $('body').offset().top;

    if (window_top > div_top) {
      $('.header').addClass('header--sticky');
      $('.header__menu ul ul').addClass('submenu-header-sticky');
    } else {
      $('.header').removeClass('header--sticky');
      $('.header__menu ul ul').removeClass('submenu-header-sticky');
    }
  }

  $(window).scroll(function () {
    navScroll();
  });
  navScroll();
  $(document).on("scroll", onScroll);

  var delegate = function delegate(criteria, listener) {
    return function (e) {
      var el = e.target;

      do {
        if (!criteria(el)) continue;
        e.delegateTarget = el;
        listener.apply(this, arguments);
        return;
      } while (el = el.parentNode);
    };
  };

  var toolbar = document.querySelector(".header__menu");

  var buttonsFilter = function buttonsFilter(elem) {
    return elem.classList && elem.classList.contains("header-link");
  };

  var buttonHandler = function buttonHandler(e) {
    var button = e.delegateTarget;

    if (!button.classList.contains("active")) {
      button.classList.add("active");
      var target = button.hash;
      var $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top
      }, 600, 'swing', function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    } else {
      button.classList.remove("active");
    }
  };

  toolbar.addEventListener("click", delegate(buttonsFilter, buttonHandler));

  function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.header__menu ul li a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));

      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
        $('.header__menu ul li a').removeClass("selected");
        currLink.addClass("active");
      } else {
        currLink.removeClass("active");
      }
    });
  }

  $.fn.menumaker = function (options) {
    var cssmenu = $(this),
        settings = $.extend({
      title: "Menu",
      format: "dropdown",
      sticky: false
    }, options);
    return this.each(function () {
      cssmenu.prepend('<div class="menu-button"></div>');
      $(this).find(".menu-button").on('click', function () {
        $(this).parent().parent().parent().toggleClass('menu-open');
        var mainmenu = $(this).next('ul');
        mainmenu.toggleClass('open');

        if (mainmenu.hasClass('open')) {
          mainmenu.show();
        } else {
          mainmenu.hide();
        }

        $('.header__menu ul a[href^="#"]').on('click', function (e) {
          $('.header__menu ul').removeClass('open');
          $('.header__menu ul').hide();
          $('.header').removeClass('menu-open');
        });
      });

      var multiTg = function multiTg() {
        cssmenu.find(".menu-item-has-children").prepend('<span class="submenu-button"></span>');
        cssmenu.find('.submenu-button').on('click', function () {
          $(this).toggleClass('submenu-opened');

          if ($(this).siblings('ul').hasClass('open')) {
            $(this).siblings('ul').removeClass('open').hide();
          } else {
            $(this).siblings('ul').addClass('open').show();
          }
        });
      };

      if (settings.format === 'multitoggle') multiTg();else cssmenu.addClass('dropdown');
      if (settings.sticky === true) cssmenu.addClass('sticky');
    });
  };

  $(".header__menu").menumaker({
    format: "multitoggle",
    sticky: true
  });
});

/***/ }),

/***/ 2:
/*!************************************!*\
  !*** multi ./resources/js/menu.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/maxim/Desktop/projects/personal/happydemon.github.io/packages/HappyDemon/Github/resources/js/menu.js */"./resources/js/menu.js");


/***/ })

/******/ });