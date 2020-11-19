const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const appDir = fs.realpathSync(process.cwd());
const resolveApp = appPath => path.resolve(appDir, appPath);
const paths = {
    appSrc: resolveApp('src'),
    appHtml: resolveApp('src/index.html'),
    appIndexJs: resolveApp('src/index.tsx'),
    appContentBase: resolveApp('public'),
};

const publicPath = './';

module.exports = {
    mode: 'development',
    entry: paths.appIndexJs,

    output: {
        filename: 'main.[contenthash:8].js',
        publicPath: publicPath,
    },

    devServer: {
        publicPath: '/',
        contentBase: paths.appContentBase,
        historyApiFallback: true,
        port: 13000,
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({ filename: 'static/styles.[contenthash:8].css' }),
        new HtmlWebpackPlugin({
            template: paths.appHtml,
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                include: paths.appSrc,
                exclude: [/node_modules/],
            },
            {
                test: /.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },

    optimization: {
        minimizer: [new TerserPlugin()],

        splitChunks: {
            cacheGroups: {
                vendors: {
                    priority: -10,
                    test: /[\\/]node_modules[\\/]/,
                },
            },

            chunks: 'async',
            minChunks: 1,
            minSize: 30000,
            name: false,
        },
    },
    stats: 'errors-only',
};
