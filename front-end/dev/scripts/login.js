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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../scripts/login.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../scripts/login.js":
/*!***************************!*\
  !*** ../scripts/login.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const loginModel = __webpack_require__(/*! ./models/request */ \"../scripts/models/request.js\");\r\nclass Login{\r\n    constructor() {\r\n        this.bindEvent()\r\n    }\r\n    bindEvent(){\r\n        $('#login').on('click', this.login.bind(this))\r\n    }\r\n    async login(){\r\n       let data = $('.userinfo').serialize();\r\n       let result = await loginModel.get({\r\n           url:'api/users/login',\r\n           type:'POST',\r\n           data,\r\n       })\r\n       if(result.msg){\r\n           location.href = '../index.html'\r\n           this.setCookie(result.message.name, 3);\r\n       } else{\r\n           alert(result.message.message);\r\n       }\r\n    }\r\n    setCookie(name, day) {\r\n        if(day !== 0){\r\n            let expiress = day * 24 *60 * 60 * 1000;\r\n            let date = new Date()\r\n            document.cookie = `name=${name};expires=${date.setDate(date.getDate() + expiress)};`\r\n        }\r\n    }\r\n}\r\n new Login()\n\n//# sourceURL=webpack:///../scripts/login.js?");

/***/ }),

/***/ "../scripts/models/request.js":
/*!************************************!*\
  !*** ../scripts/models/request.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\r\n    get({url, type='GET', data={}}){\r\n        return $.ajax({\r\n            url,\r\n            type,\r\n            data,\r\n            success:(result)=>{\r\n                return result\r\n            }\r\n        })\r\n    }\r\n}\n\n//# sourceURL=webpack:///../scripts/models/request.js?");

/***/ })

/******/ });