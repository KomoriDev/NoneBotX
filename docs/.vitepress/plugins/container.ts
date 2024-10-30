import type { MarkdownRenderer } from 'vitepress'

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?: MarkdownRenderer['renderer']['rules']['container']
}

export function createContainer(md: MarkdownRenderer, defaultTitle: string): ContainerOpts {
  return {
    render(tokens, idx) {
      const klass = tokens[idx].info.trim()
      if (tokens[idx].nesting === 1 /* means the tag is opening */) {
        const title = md.renderInline(defaultTitle || klass)

        return `<div class="${klass} custom-block"><p class="custom-block-title">${title}</p>\n`
      } else {
        return '</div>\n'
      }
    }
  }
}
