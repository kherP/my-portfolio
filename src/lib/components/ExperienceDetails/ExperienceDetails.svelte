<script lang="ts">
  export let data: ExperienceDetailsProps;
</script>

<header>
  <h1>{data?.name}</h1>
  <figure>
    <img src={data?.image} alt={data?.name}>
  </figure>
</header>
<section>
  <h2>Overview</h2>
  <p>{@html data?.overview}</p>
</section>
<section>
  <h2>Client</h2>
  <p>{@html data?.client}</p>
</section>
<section>
  <h2>My role</h2>
  <p>{@html data?.role}</p>
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
  h2 {
    margin-top: 3rem;
  }

  p {
    font-size: larger;
  }
	@media (max-width: $screen-sm) {
		header {
			flex-direction: column-reverse;
      align-items: flex-start;
		}
	}
</style>
