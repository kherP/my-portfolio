<script lang="ts">
  import SectionContainer from "$lib/components/common/SectionContainer";
  import Skill from "./Skill.svelte";
  import routes from "$lib/constants/routes";
  import { appConfig } from "$lib/constants/appConfig";
  import { onMount } from 'svelte';
  export let showMore: boolean = false;
  export let data: SkillItem[] = [];
  let skills: SkillItem[] = [];
  onMount(() => {
    skills = showMore ? data.slice(0, appConfig.defaultSkillCount) : data
  });
</script>

<SectionContainer {showMore} viewMorePath={routes.skill}>
  <svelte:fragment slot="header">
    Skills
  </svelte:fragment>
  <svelte:fragment slot="content">
    <dl>
      {#each skills as skill}
        <Skill details={skill} />
      {/each}
    </dl>
  </svelte:fragment>
</SectionContainer>

<style type="scss">
  @use 'src/lib/styles/variables' as *;
  dl {
    display: flex;
    flex-wrap: wrap;
    gap: 5em 3em;
    place-content: center;
    @media (max-width: $screen-sm) {
      gap: 2em;
    }
  }
</style>
