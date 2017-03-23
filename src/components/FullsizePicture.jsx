import Radium from "radium";
import Picture from "./Picture";
import React from "react";

class FullSizePicture extends React.PureComponent {
    getStyles() {
        const styles = {
            overflow: "hidden",
            width: "100%",
            position: "relative",
        };

        return [
            styles,
            this.props.style,
        ];
    }

    getImageWrapperStyles() {
        return {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        };
    }

    getImageStyles() {
        return {
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
        };
    }

    render() {
        return (
            <div style={this.getStyles()}>
                <div style={this.getImageWrapperStyles()}>
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
    alt: React.PropTypes.string,
    sources: React.PropTypes.array,
    src: React.PropTypes.string,
    style: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
};

export default Radium(FullSizePicture);
