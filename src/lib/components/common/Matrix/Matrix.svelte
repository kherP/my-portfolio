<script lang="ts">
  // Page background: digital rain, plus flickering glyph rails on both edges (wide screens).
  import { onMount } from "svelte";
  import { KANA, pick, prefersReducedMotion } from "$lib/utils/motion";

  let canvas: HTMLCanvasElement;
  let left: HTMLElement;
  let right: HTMLElement;

  onMount(() => {
    const reduce = prefersReducedMotion();
    const tracks = [left, right];
    tracks.forEach((t) => (t.innerHTML = Array.from({ length: 90 }, () => `<span class="tile">${pick(KANA)}</span>`).join("")));
    const tiles = [...document.querySelectorAll<HTMLElement>(".rail .tile")];

    const ctx = canvas.getContext("2d");
    const FS = 18;
    let w = 0, h = 0, drops: number[] = [];
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = innerWidth; h = innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.ceil(w / FS) }, () => (Math.random() * -h) / FS);
      ctx.fillStyle = "#020604"; ctx.fillRect(0, 0, w, h);
    };
    const rain = () => {
      ctx.fillStyle = "rgba(2, 6, 4, 0.14)"; ctx.fillRect(0, 0, w, h);
      ctx.font = `${FS}px "JetBrains Mono", monospace`;
      drops.forEach((d, i) => {
        ctx.fillStyle = Math.random() > 0.96 ? "#D6FFE2" : "#22F56B";
        ctx.fillText(pick(KANA), i * FS, d * FS);
        drops[i] = d * FS > h && Math.random() > 0.975 ? 0 : d + 1;
      });
    };
    size();
    addEventListener("resize", size);

    if (reduce) {
      // one still frame, no movement
      for (let i = 0; i < 80; i++) rain();
      return () => removeEventListener("resize", size);
    }

    let raf = 0, last = 0;
    const loop = (now: number) => {
      if (now - last > 50) { rain(); last = now; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // rails drift slower than the page
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        tracks.forEach((t, i) => (t.style.transform = `translateY(${-scrollY * (i ? 0.45 : 0.3)}px)`));
        ticking = false;
      });
    };
    addEventListener("scroll", onScroll, { passive: true });

    const flicker = setInterval(() => {
      const t = tiles[Math.floor(Math.random() * tiles.length)];
      t.textContent = pick(KANA);
      t.classList.add("hot");
      setTimeout(() => t.classList.remove("hot"), 140);
    }, 140);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(flicker);
      removeEventListener("resize", size);
      removeEventListener("scroll", onScroll);
    };
  });
</script>

<canvas bind:this={canvas} aria-hidden="true" />
<div class="rail rail-l" aria-hidden="true"><div class="track" bind:this={left} /></div>
<div class="rail rail-r" aria-hidden="true"><div class="track" bind:this={right} /></div>

<style>
  canvas {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0.2;
    pointer-events: none;
  }
  .rail {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 46px;
    overflow: hidden;
    z-index: 5;
    display: none;
  }
  .rail-l { left: 9px; }
  .rail-r { right: 9px; }
  @media (min-width: 960px) {
    .rail { display: block; }
  }
  .track {
    display: flex;
    flex-direction: column;
    gap: 6px;
    will-change: transform;
  }
  /* tiles are created in script, so their styles are global */
  .track :global(.tile) {
    width: 46px;
    height: 46px;
    flex: none;
    display: grid;
    place-items: center;
    border-radius: 6px;
    border: 1px solid var(--line);
    background: rgba(34, 245, 107, 0.05);
    font: 400 1.5rem/1 var(--crt);
    color: var(--dim);
    transition: background 600ms ease, color 600ms ease, box-shadow 600ms ease;
  }
  .track :global(.tile.hot) {
    background: var(--green);
    color: var(--void);
    box-shadow: 0 0 18px rgba(34, 245, 107, 0.6);
    transition-duration: 60ms;
  }
</style>
