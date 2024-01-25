<script>
  import Analytics from "$components/Analytics/Analytics.svelte";
</script>

<slot />
<Analytics sendPageview={false} />
