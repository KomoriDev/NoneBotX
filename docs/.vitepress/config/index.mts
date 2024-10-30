import { defineConfig } from 'vitepress'

import { before, guide, appendix, comment } from './sidebar'

import mdPlugin from './plugins'
import viteConfig from './vite'

export default defineConfig({
  lang: 'zh-CN',

  title: 'NoneBot 文档',
  description: 'NoneBot2 社区文档',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'shortcut icon', href: './favicon.ico' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/mermaid@11.3.0/dist/mermaid.min.js' }],
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-DCQWK40LG3' }],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-DCQWK40LG3');`
    ]
  ],

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
      pattern: 'https://github.com/KomoriDev/NoneBotX/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/KomoriDev/NoneBotX' }],
    footer: {
      message: 'MIT License',
      copyright: 'Copyright © 2024 Komorebi'
    },
    lastUpdatedText: '上次更新',
    outlineTitle: 'On this page',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '黑暗模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部 ▲',
    search: {
      provider: 'local'
    }
  },

  vite: viteConfig,

  markdown: {
    theme: {
      light: 'min-light',
      dark: 'one-dark-pro'
    },
    image: {
      lazyLoading: true
    },
    lineNumbers: true,
    config: mdPlugin
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
