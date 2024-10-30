/* 修改自 vuepress-plugin-md-enhance
 * @src https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/md-enhance/src/node/markdown-it/mermaid.ts
 * @last-updated 2024-10-01
 * @last-updated-by @Redlnn
 */

/* The MIT License (MIT)
 *
 * Copyright (c) 2018, PRESENT by MrHope
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @author MrHope
 * @website https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/md-enhance
 *
 */

import type { PluginSimple } from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

const mermaidRenderer: RenderRule = (tokens, index) =>
  `<Mermaid id="mermaid-${index}" code="${tokens[index].content}"></Mermaid>`

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
  diagram === 'mermaid' || diagram === 'sankey-beta'
    ? content
    : content
        .split('\n')
        .map((line) => (line ? `  ${line}` : ''))
        .join('\n')
}\
`

const getMermaid = (options: MermaidOptions, index: number): string =>
  `<Mermaid id="mermaid-${index}" code="${getMermaidContent(options)}"${
    options.title ? ` title="${options.title}"` : ''
  }></Mermaid>`

const DIAGRAM_MAP: Record<string, string> = {
  'block': 'block-beta',
  'class': 'classDiagram',
  'c4c': 'C4Context',
  'er': 'erDiagram',
  'gantt': 'gantt',
  'git-graph': 'gitGraph',
  'journey': 'journey',
  'mindmap': 'mindmap',
  'pie': 'pie',
  'quadrant': 'quadrantChart',
  'requirement': 'requirementDiagram',
  'sankey': 'sankey-beta',
  'sequence': 'sequenceDiagram',
  'state': 'stateDiagram-v2',
  'timeline': 'timeline',
  'xy': 'xychart-beta'
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

    return fence!(...args)
  }

  md.renderer.rules['mermaid'] = mermaidRenderer
}
