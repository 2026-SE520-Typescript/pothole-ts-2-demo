const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: process.env.BASE_URL ?? '/',
        clean: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    transpileOnly: false, // Ensures type checking
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: '[local]--[name]--[hash:base64:5]'
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
            'process.env.MAP_KEY': JSON.stringify(process.env.MAP_KEY ?? ''),
            'process.env.API_KEY': JSON.stringify(process.env.API_KEY ?? ''),
            'process.env.MY_PASSWORD': JSON.stringify(process.env.MY_PASSWORD ?? '')
        })
    ]
};
