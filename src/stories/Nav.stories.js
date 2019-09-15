import { storiesOf } from "@storybook/svelte"
import NavView from "./views/NavView.svelte"

storiesOf("Nav", module).add("example with Nav", () => ({
  Component: NavView,
  props: { segment: "blog" }
}))
