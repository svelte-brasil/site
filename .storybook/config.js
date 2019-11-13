import { configure } from "@storybook/svelte";

// automatically import all files ending in *.stories.js
configure(require.context("../src/stories", true, /\.stories\.[jt]s$/), module);
