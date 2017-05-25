import React from "react";
import PropTypes from "prop-types";
import { css } from "glamor";
import picturefill from "picturefill";

class Picture extends React.PureComponent {
    componentDidMount() {
        picturefill();
    }

    getImageStyles() {
        return css(this.props.style);
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

    renderImage(skipSizes = false) {
        // Adds sizes props if sources isn't defined
        const sizesProp = skipSizes ? null : { sizes: this.props.sizes };
        return (
            <img
                alt={this.props.alt}
                srcSet={this.props.src}
                className={this.props.className}
                data-no-retina={true}
                {...sizesProp}
                {...this.getImageStyles()}
            />
        );
    }

    render() {
        if (this.props.sources != null) {
            return (
                <picture>
                    {this.renderSources()}
                    {this.renderImage(true)}
                </picture>
            );
        }

        return this.renderImage();
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
