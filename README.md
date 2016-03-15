# aurelia-resize-plugin

an aurelia attribute add-on that detects DOM-element resize events either via window-change or CSS-animation.

Dependencies:
[npm:element-resize-detector](https://www.npmjs.com/package/element-resize-detector)

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

you can throttle...

```html
<div resize-event="handler.bind:resizeListener; throttle:250 ">
 ```

... or debounce

 ```html
 <div resize-event="handler.bind:resizeListener; debounce:500 ">
  ```

... both of which you can bind:

```html
<div resize-event="handler.bind:resizeListener; throttle.bind:somevalue ">
 ```

you should not use set both throttle and debounce; throttle will be selected before debounce.


