# aurelia-resize

an aurelia attribute add-on that detects DOM-element resize events either via window-change or CSS-animation.

[Detection code by Daniel Buchner](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/)

Install with jspm
```
jspm install aurelia-resize=github:meirionhughes/aurelia-resize-plugin@0.2.0
```

Use the plug-in in your `main.js``
```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-resize');
```

In your view-model, add an event handler:

```javascript
resizeListener = (width, height) => {
    console.log("width=" + width);
    console.log("height=" + height);
  }
```

in your view, add the attribute and bind to your handler

```html
<div resize-event="handler.bind:resizeListener">
 ```

you can also throttle, or debounce the events if you need to slow them down. 

```html
<div resize-event="handler.bind:resizeListener; throttle:250 ">
<div resize-event="handler.bind:resizeListener; debounce:500 ">
```


