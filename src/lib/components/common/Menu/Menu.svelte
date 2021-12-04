<script lang="ts">
  import MenuList from "../MenuList";
  import OverlayMenu from "../OverlayMenu";
  let windowWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} />
{#if windowWidth > 640}
  <MenuList />
{:else}
  <OverlayMenu />
{/if}

<style type="scss">
  @use 'src/lib/styles/variables' as *;
	:global(.menu-list) {
    :global(a) {
      color: $gray-900;
    }
  }
</style>