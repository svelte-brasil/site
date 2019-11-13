const webpack = require("webpack");
const config = require("sapper/config/webpack.js");
const pkg = require("./package.json");
const fs = require("fs");
const path = require("path");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

const extensions = [".mjs", ".js", ".json", ".svelte", ".html"];
const mainFields = ["svelte", "module", "browser", "main"];
const { scss } = require("svelte-preprocess");

const dotenv = require("dotenv");

dotenv.config();

const ENV_VARS = dotenv.parse(
  fs.readFileSync(path.resolve(__dirname, `.env.${process.env.NODE_ENV}`))
);

const valuesEnvToReplace = () => {
  return Object.entries(ENV_VARS).reduce((acc, [key, val]) => {
    acc[`process.env.${key}`] = JSON.stringify(val);
    return acc;
  }, {});
};

module.exports = {
  client: {
    entry: config.client.entry(),
    output: config.client.output(),
    resolve: { extensions, mainFields },
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              preprocess: require("svelte-preprocess")([scss()]),
              dev,
              hydratable: true,
              hotReload: true
            }
          }
        }
      ]
    },
    mode,
    plugins: [
      // pending https://github.com/sveltejs/svelte/issues/2377
      // dev && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode),
        ...valuesEnvToReplace()
      })
    ].filter(Boolean),
    devtool: dev && "inline-source-map"
  },

  server: {
    entry: config.server.entry(),
    output: config.server.output(),
    target: "node",
    resolve: { extensions, mainFields },
    externals: Object.keys(pkg.dependencies).concat("encoding"),
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          use: {
            loader: "svelte-loader",
            options: {
              preprocess: require("svelte-preprocess")([scss()]),
              css: false,
              generate: "ssr",
              dev
            }
          }
        }
      ]
    },
    mode: process.env.NODE_ENV,
    performance: {
      hints: false // it doesn't matter if server.js is large
    }
  },

  serviceworker: {
    entry: config.serviceworker.entry(),
    output: config.serviceworker.output(),
    mode: process.env.NODE_ENV
  }
};
