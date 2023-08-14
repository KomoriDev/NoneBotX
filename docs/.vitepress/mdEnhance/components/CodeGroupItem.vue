<!--
修改自 VuePress 2 (MIT)
@src https://github.com/vuepress/vuepress-next/blob/main/packages/%40vuepress/theme-default/src/client/components/global/CodeGroupItem.vue
@last-updated 2022-8-13
@author Yuxi (Evan) You
-->

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CodeGroupItem'
})
</script>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>

<template>
  <div
    class="code-group-item"
    :class="{ 'code-group-item__active': active }"
    :aria-selected="active"
  >
    <slot />
  </div>
</template>
