<script lang="ts">
  import Menu from "$lib/components/common/Menu";
  export let details: AppDetails;
</script>

<header>
  <a href="/">{details?.brand}</a>
  <Menu />
</header>

<style type="scss">
  @use 'src/lib/styles/variables';
	header {
    display: flex;
    align-items: center;
    > a {
      flex: 1;
		  color: variables.$primary-color;
      font-weight: 600;
      font-size: larger;
    }
    :global(nav) {
      flex: 0 0 22.5em;
      text-align: right;
    }
	}
  @media (max-width: variables.$screen-sm) {
		header {
      :global(nav) {
        flex: 1;
      }
    }
	}
</style>
