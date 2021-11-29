<script lang="ts">
  import Chips from "$lib/components/common/Chips";
  export let data: ExperienceDetailsProps;
</script>

<header>
  <h1>{data?.name}</h1>
  <figure>
    <img src={data?.image} alt={data?.name}>
  </figure>
</header>
<section class="tech-stack-section">
  <Chips list={data?.techstack} />
</section>
<section class="introduction-section" aria-label={`Introduction of ${data?.name}`}>
  <section>
    <h2>Overview</h2>
    <p>{@html data?.overview}</p>
  </section>
  <div class="right-align">
    <section class="client-section">
      <h2>Client</h2>
      <p>{@html data?.client}</p>
    </section>
    <section class="role-section">
      <h2>My role</h2>
      <p>{@html data?.role}</p>
    </section>
  </div>
</section>
<section>
  <h2>Challenges</h2>
  <p>{@html data?.challenges}</p>
</section>
<section>
  <h2>The result</h2>
  <p>{@html data?.result}</p>
</section>

<style type="scss">
  @use 'src/lib/styles/variables' as *;
  header {
    display: flex;
    align-items: center;
    justify-items: center;
    h1, figure {
      flex: 1;
    }
  }
  figure {
    text-align: right;
    img {
      max-width: 100%;
    }
  }

  .tech-stack-section {
    position: relative;
    :global(ul) {
      position: absolute;
      width: 50%;
      top: -15rem;
    }
  }

  .introduction-section {
    display: flex;
    gap: 5rem;
    > section {
      flex: 1.5;
    }
    > div {
      flex: 1;
    }
  }

  .right-align {
    text-align: right;
    .client-section, .role-section {
      text-align: left;
    }
  }

  h2 {
    margin-top: 3rem;
  }

  p {
    font-size: larger;
    line-height: 2rem;
  }
	@media (max-width: $screen-sm) {
		header {
			flex-direction: column-reverse;
      align-items: flex-start;
		}
    .tech-stack-section {
      :global(ul) {
        position: relative;
        width: unset;
        top: unset;
      }
    }
    .introduction-section {
      flex-direction: column;
      gap: 0;
      > section {
        flex: 1;
      }
    }
	}
</style>
