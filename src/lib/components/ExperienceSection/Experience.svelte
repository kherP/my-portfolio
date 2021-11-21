<script lang="ts">
  import type { HeaderElements } from "$lib/@types/header";
  import routes from "$lib/constants/routes";
  import ChevronRightRound from "../common/ChevronRightRound";
  export let details: ExperienceItem;
  export let reverted: boolean = false;
  export let headerTag: HeaderElements;
  const { image: src, name, description }: ExperienceItem = details;
</script>

<article class={reverted ? 'reverted' : ''}>
  <figure>
    <img {src} alt={name} />
  </figure>
  <div class="content">
    <svelte:component this={headerTag} ref="h3">
      {name}
    </svelte:component>
    <p>{description}</p> <!-- // TODO: to set max height -->
    <a sveltekit:prefetch href={routes.experience.replace(":id", name)}>
      <span>Learn more about this case</span>
      <span class="icon-wrapper">
        <ChevronRightRound />
      </span>
    </a>
  </div>
</article>

<style lang="scss">
  @use 'src/lib/styles/variables' as *;
  article {
    display: flex;
    align-items: center;
    justify-items: center;
    figure {
      flex: 1;
      img {
        max-width: 100%;
      }
    }
    .content {
      flex: 1;
      text-align: left;
      .icon-wrapper {
        color: $primary-color;
        :global(svg) {
          vertical-align: middle;
          height: 2em;
          width: 2em;
        }
      }
      :global([ref="h3"]) {
        font-size: 2em;
        margin-left: -4em;
      }
      a {
        color: $gray-900;
      }
      p {
        font-size: 1.5em;
      }
    }
  }
  .reverted {
    flex-direction: row-reverse;
    .content {
      text-align: right;
      :global([ref="h3"]) {
        margin-left: 0;
        margin-right: -4em;
      }
    }
  }
  @media (max-width: $screen-sm) {
		article, .reverted {
			flex-direction: column;
      margin-bottom: 3rem;
      figure {
        margin: 0;
      }
      .content {
        text-align: left;
        :global([ref="h3"]) {
          margin: .5em 0;
          font-size: 1.5em;
        }
        p {
          font-size: 1em;
        }
      }
		}
	}
</style>