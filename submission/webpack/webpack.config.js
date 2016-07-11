var path = require('path');
var webpack = require('webpack');

module.exports = {
    /**
     * 엔트리 포인트 및 번들의 정의
     */
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            },
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};