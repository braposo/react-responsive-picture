## react-responsive-picture

A future-proof responsive image component that supports latest `<picture>` specification. Uses [picturefill](https://github.com/scottjehl/picturefill) for backward compatibility from IE9+.

---

## Installation

`npm install react-responsive-picture` or `yarn add react-responsive-picture`

#### Dependencies

`react-responsive-picture` requires `glamor` installed as peer dependency since version `2.0.0` so you need to add it (in case you're not using it in your project) by running:

`npm install glamor` or `yarn add glamor`

## How to use

### Code

```jsx
import { Picture } from 'react-responsive-picture';

class App extends Component {
    render() {
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
    };
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
| css | object \|\| array \|\| string |  | Any additional styles you might want to send to the wrapper. Uses [glamorous](https://github.com/paypal/glamorous) to process it so you can send an object, an array or even `glamor` generated string classes. |

**Note:** Before version `2.0.0` the `style` prop was parsed by `glamor` so it wasn't having the same behaviour as applying the `style` prop to any other React component. For that reason, the recommended prop to override the styles is now `css`, which will be parsed by `glamorous` and applied to the component. The `style` prop will be treated as inline styles so it still works, but you can't have the nice features from `glamor` like hover states or media queries so be very careful about using it.

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

## Utilities

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

It will automatically fill the entire parent element maintaining the original image ratio. Please note that the parent element needs to have a defined height as you would expect for any background image as well.

`FullsizePicture` accepts the same props as `Picture` plus a few more for styling.

| Prop | Type | Default | Definition |
| --- | --- | --- | --- |
| pictureClassName | string | | Any additional CSS classes you might want to use to style the inner `Picture` component |
| pictureCSS | object \|\| array \|\| string |  | Any additional styles you might want to send to the inner `Picture` component |

## Contributing

Please follow our [contributing guidelines](https://github.com/EDITD/react-responsive-picture/blob/master/CONTRIBUTING.md).

## License

[MIT](https://github.com/EDITD/react-responsive-picture/blob/master/LICENSE)

