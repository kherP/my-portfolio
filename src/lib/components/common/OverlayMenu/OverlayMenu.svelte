<script lang="ts">
  import clsx from 'clsx';
  import { page } from '$app/stores';
  import { Body } from 'svelte-body';
	import { fly } from 'svelte/transition';
  import MenuList from '../MenuList';

  let toggle: boolean = false;
  $: if ($page) toggle = false;
</script>

<Body class={clsx({ noscroll: toggle })} /> <!-- set document body class -->
<button class={clsx({ toggled: toggle })} aria-describedby="button-description" on:click={() => toggle = !toggle}>
  <span class="menu-icon"></span>
  <span id="button-description" class="hidden">Click to toggle menu</span>
</button>
{#if toggle}
  <div
    class={clsx("menu-dialog", { show: toggle })}
    transition:fly="{{ y: 200, duration: 200 }}"
  >
    <MenuList className="vertical-menu-list" />
  </div>
{/if}
<style lang="scss">
  @import "src/lib/styles/shared/overlay-menu";
  @import "src/lib/styles/shared/menu-dialog";
  :global(.noscroll) {
		overflow: hidden;
    touch-action: none;
	}
  button {
    height: 3rem;
    width: 3rem;
    position: relative;
    background: transparent;
    border: 0;
    :hover {
      cursor: pointer;
    }
  }
  .hidden {
    display: none;
  }
</style>