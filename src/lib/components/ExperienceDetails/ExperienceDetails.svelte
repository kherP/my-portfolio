<script lang="ts">
  export let data: ExperienceDetailsProps;
</script>
<header>
  <h1>{data?.name}</h1>
  <figure>
    <img src={data?.image} alt="">
    <figcaption><a href="https://www.freepik.com/vectors/fitness">Fitness vector created by stories - www.freepik.com</a></figcaption>
  </figure>
</header>
<section>
  <h2>Overview</h2>
  <p>{data?.overview}</p>
</section>
<section>
  <h2>Client</h2>
  <p>{data?.client}</p>
</section>
<section>
  <h2>My role</h2>
  <p>{data?.role}</p>
</section>
<section>
  <h2>Challenges</h2>
  <p>{data?.challenges}</p>
</section>
<section>
  <h2>The result</h2>
  <p>{data?.result}</p>
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
    figcaption {
      font-size: xx-small;
    }
  }
  h2 {
    margin-top: 3rem;
  }
	@media (max-width: $screen-sm) {
		header {
			flex-direction: column-reverse;
      align-items: flex-start;
		}
	}
</style>
