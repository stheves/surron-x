const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const appDir = fs.realpathSync(process.cwd());
const resolveApp = appPath => path.resolve(appDir, appPath);
const paths = {
    appSrc: resolveApp('src'),
    appHtml: resolveApp('src/index.html'),
    appIndexJs: resolveApp('src/index.tsx'),
    appContentBase: resolveApp('public'),
    appBuild: resolveApp('dist'),
};

const publicPath = './';

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';
    const { mode } = argv;
    return {
        mode: mode,
        entry: paths.appIndexJs,

        output: {
            filename: 'main.[chunkhash].js',
            publicPath: publicPath,
        },

        devServer: isEnvDevelopment
            ? {
                  publicPath: '/',
                  contentBase: paths.appContentBase,
                  historyApiFallback: true,
                  port: 13000,
              }
            : undefined,

        plugins: [
            isEnvProduction && new webpack.ProgressPlugin(),
            isEnvProduction && new MiniCssExtractPlugin({ filename: 'style.css' }),
            new HtmlWebpackPlugin({
                template: paths.appHtml,
                publicPath: publicPath,
                cache: false,
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(paths.appSrc, '**/*.php'),
                        to: paths.appBuild,
                        context: paths.appSrc,
                    },
                ],
            }),
        ].filter(Boolean),

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
                        isEnvProduction && MiniCssExtractPlugin.loader,
                        isEnvDevelopment && {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ].filter(Boolean),
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
};
