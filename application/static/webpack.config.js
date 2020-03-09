const webpack = require('webpack');
const resolve = require('path').resolve;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require("webpack-md5-hash");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
    entry: {
        main: __dirname + '/js/index.jsx'
    },
    devtool: 'eval-source-map',
    output:{
        path: __dirname + '/dist',
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js','.jsx','.scss']
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s(a|c)ss$/m,
                use: [
					{
						loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					},
					{
                        loader: 'css-loader',
					},
					{
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment,
                            implementation: require('sass')
                        }
					}
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            inject: false,
            hash: true,
            template: './index-template.html',
            filename: '../../templates/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css'
        }),
        new WebpackMd5Hash(),
        new CleanWebpackPlugin()
    ]
};

module.exports = config;
