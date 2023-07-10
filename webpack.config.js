const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");

const mode = process.env.NODE_ENV || "development";
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

const clientConfig = {
  entry: ["./src/index.js", 'webpack-hot-middleware/client?timeout=1000&reload=true',
'webpack/hot/dev-server'
],
  mode,
  target: "web",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: {
                safe: true
              }
            }
          },
          {
            loader: "sass-loader",
            options: {}
          }
        ]
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  output: {
    path: __dirname + '/dist/build',
    publicPath: "/",
    filename: "bundle.js",
		clean: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {
    hot: true,
    // watchFiles: ['src/**/*.js', 'assets/**/*'],
    port: 3000,
    host: "localhost",
    historyApiFallback: true,
		compress: true,
    // liveReload: true,
    // devMiddleware: {
    //   // index: true,
    //   // mimeTypes: { phtml: 'text/html' },
    //   // publicPath: "/",
    //   // serverSideRender: true,
    //   writeToDisk: true,
    // },
  }
}

const serverConfig = {
  mode,
  target,
  entry: "./index.js",
  externals: [nodeExternals()],
  output: {
    path: __dirname + '/dist',
    filename: "server.js",
    library: {
      type: "module",
    },
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
    ],
  },
}

module.exports = [clientConfig, serverConfig];
