import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import { before, guide, appendix, comment } from './sidebar'

import mdEnhance from './mdEnhance/index'

export default defineConfig({
  lang: 'zh-CN',

  title: 'NoneBot 文档',
  description: 'NoneBot2 社区文档',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'shortcut icon', href: './favicon.ico' }],
    ['script', { src: 'https://cdn.bootcdn.net/ajax/libs/mermaid/10.3.0/mermaid.min.js' }]
  ],

  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPSwitchAppearance\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/SwitchAppearance.vue', import.meta.url),
          ),
        },
      ],
    },
  },

  themeConfig: {
    i18nRouting: true,
    logo: './favicon.png',
    nav: nav(),
    sidebar: {
      '/before/': before,
      '/guide/': guide,
      '/appendix/': appendix,
      '/comment': comment
    },
    editLink: {
      pattern: 'https://github.com/KomoriDev/NoneBotX/edit/remake/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/KomoriDev/NoneBotX' }],
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2023 Komorebi'
    },
    lastUpdatedText: '上次更新',
    outlineTitle: 'On this page',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '黑暗模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部 ▲'
  },

  transformHead({ assets }) {
    // adjust the regex accordingly to match your font
    const HarmonySansFile = assets.find(() => /HarmonyOS_Sans_SC\.woff2/)
    if (HarmonySansFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: HarmonySansFile,
            as: 'font',
            type: 'font/woff2',
            crossorigin: ''
          }
        ]
      ]
    }
  },

  markdown: {
    theme: 'one-dark-pro',
    lineNumbers: true,
    config: mdEnhance
  }
})

function nav() {
  return [
    { text: '开始之前', link: '/before/', activeMatch: '/before/' },
    { text: '实战演练', link: '/guide/', activeMatch: '/guide/' },
    { text: '附录', link: '/appendix/credit', activeMatch: '/appendix/' },
    { text: '论坛', link: '/comment', activeMatch: '/comment' },
    { text: 'NoneBot 官方文档', link: 'https://nonebot.dev/' }
  ]
}
