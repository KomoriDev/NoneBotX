<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="reply-element no-copy reply-element--self">
    <div class="reply-title">
      <div class="reply-info">
        <span class="text-ellipsis">{{ name }}</span>
      </div>
    </div>
    <div class="reply-content">
      <slot></slot>
    </div>
  </div>
</template>
