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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/a.js":
/*!******************!*\
  !*** ./src/a.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports=\"哈哈哈-3\"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9hLmpzPzZlMWMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHM9XCLlk4jlk4jlk4gtM1wiIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/a.js\n");

/***/ }),

/***/ "./src/b.js":
/*!******************!*\
  !*** ./src/b.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('-------b.js------')//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9iLmpzPzJmMDEiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc29sZS5sb2coJy0tLS0tLS1iLmpzLS0tLS0tJykiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/b.js\n");

/***/ }),

/***/ "./src/css/1.css":
/*!***********************!*\
  !*** ./src/css/1.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> *{\\n|   margin:0;\\n| }\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY3NzLzEuY3NzLmpzIiwic291cmNlcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/css/1.css\n");

/***/ }),

/***/ "./src/css/2.less":
/*!************************!*\
  !*** ./src/css/2.less ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (1:4)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> body{\\n|   div{\\n|     background-color: pink;\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY3NzLzIubGVzcy5qcyIsInNvdXJjZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/css/2.less\n");

/***/ }),

/***/ "./src/images/1.jpg":
/*!**************************!*\
  !*** ./src/images/1.jpg ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected character '�' (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n(Source code omitted for this binary file)\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW1hZ2VzLzEuanBnLmpzIiwic291cmNlcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/images/1.jpg\n");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _images_1_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/1.jpg */ \"./src/images/1.jpg\");\n/* harmony import */ var _images_1_jpg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_1_jpg__WEBPACK_IMPORTED_MODULE_0__);\n//注释1\nvar a = __webpack_require__(/*! ./a.js */ \"./src/a.js\");\n//注释2\nvar b = __webpack_require__(/*! ./b.js */ \"./src/b.js\");\n//测试devServer proxy\n__webpack_require__(/*! ./test-proxy */ \"./src/test-proxy.js\")\n// debugger\n__webpack_require__(/*! ./css/1.css */ \"./src/css/1.css\");\n__webpack_require__(/*! ./css/2.less */ \"./src/css/2.less\");\n\nlet image = new Image();\nimage.src=_images_1_jpg__WEBPACK_IMPORTED_MODULE_0___default.a;\ndocument.body.appendChild(image);\nconsole.log(a);\nvar name ='haha';\n// name.a();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvL+azqOmHijFcbnZhciBhID0gcmVxdWlyZSgnLi9hLmpzJyk7XG4vL+azqOmHijJcbnZhciBiID0gcmVxdWlyZSgnLi9iLmpzJyk7XG4vL+a1i+ivlWRldlNlcnZlciBwcm94eVxucmVxdWlyZSgnLi90ZXN0LXByb3h5Jylcbi8vIGRlYnVnZ2VyXG5yZXF1aXJlKCcuL2Nzcy8xLmNzcycpO1xucmVxdWlyZSgnLi9jc3MvMi5sZXNzJyk7XG5pbXBvcnQgaW1nIGZyb20gXCIuL2ltYWdlcy8xLmpwZ1wiO1xubGV0IGltYWdlID0gbmV3IEltYWdlKCk7XG5pbWFnZS5zcmM9aW1nO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbWFnZSk7XG5jb25zb2xlLmxvZyhhKTtcbnZhciBuYW1lID0naGFoYSc7XG4vLyBuYW1lLmEoKTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/test-proxy.js":
/*!***************************!*\
  !*** ./src/test-proxy.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var xhr =new XMLHttpRequest();\nxhr.open(\"get\",'/api/haha');\nxhr.addEventListener('readyStateChange',function(e){\n  if(xhr.readyState==='4'&&xhr.state==='200'){\n    console.log('请求成功',xhr)\n  }\n})\nxhr.send();\n\nvar xhr =new XMLHttpRequest();\nxhr.open(\"get\",'secondApi/haha');\nxhr.addEventListener('readyStateChange',function(e){\n  if(xhr.readyState==='4'&&xhr.state==='200'){\n    console.log('请求成功',xhr)\n  }\n})\nxhr.send();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGVzdC1wcm94eS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy90ZXN0LXByb3h5LmpzPzU3NjciXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHhociA9bmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG54aHIub3BlbihcImdldFwiLCcvYXBpL2hhaGEnKTtcbnhoci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeVN0YXRlQ2hhbmdlJyxmdW5jdGlvbihlKXtcbiAgaWYoeGhyLnJlYWR5U3RhdGU9PT0nNCcmJnhoci5zdGF0ZT09PScyMDAnKXtcbiAgICBjb25zb2xlLmxvZygn6K+35rGC5oiQ5YqfJyx4aHIpXG4gIH1cbn0pXG54aHIuc2VuZCgpO1xuXG52YXIgeGhyID1uZXcgWE1MSHR0cFJlcXVlc3QoKTtcbnhoci5vcGVuKFwiZ2V0XCIsJ3NlY29uZEFwaS9oYWhhJyk7XG54aHIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlTdGF0ZUNoYW5nZScsZnVuY3Rpb24oZSl7XG4gIGlmKHhoci5yZWFkeVN0YXRlPT09JzQnJiZ4aHIuc3RhdGU9PT0nMjAwJyl7XG4gICAgY29uc29sZS5sb2coJ+ivt+axguaIkOWKnycseGhyKVxuICB9XG59KVxueGhyLnNlbmQoKTsiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/test-proxy.js\n");

/***/ })

/******/ });