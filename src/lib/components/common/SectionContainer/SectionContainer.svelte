<script lang="ts">
  import type { HeaderElements } from "$lib/@types/header";
  import { H1, H2 } from "../HeaderElements";
  import { reveal } from "$lib/utils/motion";
  export let showMore: boolean = false;
  export let viewMorePath: string = "";
  export let viewMoreText: string = "View more";
  export let headerTag: HeaderElements = showMore ? H2 : H1;
  // terminal command shown above the heading, e.g. "ls ./work"
  export let cmd: string = "";
</script>

<section class="block">
  <header class="block-head" use:reveal>
    {#if cmd}<p class="cmd">{cmd}</p>{/if}
    <svelte:component this={headerTag} class="block-title glow" data-decode>
      <slot name="header" />
    </svelte:component>
    <slot name="lede" />
  </header>
  <slot name="content">
    <p>No content</p>
  </slot>
  {#if showMore}
    <p class="more">
      <a sveltekit:prefetch class="more-link" href={viewMorePath}>{viewMoreText}</a>
    </p>
  {/if}
</section>
