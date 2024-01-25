<!--
  @component Sticky header
-->
<script>
  import UrbanLogo from "$assets/urban-logo-badge-color.svg";
</script>

<div class="header-container">
  <a href="https://www.urban.org" target="_blank"><img src={UrbanLogo} alt="" /></a>
  <a href="https://www.urban.org/features" target="_blank">Stories and data tools</a>
</div>

<style>
  .header-container {
    padding: 0.625rem var(--spacing-6);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-9);
    background-color: var(--color-white);
    border-bottom: solid 1px var(--color-gray);
    z-index: 100;
    height: var(--spacing-16);
  }

  img {
    width: 32px;
  }

  a {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-light);
    color: var(--color-gray-shade-darker);
    text-decoration: none;
  }

  /* smaller on mobile */
  /* @media (max-width: 48rem) {
    .header-container {
      padding: 0.5rem 1rem;
      height: 2rem;
    }

    img {
      width: 24px;
    }
  } */
</style>
