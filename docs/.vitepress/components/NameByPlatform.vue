<script setup lang="ts">
import { ref, onMounted } from 'vue'

const downloadLink = ref('我不知道（')

function setDownloadName() {
  // Get the user's operating system and architecture
  const platform = navigator.platform.toLowerCase()
  const userAgent = navigator.userAgent.toLowerCase()
  const maybeUnsupported = '感觉像是不受支持的平台，看看下面的指引吧（'
  let arch

  if (
    userAgent.includes('x86_64') ||
    userAgent.includes('x64') ||
    userAgent.includes('amd64') ||
    userAgent.includes('intel')
  ) {
    arch = 'amd64'
  } else if (
    userAgent.includes('arm64') ||
    userAgent.includes('aarch64') ||
    userAgent.includes('armv8') ||
    userAgent.includes('android')
  ) {
    arch = 'arm64'
  } else if (userAgent.includes('arm')) {
    arch = 'arm'
  } else if (userAgent.includes('86')) {
    arch = '386'
  } else {
    arch = '?'
  }

  // Determine the download name based on the user's platform and architecture
  if (arch === '?') {
    downloadLink.value = maybeUnsupported
  } else if (platform.includes('win')) {
    downloadLink.value = `windows_${arch}`
  } else if (platform.includes('linux') || platform.includes('android')) {
    downloadLink.value = `linux_${arch}`
  } else if (platform.includes('mac') || platform.includes('darwin')) {
    downloadLink.value = `darwin_${arch}`
  } else {
    downloadLink.value = maybeUnsupported
  }
}

onMounted(() => {
  setDownloadName()
})
</script>

<template>
  <div id="download-name" align="center" style="font-size: 20px">{{ downloadLink }}</div>
</template>
