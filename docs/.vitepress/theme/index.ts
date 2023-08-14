import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import Layout from './Layout.vue'

import { CodeGroup } from '../mdEnhance/components/CodeGroup'
import CodeGroupItem from '../mdEnhance/components/CodeGroupItem.vue'
import Mermaid from '../mdEnhance/components/Mermaid'

import ChatFile from '../components/FakeQQ/ChatFile.vue'
import ChatImg from '../components/FakeQQ/ChatImg.vue'
import ChatMsg from '../components/FakeQQ/ChatMsg.vue'
import ChatQuote from '../components/FakeQQ/ChatQuote.vue'
import ChatToast from '../components/FakeQQ/ChatToast.vue'
import ChatVoice from '../components/FakeQQ/ChatVoice.vue'
import ChatWindow from '../components/FakeQQ/ChatWindow.vue'
import ForwardChat from '../components/FakeQQ/ForwardChat.vue'

import Curtain from '../components/Curtain.vue'
import GitRepo from '../components/GitRepo.vue'
import Loading from '../components/Loading.vue'
import MoreInfo from '../components/MoreInfo.vue'
import ProjectInfo from '../components/ProjectInfo.vue'
import RubyCurtain from '../components/RubyCurtain.vue'
import VolumeBar from '../components/VolumeBar.vue'

import '../styles/index.scss'

const theme: Theme = {
  ...DefaultTheme,

  // root component to wrap each page
  Layout,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enhanceApp({ app, router, siteData }) {
    DefaultTheme.enhanceApp({ app, router, siteData })

    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.
    app.component('ChatFile', ChatFile)
    app.component('ChatImg', ChatImg)
    app.component('ChatMsg', ChatMsg)
    app.component('ChatQuote', ChatQuote)
    app.component('ChatToast', ChatToast)
    app.component('ChatVoice', ChatVoice)
    app.component('ChatWindow', ChatWindow)
    app.component('ForwardChat', ForwardChat)

    app.component('Curtain', Curtain)
    app.component('GitRepo', GitRepo)
    app.component('Loading', Loading)
    app.component('MoreInfo', MoreInfo)
    app.component('ProjectInfo', ProjectInfo)
    app.component('RubyCurtain', RubyCurtain)
    app.component('VolumeBar', VolumeBar)

    app.component('CodeGroup', CodeGroup)
    app.component('CodeGroupItem', CodeGroupItem)
    app.component('Mermaid', Mermaid)
  }
}

export default theme
