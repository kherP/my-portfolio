<script lang="ts">
  import Chip from "./Chip.svelte";
  export let list: string[] = [];
</script>
<ul>
  {#each list as item}
   <Chip>{item}</Chip>
  {/each}
</ul>

<style lang="scss">
  ul {
    display: flex;
    margin-top: 3rem;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
</style>