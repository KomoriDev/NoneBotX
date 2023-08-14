/* 修改自 VuePress 2 (MIT)
  @src https://github.com/vuepress/vuepress-next/tree/main/packages/%40vuepress/plugin-container/src/node
  @last-updated 2022-8-13
  @author Yuxi (Evan) You
 */

import MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer'
import container from 'markdown-it-container'

export const containerPlugin = (md: MarkdownIt) => {
  md.use(...createContainer('interlink', '相关链接', md))
    .use(...createContainer('tsukkomi', '吐槽', md))
    .use(...createContainer('code-group', 'code-group', md))
    .use(...createContainer('code-group-item', 'code-group-item', md))
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]

function createContainer(klass: string, defaultTitle: string, md: MarkdownIt): ContainerArgs {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim()

        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle)
          switch (klass) {
            case 'code-group':
              return '<CodeGroup>\n'
            case 'code-group-item':
              return `<CodeGroupItem title="${info}">\n`
            default:
              return `<div class="${klass} custom-block"><p class="custom-block-title">${title}</p>\n`
          }
        } else {
          switch (klass) {
            case 'code-group':
              return '</CodeGroup>\n'
            case 'code-group-item':
              return '</CodeGroupItem>\n'
            default:
              return '</div>\n'
          }
        }
      }
    }
  ]
}
