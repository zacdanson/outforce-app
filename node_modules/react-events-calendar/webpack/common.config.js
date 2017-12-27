const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const merge = require('webpack-merge');
const webpack = require('webpack');

const development = require('./dev.config.js');
const production = require('./prod.config.js');

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        'react-events-calendar': path.join(__dirname, '../src/Calendar')
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, '../dist')
    },

    resolve: {
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
    }
};

if (TARGET === 'dev' || !TARGET) {
    module.exports = merge(development, common);
}

if (TARGET === 'prod' || !TARGET) {
    module.exports = merge(production, common);
}
