const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const appDir = fs.realpathSync(process.cwd());
const resolveApp = appPath => path.resolve(appDir, appPath);
const paths = { appSrc: resolveApp('src'), appHtml: resolveApp('src/index.html'), appIndexJs: resolveApp('src/index.tsx') };

module.exports = {
    mode: 'development',
    entry: paths.appIndexJs,

    plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({ filename: 'static/styles.[chunkhash].css' }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: paths.appHtml,
            inject: true,
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
};
