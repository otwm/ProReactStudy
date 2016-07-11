var path = require('path');

module.exports = {
    /**
     * 엔트리 포인트 및 번들의 정의
     */
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};