<template>
  <span class="mark">
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
.mark {
  --vp-nolebase-mark-bg-shift: 0.4lh;
  --vp-nolebase-mark-bg-color: #ffce0050;

  /* Override default styles of <mark>  */
  color: inherit;
  background-color: transparent;

  /* Configure animations */
  animation-name: mark-highlight-animation;
  animation-duration: 1.5s;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;

  /* Expand the background image width 2x larger than the default background width */
  background-size: 200%;
  /* Init position of background image, otherwise it will cause a flicker */
  background-position: 100% var(--vp-nolebase-mark-bg-shift);
  /* By default, background image will repeat, we don't want that */
  background-repeat: no-repeat;
  /* Use background image with linear gradient to create the highlight effect */
  background-image: linear-gradient(
    to right,
    var(--vp-nolebase-mark-bg-color) 50%,
    transparent 50%
  );
}

@keyframes mark-highlight-animation {
  from {
    color: inherit;
    background-position: 100% var(--vp-nolebase-mark-bg-shift);
  }

  to {
    color: var(--vp-c-text-1);
    background-position: 0% var(--vp-nolebase-mark-bg-shift);
  }
}
</style>
