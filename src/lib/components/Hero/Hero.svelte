<!--
  @component Hero section with image and title/socials
-->
<script>
  import twitterIcon from "$assets/icon_twitter.svg";
  import facebookIcon from "$assets/icon_facebook.svg";
  import linkedinIcon from "$assets/icon_linkedin.svg";
  import mailIcon from "$assets/icon_mail.svg";
  import bgImg from "$assets/hero.jpg";

  // social data array
  const socials = [
    { name: "twitter", icon: twitterIcon, url: "https://twitter.com/urbaninstitute" },
    { name: "facebook", icon: facebookIcon, url: "https://www.facebook.com/urbaninstitute/" },
    {
      name: "linkedin",
      icon: linkedinIcon,
      url: "https://www.linkedin.com/company/urban-institute/",
    },
    {
      name: "contact urban institute",
      icon: mailIcon,
      url: "https://www.urban.org/about/contact-us",
    },
  ];
</script>

<div class="hero-container">
  <!-- image -->
  <div class="bg-img-container">
    <img src={bgImg} alt="" />
    <!-- <div class="mask" /> -->
  </div>

  <!-- text -->
  <div class="eyebrow">Stories and Data Tools</div>
  <h1 class="title">Getting a Good Job Depends More on Race and Gender than Education</h1>
  <!-- <p class="subtitle"><i>{text.subtitle}</i></p> -->
  <div class="date">January 2024</div>

  <!-- socials -->
  <div class="social-container">
    {#each socials as social}
      <a href={social.url} target="_blank" rel="noreferrer"
        ><img class="social-icon" src={social.icon} alt={`${social.name} link`} /></a
      >
    {/each}
  </div>
</div>

<style>
  .hero-container {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    color: var(--color-black);
    overflow: hidden;
  }

  h1 {
    color: var(--color-black);
  }

  .eyebrow {
    text-transform: uppercase;
    font-size: var(--text-sm);
    font-weight: var(--font-normal);
    line-height: var(--leading-normal);
  }

  .bg-img-container {
    z-index: -1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* .mask {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  } */

  .title {
    text-align: center;
    padding: var(--spacing-2);
    max-width: 1000px;
  }

  /* .subtitle {
    text-align: center;
    margin: 0px;
  } */

  .social-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: var(--spacing-6);
  }

  .social-container a {
    display: inline-block;
    position: relative;
    height: var(--spacing-6);
    width: var(--spacing-6);
  }

  .social-icon {
    width: 100%;
    height: 100%;
  }
</style>
