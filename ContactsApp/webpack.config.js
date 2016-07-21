var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './src/App.js'
    ],
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                include: [
                    path.resolve(__dirname, "src")
                ]
            }
        ]
    },
    devtool: '#inline-source-map'
}