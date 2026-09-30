<script lang="ts">
  import Art from "$lib/components/common/Art";
  import { aboutPhotos } from "$lib/constants/profile";
  import { reveal } from "$lib/utils/motion";
  export let details: AppDetails;
</script>

<section class="block" id="about" aria-labelledby="about-title">
  <div class="grid">
    <div use:reveal>
      <p class="cmd">cat about.txt</p>
      <h2 id="about-title" class="glow" data-decode>a bit about me</h2>
      <p>{details?.description}</p>
    </div>
    <ul>
      {#each aboutPhotos as photo, i}
        <li style="--r:{[-3, 2.5, 1.5, -2][i % 4]}deg" use:reveal={{ glitch: true, delay: i }}>
          <figure>
            <div class="ph"><Art kind={photo.art} label={photo.label} /></div>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
    gap: clamp(32px, 6vw, 80px);
    align-items: center;
  }
  @media (max-width: 860px) {
    .grid { grid-template-columns: 1fr; }
  }
  h2 {
    font: 400 clamp(2.5rem, 5.2vw, 4rem)/1 var(--crt);
    margin: 6px 0 20px;
  }
  p:not(.cmd) {
    margin: 0;
    max-width: 46ch;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 22px;
  }
  li:nth-child(even) { margin-top: 24px; }
  figure {
    margin: 0;
    padding: 6px 6px 0;
    border: 1px solid var(--line);
    border-radius: 10px;
    background: #041209;
    rotate: var(--r);
    transition: rotate 450ms cubic-bezier(0.2, 0.8, 0.2, 1), translate 450ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 300ms;
  }
  figure:hover {
    rotate: 0deg;
    translate: 0 -6px;
    border-color: var(--green);
  }
  .ph {
    aspect-ratio: 4 / 5;
    border-radius: 6px;
  }
  figcaption {
    padding: 10px 4px 12px;
    font-size: 0.75rem;
    color: var(--dim);
  }
  figcaption::before { content: "// "; color: var(--green); }
</style>
