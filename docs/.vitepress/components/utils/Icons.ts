/* 修改自 vuepress-plugin-md-enhance
 * @src https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/md-enhance/src/client/components/icons.ts
 * @last-updated 2022-8-13
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

import { IconBase } from './IconBase'
import { h } from 'vue'

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
