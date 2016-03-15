/**
 * Aurelia-Resize
 * an aurelia attribute add-on that detects DOM-element resize events
 * either via window size change or CSS animation.
 * Meirion Hughes (github.com/MeirionHughes)
 **/
import {customAttribute, bindable, inject} from 'aurelia-framework';
import 'element-resize-detector';

@inject(Element)
@customAttribute('resize-event')
@bindable('handler')
@bindable('throttle')
@bindable('debounce')
export class ResizeCustomAttribute {
  constructor(element) {
    this.element = element;
    this.callback = null;
    this.erd = elementResizeDetectorMaker();
  }

  createThrottler(fn, delay) {
    var timeout = 0;
    return ()=> {
      var args = arguments;
      if (timeout == 0) {
        timeout = setTimeout(function () {
          timeout = 0;
          return fn.apply(fn, args);
        }, delay());
      }
    }
  }

  createDebouncer(fn, delay) {
    var timeout = 0;
    return function () {
      var args = arguments;
      timeout && clearTimeout(timeout);
      timeout = setTimeout(function () {
        return fn.apply(fn, args)
      }, delay());
    }
  }

  bind() {
    if (this.handler == undefined) return;

    var self = this;
    var handler = this.handler;
    var element = this.element;

    this.callback = ()=> {
      var width = element.offsetWidth;
      var height = element.offsetHeight;
      handler(width, height);
    };

    if (this.throttle != undefined)
      this.callback = this.createThrottler(this.callback, ()=> {
        return self.throttle
      });

    else if (this.debounce != undefined)
      this.callback = this.createDebouncer(this.callback, ()=> {
        return self.debounce
      });

    this.erd.listenTo(this.element, this.callback);
  }


  unbind() {
    if (this.callback)
      this.erd.uninstall(this.element);
  }
}