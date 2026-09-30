<script lang="ts">
  import type { HeaderElements } from "$lib/@types/header";
  import routes from "$lib/constants/routes";
  import { projectArt } from "$lib/constants/profile";
  import Art from "../common/Art";
  import Chips from "../common/Chips";
  import { reveal, tilt } from "$lib/utils/motion";
  export let details: ExperienceItem;
  export let index: number;
  export let headerTag: HeaderElements;
  const { name, description, techstack }: ExperienceItem = details;
  const href = routes.experience.replace(":id", name);
  const rotation = [-3, 2.5, -1.5, 3, -2.5, 1.5][index % 6];
</script>

<article class="card" style="--r:{rotation}deg" use:reveal={{ glitch: true, delay: index % 2 }}>
  <a {href} sveltekit:prefetch tabindex="-1" aria-hidden="true">
    <figure class="frame" use:tilt>
      <div class="ph"><Art kind={projectArt[name] ?? "occupational"} /></div>
    </figure>
  </a>
  <div class="cap">
    <span class="num">{String(index + 1).padStart(2, "0")}</span>
    <svelte:component this={headerTag} class="card-title">{name}</svelte:component>
    <p>{@html description}</p>
    <Chips list={techstack} />
    <a class="story" {href} sveltekit:prefetch>read the story<span class="sr-only">: {name}</span></a>
  </div>
</article>

<style>
  .story {
    display: inline-block;
    margin-top: 16px;
    font-size: 0.8125rem;
    color: var(--green);
    text-decoration: none;
  }
  .story::before { content: "▸ "; }
  .story:hover { color: var(--bright); text-shadow: var(--glow); }
</style>
