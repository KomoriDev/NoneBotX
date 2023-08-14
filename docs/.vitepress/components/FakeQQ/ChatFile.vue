<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps<{
  name: string
  filename: string
  filesize: string
  fileicon: string
  href: string
  onright?: boolean
}>()

const file = ref<HTMLAnchorElement>()

onMounted(() => {
  if (props.href && file.value) {
    // const file = this.$refs.file as HTMLAnchorElement
    file.value.href = props.href
  }
})
</script>

<template>
  <a ref="file" target="_blank" style="text-decoration: none">
    <div class="normal-file file-element">
      <div class="file-header">
        <p class="file-name">
          <span class="text-ellipsis">{{ filename }}</span>
        </p>
        <div class="file-icon" :style="{ backgroundImage: `url(${fileicon})` }"></div>
      </div>
      <div class="file-info">
        <span>{{ filesize }}</span>
      </div>
    </div>
  </a>
</template>
