import Picture, { Props as PictureProps } from "./Picture";
import React from "react";
import cxs from "cxs/component";

type Props = {
    className?: string;
    wrapperClassName?: string;
} & StyledPictureProps;

type StyledPictureProps = {
    center?: boolean;
    cover?: string;
    className?: string;
    [x: string]: any;
} & PictureProps;

const Wrapper: React.FunctionComponent<{ className?: string }> = cxs("div")({
    width: "100%",
    height: "100%",
    position: "relative",
});

const PictureWrapper: React.FunctionComponent = cxs("div")({
    overflow: "hidden",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute",
});

const Fullsized: React.FunctionComponent<Props> = ({
    className,
    wrapperClassName,
    children,
    ...rest
}: Props) => {
    const StyledPicture: React.FunctionComponent<StyledPictureProps> = cxs(
        Picture
    )(({ cover = "both", center = true }) => ({
        position: "absolute",
        top: center ? "50%" : 0,
        left: center ? "50%" : 0,
        transform: center ? "translate(-50%, -50%)" : "none",
        width: cover === "width" ? "100%" : "auto",
        height: cover === "height" ? "100%" : "auto",
        minHeight: cover === "both" ? "100%" : "none",
        minWidth: cover === "both" ? "100%" : "none",
    }));

    return (
        <Wrapper className={wrapperClassName}>
            <PictureWrapper>
                <StyledPicture className={className} {...rest} />
                {children}
            </PictureWrapper>
        </Wrapper>
    );
};

export default Fullsized;
