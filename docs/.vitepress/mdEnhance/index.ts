import MarkdownIt from 'markdown-it'
import footnote_plugin from 'markdown-it-footnote'

import { containerPlugin } from './cunstomContainrt'
import { mermaidPlugin } from './mermaid'
import { tasklistPlugin } from './tasklist-mod'

export default (md: MarkdownIt) => {
  md.use(containerPlugin)
  md.use(mermaidPlugin)
  md.use(tasklistPlugin)
  md.use(footnote_plugin)
}
