<script lang="ts">
  import clsx from "clsx";
  // import Portal from "svelte-portal";
	import { fly } from 'svelte/transition';
  // import { NavigatorLocation, useLocation } from "svelte-navigator";
  import type { Readable } from "svelte/store";
  import MenuList from "../MenuList";

  // const location: Readable<NavigatorLocation> = useLocation();
  let toggle: boolean = false;

  // $: if ($location) toggle = false;
  // $: document.body.classList.toggle('noscroll', toggle);
</script>

<button class={clsx({ toggled: toggle })} aria-describedby="button-description" on:click={() => toggle = !toggle}>
  <span class="menu-icon"></span>
  <span id="button-description" class="hidden">Click to toggle menu</span>
</button>
<!-- TODO: enhance accessibility -->
{#if toggle}
<!-- <Portal target="body"> -->
  <div
    role="dialog"
    aria-labelledby="dialog1_label"
    aria-modal="true"
    class={clsx("menu-dialog", { show: toggle })}
    transition:fly="{{ y: 200, duration: 200 }}"
  >
    <!-- <h2 id="dialog1_label" class="dialog_label">
      Add Delivery Address
    </h2> TODO: add dialog description -->
    <MenuList className="vertical-menu-list" />
  </div>
<!-- </Portal> -->
{/if}
<style lang="scss">
  @import "src/lib/styles/shared/overlay-menu";
  @import "src/lib/styles/shared/menu-dialog";
  :global(.noscroll) {
		overflow: hidden;
    touch-action: none;
	}
  button {
    height: 2.5em;
    width: 2.5em;
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