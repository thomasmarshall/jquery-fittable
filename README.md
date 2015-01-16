jquery-fittable
===============

A jQuery plugin to fit or fill an element inside its container.

```html
<div class="some-container">
  <img class="image-fit" src="example.jpg" width="640" height="480">
</div>

<div class="some-container">
  <video class="video-fill" src="example.mp4" width="640" height="480"></video>
</div>
```

```javascript
$('.image-fit').fit();
$('.video-fill').fill();
```

**jquery-fittable** will use `width` and `height` attributes by default, or you
can pass them in as options:

```javascript
$('.example-fit').fit({
  width: 640,
  height: 480
});

$('.example-fill').fill({
  width: 1200,
  height: 800
});
```
