import React from "react";
import { Picture, FullsizePicture } from "../src";
import cxs from "cxs/component";
import { default as cxsStyles } from "cxs";

const styles = cxsStyles({
    opacity: 0.5,
});

const Heading1 = cxs("h1")({
    position: "relative",
    textAlign: "center",
    color: "white",
    marginTop: 50,
});

const App = () => (
    <div>
        <h2>Picture with art direction</h2>
        <div>
            <Picture
                sources={[
                    {
                        srcSet:
                            "https://placeholdit.co//i/400x400?text=Mobile%20image&bg=450000",
                        media: "(max-width: 380px)",
                    },
                    {
                        srcSet:
                            "https://placeholdit.co//i/500x250?text=Normal%20image&bg=450000 1x, https://placeholdit.co//i/1000x500?text=Retina%20image&bg=450000 2x",
                    },
                ]}
            />
        </div>
        <h2>Full-height Picture with art direction</h2>
        <div style={{ height: 400 }}>
            <FullsizePicture
                sources={[
                    {
                        srcSet:
                            "https://placeholdit.co//i/400x400?text=Mobile%20image",
                        media: "(max-width: 380px)",
                    },
                    {
                        srcSet:
                            "https://placeholdit.co//i/500x250?text=Normal%20image 1x, https://placeholdit.co//i/1000x500?text=Retina%20image 2x",
                    },
                ]}
                cover="height"
                center={true}
            />
        </div>
        <h2>Full-width Picture with content</h2>
        <div style={{ height: 400 }}>
            <FullsizePicture
                src="https://images.unsplash.com/photo-1470619549108-b85c56fe5be8?dpr=2&auto=format&w=1024&h=1024"
                center={true}
            >
                <Heading1 className="App-title">This is a heading</Heading1>
            </FullsizePicture>
        </div>
        <h2>Styled Picture</h2>
        <div>
            <Picture
                className={styles}
                src="https://placeholdit.co//i/500x250?text=Normal%20image&bg=004500 1x, https://placeholdit.co//i/1000x500?text=Retina%20image&bg=004500 2x"
            />
        </div>
    </div>
);

export default App;
