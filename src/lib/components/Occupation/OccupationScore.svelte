<!--
  @component Individual score "cell" for OccupationScoreGrid
-->
<script>
  export let title = "Wages";
  export let score = 1;
</script>

<div class="score-container">
  <span class="title font-bold">{title}</span>
  <span class="score" class:highlighted={score === 1}>Score: {score}</span>
</div>

<style>
  .score-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .highlighted {
    font-weight: var(--font-weight-bold);
    background-color: var(--color-gray-shade-lightest);
  }

  .score {
    font-size: var(--font-size-small);
    padding: 0.125rem;
  }
</style>
