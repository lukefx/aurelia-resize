define(['exports', './aurelia-resize'], function (exports, _aureliaResize) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, 'ResizeCustomAttribute', {
    enumerable: true,
    get: function get() {
      return _aureliaResize.ResizeCustomAttribute;
    }
  });

  function configure(config) {
    config.globalResources('./aurelia-resize');
  }
});