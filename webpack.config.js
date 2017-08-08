/**
 * Created by vpotseluyko on 6/15/17.
 */

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

const obj = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: [
            './app.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: "[name].js",
        chunkFilename: "[id].js"
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                include: [
                    path.resolve(__dirname, './src')
                ],
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "stage-0"]
                }
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|jpg|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1
                }

            },
            {
                test: /\.css(x?)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader'
                    ]
                })
            },

            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'stylus-loader',
                            options: {
                                use: [require("nib")()]
                            }
                        }
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js"]
    },
    plugins: [
        new CleanWebpackPlugin(["server/public"]),
        new ExtractTextPlugin("[name].css"),
        new UglifyJSPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        })
    ]
};

fs.readdirSync('./src/pages/').forEach(file => {
    obj.plugins.push(
        new HtmlWebpackPlugin({
            template: `./pages/${file}`,
            hash: true,
            filename: `${file.split('.')[0]}.html`
        })
    );
});

module.exports = obj;