/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require("webpack");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const reactExternal = {
    root: "React",
    commonjs2: "react",
    commonjs: "react",
    amd: "React",
};

const reactDomExternal = {
    commonjs: "react-dom",
    commonjs2: "react-dom",
    amd: "ReactDOM",
    root: "ReactDOM",
};

const config = {
    mode: process.env.NODE_ENV || "development",
    externals: {
        react: reactExternal,
        "react-dom": reactDomExternal,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
            },
        ],
    },
    resolve: {
        modules: [path.join(__dirname, "./src/"), "node_modules"],
        extensions: [".js", ".tsx", ".ts"],
    },
    output: {
        library: "ReactResponsivePicture",
        libraryTarget: "umd",
    },
    plugins: [new webpack.optimize.OccurrenceOrderPlugin()],
};

module.exports = config;
