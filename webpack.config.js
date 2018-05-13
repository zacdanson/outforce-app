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


function returnPlugins(){

	let plugins = [
		DefinePlugins,
		HtmlWebpackPluginConfig,
		ProvidePlugins
	];

	if(process.env.NODE_ENV === 'production'){
		plugins.push(Uglify);
	}

	return plugins;

}

module.exports = {
	entry: ['babel-polyfill', './src/index.js'],
	output: {
		path: path.resolve('dist'),
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
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
					loader: 'image-webpack-loader',
					query: {
						mozjpeg: {
							progressive: true,
						},
						gifsicle: {
							interlaced: false,
						},
						optipng: {
							optimizationLevel: 4,
						},
						pngquant: {
							quality: '75-90',
							speed: 3,
						},
					},
				}],
				exclude: /node_modules/,
				include: __dirname,
			},
		]
	},
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true
    },
	plugins: returnPlugins()

};