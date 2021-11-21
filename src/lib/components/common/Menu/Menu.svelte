<script lang="ts">
  import MenuList from "../MenuList";
  import OverlayMenu from "../OverlayMenu";
  let windowWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} />
<nav>
  {#if windowWidth > 640}
    <MenuList />
  {:else}
    <OverlayMenu />
  {/if}
</nav>

<style type="scss">
  @use 'src/lib/styles/variables' as *;
	:global(.menu-list) {
    :global(a) {
      color: $gray-900;
    }
  }
</style>