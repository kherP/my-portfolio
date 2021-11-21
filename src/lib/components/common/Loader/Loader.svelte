<div class="loader-wrapper">
  <div class="loading-spinner" aria-live="polite" role="status">Loading</div>
</div>

<style lang="scss">
  @use 'src/lib/styles/variables' as *;
  .loader-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
  }
  .loading-spinner {
    margin: auto 0;
    font-size: $font-size-h2;
    border: 5px solid $primary-color;
    display: inline-block;
    padding: 1rem 4rem 1rem 2rem;
    &:after {
      overflow: hidden;
      display: inline-block;
      animation: ellipsis steps(4,end) 900ms infinite;
      content: " ";
      width: .5rem;
      height: .5rem;
      border-radius: 50%;
      background-color: $primary-color;
    }
  }
  @keyframes ellipsis {
    to {
      transform: translateX(2rem);    
    }
  }
</style>