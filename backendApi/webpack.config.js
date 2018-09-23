const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

const locations = [
    path.resolve(__dirname, 'src')
];

module.exports = {
    mode: NODE_ENV,
    watch: NODE_ENV === 'development',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    },
    resolveLoader: {
        modules: ['node_modules'],
        extensions: ['.js', '.jsx']
    },
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'server.js'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.js$/],
                include: locations,
                use: { loader: 'babel-loader' }
            }
        ]
    }
};