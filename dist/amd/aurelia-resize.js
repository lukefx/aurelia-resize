define(['exports', 'aurelia-framework', 'element-resize-detector'], function (exports, _aureliaFramework, _elementResizeDetector) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var ResizeCustomAttribute = (function () {
    function ResizeCustomAttribute(element) {
      _classCallCheck(this, _ResizeCustomAttribute);

      this.element = element;
      this.callback = null;
      this.erd = elementResizeDetectorMaker();
    }

    _createClass(ResizeCustomAttribute, [{
      key: 'createThrottler',
      value: function createThrottler(fn, delay) {
        var _arguments = arguments;

        var timeout = 0;
        return function () {
          var args = _arguments;
          if (timeout == 0) {
            timeout = setTimeout(function () {
              timeout = 0;
              return fn.apply(fn, args);
            }, delay());
          }
        };
      }
    }, {
      key: 'createDebouncer',
      value: function createDebouncer(fn, delay) {
        var timeout = 0;
        return function () {
          var args = arguments;
          timeout && clearTimeout(timeout);
          timeout = setTimeout(function () {
            return fn.apply(fn, args);
          }, delay());
        };
      }
    }, {
      key: 'bind',
      value: function bind() {
        if (this.handler == undefined) return;

        var self = this;
        var handler = this.handler;
        var element = this.element;

        this.callback = function () {
          var width = element.offsetWidth;
          var height = element.offsetHeight;
          handler(width, height);
        };

        if (this.throttle != undefined) this.callback = this.createThrottler(this.callback, function () {
          return self.throttle;
        });else if (this.debounce != undefined) this.callback = this.createDebouncer(this.callback, function () {
          return self.debounce;
        });

        this.erd.listenTo(this.element, this.callback);
      }
    }, {
      key: 'unbind',
      value: function unbind() {
        if (this.callback) this.erd.uninstall(this.element);
      }
    }]);

    var _ResizeCustomAttribute = ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.bindable)('debounce')(ResizeCustomAttribute) || ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.bindable)('throttle')(ResizeCustomAttribute) || ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.bindable)('handler')(ResizeCustomAttribute) || ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.customAttribute)('resize-event')(ResizeCustomAttribute) || ResizeCustomAttribute;
    ResizeCustomAttribute = (0, _aureliaFramework.inject)(Element)(ResizeCustomAttribute) || ResizeCustomAttribute;
    return ResizeCustomAttribute;
  })();

  exports.ResizeCustomAttribute = ResizeCustomAttribute;
});