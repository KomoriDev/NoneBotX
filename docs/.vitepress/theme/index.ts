import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import VueTermynalPlugin from '@lehoczky/vue-termynal'
import { FakeQQUI } from 'fake-qq-ui'

import Curtain from '../components/Curtain.vue'
import GitRepo from '../components/GitRepo.vue'
import Loading from '../components/Loading.vue'
import Mermaid from '../components/Mermaid'
import MoreInfo from '../components/MoreInfo.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import RubyCurtain from '../components/RubyCurtain.vue'
import VolumeBar from '../components/VolumeBar.vue'
import Comment from '../components/Comment.vue'
import NameByPlatform from '../components/NameByPlatform.vue'
import AsideAd from '../components/AsideAd.vue'
import NoneMeme from '../components/NoneMeme.vue'
import Mark from '../components/Mark.vue'
import QWindow from '../components/QWindow.vue'

import '../styles/index.scss'
import 'fake-qq-ui/styles/style.css'
import 'fake-qq-ui/styles/light.scss'
import 'fake-qq-ui/styles/dark.scss'

export default {
  extends: DefaultTheme,

  // root component to wrap each page
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'sidebar-nav-after': () => h(NoneMeme),
      'aside-ads-before': () => h(AsideAd)
    })
  },

  enhanceApp({ app, router, siteData }) {
    app.component('Curtain', Curtain)
    app.component('GitRepo', GitRepo)
    app.component('Loading', Loading)
    app.component('MoreInfo', MoreInfo)
    app.component('ProjectInfo', ProjectInfo)
    app.component('RubyCurtain', RubyCurtain)
    app.component('VolumeBar', VolumeBar)
    app.component('Comment', Comment)
    app.component('Mermaid', Mermaid)
    app.component('NameByPlatform', NameByPlatform)
    // eslint-disable-next-line vue/no-reserved-component-names
    app.component('Mark', Mark)
    app.component('QWindow', QWindow)

    app.use(VueTermynalPlugin)
    app.use(FakeQQUI)
  }
} satisfies Theme
