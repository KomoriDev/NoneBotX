import type { MarkdownRenderer } from 'vitepress'
import container from 'markdown-it-container'

import { footnote } from '@mdit/plugin-footnote'
import { tasklist } from '@mdit/plugin-tasklist'

import { createContainer } from '../plugins/container'
import { mermaidPlugin } from '../plugins/mermaid'

export default (md: MarkdownRenderer) => {
  md.use(footnote)
  md.use(tasklist)

  md.use(mermaidPlugin)

  md.use(container, 'interlink', createContainer(md, '相关链接'))
  md.use(container, 'tsukkomi', createContainer(md, '吐槽'))
}
