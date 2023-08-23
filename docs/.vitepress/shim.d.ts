interface ImportMeta {
  readonly env: ImportMeta
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '@siteData' {
  import type { SiteData } from 'vitepress'
  const data: SiteData
  export default data
}

declare module '@theme/index' {
  import type { Theme } from 'vitepress'
  const theme: Theme
  export default theme
}
