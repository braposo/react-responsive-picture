import * as React from "react";
import canUseDom from "can-use-dom";

export type Props = {
    sources?: {
        srcSet: string;
        media?: string;
        type?: string;
    }[];
    src?: string;
    alt?: string;
    className?: string;
    sizes?: string;
};

class Picture extends React.PureComponent<Props> {
    componentDidMount(): void {
        // c.f. https://github.com/scottjehl/picturefill/pull/556
        let picturefill;
        try {
            picturefill = require("picturefill"); // eslint-disable-line global-require
        } catch (x) {
            return;
        }

        if (picturefill) {
            picturefill(); // browser
        }
        // else node
    }

    renderSources(): JSX.Element | (JSX.Element | null)[] | null {
        const ieVersion =
            canUseDom && document["documentMode"]
                ? document["documentMode"]
                : -1;
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
                    key={`sources-${index}`}
                    srcSet={source.srcSet}
                    media={source.media}
                    type={source.type}
                />
            );
        });

        // IE9 requires the sources to be wrapped around an <audio> tag.
        if (ieVersion === 9) {
            return <video style={{ display: "none" }}>{mappedSources}</video>;
        }

        return mappedSources;
    }

    renderImage(
        props: Exclude<Props, "sources">,
        skipSizes = false
    ): JSX.Element {
        const {
            alt = "",
            src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
            sizes,
            ...rest
        } = props;

        // Adds sizes props if sources isn't defined
        const sizesProp = skipSizes ? null : { sizes };

        return <img alt={alt} srcSet={src} {...sizesProp} {...rest} />;
    }

    render(): JSX.Element {
        const { sources, ...rest } = this.props;
        if (sources != null) {
            return (
                <picture>
                    {this.renderSources()}
                    {this.renderImage(rest, true)}
                </picture>
            );
        }

        return this.renderImage(rest);
    }
}

export default Picture;
