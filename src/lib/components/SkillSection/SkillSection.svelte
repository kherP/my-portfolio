<script lang="ts">
  import { H1, H2, H3 } from "$lib/components/common/HeaderElements";
  import Skill from "./Skill.svelte";
  import routes from "$lib/constants/routes";
  import { appConfig } from "$lib/constants/appConfig";
  import { reveal } from "$lib/utils/motion";
  export let title: string;
  export let showMore: boolean = false;
  // nested = shown under the home page's h1
  export let nested: boolean = showMore;
  export let data: SkillItem[] = [];
  $: skills = showMore ? data.slice(0, appConfig.defaultSkillCount) : data;
</script>

<section class="block">
  <div class="scan" use:reveal>
    <div class="scan-head">
      <div>
        <p class="cmd">scan --capabilities</p>
        <svelte:component this={nested ? H2 : H1} class="scan-title" data-decode>{title}</svelte:component>
      </div>
      <p>Each one links to the project that proves it.</p>
    </div>
    <ol>
      {#each skills as skill, i}
        <Skill details={skill} index={i} headerTag={nested ? H3 : H2} />
      {/each}
    </ol>
  </div>
  {#if showMore && skills.length < data.length}
    <p class="more">
      <a sveltekit:prefetch class="more-link" href={routes.skill}>See everything I do</a>
    </p>
  {/if}
</section>

<style>
  .scan {
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 0 60px -20px rgba(34, 245, 107, 0.2);
  }
  .scan-head {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: 10px 24px;
    padding: clamp(22px, 4vw, 40px) clamp(18px, 4vw, 40px) 16px;
    border-bottom: 1px solid var(--line);
  }
  .scan-head :global(.scan-title) {
    font: 400 clamp(2.5rem, 6vw, 4rem)/1 var(--crt);
    color: var(--bright);
    text-shadow: var(--glow);
    margin: 6px 0 0;
  }
  .scan-head > p {
    margin: 0;
    color: var(--dim);
    font-size: 0.8125rem;
    max-width: 34ch;
  }
</style>
