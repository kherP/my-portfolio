<script lang="ts">
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { menus } from "$lib/constants/menu";
  import routes from "$lib/constants/routes";
  import { scrambleOnHover } from "$lib/utils/motion";
  export let details: AppDetails;

  // the KP badge is the home link
  const links = menus.filter((item) => item.route !== routes.root);
  // routes carry the base path in production; $page.path does not
  const isActive = (route: string, path: string) => {
    const r = route.startsWith(base) ? route.slice(base.length) : route;
    return path === r || path.startsWith(`${r}/`);
  };
</script>

<nav aria-label="Primary">
  <div class="nav-in">
    <a class="home" href={routes.root} aria-label="{details?.brand ?? 'Home'}, home">KP</a>
    {#each links as item}
      <a
        sveltekit:prefetch
        href={item.route}
        class:active={isActive(item.route, $page.path)}
        aria-current={isActive(item.route, $page.path) ? "page" : undefined}
        use:scrambleOnHover>{item.label}</a
      >
    {/each}
  </div>
</nav>

<style>
  nav {
    position: sticky;
    top: calc(env(safe-area-inset-top, 0px) + 12px);
    z-index: 20;
    display: flex;
    justify-content: center;
    padding: 12px 16px 0;
    pointer-events: none;
  }
  .nav-in {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: clamp(10px, 3vw, 26px);
    max-width: 100%;
    padding: 6px 18px 6px 6px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: rgba(2, 6, 4, 0.78);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  a {
    text-decoration: none;
    font-size: 0.8125rem;
    color: var(--dim);
    text-transform: lowercase;
    white-space: nowrap;
  }
  a:not(.home)::before { content: "./"; }
  a:not(.home):hover, a.active { color: var(--bright); text-shadow: var(--glow); }
  .home {
    width: 34px;
    height: 34px;
    flex: none;
    display: grid;
    place-items: center;
    border-radius: 999px;
    background: var(--green);
    color: var(--void);
    font: 400 1.25rem/1 var(--crt);
    text-transform: none;
  }
  @media (max-width: 480px) {
    a:not(.home)::before { content: none; }
  }
</style>
