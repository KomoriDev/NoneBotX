<template>
  <div id="download-name" align="center" style="font-size: 20px">{{ downloadLink }}</div>
</template>

<script>
export default {
  name: 'NameByPlatform',
  data() {
    return {
      downloadLink: '我不知道（'
    }
  },
  mounted() {
    this.setDownloadName()
  },
  methods: {
    setDownloadName() {
      // Get the user's operating system and architecture
      const platform = navigator.platform.toLowerCase()
      const userAgent = navigator.userAgent.toLowerCase()
      let arch

      if (userAgent.includes('arm64')) {
        arch = 'arm64'
      } else if (userAgent.includes('arm')) {
        arch = 'arm'
      } else if (userAgent.includes('x86_64') || userAgent.includes('x64')) {
        arch = 'amd64'
      } else {
        arch = '386'
      }

      // Determine the download name based on the user's platform and architecture
      if (platform.includes('win')) {
        this.downloadLink = `windows_${arch}`
      } else if (platform.includes('linux') || platform.includes('android')) {
        this.downloadLink = `linux_${arch}`
      } else if (platform.includes('mac') || platform.includes('darwin')) {
        this.downloadLink = `darwin_${arch}`
      } else {
        this.downloadLink = '我不知道（'
      }
    }
  }
}
</script>
