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
    appIndexJs: resolveApp('src/index.tsx'),
    appContentBase: resolveApp('public'),
    appIndexHtml: resolveApp('public/index.html'),
    appBuild: resolveApp('dist'),
};

module.exports = (env, argv) => {
    const isEnvDevelopment = argv.mode === 'development';
    const isEnvProduction = argv.mode === 'production';
    const { mode = 'production' } = argv;

    const publicPath = env.ASSET_PATH || '/';

    console.log(`Public path: ${publicPath}`);

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
                template: paths.appIndexHtml,
                publicPath: publicPath,
                cache: isEnvDevelopment,
                minify: isEnvProduction,
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
                                sourceMap: isEnvDevelopment,
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
            minimizer: [new TerserPlugin({ terserOptions: { compress: isEnvProduction, sourceMap: isEnvDevelopment } })],
            splitChunks: isEnvProduction
                ? {
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
                  }
                : undefined,
        },
        stats: 'errors-only',
    };
};
