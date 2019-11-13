<style lang="scss">
  @import "../styles/_colors";
  h1,
  figure,
  p {
    text-align: center;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.8em;
    text-transform: uppercase;
    font-weight: 700;
    margin: 0 0 0.5em 0;
    color: $green-br;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em auto;
    color: $blue-br;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Svelte Brasil</title>
</svelte:head>

<h1>Svelte Brasil</h1>
<p>Boilerplate from Svelte Brazil Community</p>
<p>{process.env.ENV_TITLE}</p>

<figure>
  <img alt="Borat" src="svelte-brasil.jpg" />
</figure>
