const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const { ProvidePlugin } = require('webpack')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");


module.exports = {

    // entry: {
    //     'plugin.js': [
    //         path.join(__dirname, './src/script.js'),
    //         path.join(__dirname, './src/gui.js')
    //     ]
    // },
    //entry: ['./src/main.js', './src/components/ui.js', './src/components/transaction.js'],
    entry: ['./src/main.js', './src/components/ui-test.js'],
    output:
    {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    resolve: {
        alias: {
            process: "process/browser"
        },
        fallback: {
            "http": require.resolve("stream-http"),
            "fs": false,
            "child_process": false,
            "worker_threads": false
        }
    },
    plugins:
        [
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, '../static') }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html'),
                minify: true
            }),
            new ProvidePlugin({
                process: 'process/browser'
            }),
            new MiniCSSExtractPlugin(),
            new NodePolyfillPlugin()


        ],
    module:
    {
        rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use: ['html-loader']
                },

                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:
                        [
                            'babel-loader'
                        ]
                },

                // CSS
                {
                    test: /\.css$/,
                    use:
                        [
                            MiniCSSExtractPlugin.loader,
                            'css-loader'
                        ]
                },

                // Images
                {
                    test: /\.(jpg|png|gif|svg|psd)$/,
                    use:
                        [
                            {
                                loader: 'file-loader',
                                options:
                                {
                                    outputPath: 'assets/images/'
                                }
                            }
                        ]
                },
                // Models
                {
                    test: /\.(fbx)$/,
                    use:
                        [
                            {
                                loader: 'file-loader',
                                options:
                                {
                                    outputPath: 'assets/models/'
                                }
                            }
                        ]
                },

                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use:
                        [
                            {
                                loader: 'file-loader',
                                options:
                                {
                                    outputPath: 'assets/fonts/'
                                }
                            }
                        ]
                }
            ]
    }
}
