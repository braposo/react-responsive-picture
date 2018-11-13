/* eslint-env node */
var webpack = require("webpack");
var path = require("path");
var env = process.env.NODE_ENV;

var reactExternal = {
    root: "React",
    commonjs2: "react",
    commonjs: "react",
    amd: "React",
};

var reactDomExternal = {
    commonjs: "react-dom",
    commonjs2: "react-dom",
    amd: "ReactDOM",
    root: "ReactDOM",
};

var config = {
    mode: process.env.NODE_ENV || 'development',
    externals: {
        react: reactExternal,
        "react-dom": reactDomExternal,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: ["babel-loader"],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        modules: [path.join(__dirname, "./src/"), "node_modules"],
        extensions: [".js", ".jsx"],
    },
    output: {
        library: "ReactResponsivePicture",
        libraryTarget: "umd",
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
};

module.exports = config;
