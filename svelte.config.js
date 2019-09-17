const sveltePreprocess = require("svelte-preprocess")
const { scss } = require("svelte-preprocess")

module.exports = {
  preprocess: sveltePreprocess({
    scss
  })
}
