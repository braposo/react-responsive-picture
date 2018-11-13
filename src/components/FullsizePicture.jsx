import Picture from "./Picture";
import React from "react";
import cxs from "cxs/component";
import PropTypes from "prop-types";

const Wrapper = cxs("div")({
    width: "100%",
    height: "100%",
    position: "relative",
});

const PictureWrapper = cxs("div")({
    overflow: "hidden",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
});

const Fullsized = (Component) => ({
    className,
    wrapperClassName,
    children,
    ...rest
}) => {
    const PictureComponent = cxs(Component)(
        ({ cover = "both", center = true }) => ({
            position: "absolute",
            top: center ? "50%" : 0,
            left: center ? "50%" : 0,
            transform: center ? "translate(-50%, -50%)" : "none",
            width: cover === "width" ? "100%" : "auto",
            height: cover === "height" ? "100%" : "auto",
            minHeight: cover === "both" ? "100%" : "none",
            minWidth: cover === "both" ? "100%" : "none",
        })
    );

    PictureComponent.propTypes = {
        center: PropTypes.bool,
        cover: PropTypes.string,
    };

    return (
        <Wrapper className={wrapperClassName}>
            <PictureWrapper>
                <PictureComponent className={className} {...rest} />
                {children}
            </PictureWrapper>
        </Wrapper>
    );
};

export default Fullsized(Picture);
