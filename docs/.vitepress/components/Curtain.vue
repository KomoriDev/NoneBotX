<!--
 Author: I Love Study <1450069615@qq.com>
 Co-Author: Redlnn <w731347477@gmail.com>
-->

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: '你知道的太多了'
})
</script>

<template>
  <span :title="title" class="heimu">
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
.heimu {
  color: rgba(60, 60, 67);
  border-radius: 4px;
  padding: 1.5px 4px;
  margin: 0 2px;
  text-shadow: none;
  background-color: rgba(60, 60, 67);
  transition:
    color 0.13s linear,
    background-color 0.13s linear;

  html.dark & {
    background-color: #e3e3e3;
    color: #e3e3e3;
  }

  &:deep() {
    code {
      padding: 0.1rem 0.25rem;
      background-color: rgba(60, 60, 67);
      color: rgba(60, 60, 67);
      html.dark & {
        background-color: #e3e3e3;
        color: #e3e3e3;
      }
    }
    a {
      color: rgba(60, 60, 67);
      html.dark & {
        color: #e3e3e3;
      }
    }
  }

  &:hover,
  &:focus,
  &:active {
    color: var(--vp-c-bg) !important;

    &:deep() code {
      background-color: var(--vp-c-bg) !important;
      color: rgba(60, 60, 67) !important;
    }

    html.dark &:deep() a,
    &:deep() a {
      color: var(--vp-c-bg);
      text-decoration: underline;
    }
  }
}
</style>
