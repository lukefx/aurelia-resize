System.register(['./aurelia-resize'], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config) {
    config.globalResources('./aurelia-resize');
  }

  return {
    setters: [function (_aureliaResize) {
      _export('ResizeCustomAttribute', _aureliaResize.ResizeCustomAttribute);
    }],
    execute: function () {}
  };
});