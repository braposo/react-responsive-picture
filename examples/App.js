import React from "react";
import { FullsizePicture } from "../src";
import cxs from "cxs/component";

const StyledPicture = cxs(FullsizePicture)({
    opacity: 0.8,
});

const Heading1 = cxs("h1")({
    position: "relative",
    textAlign: "center",
    color: "white",
});

const App = () => (
    <div>
        <div style={{ height: 200 }}>
            <StyledPicture
                sources={[
                    {
                        srcSet:
                            "https://edited.com/static/img/homepage/edited-hero-table-wide.jpg",
                        media: "(max-width: 420px)",
                    },
                    {
                        srcSet:
                            "https://edited.com/static/img/homepage/edited-hero-table-wide.jpg",
                    },
                ]}
                cover="height"
                center={true}
            />
        </div>
        <div style={{ height: 200 }}>
            <FullsizePicture
                sources={[
                    {
                        srcSet:
                            "https://edited.com/static/img/homepage/edited-hero-table-wide.jpg",
                        media: "(max-width: 420px)",
                    },
                    {
                        srcSet:
                            "https://edited.com/static/img/homepage/edited-hero-table-wide.jpg",
                    },
                ]}
                cover="height"
                center={true}
            />
        </div>
        <div style={{ height: 200 }}>
            <FullsizePicture
                sources={[
                    {
                        srcSet:
                            "https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?dpr=2&auto=format&w=1024&h=1024",
                    },
                ]}
            >
                <Heading1 className="App-title">This is a heading</Heading1>
            </FullsizePicture>
        </div>
    </div>
);

export default App;
