<script lang="ts">
  import { onMount } from "svelte";
  import Art from "$lib/components/common/Art";
  import { intro } from "$lib/constants/profile";
  import { decode, prefersReducedMotion } from "$lib/utils/motion";
  export let details: AppDetails;

  let time = "--:--";
  let wake = intro.wake;

  onMount(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: intro.timeZone, hour: "2-digit", minute: "2-digit" });
    const tick = () => (time = fmt.format(new Date()));
    tick();
    const clock = setInterval(tick, 30000);

    // type the wake-up line
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (!prefersReducedMotion()) {
      wake = "";
      [...intro.wake].forEach((ch, i) => timers.push(setTimeout(() => (wake += ch), 500 + i * 38)));
    }
    return () => {
      clearInterval(clock);
      timers.forEach(clearTimeout);
    };
  });
</script>

<section class="hero">
  <div class="term">
    <div class="term-bar" aria-hidden="true">
      <i /><i /><i /><span>{details?.brand?.toLowerCase()}@portfolio: ~</span>
    </div>
    <div class="term-body">
      <p class="wake"><a href="#ai" aria-label={intro.wake}>{wake}</a><span class="caret" aria-hidden="true" /></p>
      <div class="term-grid">
        <div>
          <p class="cmd">whoami</p>
          <p class="name" use:decode={300}>{details?.copyrightText}</p>
          <p class="role">{intro.role}</p>
          <h1 class="title" aria-label={intro.headline.join("")}>
            {#each intro.headline as part, i}
              {#if i === 1}<em aria-hidden="true" use:decode={700 + i * 180}>{part}</em>{:else}<span
                  aria-hidden="true"
                  use:decode={700 + i * 180}>{part}</span
                >{/if}
            {/each}
          </h1>
          <p class="where">
            location: <b>{intro.location}</b> · {intro.utcOffset} · local <b>{time}</b>
          </p>
        </div>
        <figure class="ph portrait">
          <Art kind="portrait" label="Portrait of {details?.copyrightText} drawn in glowing code characters" />
        </figure>
      </div>
      <div class="beliefs">
        <p class="cmd">cat beliefs.txt</p>
        <ul>
          {#each intro.beliefs as belief, i}
            <li><small>// 0{i + 1}</small>{belief}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    padding-block: clamp(40px, 7vw, 88px) clamp(56px, 8vw, 104px);
  }
  .term {
    position: relative;
    max-width: 940px;
    margin-inline: auto;
    border: clamp(6px, 1vw, 10px) solid var(--bezel);
    border-radius: clamp(16px, 2.5vw, 24px);
    background:
      linear-gradient(rgba(34, 245, 107, 0.06) 1px, transparent 1px) 0 0 / 22px 22px,
      linear-gradient(90deg, rgba(34, 245, 107, 0.06) 1px, transparent 1px) 0 0 / 22px 22px,
      #030c07;
    box-shadow: inset 0 0 0 1px rgba(34, 245, 107, 0.5), 0 0 80px -10px rgba(34, 245, 107, 0.18),
      0 40px 80px -30px rgba(0, 0, 0, 0.9);
  }
  .term-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--line);
  }
  .term-bar i {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    border: 1px solid var(--green);
  }
  .term-bar i:first-child { background: var(--green); }
  .term-bar span {
    margin-left: 10px;
    font-size: 0.75rem;
    color: var(--dim);
  }
  .term-body { padding: clamp(22px, 5vw, 52px); }
  .wake {
    font: 400 1.25rem/1.3 var(--crt);
    color: var(--green);
    margin: 0 0 clamp(20px, 4vw, 36px);
    min-height: 1.3em;
  }
  .wake a { text-decoration: none; }
  .term-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
    gap: clamp(24px, 4vw, 48px);
    align-items: center;
  }
  @media (max-width: 760px) {
    .term-grid { grid-template-columns: 1fr; }
  }
  .name {
    font: 400 clamp(2rem, 4.5vw, 3rem)/1 var(--crt);
    color: var(--bright);
    margin: 8px 0 0;
    text-shadow: var(--glow);
  }
  .role {
    margin: 4px 0 0;
    color: var(--dim);
    font-size: 0.875rem;
  }
  .title {
    font: 400 clamp(2.75rem, 6vw, 4.75rem)/0.95 var(--crt);
    color: var(--phosphor);
    margin: clamp(20px, 3vw, 32px) 0 0;
    text-wrap: balance;
  }
  .title em {
    font-style: normal;
    color: var(--bright);
    text-shadow: var(--glow);
  }
  .where {
    margin: 22px 0 0;
    font-size: 0.8125rem;
    color: var(--dim);
    font-variant-numeric: tabular-nums;
  }
  .where b {
    color: var(--green);
    font-weight: 500;
  }
  .portrait {
    aspect-ratio: 4 / 5;
    border-radius: 12px;
  }
  .beliefs { margin-top: clamp(32px, 5vw, 56px); }
  .beliefs ul {
    margin-top: 16px;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
  @media (max-width: 700px) {
    .beliefs ul { grid-template-columns: 1fr; }
  }
  .beliefs li {
    position: relative;
    padding: 26px 18px 18px;
    background: #06160c;
    border: 1px solid var(--line);
    border-radius: 6px;
    color: var(--bright);
    line-height: 1.5;
    rotate: var(--r, 0deg);
    box-shadow: 0 12px 24px -12px rgba(0, 0, 0, 0.9);
    transition: rotate 400ms cubic-bezier(0.2, 0.8, 0.2, 1), translate 400ms cubic-bezier(0.2, 0.8, 0.2, 1), border-color 300ms;
  }
  .beliefs li:hover {
    rotate: 0deg;
    translate: 0 -4px;
    border-color: var(--green);
  }
  /* strip of tape */
  .beliefs li::before {
    content: "";
    position: absolute;
    top: -9px;
    left: 50%;
    width: 70px;
    height: 18px;
    translate: -50% 0;
    rotate: -3deg;
    background: rgba(34, 245, 107, 0.35);
    box-shadow: 0 0 12px rgba(34, 245, 107, 0.3);
  }
  .beliefs li:nth-child(1) { --r: -2deg; }
  .beliefs li:nth-child(2) { --r: 1.5deg; }
  .beliefs li:nth-child(3) { --r: -1deg; }
  small {
    display: block;
    color: var(--dim);
    font-size: 0.75rem;
    margin-bottom: 6px;
  }
  @media (prefers-reduced-motion: no-preference) {
    .term { animation: boot 900ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
    .beliefs li { animation: drop 800ms cubic-bezier(0.22, 1, 0.36, 1) both; }
    .beliefs li:nth-child(1) { animation-delay: 1.5s; }
    .beliefs li:nth-child(2) { animation-delay: 1.65s; }
    .beliefs li:nth-child(3) { animation-delay: 1.8s; }
  }
  @keyframes boot {
    0% { opacity: 0; scale: 1 0.02; }
    40% { opacity: 1; scale: 1 0.02; }
    100% { scale: 1 1; }
  }
  @keyframes drop {
    from { opacity: 0; translate: 0 -24px; rotate: 8deg; }
  }
</style>
