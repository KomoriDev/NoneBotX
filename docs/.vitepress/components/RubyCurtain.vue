<!-- Author: I Love Study <1450069615@qq.com> -->

<script setup lang="ts">
interface Props {
  up: string
  title?: string
  type: string
}

withDefaults(defineProps<Props>(), {
  up: undefined,
  title: '你知道的太多了',
  type: undefined
})
</script>

<template>
  <ruby>
    <slot></slot>
    <rp>(</rp>
    <rt>
      <curtain :title="title" :type="type">{{ up }}</curtain>
    </rt>
    <rp>)</rp>
  </ruby>
</template>

<style scoped lang="scss">
rt .heimu {
  font-size: 0.75em; /* 与其他 Ruby 默认的字体大小保持同步 */
  padding-top: 0; /* 尽量使黑幕不要挡住上一行 */
  padding-bottom: 0; /* 尽量使黑幕不要挡住当前行的内容 */
}
</style>
