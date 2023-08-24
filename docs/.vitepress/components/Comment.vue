<script setup lang="ts">
import { useData } from 'vitepress'

const { title } = useData()
</script>

<template>
  <div class="comments">
    <component
      :is="'script'"
      :key="title"
      src="https://giscus.app/client.js"
      data-repo="KomoriDev/NoneBotX"
      data-repo-id="R_kgDOKGjPMA"
      data-category="General"
      data-category-id="DIC_kwDOKGjPMM4CYy2X"
      data-mapping="title"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      data-lang="zh-CN"
      data-theme="preferred_color_scheme"
      data-loading="lazy"
      crossorigin="anonymous"
    />
  </div>
</template>
