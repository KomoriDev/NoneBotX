<template>
  <button class="vt-switch" type="button" role="switch">
    <span class="vt-switch-check">
      <span class="vt-switch-icon" v-if="$slots.default">
        <slot />
      </span>
    </span>
  </button>
</template>

<style scoped>
.vt-switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid #3c3c3c4a;
  background-color: #f1f1f1;
  transition:
    border-color 0.25s,
    background-color 0.25s;

  html.dark & {
    background-color: #2f2f2f;
  }
}

.vt-switch:hover {
  border-color: #8e8e8e;
}

.vt-switch-check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition:
    background-color 0.25s,
    transform 0.25s;
}

.dark .vt-switch-check {
  background-color: #1a1a1a;
}

.vt-switch-icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.vt-switch-icon svg {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  fill: #3c3c3cb3;
}

.dark .vt-switch-icon svg {
  fill: #213547;
  transition: opacity 0.25s;
}
</style>
