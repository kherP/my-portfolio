<script lang="ts">
	export let details: AppDetails;
</script>

<section>
  <h1>{details?.header}<span class="caret" /></h1>
  <p>{details?.subheader}</p>
  <p class="description">{details?.description}</p>
</section>

<style type="scss">
  @use 'src/lib/styles/variables';
	h1 {
    margin-top: variables.$font-size-h1 - 1em;
		color: variables.$primary-color;
		font-size: variables.$font-size-h1;
		font-weight: 200;
    .caret {
      animation: blink 1s step-end infinite;
      border-left: 2px solid variables.$primary-color;
      margin-left: 1rem;
    }
	}
  p {
    font-size: 2em;
		font-weight: 200;
    margin: 5rem 0;
  }
  .description {
    font-size: 1.5em;
    max-width: 20em;
    line-height: 1.25em;
  }
	@keyframes blink {
		from, to {
			border-color: transparent;
		}
		50% {
			border-color: variables.$primary-color;
		}
	}
</style>
