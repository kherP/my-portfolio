<script lang="ts">
  import { H1, H2 } from "$lib/components/common/HeaderElements";
  import { magnetic, reveal } from "$lib/utils/motion";
  export let data: ContactDetailsItem[] = [];
  // nested = shown under the home page's h1
  export let nested: boolean = false;

  $: mail = data.find((item) => item.url.startsWith("mailto:"));
  $: email = mail ? mail.url.slice("mailto:".length).split("?")[0] : "";
  $: linkedin = data.find((item) => /linkedin\.com/i.test(item.url));
  // LinkedIn is the blue pill, so it isn't repeated below
  $: links = data.filter((item) => item.isExternal && item !== linkedin);

  const COPY_LABEL = "red pill: copy my email";
  let copyLabel = COPY_LABEL;
  let emailEl: HTMLElement;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyLabel = "copied. welcome to the real world.";
    } catch {
      // clipboard blocked: select the address so it can be copied by hand
      getSelection()?.selectAllChildren(emailEl);
      copyLabel = "selected, press ⌘C / Ctrl+C";
    }
    setTimeout(() => (copyLabel = COPY_LABEL), 2400);
  };
</script>

<section class="block" id="contact" aria-labelledby="contact-title">
  <div class="board" use:reveal>
    <p class="cmd">ping kherphay</p>
    <svelte:component this={nested ? H2 : H1} id="contact-title" class="board-title">
      let's chat<span class="caret" aria-hidden="true" />
    </svelte:component>
    <p class="lede">Have a complex product that needs a clear interface? Choose a pill.</p>
    <div class="pills">
      {#if email}
        <div class="choice">
          <button class="pill red" type="button" on:click={copy} use:magnetic aria-describedby="red-text">
            <span class="sr-only">Copy email address</span>
          </button>
          <div class="choice-text" id="red-text">
            <b aria-live="polite">{copyLabel}</b>
            <a href={mail?.url} bind:this={emailEl}>{email}</a>
          </div>
        </div>
      {/if}
      {#if linkedin}
        <div class="choice">
          <a
            class="pill blue"
            href={linkedin.url}
            target="_blank"
            rel="noopener"
            use:magnetic
            aria-describedby="blue-text"><span class="sr-only">Open my LinkedIn profile</span></a
          >
          <div class="choice-text" id="blue-text">
            <b>blue pill: see my LinkedIn</b>
            <span>opens in a new tab</span>
          </div>
        </div>
      {/if}
    </div>
    <ul class="links">
      {#each links as link}
        <li><a href={link.url} target="_blank" rel="noopener" use:magnetic>{link.label} ↗</a></li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .board {
    position: relative;
    overflow: hidden;
    padding: clamp(36px, 7vw, 88px) clamp(20px, 5vw, 64px);
    border: 1px solid var(--line);
    border-radius: 22px;
    background:
      linear-gradient(rgba(34, 245, 107, 0.07) 1px, transparent 1px) 0 0 / 48px 48px,
      linear-gradient(90deg, rgba(34, 245, 107, 0.07) 1px, transparent 1px) 0 0 / 48px 48px,
      rgba(3, 12, 7, 0.94);
  }
  .board :global(.board-title) {
    font: 400 clamp(4rem, 13vw, 9rem)/0.85 var(--crt);
    color: var(--bright);
    text-shadow: 0 0 24px rgba(34, 245, 107, 0.6);
    margin: 8px 0 0;
  }
  .lede { margin-top: 20px; max-width: 40ch; }
  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 16px 40px;
    margin-top: 40px;
  }
  .choice {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }
  .pill {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
    flex: none;
    width: 76px;
    height: 32px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--c1) 50%, var(--c2) 50%);
    box-shadow: inset 0 6px 6px -3px rgba(255, 255, 255, 0.55), inset 0 -6px 8px -4px rgba(0, 0, 0, 0.45), 0 0 24px -4px var(--c1);
    rotate: -8deg;
    transition: rotate 400ms cubic-bezier(0.22, 1, 0.36, 1), translate 450ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 300ms;
  }
  .pill:hover {
    rotate: 8deg;
    box-shadow: inset 0 6px 6px -3px rgba(255, 255, 255, 0.55), inset 0 -6px 8px -4px rgba(0, 0, 0, 0.45), 0 0 40px 0 var(--c1);
  }
  .pill:focus-visible { outline: 2px dashed var(--bright); outline-offset: 5px; }
  .red { --c1: var(--red); --c2: #b82a20; }
  .blue { --c1: var(--blue); --c2: #2451b8; }
  .choice-text {
    display: grid;
    gap: 2px;
    min-width: 0;
  }
  .choice-text b {
    font-weight: 500;
    color: var(--bright);
  }
  .choice-text a, .choice-text span {
    font-size: 0.8125rem;
    color: var(--dim);
    overflow-wrap: anywhere;
  }
  .choice-text a:hover { color: var(--bright); }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
  }
  .links a {
    display: inline-block;
    padding: 9px 16px;
    border: 1px solid var(--line);
    border-radius: 999px;
    font-size: 0.8125rem;
    text-decoration: none;
    transition: background 200ms, color 200ms, border-color 200ms, translate 450ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  .links a:hover {
    background: var(--green);
    color: var(--void);
    border-color: var(--green);
  }
</style>
