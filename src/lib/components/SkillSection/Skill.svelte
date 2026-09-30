<script lang="ts">
  import type { HeaderElements } from "$lib/@types/header";
  import routes from "$lib/constants/routes";
  import { scrambleOnHover } from "$lib/utils/motion";
  export let details: SkillItem;
  export let headerTag: HeaderElements;
  export let index: number;
  const { name, description, caseStudy }: SkillItem = details;
  const line = String(index + 1).padStart(2, "0");
</script>

<li>
  {#if caseStudy}
    <a class="row" sveltekit:prefetch href={routes.experience.replace(":id", caseStudy)} use:scrambleOnHover={".name"}>
      <span class="ln" aria-hidden="true">{line}</span>
      <span class="body">
        <svelte:component this={headerTag} class="name">{name}</svelte:component>
        <span class="desc">{description}</span>
      </span>
      <span class="proof">→ {caseStudy}</span>
    </a>
  {:else}
    <div class="row">
      <span class="ln" aria-hidden="true">{line}</span>
      <span class="body">
        <svelte:component this={headerTag} class="name">{name}</svelte:component>
        <span class="desc">{description}</span>
      </span>
    </div>
  {/if}
</li>

<style>
  .row {
    position: relative;
    display: grid;
    grid-template-columns: 3rem minmax(0, 1fr) minmax(0, 13rem);
    align-items: center;
    gap: 6px clamp(14px, 3vw, 36px);
    padding: 16px clamp(18px, 4vw, 40px) 16px 0;
    border-bottom: 1px solid rgba(34, 245, 107, 0.1);
    text-decoration: none;
    transition: background 250ms ease;
  }
  li:last-child .row { border-bottom: 0; }
  a.row:hover { background: rgba(34, 245, 107, 0.06); }
  a.row:focus-visible { outline-offset: -2px; }
  .ln {
    align-self: stretch;
    display: grid;
    align-items: center;
    padding-right: 10px;
    border-right: 1px solid var(--line);
    text-align: right;
    font-size: 0.75rem;
    color: rgba(94, 156, 112, 0.7);
  }
  .body :global(.name) {
    display: block;
    margin: 0;
    font: 400 clamp(1.75rem, 3.6vw, 2.5rem)/1.05 var(--crt);
    color: var(--phosphor);
  }
  a.row:hover :global(.name) {
    color: var(--bright);
    text-shadow: var(--glow);
  }
  .desc {
    display: block;
    margin-top: 6px;
    max-width: 64ch;
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--dim);
  }
  a.row:hover .desc { color: var(--phosphor); }
  .proof {
    font-size: 0.75rem;
    color: var(--green);
    text-align: right;
  }
  @media (max-width: 560px) {
    .row { grid-template-columns: 2.25rem minmax(0, 1fr); }
    .ln { grid-row: 1 / span 2; }
    .proof { grid-column: 2; text-align: left; }
  }
</style>
