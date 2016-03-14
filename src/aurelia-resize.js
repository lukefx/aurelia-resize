/**
 * Aurelia-Resize-Plugin
 * an aurelia attribute add-on that detects DOM-element resize events
 * either via window size change or CSS animation.
 * Meirion Hughes (github.com/MeirionHughes)
 **/
import {customAttribute, bindable, inject} from 'aurelia-framework';

@inject(Element)
@customAttribute('resize-event')
@bindable('handler')
@bindable('throttle')
export class ResizeEvent {
  constructor(element) {
    this.element = element;
    this.callback = null;
  }

  createThrottler(fn, delay) {
    var timeout = 0;
    return ()=> {
      if (timeout == 0) {
        timeout = setTimeout(function () {
          timeout = 0;
          return fn();
        }, delay);
      }
    }
  }

  bind() {
    if (this.handler == undefined) return;

    this.callback = this.handler;

    if (this.throttle != undefined && this.throttle > 0)
      this.callback = this.createThrottler(this.callback, this.throttle);

    this.callback;

    addResizeListener(this.element, this.callback);
  }

  unbind() {
    if (this.callback)
      removeResizeListener(this.element, this.callback);
  }
}

/**
 * Cross-Browser, Event-based, Element Resize Detection
 * by Daniel Buchner
 * http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 */

(function(){
  var attachEvent = document.attachEvent;
  var isIE = navigator.userAgent.match(/Trident/);
  console.log(isIE);
  var requestFrame = (function(){
    var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
      function(fn){ return window.setTimeout(fn, 20); };
    return function(fn){ return raf(fn); };
  })();

  var cancelFrame = (function(){
    var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
      window.clearTimeout;
    return function(id){ return cancel(id); };
  })();

  function resizeListener(e){
    var win = e.target || e.srcElement;
    if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__);
    win.__resizeRAF__ = requestFrame(function(){
      var trigger = win.__resizeTrigger__;
      trigger.__resizeListeners__.forEach(function(fn){
        fn.call(trigger, e);
      });
    });
  }

  function objectLoad(e){
    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
    this.contentDocument.defaultView.addEventListener('resize', resizeListener);
  }

  window.addResizeListener = function(element, fn){
    if (!element.__resizeListeners__) {
      element.__resizeListeners__ = [];
      if (attachEvent) {
        element.__resizeTrigger__ = element;
        element.attachEvent('onresize', resizeListener);
      }
      else {
        if (getComputedStyle(element).position == 'static') element.style.position = 'relative';
        var obj = element.__resizeTrigger__ = document.createElement('object');
        obj.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
        obj.__resizeElement__ = element;
        obj.onload = objectLoad;
        obj.type = 'text/html';
        if (isIE) element.appendChild(obj);
        obj.data = 'about:blank';
        if (!isIE) element.appendChild(obj);
      }
    }
    element.__resizeListeners__.push(fn);
  };

  window.removeResizeListener = function(element, fn){
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      if (attachEvent) element.detachEvent('onresize', resizeListener);
      else {
        element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener);
        element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__);
      }
    }
  }
})();


