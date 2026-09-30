<script lang="ts">
  import { intro } from "$lib/constants/profile";
  export let details: AppDetails;
  const currentYear: number = new Date().getFullYear();
</script>

<footer class="page">
  <div class="inner">
    <span class="sig">keep learning, every day.</span>
    <span>&copy; {currentYear} {details?.copyrightText} · {intro.location}</span>
  </div>
</footer>

<style>
  .inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px 24px;
    padding-block: 16px 48px;
    color: var(--dim);
    font-size: 0.75rem;
  }
  .sig {
    font: 400 1.5rem/1 var(--crt);
    color: var(--phosphor);
  }
</style>
