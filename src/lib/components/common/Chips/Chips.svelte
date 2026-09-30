<script lang="ts">
  import Chip from "./Chip.svelte";
  export let list: string[] = [];
</script>

<ul class="tags" aria-label="Tech stack">
  {#each list as item}
    <Chip>{item}</Chip>
  {/each}
</ul>
