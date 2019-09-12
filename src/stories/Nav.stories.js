import { storiesOf } from "@storybook/svelte"
import NavView from "./views/NavView"

storiesOf("Nav", module).add("example with Nav", () => ({
  Components: NavView,
  props: { segment: "blog" }
}))
