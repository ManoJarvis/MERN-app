const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return {
    devtool: isDevelopment && "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/js/bundle.js",
      publicPath: "/"
    },
  
    module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                        envName: isProduction ? "production" : "development"
                    }
                }
                },
                {
                    test: /\.css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                        "css-loader"
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: {
                            loader: "url-loader",
                            options: {
                                name: "static/media/[name].[hash:8].[ext]"
                            }
                        },
                    // test: /\.(jpe?g|png|gif|svg)$/i,
                    // use: [
                    // {
                    //     loader: 'url-loader', // Or `url-loader` or your other loader
                    // },
                    // {
                    //     loader: ImageMinimizerPlugin.loader,
                    //     options: {
                    //         severityError: 'warning', // Ignore errors on corrupted images
                    //         minimizerOptions: {
                    //             plugins: ['gifsicle'],
                    //         },
                    //     },
                    // },
                    // ],
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"]
                },
                {
                    test: /\.(eot|otf|ttf|woff|woff2)$/,
                    loader: require.resolve("file-loader"),
                    options: {
                                name: "static/media/[name].[hash:8].[ext]"
                            }
                }
            ]
            },
            resolve: {
                extensions: [".js", ".jsx"]
            },
            plugins: [
                isProduction &&
                new MiniCssExtractPlugin({
                    filename: "assets/css/bundle.css",
                    chunkFilename: "assets/css/bundle.chunk.css"
                }),
                new webpack.DefinePlugin({
                          "process.env.NODE_ENV": JSON.stringify(
                            isProduction ? "production" : "development"
                          )
                        }),
                new ImageMinimizerPlugin({
                    minimizerOptions: {
                      plugins: [
                        ['gifsicle',{ quality: 60 }, { interlaced: true }],
                        ['jpegtran',{ quality: 60 }, { progressive: true }],
                        ['optipng', { quality: 60 },{ optimizationLevel: 5 }],
                        [
                          'svgo',
                          {
                            plugins: [
                              {
                                removeViewBox: false,
                              },
                            ],
                          },
                        ],
                      ],
                    },
                }),
                new HtmlWebpackPlugin({
                    template: path.resolve(__dirname, "public/index.html"),
                    inject: true
                })
            ].filter(Boolean)
           };
         };


