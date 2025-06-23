// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
// const path = require("path");

// module.exports = {
//   entry: path.resolve(__dirname, "../src/script.js"),
//   output: {
//     filename: "bundle.[contenthash].js",
//     path: path.resolve(__dirname, "../dist"),
//   },
//   devtool: "source-map",
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, "../src/index.html"),
//       minify: true,
//     }),
//     new MiniCSSExtractPlugin(),
//   ],
//   module: {
//     rules: [
//       // HTML
//       {
//         test: /\.(html)$/,
//         use: ["html-loader"],
//       },

//       // JS
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: ["babel-loader"],
//       },

//       // CSS
//       {
//         test: /\.css$/,
//         use: [MiniCSSExtractPlugin.loader, "css-loader"],
//       },

//       // Images
//       {
//         test: /\.(jpg|png|gif)$/,
//         use: [
//           {
//             loader: "file-loader",
//             options: {
//               outputPath: "assets/images/",
//             },
//           },
//         ],
//       },

//       // Fonts
//       {
//         test: /\.(TTF|ttf|otf|eot|woff|woff2)$/,
//         use: [
//           {
//             loader: "file-loader",
//             options: {
//               outputPath: "assets/fonts/",
//             },
//           },
//         ],
//       },

//       // Shaders
//       {
//         test: /\.(glsl|vs|fs|vert|frag)$/,
//         exclude: /node_modules/,
//         use: ["raw-loader", "glslify-loader"],
//       },
//       {
//         test: /\.pdf$/,
//         use: [
//           {
//             loader: "file-loader",
//             options: {
//               name: "[name].[ext]",
//               outputPath: "assets/pdf/",
//             },
//           },
//         ],
//       },
//       {
//         test: /\.svg$/,
//         use: [
//           {
//             loader: "file-loader",
//             options: {
//               outputPath: "assets/images/",
//               // Asegura que el tipo MIME sea 'image/svg+xml'
//               mimetype: "image/svg+xml",
//             },
//           }
//         ],
//       },


//     ],
//   },
// };

// bundler/webpack.prod.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "../src/script.js"),
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    clean: true,
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      minify: true,
    }),
    new MiniCSSExtractPlugin({
      filename: "bundle.[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../src/static"),
          to: path.resolve(__dirname, "../dist/static"),
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
  module: {
    rules: [
      // — HTML
      {
        test: /\.html$/,
        use: ["html-loader"],
      },

      // — JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      // — CSS
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },

      // — Images & icons (jpg, png, gif, svg, webp, ico)
      {
        test: /\.(jpe?g|png|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[contenthash][ext]",
        },
      },

      // — PDFs
      {
        test: /\.pdf$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/pdf/[name].[contenthash][ext]",
        },
      },

      // — Fonts
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash][ext]",
        },
      },

      // — GLSL / Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader", "glslify-loader"],
      },
    ],
  },
};

