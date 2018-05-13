const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

const ProvidePlugins =  new webpack.ProvidePlugin({
	_:'lodash',
	React: 'react',
	moment: 'moment',
});

const DefinePlugins = new webpack.DefinePlugin({
	'process.env': {
		NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		API_URL: JSON.stringify(process.env.API_URL)
	}
});

const Uglify = new webpack.optimize.UglifyJsPlugin();



const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './src/index.html',
	filename: 'index.html',
	inject: 'false'
});


module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '/'
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
		DefinePlugins,
		ProvidePlugins,
		Uglify
	],

};