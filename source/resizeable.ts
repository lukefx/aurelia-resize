/**
 * Aurelia-Resize
 * an aurelia attribute add-on that detects DOM-element resize events
 * either via window size change or CSS animation.
 * Meirion Hughes (github.com/MeirionHughes)
 **/
import { customAttribute, bindable, inject } from 'aurelia-framework';
import * as erd from 'element-resize-detector';

@inject(Element)
@customAttribute('resizeable')
export class ResizeableCustomAttribute {

  element: HTMLElement;
  callback;
  erd;

  constructor(element) {
    this.element = element;
    this.erd = erd({ strategy: 'scroll' });
  }

  bind() {
    var element = this.element;

    var widthOld = element.offsetWidth;
    var heightOld = element.offsetHeight;

    this.callback = () => {
      var event = new CustomEvent("resize", {
        detail: {
          width: this.element.offsetWidth,
          height: this.element.offsetHeight,
          widthOld: widthOld,
          heightOld: heightOld
        }
      });
      this.element.dispatchEvent(event);
      widthOld = this.element.offsetWidth;
      heightOld = this.element.offsetHeight;
    };

    this.erd.listenTo(this.element,this.callback );
  }

  unbind() {
    if (this.callback){
      this.erd.uninstall(this.element);
      this.callback = null;
    }
  }
}
