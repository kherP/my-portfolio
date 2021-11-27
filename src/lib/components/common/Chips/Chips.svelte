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
    list-style: none;
    display: flex;
    padding-inline-start: 0;
    margin-top: 3rem;
    gap: 0.5rem;
  }
</style>