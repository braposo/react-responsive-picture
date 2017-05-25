import Picture from "./Picture";
import React from "react";
import PropTypes from "prop-types";
import { css } from "glamor";

class FullSizePicture extends React.PureComponent {
    getStyles() {
        const styles = {
            overflow: "hidden",
            width: "100%",
            height: "100%",
            position: "relative",
        };

        return css(
            styles,
            this.props.style,
        );
    }

    getImageWrapperStyles() {
        return css({
            position: "absolute",
            top: "-50%",
            width: "200%",
            left: "-50%",
            height: "200%",
        });
    }

    getImageStyles() {
        const styles = {
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            margin: "auto",
            minWidth: "50%",
            minHeight: "50%",
        };

        return css(
            styles,
            this.props.imageStyle,
        );
    }

    render() {
        return (
            <div className={this.props.className} {...this.getStyles()}>
                <div {...this.getImageWrapperStyles()}>
                    <Picture
                        alt={this.props.alt}
                        src={this.props.src}
                        sources={this.props.sources}
                        style={this.getImageStyles()}
                    />
                </div>
            </div>
        );
    }
}

FullSizePicture.propTypes = {
    className: PropTypes.string,
    alt: PropTypes.string,
    sources: PropTypes.array,
    src: PropTypes.string,
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    imageStyle: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
};

export default FullSizePicture;
