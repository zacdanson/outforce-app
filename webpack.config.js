const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

const ProvidePlugins =  new webpack.ProvidePlugin({
	_:'lodash',
	React: 'react',
	moment: 'moment'
});

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'body'
});

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		path: path.resolve('dist'),
		publicPath: '/',
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					plugins: [ 'transform-decorators-legacy']
                }
			},
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader'
			}
        ]
	},
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true
    },
	plugins: [
		HtmlWebpackPluginConfig,
		ProvidePlugins
	],

};