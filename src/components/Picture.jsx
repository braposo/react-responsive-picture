import React from "react";
import Radium from "radium";

require("respimage"); // eslint-disable-line import/no-commonjs

class Picture extends React.PureComponent {

    renderSources(sources) {
        if (!sources) {
            return null;
        }

        return sources.map((source, id) => {
            const { srcSet, media } = source;

            const sourceProps = {
                srcSet,
                media,
            };

            return (
                <source
                    key={id}
                    {...sourceProps}
                />
            );
        });
    }

    // IE9 requires the sources to be wrapped around an <audio> tag.
    // Can't even begin to understand that madness.
    renderIESources(sources) {
        if (!sources) {
            return null;
        }

        return (
            <audio>
                {this.renderSources(sources)}
            </audio>
        );
    }

    render() {
        const { sources } = this.props;
        const ieVersion = document.documentMode ? document.documentMode : -1;

        return (
            <picture>
                {
                    ieVersion === 9 ?
                        this.renderIESources(sources) :
                        this.renderSources(sources)
                }
                <img
                    alt={this.props.alt}
                    src={this.props.src}
                    width={this.props.width}
                    height={this.props.height}
                    style={this.props.style}
                    data-no-retina={true}
                />
            </picture>
        );
    }
}

Picture.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    sources: React.PropTypes.array,
    src: React.PropTypes.string.isRequired,
    style: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
    alt: React.PropTypes.string,
};

Picture.defaultProps = {
    src: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
};

export default Radium(Picture);