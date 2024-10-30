/// <reference types="vite/client" />
/// <reference types="fake-qq-ui/client" />

import AsideAd from './components/AsideAd.vue'
import Comment from './components/Comment.vue'
import Curtain from './components/Curtain.vue'
import GitRepo from './components/GitRepo.vue'
import Loading from './components/Loading.vue'
import Mark from './components/Mark.vue'
import Mermaid from './components/Mermaid'
import MoreInfo from './components/MoreInfo.vue'
import NameByPlatform from './components/NameByPlatform.vue'
import NoneMeme from './components/NoneMeme.vue'
import ProjectInfo from './components/ProjectInfo.vue'
import QWindow from './components/QWindow.vue'
import RubyCurtain from './components/RubyCurtain.vue'
import VolumeBar from './components/VolumeBar.vue'

export type Plugin = {
  author: string
  name: string
  desc: string
  homepage: string
  is_official: boolean
  module_name: string
  project_link: string
  skip_test: boolean
  supported_adapters: string[] | null
  tags: string[]
  time: string
  type: string
  valid: boolean
  version: string
}

export type PluginsResponse = Array<Plugin>

export interface Plugins {
  [K: string]: Plugin
}

declare module 'vue' {
  export interface GlobalComponents {
    AsideAd: typeof AsideAd
    Comment: typeof Comment
    Curtain: typeof Curtain
    GitRepo: typeof GitRepo
    Loading: typeof Loading
    Mark: typeof Mark
    Mermaid: typeof Mermaid
    MoreInfo: typeof MoreInfo
    NameByPlatform: typeof NameByPlatform
    NoneMeme: typeof NoneMeme
    ProjectInfo: typeof ProjectInfo
    QWindow: typeof QWindow
    RubyCurtain: typeof RubyCurtain
    VolumeBar: typeof VolumeBar
  }
}
