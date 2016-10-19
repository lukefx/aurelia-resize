# aurelia-resize

an aurelia attribute add-on that detects DOM-element resize events either via window-change or CSS-animation.

Dependencies
[element-resize-detector](https://www.npmjs.com/package/element-resize-detector)

## Install (Aurelia CLI)

Install with npm:
```
npm install aurelia-resize --save
```

Add to your bundles: 

```
{
  "name": "aurelia-resize",
  "path": "../node_modules/aurelia-resize/dist",
  "main": "index"
},
{
  "name": "element-resize-detector",
  "path": "../node_modules/element-resize-detector/dist",
  "main": "element-resize-detector"
}
```

## Install (JSPM)

jspm install npm:aurelia-resize

## Usage

Use the plug-in in your `main.js``
```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-resize');
```

in your view, add the `resizeable` attribute and bind to the `resize` event-handler

```html
<div resizeable resize.trigger="foo($event.detail)">
 ```

In your view-model, add an event handler:

```javascript
foo(detail) => {
    console.log("width=" + detail.width);
    console.log("height=" + detail.height);
    console.log("old width=" + detail.widthOld);
    console.log("old height=" + detail.heightOld);
  }
```

you can also throttle, or debounce the events if you need to slow them down. 

```html
<div resizeable resize.trigger="foo($event.detail) & throttle:250">
<div resizeable resize.trigger="foo($event.detail) & debounce:500">
```

## Canvas 

one use of this is to resize a canvas so it fits a div: 

```html
<!--widget.html-->
<template>
  <require from="./widget.css"></require>
  <div id="host" resizeable resize.trigger="resize($event.detail) & throttle:500">
    <canvas ref=elmt></canvas>
  </div>
</template>
```

```ts
//widget.ts
@customElement("widget")
export class WidgetCustomElement {
  elmt:HTMLCanvasElement;
  resize(data){  
    this.elmt.width = data.width;
    this.elmt.height = data.height;
  }
}
```

```scss
//widget.scss
widget {
  div {
    padding: 0;
    margin: 0;
    display: block;
  }
  canvas {
    padding: 0;
    margin: 0;
    display: block;
  }
}
```


