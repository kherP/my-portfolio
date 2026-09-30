<script lang="ts">
  import Art from "$lib/components/common/Art";
  import Chips from "$lib/components/common/Chips";
  import routes from "$lib/constants/routes";
  import { projectArt } from "$lib/constants/profile";
  import { decode, reveal } from "$lib/utils/motion";
  export let data: ExperienceDetailsProps;
</script>

<article>
  <header>
    <p class="cmd"><a sveltekit:prefetch href={routes.experiences}>cd ../work</a></p>
    <!-- the decode effect rewrites the text, so re-create the heading per project -->
    {#key data?.name}<h1 class="glow" use:decode={200}>{data?.name}</h1>{/key}
    {#if data?.role}<p class="role">role: {data.role}</p>{/if}
    <Chips list={data?.techstack} />
  </header>
  <figure class="frame">
    <div class="ph">
      <Art kind={projectArt[data?.name] ?? "occupational"} label="Illustration of the {data?.name} (not a real screenshot)" />
    </div>
  </figure>
  <section class="panel overview" use:reveal>
    <h2>overview</h2>
    <p>{@html data?.overview}</p>
  </section>
  <div class="two">
    <section class="panel" use:reveal>
      <h2>challenges</h2>
      <div class="rich">{@html data?.challenges}</div>
    </section>
    <section class="panel" use:reveal={{ delay: 1 }}>
      <h2>result</h2>
      <div class="rich">{@html data?.result}</div>
    </section>
  </div>
</article>

<style>
  article { padding-block: clamp(40px, 7vw, 88px) clamp(32px, 5vw, 64px); }
  h1 {
    font: 400 clamp(2.75rem, 7vw, 5rem)/0.95 var(--crt);
    margin: 10px 0 0;
    text-wrap: balance;
  }
  .role {
    margin: 12px 0 0;
    font-size: 0.8125rem;
    color: var(--dim);
  }
  .frame {
    margin-top: clamp(32px, 5vw, 56px);
    --r: -1deg;
  }
  .panel {
    margin-top: clamp(24px, 4vw, 40px);
    padding: clamp(20px, 3vw, 32px);
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: 14px;
    min-width: 0;
  }
  .overview { margin-top: clamp(40px, 6vw, 72px); }
  .two {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 24px;
  }
  @media (max-width: 760px) {
    .two { grid-template-columns: 1fr; }
  }
  h2 {
    font: 400 1.75rem/1 var(--crt);
    color: var(--bright);
    margin: 0 0 14px;
  }
  h2::before { content: "## "; color: var(--dim); }
  p, .rich {
    margin: 0;
    max-width: 68ch;
    font-size: 0.875rem;
    line-height: 1.75;
  }
  /* content comes from the gists as HTML */
  .rich :global(ul) { display: grid; gap: 14px; }
  .rich :global(li) {
    padding-left: 18px;
    position: relative;
  }
  .rich :global(li)::before {
    content: "▸";
    position: absolute;
    left: 0;
    color: var(--green);
  }
  .rich :global(b), p :global(b) { color: var(--bright); font-weight: 500; }
  p :global(a), .rich :global(a) { color: var(--green); }
</style>
