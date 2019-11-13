import Nav from "../../components/Nav.svelte"

export default {
  title: "Nav"
}

export const text = () => ({
  Component: Nav,
  props: { segment: "home" }
})
