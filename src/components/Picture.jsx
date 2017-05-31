import React from "react";
import PropTypes from "prop-types";
import { css } from "glamor";
import picturefill from "picturefill";

class Picture extends React.PureComponent {
    componentDidMount() {
        picturefill();
    }

    getImageStyles(style) {
        return css(style);
    }

    renderSources() {
        const ieVersion = document.documentMode ? document.documentMode : -1;
        const { sources } = this.props;

        if (sources == null) {
            return null;
        }

        const mappedSources = sources.map((source, index) => {
            if (source.srcSet == null) {
                return null;
            }

            return (
                <source
                    key={index}
                    srcSet={source.srcSet}
                    media={source.media}
                    type={source.type}
                />
            );
        });

        // IE9 requires the sources to be wrapped around an <audio> tag.
        if (ieVersion === 9) {
            return (
                <video style={{ display: "none" }}>
                    {mappedSources}
                </video>
            );
        }

        return mappedSources;
    }

    renderImage(props, skipSizes = false) {
        const { alt, src, className, sizes, style, ...rest } = props;

        // Adds sizes props if sources isn't defined
        const sizesProp = skipSizes ? null : { sizes };

        return (
            <img
                alt={alt}
                srcSet={src}
                className={className}
                data-no-retina={true}
                {...sizesProp}
                {...this.getImageStyles(style)}
                {...rest}
            />
        );
    }

    render() {
        const { sources, ...rest } = this.props;
        if (sources != null) {
            return (
                <picture>
                    {this.renderSources()}
                    {this.renderImage(rest, true)}
                </picture>
            );
        }

        return this.renderImage(rest);
    }
}

Picture.propTypes = {
    sources: PropTypes.array,
    src: PropTypes.string.isRequired,
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    alt: PropTypes.string,
    className: PropTypes.string,
    sizes: PropTypes.string,
};

Picture.defaultProps = {
    src: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
};

export default Picture;
