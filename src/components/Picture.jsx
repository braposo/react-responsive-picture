import React from "react";
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
                <audio>
                    {mappedSources}
                </audio>
            );
        }

        return mappedSources;
    }

    render() {
        return (
            <picture>
                {this.renderSources()}
                <img
                    alt={this.props.alt}
                    src={this.props.src}
                    width={this.props.width}
                    height={this.props.height}
                    className={this.props.className}
                    data-no-retina={true}
                    {...this.getImageStyles()}
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
    className: React.PropTypes.string,
};

Picture.defaultProps = {
    src: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
};

export default Picture;
