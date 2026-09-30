<script lang="ts">
  import Experience from './Experience.svelte';
  import SectionContainer from '$lib/components/common/SectionContainer';
  import { H2, H3 } from '$lib/components/common/HeaderElements';
  import routes from '$lib/constants/routes';
  import { appConfig } from '$lib/constants/appConfig';
  export let showMore: boolean = false;
  export let data: ExperienceItem[] = [];
  let subHeaderTag: typeof H2 | typeof H3 = showMore ? H3 : H2;

  $: list = showMore ? data.slice(0, appConfig.defaultExperienceCount) : data;
</script>

<SectionContainer {showMore} cmd="ls ./work" viewMorePath={routes.experiences} viewMoreText="View all my work">
  <svelte:fragment slot="header">
    things I've built
  </svelte:fragment>
  <svelte:fragment slot="content">
    <ol class="cards">
      {#each list as item, index}
        <li>
          <Experience details={item} {index} headerTag={subHeaderTag} />
        </li>
      {/each}
    </ol>
  </svelte:fragment>
</SectionContainer>
