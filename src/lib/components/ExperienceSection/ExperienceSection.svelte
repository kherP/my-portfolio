<script lang="ts">
  import Experience from './Experience.svelte';
  import SectionContainer from '$lib/components/common/SectionContainer';
  import { H2, H3 } from '$lib/components/common/HeaderElements';
  import routes from '$lib/constants/routes';
  import { apiConfigs } from '$lib/constants/apiConfigs';
  import { onMount } from 'svelte';
  export let showMore: boolean = false;
  export let data: ExperienceItem[] = [];
  let list: ExperienceItem[] = [];
  let subHeaderTag: typeof H2 | typeof H3 = showMore ? H3 : H2;

  onMount(() => {
    list = showMore ? data.slice(0, apiConfigs.defaultExperienceCount) : data
  });
</script>

<SectionContainer {showMore} viewMorePath={routes.experiences}>
  <svelte:fragment slot="header">
    Experience
  </svelte:fragment>
  <svelte:fragment slot="content">
    <ul>
      {#each list as item, index}
        <li>
          <Experience details={item} reverted={index % 2 > 0} headerTag={subHeaderTag} />
        </li>
      {/each}
    </ul>
  </svelte:fragment>
</SectionContainer>

<style type="scss">
  ul {
    list-style-type: none;
    padding-inline-start: 0;
  }
</style>
