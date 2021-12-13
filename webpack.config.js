const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/app.js'),
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};