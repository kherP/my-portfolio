<script lang="ts">
  import { formatRoute } from "$lib/utils/route.utils";
  export let data: ContactDetailsItem[] = [];
</script>
<h1>Contact me</h1>
<ul>
  {#each data as item}
  <li>
    <a aria-label={item.label} href={item.isFile && !item.isExternal ? formatRoute(item.url) : item.url} target={item.isExternal ? "_blank" : null} download={item.isFile ? item.label : null}>
      {@html item.content}
      <span>{item.label}</span>
    </a>
  </li>
  {/each}
</ul>

<style lang="scss">
  @use 'src/lib/styles/variables' as *;
  h1 {
    font-size: $font-size-h2;
    font-weight: 200;
    text-align: left;
  }
  ul {
    text-align: center;
    li {
      margin-bottom: 2rem;
    }
  }
  a {
    :global(svg) {
      height: 7.5rem;
      width: auto;
      fill: $gray-900;
      flex: auto;
    };
    span {
      display: block;
    }
  }
</style>