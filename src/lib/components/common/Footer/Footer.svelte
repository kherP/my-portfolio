<script lang="ts">
	export let details: AppDetails;
  const currentYear: number = new Date().getFullYear();
</script>

<footer>
  <p>&copy; {currentYear} {details?.copyrightText}</p>
</footer>

<style lang="scss">
footer {
  text-align: center;
  padding: 3em 0;
}
</style>