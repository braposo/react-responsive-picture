## react-responsive-picture

A future-proof responsive image component that supports latest `<picture>` specification. Uses [picturefill](https://github.com/scottjehl/picturefill) for backward compatibility from IE9+.

[![npm version][version-badge]][npm]
[![npm downloads][downloads-badge]][npm]
[![gzip size][size-badge]][size]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]

---

## Installation

`npm install react-responsive-picture` or `yarn add react-responsive-picture`

## How to use

[![Edit react-responsive-picture][codesandbox-badge]][codesandbox]

### Code

```jsx
import { Picture } from 'react-responsive-picture';

function SomeComponent() {
    return (
        <Picture
            sources = {[
                {
                    srcSet: "path-to-mobile-image.jpg, path-to-mobile-image@2x.jpg 2x",
                    media: "(max-width: 420px)",
                },
                {
                    srcSet: "path-to-desktop-image.jpg 1x, path-to-desktop-image@2x.jpg 2x",
                },
                {
                    srcSet: "path-to-desktop-image.webp",
                    type: "image/webp"
                }
            ]}
        />
    );
}
```

### Props

| Prop | Type | Default | Definition |
| --- | --- | --- | --- |
| sources | array |  | The array of source objects. Check Sources section for more information. |
| src | string | (transparent pixel) | Source for standalone/fallback image. To prevent issues in some browsers, by default `src` is set to a 1x1 transparent pixel data image. |
| sizes | string |  | Sizes attribute to be used with `src` for determing best image for user's viewport. |
| alt | string |  | Alternative text for image |
| className | string | | Any additional CSS classes you might want to use to style the image |

## Examples

### Simple image
Normal `<img>` like behaviour. The same image is displayed on every device/viewport.

```jsx
<Picture src="path-to-image.jpg" />
```

will render:

```html
<img srcset="path-to-image.jpg" />
```

### Image with different resolutions
Different images for specific devices (usually retina).

```jsx
<Picture src="path-to-image@2x.png 2x, path-to-image.png 1x" />
```

will render:

```html
<img srcset="path-to-image@2x.png 2x, path-to-image.png 1x" />
```

### Image with sizes
When you want to let the browser determine the best image for user's current viewport. More information about `size` attribute on this great [blog post](http://ericportis.com/posts/2014/srcset-sizes/).

```jsx
<Picture
    src="large.jpg 1024w, medium.jpg 640w, small.jpg 320w"
    sizes="(min-width: 36em) 33.3vw, 100vw"
/>
```

will render:

```html
<img srcset="large.jpg 1024w, medium.jpg 640w, small.jpg 320w" sizes="(min-width: 36em) 33.3vw, 100vw" />
```

### Image with art direction
When you want to explicitly control which image is displayed at specific viewport sizes.

```jsx
<Picture
    sources = {[
        {
            srcSet: "path-to-mobile-image.jpg, path-to-mobile-image@2x.jpg 2x",
            media: "(max-width: 420px)",
        },
        {
            srcSet: "path-to-desktop-image.jpg 1x, path-to-desktop-image@2x.jpg 2x",
        },
        {
            srcSet: "path-to-desktop-image.webp",
            type: "image/webp"
        }
    ]}
/>
```

will render:

```html
<picture>
    <source srcset="path-to-mobile-image.jpg, path-to-mobile-image@2x.jpg 2x" media="(max-width: 420px)">
    <source srcset="path-to-desktop-image.jpg 1x, path-to-desktop-image@2x.jpg 2x">
    <source srcset="path-to-desktop-image.webp" type="image/webp">
    <img srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
</picture>
```

The `sources` prop is where you can determine the behaviour of the `<Picture>` component and which images will show for the specific screens.

For each source you can send an object containing `srcSet`, `media` and `type` although the last two are optional.

### Styling 

You can use your favourite styling library and style the `Picture` component using the `className` prop.

```jsx
import { css } from "emotion";

<Picture 
    className={css`
      opacity: 0.7;
    `}
    src="path-to-image@2x.png 2x, path-to-image.png 1x" 
/>
```

## Fullsize images

There's also a `<FullsizePicture>` component that you can use to display full-size images using the same benefits of `<Picture>` for art direction.

```jsx
<div style={{ height: 200 }}>
    <FullsizePicture
        sources = {[
            {
                srcSet: "path-to-mobile-image.jpg, path-to-mobile-image@2x.jpg 2x",
                media: "(max-width: 420px)",
            },
            {
                srcSet: "path-to-desktop-image.jpg 1x, path-to-desktop-image@2x.jpg 2x",
            },
        ]}
    />
</div>
```

It will automatically fill the parent element maintaining the original image ratio. Please note that the parent element needs to have a defined height as you would expect for any background image as well.

### Props

`FullsizePicture` accepts the same props as `Picture` plus a few more for styling and positioning.

| Prop | Type | Default | Definition |
| --- | --- | --- | --- |
| sources | array |  | The array of source objects. Check Sources section for more information. |
| src | string | (transparent pixel) | Source for standalone/fallback image. To prevent issues in some browsers, by default `src` is set to a 1x1 transparent pixel data image. |
| sizes | string |  | Sizes attribute to be used with `src` for determing best image for user's viewport. |
| alt | string |  | Alternative text for image |
| className | string | | Any additional CSS classes you might want to use to style the image |
| wrapperClassName | string | | Any additional CSS classes you might want to use to style the wrapper of the `Picture` component |
| cover | "both" \| "width" \| "height" | "both" | Decides the fullsize behaviour of the `Picture` component. By default it covers the entire parent, but can be changed to cover just the height or width instead. |
| center | boolean | true | Helper prop to horizontally and vertically center the image. |

### Use as background image

If you want to use `FullsizePicture` as a background image for other components, you can pass them as children too.

```jsx
<section style={{ height: 200 }}>
    <FullsizePicture
        sources = {[
            {
                srcSet: "path-to-mobile-image.jpg, path-to-mobile-image@2x.jpg 2x",
                media: "(max-width: 420px)",
            },
            {
                srcSet: "path-to-desktop-image.jpg 1x, path-to-desktop-image@2x.jpg 2x",
            },
        ]}
    >
      <Heading1>This is the section title</Heading1>
    </FullsizePicture>
</section>
```

## Contributing

Please follow our [contributing guidelines](https://github.com/braposo/react-responsive-picture/blob/master/CONTRIBUTING.md).

## License

[MIT](https://github.com/braposo/react-responsive-picture/blob/master/LICENSE)

[npm]: https://www.npmjs.com/package/react-responsive-picture
[license]: https://github.com/braposo/react-responsive-picture/blob/master/LICENSE
[prs]: http://makeapullrequest.com
[size]: https://unpkg.com/react-responsive-picture/dist/react-responsive-picture.min.js
[version-badge]: https://img.shields.io/npm/v/react-responsive-picture.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/react-responsive-picture.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/react-responsive-picture.svg?style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/react-responsive-picture/dist/react-responsive-picture.min.js?compression=gzip&style=flat-square
[modules-badge]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg?style=flat-square
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[codesandbox-badge]: https://codesandbox.io/static/img/play-codesandbox.svg
[codesandbox]: https://codesandbox.io/s/github/braposo/react-responsive-picture/
