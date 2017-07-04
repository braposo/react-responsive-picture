import Picture from "./Picture";
import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";

const Wrapper = glamorous.div(() => [
    {
        overflow: "hidden",
        width: "100%",
        height: "100%",
        position: "relative",
    },
]);

const PictureWrapper = glamorous.div(() => [
    {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
]);

class FullSizePicture extends React.PureComponent {
    getImageStyles(propsStyle) {
        return [
            {
                position: "absolute",
                top: "50%",
                left: "50%",
                margin: "auto",
                height: "auto",
                minWidth: "100%",
                minHeight: "100%",
                maxWidth: "none",
                maxHeight: "none",
                transform: "translate3d(-50%, -50%, 0)",
            },
            propsStyle,
        ];
    }

    render() {
        const {
            className,
            pictureClassName,
            style,
            pictureCSS,
            css,
            ...rest
        } = this.props;
        return (
            <Wrapper className={className} css={css} style={style}>
                <PictureWrapper>
                    <Picture
                        className={pictureClassName}
                        css={this.getImageStyles(pictureCSS)}
                        {...rest}
                    />
                </PictureWrapper>
            </Wrapper>
        );
    }
}

FullSizePicture.propTypes = {
    className: PropTypes.string,
    pictureClassName: PropTypes.string,
    alt: PropTypes.string,
    sources: PropTypes.array,
    src: PropTypes.string,
    style: PropTypes.object,
    css: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]),
    pictureCSS: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string,
    ]),
};

export default FullSizePicture;
