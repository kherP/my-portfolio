<script lang="ts">
  import Art from "$lib/components/common/Art";
  import { aiIntro } from "$lib/constants/profile";
  import { reveal, tilt } from "$lib/utils/motion";
  export let data: SkillItem[] = [];

  // items with artwork are shown as screens, the rest as short notes
  $: screens = data.filter((item) => item.art);
  $: notes = data.filter((item) => !item.art);
</script>

<section class="block" id="ai" aria-labelledby="ai-title">
  <header class="block-head" use:reveal>
    <p class="cmd">ls ./ai</p>
    <h2 id="ai-title" class="block-title glow" data-decode>building with AI</h2>
    <p class="lede">{aiIntro}</p>
  </header>
  <ol class="cards">
    {#each screens as item, i}
      <li class="card" style="--r:{i % 2 ? 2 : -2}deg" use:reveal={{ glitch: true, delay: i % 2 }}>
        <figure class="frame" use:tilt>
          <div class="ph"><Art kind={item.art} /></div>
        </figure>
        <div class="cap">
          <span class="num">ai.0{i + 1}</span>
          <h3 class="card-title">{item.name}</h3>
          <p>{item.description}</p>
          {#if item.highlights}
            <ul class="built" aria-label="What I shipped">
              {#each item.highlights as h}<li>{h}</li>{/each}
            </ul>
          {/if}
        </div>
      </li>
    {/each}
  </ol>
  {#if notes.length}
    <div class="notes">
      {#each notes as item, i}
        <article use:reveal={{ delay: i }}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          {#if item.highlights}
            <ul class="built" aria-label="What I shipped">
              {#each item.highlights as h}<li>{h}</li>{/each}
            </ul>
          {/if}
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .notes {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
    margin-top: clamp(56px, 8vw, 96px);
  }
  @media (max-width: 760px) {
    .notes { grid-template-columns: 1fr; }
  }
  article {
    min-width: 0;
    padding: clamp(20px, 3vw, 28px);
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 14px;
  }
  h3 {
    font: 400 clamp(1.75rem, 3vw, 2.25rem)/1 var(--crt);
    color: var(--bright);
    margin: 0;
  }
  article p {
    margin: 12px 0 0;
    font-size: 0.875rem;
    max-width: 56ch;
  }
</style>
