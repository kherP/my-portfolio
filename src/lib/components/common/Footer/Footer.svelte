<script lang="ts">
	export let details: AppDetails;
  const currentYear: number = new Date().getFullYear();
</script>

<footer>
  <p>&copy; {currentYear} {details?.copyrightText}</p>
  <p>{@html details?.imageAttribution}</p>
</footer>

<style lang="scss">
  @use 'src/lib/styles/variables' as *;
  footer {
    text-align: center;
    margin-top: 3rem;
    padding: 3em 0;
  }
</style>