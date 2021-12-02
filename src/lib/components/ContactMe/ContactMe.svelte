<script>
  import DocumentIcon from "../common/DocumentIcon";
  import GithubIcon from "../common/GithubIcon";
  import LinkedInIcon from "../common/LinkedInIcon";
  import PaperPlaneIcon from "../common/PaperPlaneIcon";
</script>
<h1>Contact me</h1>
<ul>
  <li>
    <a href="hi"><LinkedInIcon /></a>
  </li>
  <li>
    <a href="hi"><GithubIcon /></a>
  </li>
  <li>
    <a href="hi"><DocumentIcon /></a>
  </li>
  <li>
    <a href="hi"><PaperPlaneIcon /></a>
  </li>
</ul>

<style lang="scss">
  @use 'src/lib/styles/variables' as *;
  h1 {
    font-size: $font-size-h2;
    font-weight: 200;
    text-align: left;
  }
  ul {
    list-style: none;
    text-align: center;
    li {
      margin-bottom: 2rem;
    }
  }
  a {
    :global(svg) {
      height: 7.5rem;
      width: auto;
      color: #111;
    }
  }
</style>