<script lang="ts">
  export let details: SkillItem;
  const { image, name }: SkillItem = details;
</script>

<li>
  <div style="background-image: url({image});">{name}</div>
</li>

<style lang="scss">
  @use 'src/lib/styles/variables' as *;
  li {
    flex: 0 0 12.5rem;
    flex-basis: 30%;
    text-align: center;
    &:nth-of-type(even) {
      padding-top: 2.5em;
    }
    @media (max-width: $screen-lg) {
      flex-basis: 25%;
    }
  }
  div {
    position:relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: transparent;
    height: 12.5em;
    width: 12.5em;
    line-height: 12.5em;
    margin: auto;
    @media (max-width: $screen-sm) {
      height: 7.5rem;
      width: 7.5rem;
      line-height: 7.5rem;
    }
  }
</style>