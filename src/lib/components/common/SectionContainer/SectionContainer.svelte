<script lang="ts">
  import type { HeaderElements } from "$lib/@types/header";
  import { H1, H2 } from "../HeaderElements";
  export let showMore: boolean = false;
  export let viewMorePath: string = "";
  const headerTag: HeaderElements = showMore ? H2 : H1;
</script>

<section>
  <svelte:component this={headerTag} ref="header">
    <slot name="header" />
  </svelte:component>
  <slot name="content">
    <span>No content</span>
  </slot>
  {#if showMore}
    <footer>
      <a sveltekit:prefetch class="show-more-link" href={viewMorePath}>View more</a>
    </footer>
  {/if}
</section>

<style type="scss">
  @use 'src/lib/styles/variables' as *;

  section {
    margin: 3rem 0 5rem;
    text-align: center;
    :global([ref=header]) {
      font-size: $font-size-h2;
      font-weight: 200;
      text-align: left;
    }
    footer {
      margin: 3em;
      > .show-more-link {
        padding: 1rem 2em;
        border: 1px solid $primary-color;
        color: $primary-color;
        margin: auto;
      }
    }
  }
</style>
