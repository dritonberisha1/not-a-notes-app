const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        path: path.resolve(__dirname, 'react'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'electron'),
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./react/index.html",
            filename: "./index.html"
        })
    ],
    target: 'node'
};