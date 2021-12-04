<script lang="ts">
  import clsx from "clsx";
  import { menus } from "$lib/constants/menu";
  export let className: string = "";
</script>


<nav aria-label="Menu">
  <ul class={clsx("menu-list", className)} itemscope itemtype="http://schema.org/SiteNavigationElement">
    {#each menus as item}
    <li>
      <a sveltekit:prefetch href={item.route}>{item.label}</a>
    </li>
    {/each}
  </ul>
</nav>

<style type="scss">
  @use 'src/lib/styles/variables' as *;
	ul {
    list-style: none;
    display: flex;
    padding-inline-start: 0;
    li {
      flex: 1;
      text-align: center;
    }
	}
</style>
