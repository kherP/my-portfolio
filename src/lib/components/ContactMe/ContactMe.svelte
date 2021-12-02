<script>
  import DocumentIcon from "../common/DocumentIcon";
  import GithubIcon from "../common/GithubIcon";
  import LinkedInIcon from "../common/LinkedInIcon";
  import PaperPlaneIcon from "../common/PaperPlaneIcon";
</script>
<h1>Contact me</h1>
<ul>
  <li>
    <a href="https://my.linkedin.com/in/kher-phay-chang" target="_blank"><LinkedInIcon /></a>
  </li>
  <li>
    <a href="https://github.com/kherP" target="_blank"><GithubIcon /></a>
  </li>
  <!-- <li>
    <a href="hi" rel="external"><DocumentIcon /></a> TODO: add download link
  </li> -->
  <li>
    <a href="mailto:kayphay92@gmail.com?subject=Hello!"><PaperPlaneIcon /></a>
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