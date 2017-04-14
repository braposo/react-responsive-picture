import Picture from "./Picture";
import React from "react";
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
    className: React.PropTypes.string,
    alt: React.PropTypes.string,
    sources: React.PropTypes.array,
    src: React.PropTypes.string,
    style: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
    imageStyle: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
};

export default FullSizePicture;
