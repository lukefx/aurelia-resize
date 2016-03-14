System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config) {
    config.globalResources('./aurelia-resize');
  }

  return {
    setters: [],
    execute: function () {}
  };
});