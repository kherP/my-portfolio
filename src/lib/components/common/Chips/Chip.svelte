<li>
  <slot />
</li>

<style lang="scss">
  @use 'src/lib/styles/variables' as *;
  li {
    flex: 1 1 auto;
    flex-shrink: 0;
    color: $white;
    background-color: $primary-color;
    text-align: center;
    padding: 0.25rem;
    border-radius: 0.25rem;
  }
</style>