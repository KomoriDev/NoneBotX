import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import externalGlobals from 'rollup-plugin-external-globals'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'

// https://cn.vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    webUpdateNotice({
      notificationProps: {
        title: '版本升级通知',
        description: '检测到当前文档版本已升级，请刷新页面后使用。',
        buttonText: '刷新',
        dismissButtonText: '忽略'
      },
      logVersion: true
    })
  ],
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      plugins: [externalGlobals({ mermaid: 'mermaid' })]
    }
  }
})
