/* 修改自 vuepress-plugin-md-enhance (MIT)
  @src https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/md-enhance/src/client/components/icons.ts
  @last-updated 2022-8-13
  @author MrHope
 */

import { h } from 'vue'
import { IconBase } from './utils/IconBase'

import type { FunctionalComponent } from 'vue'

export const LoadingIcon: FunctionalComponent = () =>
  h(IconBase, { name: 'loading' }, () =>
    ['0s', '-0.333s', '-0.667s'].map((item) =>
      h(
        'circle',
        {
          cx: 50,
          cy: 50,
          r: 0,
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: '2'
        },
        [
          h('animate', {
            attributeName: 'r',
            repeatCount: 'indefinite',
            dur: '1s',
            values: '0;40',
            keyTimes: '0;1',
            keySplines: '0 0.2 0.8 1',
            calcMode: 'spline',
            begin: item
          }),
          h('animate', {
            attributeName: 'opacity',
            repeatCount: 'indefinite',
            dur: '1s',
            values: '1;0',
            keyTimes: '0;1',
            keySplines: '0.2 0 0.8 1',
            calcMode: 'spline',
            begin: item
          })
        ]
      )
    )
  )
