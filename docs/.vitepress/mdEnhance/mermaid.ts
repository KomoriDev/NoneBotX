/* 修改自 vuepress-plugin-md-enhance (MIT)
  @src https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/md-enhance/src/node/markdown-it/mermaid.ts
  @last-updated 2022-8-13
  @author MrHope
 */

import type { PluginSimple } from 'markdown-it'
import type Renderer from 'markdown-it/lib/renderer.js'
import { zlibSync, strToU8, strFromU8 } from 'fflate'

function utoa(data: string): string {
  const buffer = strToU8(data)
  const zipped = zlibSync(buffer, { level: 9 })
  const binary = strFromU8(zipped, true)
  return btoa(binary)
}

const mermaidRenderer: Renderer.RenderRule = (tokens, index) =>
  `<Mermaid id="mermaid-${index}" code="${utoa(tokens[index].content)}"></Mermaid>`

interface MermaidOptions {
  content: string
  diagram?: string
  title?: string
}

export const getMermaidContent = ({
  diagram = 'mermaid',
  content,
  title = ''
}: MermaidOptions): string => `\
${
  title
    ? `\
---
title: ${title}
---

`
    : ''
}\
${
  diagram === 'mermaid'
    ? ''
    : `\
${diagram}
`
}\
${
  diagram === 'mermaid'
    ? content
    : content
        .split('\n')
        .map((line) => (line ? `  ${line}` : ''))
        .join('\n')
}\
`

const getMermaid = (options: MermaidOptions, index: number): string =>
  `<Mermaid id="mermaid-${index}" code="${utoa(getMermaidContent(options))}"></Mermaid>`

const DIAGRAM_MAP: Record<string, string> = {
  'class': 'classDiagram',
  'c4c': 'C4Context',
  'er': 'erDiagram',
  'gantt': 'gantt',
  'git-graph': 'gitGraph',
  'journey': 'journey',
  'mindmap': 'mindmap',
  'pie': 'pie',
  'sequence': 'sequenceDiagram',
  'state': 'stateDiagram-v2',
  'timeline': 'timeline'
}

export const mermaidPlugin: PluginSimple = (md) => {
  // Handle ```mermaid blocks
  const { fence } = md.renderer.rules

  md.renderer.rules.fence = (...args): string => {
    const [tokens, index] = args
    const { content, info } = tokens[index]

    const fenceInfo = info.trim()

    if (fenceInfo === 'mermaid') {
      return getMermaid({ content }, index)
    }

    const [name, ...rest] = fenceInfo.split(' ')

    if (DIAGRAM_MAP[name]) {
      return getMermaid({ diagram: DIAGRAM_MAP[name], title: rest.join(' '), content }, index)
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return fence!(...args)
  }

  md.renderer.rules['mermaid'] = mermaidRenderer
}
