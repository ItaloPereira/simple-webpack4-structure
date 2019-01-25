const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.sass$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../fonts'
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../img'
                        }
                    }
                ]
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'script.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/style.css',
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/views/index.html'
        }),
        new CopyWebpackPlugin([
            { from: 'src/assets/extra', to: '../extra/' }
        ]),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 6080,
            server: {
                baseDir: ['./dist']
            },
        })
    ]
};