const path = require("path");

/**
 * Enables the use of aliases in sass.
 */
const scssAliases = aliases => {
  return url => {
    // sass normally requires you to add a ~ character to the start of your aliases
    // so we want to remove this before comparing the url to an alias
    this.url = url.replace(/^~/, "");
    for (const [alias, aliasPath] of Object.entries(aliases)) {
      if (this.url.indexOf(alias) === 0) {
        return {
          file: path.resolve(this.url.replace(alias, aliasPath))
        };
      }
    }
    return null;
  };
};

/**
 * Aliases used during import, shared between webpack and sass-loader
 */
const aliases = {
  //TODO: Look at a way to share tsconfig.json paths and these aliases
  svelte: path.resolve("node_modules", "svelte"),
  "@src": path.resolve(__dirname, "src/"),
  "@styles": path.resolve(__dirname, "src/styles/")
};

module.exports = { scssAliases, aliases };
