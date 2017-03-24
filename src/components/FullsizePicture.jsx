import Picture from "./Picture";
import React from "react";
import { css } from "glamor";

class FullSizePicture extends React.PureComponent {
    getStyles() {
        const styles = {
            overflow: "hidden",
            width: "100%",
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
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        });
    }

    getImageStyles() {
        return css({
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "auto",
            width: "auto",
            height: "auto",
            minWidth: "100%",
            minHeight: "100%",
            maxWidth: "none",
            maxHeight: "none",
            transform: "translate3d(-50%, -50%, 0)",
        });
    }

    render() {
        return (
            <div className={this.props.className} {...this.getStyles()}>
                <div {...this.getImageWrapperStyles()}>
                    <Picture
                        src={this.props.src}
                        sources={this.props.sources}
                        {...this.getImageStyles()}
                    />
                </div>
            </div>
        );
    }
}

FullSizePicture.propTypes = {
    className: React.PropTypes.string,
    sources: React.PropTypes.array,
    src: React.PropTypes.string,
    style: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
};

export default FullSizePicture;
