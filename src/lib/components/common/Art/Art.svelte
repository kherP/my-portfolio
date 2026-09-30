<script lang="ts">
  import { onMount } from "svelte";
  import { paintArt } from "$lib/utils/art";
  export let kind: string;
  // empty label = decorative, hidden from screen readers
  export let label: string = "";

  let canvas: HTMLCanvasElement;
  let ready = false;
  $: if (ready) paintArt(canvas, kind);

  onMount(() => {
    // paint once the fonts the artwork uses have loaded
    document.fonts.ready.then(() => (ready = true));
    let lastWidth = innerWidth;
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      if (innerWidth === lastWidth) return;
      lastWidth = innerWidth;
      clearTimeout(timer);
      timer = setTimeout(() => paintArt(canvas, kind), 150);
    };
    addEventListener("resize", onResize);
    return () => {
      removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  });
</script>

{#if label}
  <canvas bind:this={canvas} role="img" aria-label={label} />
{:else}
  <canvas bind:this={canvas} aria-hidden="true" />
{/if}

<style>
  canvas {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
</style>
