/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

"use strict";

/* eslint-env node */

const fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const { bundler, styles } = require("@ckeditor/ckeditor5-dev-utils");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const globalCSSFilePath = path.resolve(__dirname, 'node_modules/@ckeditor/ckeditor5-ui/theme/globals/globals.css')
const globalCSSContent = fs.readFileSync(globalCSSFilePath, 'utf-8')
const globalCSSContentWithoutReset = globalCSSContent.replace('@import "./_reset.css";', '')
console.log(globalCSSContentWithoutReset)
fs.writeFileSync(globalCSSFilePath, globalCSSContentWithoutReset, { encoding: 'utf-8' })

module.exports = {
  devtool: "source-map",
  performance: { hints: false },

  entry: [
    require.resolve("regenerator-runtime/runtime.js"),
    path.resolve(__dirname, "src", "ckeditor.js"),
  ],

  output: {
    // The name under which the editor will be exported.
    library: "ClassicEditor",

    path: path.resolve(__dirname, "build"),
    filename: "ckeditor.js",
    libraryTarget: "umd",
    libraryExport: "default",
  },

  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        sourceMap: true,
        terserOptions: {
          output: {
            // Preserve CKEditor 5 license comments.
            comments: /^!/,
          },
        },
        extractComments: false,
      }),
    ],
  },

  plugins: [
    new CKEditorWebpackPlugin({
      // UI language. Language codes follow the https://en.wikipedia.org/wiki/ISO_639-1 format.
      // When changing the built-in language, remember to also change it in the editor's configuration (src/ckeditor.js).
      language: "en",
      additionalLanguages: "all",
    }),
    new webpack.BannerPlugin({
      banner: bundler.getLicenseBanner(),
      raw: true,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /(ckeditor5(?:-[^\/\\]+)?)[\/\\].+\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [require("@babel/preset-env")],
            },
          },
        ],
      },
      {
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ["raw-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag",
              attributes: {
                "data-cke": true,
              },
            },
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve("./theme/theme.css"),
                },
                minify: true,
              }),
            },
          },
        ],
      },
    ],
  },
};
