const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'basic': './examples/basic'
    },

    output: {
        filename: '[name].js',
        path: __dirname
    },

    resolve: {
        alias: {
            'react-events-calendar': '../../src/Calendar'
        },

        extensions: [
            '',
            '.jsx',
            '.js',
            '.json',
            '.scss'
        ],

        modules: [
            'node_modules'
        ]
    },

    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass'
            },
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },

    postcss: (param) => {
        return [
            autoprefixer({
                browsers: ['last 2 versions']
            }),
            postcssImport({
                addDependencyTo: param
            })
        ];
    },

    devtool: 'source-map',

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/basic/index.html'),
            hash: true,
            filename: 'index.html',
            inject: 'body'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            __DEVELOPMENT__: true
        }),
        new ExtractTextPlugin('styles/[name].[contenthash].css'),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
