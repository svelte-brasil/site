const { aliases, scssAliases } = require("../webpack.parts");
const merge = require("webpack-merge");

module.exports = ({ config, mode }) => {
  // console.dir(config, { depth: null });
  let mergedConfig = merge.smart(config, {
    module: {
      rules: [
        {
          test: /\.(svelte|html)$/,
          loader: "svelte-loader",
          options: {
            preprocess: require("svelte-preprocess")({
              scss: {
                importer: [scssAliases(aliases)]
              }
            })
          }
        }
      ]
    }
  });
  mergedConfig.resolve.alias = { ...mergedConfig.resolve.alias, ...aliases };
  //console.dir(mergedConfig, {depth: null});
  return mergedConfig;
};
