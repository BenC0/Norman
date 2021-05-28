const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const build_folder = "./src/"
const production_folder = "./dist/"

const config = {
	entry: {
		index: `${build_folder}index.js`
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, production_folder)
	},
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					keep_classnames: true,
					keep_fnames: true
				}
			})
		]
	},
	devtool: false,
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin()
	]
};

module.exports = config;