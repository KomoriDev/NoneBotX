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
