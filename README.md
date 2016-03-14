# aurelia-resize-plugin

an aurelia attribute add-on that detects DOM-element resize events either via window-change or CSS-animation.

[Detection code by Daniel Buchner](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/)

Install with jspm
```
jspm install aurelia-resize=github:meirionhughes/aurelia-resize-plugin@0.1.0
```

In your view-model, add an event handler:

```javascript
resizeListener = ()=>{
  console.log("resizeListener called!");
}
```

in your view, add the attribute and bind to your handler

```html
<div resize-event="handler.bind:resizeListener">
 ```

you can also throttle the resize events with

```html
<div resize-event="handler.bind:resizeListener; throttle:250 ">
 ```

... which you can also bind:

```html
<div resize-event="handler.bind:resizeListener; throttle.bind:somevalue ">
 ```


