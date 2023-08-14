<!-- Author: I Love Study <1450069615@qq.com> -->

<script setup lang="ts">
interface Props {
  words: string
  link: string
  width?: string
}

withDefaults(defineProps<Props>(), {
  words: undefined,
  link: undefined,
  width: '200px'
})
</script>

<template>
  <span v-if="link" class="text">
    <span class="mbox" :style="{ width: width }">
      <div style="height: 1.4em"></div>
      <slot></slot>
    </span>
    <a>{{ words }}</a>
  </span>
  <span v-else class="text">
    <span class="mbox" :style="{ width: width }">
      <div style="height: 1.4em"></div>
      <slot></slot> </span
    >{{ words }}
  </span>
</template>

<style scoped lang="scss">
.mbox {
  position: absolute;
  z-index: 22;
  display: none;
}

.text:hover .mbox {
  display: inline;
}
</style>
