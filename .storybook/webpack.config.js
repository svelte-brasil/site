const path = require("path")
const { scss } = require("svelte-preprocess")

module.exports = async ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.(html|js)$/,
      use: { loader: "babel-loader" }
    },
    {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    },
    {
      test: /\.(svelte|html)$/,
      use: {
        loader: "svelte-loader",
        options: {
          hotReload: false,
          preprocess: require("svelte-preprocess")([scss()])
        }
      }
    }
  )

  return config
}
