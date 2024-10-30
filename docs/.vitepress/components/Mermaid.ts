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

import { LoadingIcon } from './utils/Icons'
import type { VNode } from 'vue'
import mermaid from 'mermaid'
import { computed, defineComponent, h, onMounted, ref, shallowRef, watch } from 'vue'
import { useDark, useMutationObserver } from '@vueuse/core'

const DEFAULT_CHART_OPTIONS = { useMaxWidth: false, htmlLabels: false }
const isDark = useDark()

const getThemeVariables = (isDarkMode: boolean): Record<string, unknown> => {
  return {
    background: isDarkMode ? '#333' : 'white',
    primaryColor: isDarkMode ? '#1f2020' : '#ECECFF',
    secondaryColor: isDarkMode ? 'hsl(180, 1.59%, 28.35%)' : '#ffffde',
    tertiaryColor: isDarkMode ? 'hsl(20, 1.59%, 12.35%)' : 'hsl(80, 100%, 96.27%)',
    primaryBorderColor: isDarkMode ? '#cccccc' : 'hsl(240, 60%, 86.27%)',
    secondaryBorderColor: isDarkMode ? 'hsl(180, 0%, 18.35%)' : 'hsl(60, 60%, 83.53%)',
    tertiaryBorderColor: isDarkMode ? 'hsl(20, 0%, 2.35%)' : 'hsl(80, 60%, 86.27%)',
    primaryTextColor: isDarkMode ? '#e0dfdf' : '#131300',
    secondaryTextColor: isDarkMode ? 'rgb(183.85, 181.56, 181.56)' : '#000021',
    tertiaryTextColor: isDarkMode ? 'rgb(223, 223.7, 224)' : 'rgb(6.33, 0, 19)',
    lineColor: isDarkMode ? 'lightgrey' : '#333333',
    textColor: isDarkMode ? '#ccc' : '#333',
    mainBkg: isDarkMode ? '#1f2020' : '#ECECFF',
    secondBkg: isDarkMode ? 'hsl(180, 1.59%, 28.35%)' : '#ffffde',
    mainContrastColor: 'lightgrey',
    darkTextColor: 'hsl(28.57, 17.36%, 86.27%)',
    border1: isDarkMode ? '#81B1DB' : '#9370DB',
    border2: isDarkMode ? 'rgba(255, 255, 255, 0.25)' : '#aaaa33',
    arrowheadColor: isDarkMode ? 'lightgrey' : '#333333',
    fontSize: '16px',
    labelBackground: isDarkMode ? '#181818' : '#e8e8e8',
    THEME_COLOR_LIMIT: '12',
    nodeBkg: isDarkMode ? '#1f2020' : '#ECECFF',
    nodeBorder: isDarkMode ? '#81B1DB' : '#9370DB',
    clusterBkg: isDarkMode ? 'hsl(180, 1.59%, 28.35%)' : '#ffffde',
    clusterBorder: isDarkMode ? 'rgba(255, 255, 255, 0.25)' : '#aaaa33',
    defaultLinkColor: isDarkMode ? 'lightgrey' : '#333333',
    titleColor: isDarkMode ? '#F9FFFE' : '#333',
    edgeLabelBackground: isDarkMode ? 'hsl(0, 0%, 34.41%)' : '#e8e8e8',
    actorBorder: isDarkMode ? '#81B1DB' : 'hsl(259.63, 59.78%, 87.9%)',
    actorBkg: isDarkMode ? '#1f2020' : '#ECECFF',
    actorTextColor: isDarkMode ? 'lightgrey' : 'black',
    actorLineColor: isDarkMode ? 'lightgrey' : 'grey',
    signalColor: isDarkMode ? 'lightgrey' : '#333',
    signalTextColor: isDarkMode ? 'lightgrey' : '#333',
    labelBoxBkgColor: isDarkMode ? '#1f2020' : '#ECECFF',
    labelBoxBorderColor: isDarkMode ? '#81B1DB' : 'hsl(259.63, 59.78%, 87.9%)',
    labelTextColor: isDarkMode ? 'lightgrey' : 'black',
    loopTextColor: isDarkMode ? 'lightgrey' : 'black',
    noteBorderColor: isDarkMode ? 'hsl(180, 0%, 18.35%)' : '#aaaa33',
    noteBkgColor: isDarkMode ? 'hsl(180, 1.59%, 28.35%)' : '#fff5ad',
    noteTextColor: isDarkMode ? 'rgb(183.85, 181.56, 181.56)' : 'black',
    activationBorderColor: isDarkMode ? '#81B1DB' : '#666',
    activationBkgColor: isDarkMode ? 'hsl(180, 1.59%, 28.35%)' : '#f4f4f4',
    sequenceNumberColor: isDarkMode ? 'black' : 'white',
    sectionBkgColor: isDarkMode ? 'hsl(52.94, 28.81%, 58.43%)' : 'rgba(102, 102, 255, 0.49)',
    altSectionBkgColor: isDarkMode ? '#333' : 'white',
    sectionBkgColor2: isDarkMode ? '#EAE8D9' : '#fff400',
    excludeBkgColor: isDarkMode ? 'hsl(52.94, 28.81%, 48.43%)' : '#eeeeee',
    taskBorderColor: isDarkMode ? '#ffffff' : '#534fbc',
    taskBkgColor: isDarkMode ? 'hsl(180, 1.59%, 35.35%)' : '#8a90dd',
    taskTextColor: isDarkMode ? 'hsl(28.57, 17.36%, 86.27%)' : 'white',
    taskTextLightColor: isDarkMode ? 'lightgrey' : 'white',
    taskTextOutsideColor: isDarkMode ? 'lightgrey' : 'black',
    taskTextClickableColor: '#003163',
    activeTaskBorderColor: isDarkMode ? '#ffffff' : '#534fbc',
    activeTaskBkgColor: isDarkMode ? '#81B1DB' : '#bfc7ff',
    gridColor: 'lightgrey',
    doneTaskBkgColor: 'lightgrey',
    doneTaskBorderColor: 'grey',
    critBorderColor: isDarkMode ? '#E83737' : '#ff8888',
    critBkgColor: isDarkMode ? '#E83737' : 'red',
    taskTextDarkColor: isDarkMode ? 'hsl(28.57, 17.36%, 86.27%)' : 'black',
    todayLineColor: isDarkMode ? '#DB5757' : 'red',
    personBorder: isDarkMode ? '#cccccc' : 'hsl(240, 60%, 86.27%)',
    personBkg: isDarkMode ? '#1f2020' : '#ECECFF',
    labelColor: isDarkMode ? 'calculated' : 'black',
    errorBkgColor: isDarkMode ? '#a44141' : '#552222',
    errorTextColor: isDarkMode ? '#ddd' : '#552222',
    transitionColor: isDarkMode ? 'lightgrey' : '#333333',
    transitionLabelColor: isDarkMode ? '#ccc' : '#333',
    stateLabelColor: isDarkMode ? '#e0dfdf' : '#131300',
    stateBkg: isDarkMode ? '#1f2020' : '#ECECFF',
    labelBackgroundColor: isDarkMode ? '#1f2020' : '#ECECFF',
    compositeBackground: isDarkMode ? '#333' : 'white',
    altBackground: isDarkMode ? '#555' : '#f0f0f0',
    compositeTitleBackground: isDarkMode ? '#1f2020' : '#ECECFF',
    compositeBorder: isDarkMode ? '#81B1DB' : '#9370DB',
    innerEndBackground: isDarkMode ? '#cccccc' : '#9370DB',
    specialStateColor: isDarkMode ? '#f4f4f4' : '#333333',
    fillType0: isDarkMode ? '#1f2020' : '#ECECFF',
    fillType1: isDarkMode ? 'hsl(180, 1.59%, 28.35%)' : '#ffffde',
    fillType2: isDarkMode ? 'hsl(244, 1.59%, 12.35%)' : 'hsl(304, 100%, 96.27%)',
    fillType3: isDarkMode ? 'hsl(244, 1.59%, 28.35%)' : 'hsl(124, 100%, 93.53%)',
    fillType4: isDarkMode ? 'hsl(116, 1.59%, 12.35%)' : 'hsl(176, 100%, 96.27%)',
    fillType5: isDarkMode ? 'hsl(116, 1.59%, 28.35%)' : 'hsl(-4, 100%, 93.53%)',
    fillType6: isDarkMode ? 'hsl(308, 1.59%, 12.35%)' : 'hsl(8, 100%, 96.27%)',
    fillType7: isDarkMode ? 'hsl(308, 1.59%, 28.35%)' : 'hsl(188, 100%, 93.53%)',
    cScale1: isDarkMode ? '#0b0000' : 'hsl(60, 100%, 73.53%)',
    cScale2: isDarkMode ? '#4d1037' : 'hsl(80, 100%, 76.27%)',
    cScale3: isDarkMode ? '#3f5258' : 'hsl(270, 100%, 76.27%)',
    cScale4: isDarkMode ? '#4f2f1b' : 'hsl(300, 100%, 76.27%)',
    cScale5: isDarkMode ? '#6e0a0a' : 'hsl(330, 100%, 76.27%)',
    cScale6: isDarkMode ? '#3b0048' : 'hsl(0, 100%, 76.27%)',
    cScale7: isDarkMode ? '#995a01' : 'hsl(30, 100%, 76.27%)',
    cScale8: isDarkMode ? '#154706' : 'hsl(90, 100%, 76.27%)',
    cScale9: isDarkMode ? '#161722' : 'hsl(150, 100%, 76.27%)',
    cScale10: isDarkMode ? '#00296f' : 'hsl(180, 100%, 76.27%)',
    cScale11: isDarkMode ? '#01629c' : 'hsl(210, 100%, 76.27%)',
    cScale12: '#010029',
    cScale0: isDarkMode ? '#1f2020' : 'hsl(240, 100%, 76.27%)',
    cScaleInv0: isDarkMode ? '#e0dfdf' : 'hsl(60, 100%, 86.27%)',
    cScaleInv1: isDarkMode ? '#f4ffff' : 'hsl(240, 100%, 83.53%)',
    cScaleInv2: isDarkMode ? '#b2efc8' : 'hsl(260, 100%, 86.27%)',
    cScaleInv3: isDarkMode ? '#c0ada7' : 'hsl(90, 100%, 86.27%)',
    cScaleInv4: isDarkMode ? '#b0d0e4' : 'hsl(120, 100%, 86.27%)',
    cScaleInv5: isDarkMode ? '#91f5f5' : 'hsl(150, 100%, 86.27%)',
    cScaleInv6: isDarkMode ? '#c4ffb7' : 'hsl(180, 100%, 86.27%)',
    cScaleInv7: isDarkMode ? '#66a5fe' : 'hsl(210, 100%, 86.27%)',
    cScaleInv8: isDarkMode ? '#eab8f9' : 'hsl(270, 100%, 86.27%)',
    cScaleInv9: isDarkMode ? '#e9e8dd' : 'hsl(330, 100%, 86.27%)',
    cScaleInv10: isDarkMode ? '#ffd690' : 'hsl(0, 100%, 86.27%)',
    cScaleInv11: isDarkMode ? '#fe9d63' : 'hsl(30, 100%, 86.27%)',
    cScalePeer0: isDarkMode ? 'hsl(180, 1.59%, 22.35%)' : 'hsl(240, 100%, 61.27%)',
    cScalePeer1: isDarkMode ? 'hsl(0, 100%, 12.1568627451%)' : 'hsl(60, 100%, 48.53%)',
    cScalePeer2: isDarkMode ? 'hsl(321.64, 65.59%, 28.24%)' : 'hsl(80, 100%, 56.27%)',
    cScalePeer3: isDarkMode ? 'hsl(194.4, 16.55%, 39.61%)' : 'hsl(270, 100%, 61.27%)',
    cScalePeer4: isDarkMode ? 'hsl(23.08, 49.06%, 30.78%)' : 'hsl(300, 100%, 61.27%)',
    cScalePeer5: isDarkMode ? 'hsl(0, 83.33%, 33.53%)' : 'hsl(330, 100%, 61.27%)',
    cScalePeer6: isDarkMode ? 'hsl(289.17, 100%, 24.12%)' : 'hsl(0, 100%, 61.27%)',
    cScalePeer7: isDarkMode ? 'hsl(35.13, 98.7%, 40.2%)' : 'hsl(30, 100%, 61.27%)',
    cScalePeer8: isDarkMode ? 'hsl(106.15, 84.42%, 25.1%)' : 'hsl(90, 100%, 61.27%)',
    cScalePeer9: isDarkMode ? 'hsl(235, 21.43%, 20.98%)' : 'hsl(150, 100%, 61.27%)',
    cScalePeer10: isDarkMode ? 'hsl(217.84, 100%, 31.76%)' : 'hsl(180, 100%, 61.27%)',
    cScalePeer11: isDarkMode ? 'hsl(202.45, 98.73%, 40.78%)' : 'hsl(210, 100%, 61.27%)',
    surface0: isDarkMode ? 'hsl(210, 0%, 22.35%)' : 'hsl(270, 100%, 91.27%)',
    surfacePeer0: isDarkMode ? 'hsl(210, 0%, 19.35%)' : 'hsl(270, 100%, 89.27%)',
    surface1: isDarkMode ? 'hsl(210, 0%, 18.35%)' : 'hsl(270, 100%, 86.27%)',
    surfacePeer1: isDarkMode ? 'hsl(210, 0%, 15.35%)' : 'hsl(270, 100%, 84.27%)',
    surface2: isDarkMode ? 'hsl(210, 0%, 14.35%)' : 'hsl(270, 100%, 81.27%)',
    surfacePeer2: isDarkMode ? 'hsl(210, 0%, 11.35%)' : 'hsl(270, 100%, 79.27%)',
    surface3: isDarkMode ? 'hsl(210, 0%, 10.35%)' : 'hsl(270, 100%, 76.27%)',
    surfacePeer3: isDarkMode ? 'hsl(210, 0%, 7.35%)' : 'hsl(270, 100%, 74.27%)',
    surface4: isDarkMode ? 'hsl(210, 0%, 6.35%)' : 'hsl(270, 100%, 71.27%)',
    surfacePeer4: isDarkMode ? 'hsl(210, 0%, 3.35%)' : 'hsl(270, 100%, 69.27%)',
    scaleLabelColor: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel0: isDarkMode ? 'lightgrey' : '#ffffff',
    cScaleLabel1: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel2: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel3: isDarkMode ? 'lightgrey' : '#ffffff',
    cScaleLabel4: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel5: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel6: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel7: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel8: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel9: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel10: isDarkMode ? 'lightgrey' : 'black',
    cScaleLabel11: isDarkMode ? 'lightgrey' : 'black',
    pie0: '#1f2020',
    pie1: isDarkMode ? '#0b0000' : '#ECECFF',
    pie2: isDarkMode ? '#4d1037' : '#ffffde',
    pie3: isDarkMode ? '#3f5258' : 'hsl(80, 100%, 56.27%)',
    pie4: isDarkMode ? '#4f2f1b' : 'hsl(240, 100%, 86.27%)',
    pie5: isDarkMode ? '#6e0a0a' : 'hsl(60, 100%, 63.53%)',
    pie6: isDarkMode ? '#3b0048' : 'hsl(80, 100%, 76.27%)',
    pie7: isDarkMode ? '#995a01' : 'hsl(300, 100%, 76.27%)',
    pie8: isDarkMode ? '#154706' : 'hsl(180, 100%, 56.27%)',
    pie9: isDarkMode ? '#161722' : 'hsl(0, 100%, 56.27%)',
    pie10: isDarkMode ? '#00296f' : 'hsl(300, 100%, 56.27%)',
    pie11: isDarkMode ? '#01629c' : 'hsl(150, 100%, 56.27%)',
    pieTitleTextSize: '25px',
    pieTitleTextColor: isDarkMode ? 'hsl(28.57, 17.36%, 86.27%)' : 'black',
    pieSectionTextSize: '17px',
    pieSectionTextColor: isDarkMode ? '#ccc' : '#333',
    pieLegendTextSize: '17px',
    pieLegendTextColor: isDarkMode ? 'hsl(28.57, 17.36%, 86.27%)' : 'black',
    pieStrokeColor: 'black',
    pieStrokeWidth: '2px',
    pieOuterStrokeWidth: '2px',
    pieOuterStrokeColor: 'black',
    pieOpacity: '0.7',
    quadrant1Fill: isDarkMode ? '#1f2020' : '#ECECFF',
    quadrant2Fill: isDarkMode ? '#242525' : '#f1f1ff',
    quadrant3Fill: isDarkMode ? '#292a2a' : '#f6f6ff',
    quadrant4Fill: isDarkMode ? '#2e2f2f' : '#fbfbff',
    quadrant1TextFill: isDarkMode ? '#e0dfdf' : '#131300',
    quadrant2TextFill: isDarkMode ? '#dbdada' : '#0e0e00',
    quadrant3TextFill: isDarkMode ? '#d6d5d5' : '#090900',
    quadrant4TextFill: isDarkMode ? '#d1d0d0' : '#040400',
    quadrantPointFill: isDarkMode ? 'hsl(180, 1.59%, NaN%)' : 'hsl(240, 100%, NaN%)',
    quadrantPointTextFill: isDarkMode ? '#e0dfdf' : '#131300',
    quadrantXAxisTextFill: isDarkMode ? '#e0dfdf' : '#131300',
    quadrantYAxisTextFill: isDarkMode ? '#e0dfdf' : '#131300',
    quadrantInternalBorderStrokeFill: isDarkMode ? '#cccccc' : 'hsl(240, 60%, 86.27%)',
    quadrantExternalBorderStrokeFill: isDarkMode ? '#cccccc' : 'hsl(240, 60%, 86.27%)',
    quadrantTitleFill: isDarkMode ? '#e0dfdf' : '#131300',
    classText: isDarkMode ? '#e0dfdf' : '#131300',
    requirementBackground: isDarkMode ? '#1f2020' : '#ECECFF',
    requirementBorderColor: isDarkMode ? '#cccccc' : 'hsl(240, 60%, 86.27%)',
    requirementBorderSize: '1',
    requirementTextColor: isDarkMode ? '#e0dfdf' : '#131300',
    relationColor: isDarkMode ? 'lightgrey' : '#333333',
    relationLabelBackground: isDarkMode ? 'hsl(180, 1.59%, 28.35%)' : '#e8e8e8',
    relationLabelColor: isDarkMode ? 'lightgrey' : 'black',
    git0: isDarkMode ? 'hsl(180, 1.59%, 48.35%)' : 'hsl(240, 100%, 46.27%)',
    git1: isDarkMode ? 'hsl(321.64, 65.59%, 38.24%)' : 'hsl(60, 100%, 43.53%)',
    git2: isDarkMode ? 'hsl(194.4, 16.55%, 49.61%)' : 'hsl(80, 100%, 46.27%)',
    git3: isDarkMode ? 'hsl(23.08, 49.06%, 40.78%)' : 'hsl(210, 100%, 46.27%)',
    git4: isDarkMode ? 'hsl(0, 83.33%, 43.53%)' : 'hsl(180, 100%, 46.27%)',
    git5: isDarkMode ? 'hsl(289.17, 100%, 24.12%)' : 'hsl(150, 100%, 46.27%)',
    git6: isDarkMode ? 'hsl(35.13, 98.7%, 40.2%)' : 'hsl(300, 100%, 46.27%)',
    git7: isDarkMode ? 'hsl(106.15, 84.42%, 35.1%)' : 'hsl(0, 100%, 46.27%)',
    gitInv0: isDarkMode ? 'rgb(133.66, 129.74, 129.74)' : 'hsl(60, 100%, 3.73%)',
    gitInv1: isDarkMode ? 'rgb(93.55, 221.45, 139.68)' : 'rgb(0, 0, 160.5)',
    gitInv2: isDarkMode ? 'rgb(149.44, 117.61, 107.56)' : 'rgb(48.83, 0, 146.5)',
    gitInv3: isDarkMode ? 'rgb(99.98, 162.77, 202.02)' : 'rgb(146.5, 73.25, 0)',
    gitInv4: isDarkMode ? 'rgb(51.5, 236.5, 236.5)' : 'rgb(146.5, 0, 0)',
    gitInv5: isDarkMode ? 'rgb(154.21, 255, 132)' : 'rgb(146.5, 0, 73.25)',
    gitInv6: isDarkMode ? 'rgb(51.33, 135.19, 253.67)' : 'rgb(0, 146.5, 0)',
    gitInv7: isDarkMode ? 'rgb(206.18, 89.95, 241.05)' : 'rgb(0, 146.5, 146.5)',
    gitBranchLabel0: isDarkMode ? '#2c2c2c' : '#ffffff',
    gitBranchLabel1: isDarkMode ? 'lightgrey' : 'black',
    gitBranchLabel2: isDarkMode ? 'lightgrey' : 'black',
    gitBranchLabel3: isDarkMode ? '#2c2c2c' : '#ffffff',
    gitBranchLabel4: isDarkMode ? 'lightgrey' : 'black',
    gitBranchLabel5: isDarkMode ? 'lightgrey' : 'black',
    gitBranchLabel6: isDarkMode ? 'lightgrey' : 'black',
    gitBranchLabel7: isDarkMode ? 'lightgrey' : 'black',
    tagLabelColor: isDarkMode ? '#e0dfdf' : '#131300',
    tagLabelBackground: isDarkMode ? '#1f2020' : '#ECECFF',
    tagLabelBorder: isDarkMode ? '#cccccc' : 'hsl(240, 60%, 86.27%)',
    tagLabelFontSize: '10px',
    commitLabelColor: isDarkMode ? 'rgb(183.85, 181.56, 181.56)' : '#000021',
    commitLabelBackground: isDarkMode ? 'hsl(180, 1.59%, 28.35%)' : '#ffffde',
    commitLabelFontSize: '10px',
    attributeBackgroundColorOdd: isDarkMode ? 'hsl(0, 0%, 32%)' : '#ffffff',
    attributeBackgroundColorEven: isDarkMode ? 'hsl(0, 0%, 22%)' : '#f2f2f2'
  }
}

export default defineComponent({
  name: 'Mermaid',

  props: {
    /**
     * Mermaid id
     */
    id: { type: String, required: true },

    /**
     * Mermaid config
     *
     * Mermaid 配置
     */
    code: { type: String, required: true },

    /**
     * Mermaid title
     *
     * Mermaid 标题
     */
    title: { type: String, default: '' }
  },

  setup(props) {
    const mermaidElement = shallowRef<HTMLElement>()

    const code = computed(() => props.code)

    const svgCode = ref('')

    const renderMermaid = async (): Promise<void> => {
      mermaid.initialize({
        theme: 'base',
        themeVariables: {
          ...getThemeVariables(isDark.value)
        },
        flowchart: DEFAULT_CHART_OPTIONS,
        sequence: DEFAULT_CHART_OPTIONS,
        journey: DEFAULT_CHART_OPTIONS,
        gantt: DEFAULT_CHART_OPTIONS,
        er: DEFAULT_CHART_OPTIONS,
        pie: DEFAULT_CHART_OPTIONS,
        startOnLoad: false
      })

      svgCode.value = (await mermaid.render(props.id, code.value)).svg
    }

    const preview = (): void => {
      const { body } = document
      const div = document.createElement('div')

      div.classList.add('mermaid-preview')

      div.innerHTML = svgCode.value
      body.appendChild(div)

      div.addEventListener('click', () => {
        body.removeChild(div)
      })
    }

    const download = (): void => {
      const dataURI = `data:image/svg+xml;charset=utf8,${svgCode.value
        .replace(/<br>/g, '<br />')
        .replace(/%/g, '%25')
        .replace(/"/g, '%22')
        .replace(/'/g, '%27')
        .replace(/&/g, '%26')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')}`

      const a = document.createElement('a')

      a.setAttribute('href', dataURI)
      a.setAttribute('download', `${props.title || props.id}.svg`)
      a.click()
    }

    onMounted(() => {
      const html = document.documentElement

      const getDarkmodeStatus = (): boolean =>
        html.classList.contains('dark') || html.getAttribute('data-theme') === 'dark'

      // FIXME: Should correct handle dark selector
      isDark.value = getDarkmodeStatus()

      void renderMermaid()

      // watch darkmode change
      useMutationObserver(
        html,
        () => {
          isDark.value = getDarkmodeStatus()
        },
        {
          attributeFilter: ['class', 'data-theme'],
          attributes: true
        }
      )

      watch(isDark, () => renderMermaid())
    })

    return (): VNode[] => [
      h('div', { class: 'mermaid-contianer' }, [
        h('div', { class: 'mermaid-actions' }, [
          h('button', {
            class: 'preview-button',
            onClick: () => preview(),
            title: 'preview',
            innerHTML:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1316 1024" fill="currentColor"><path d="M658.286 0C415.89 0 0 297.106 0 512c0 214.82 415.89 512 658.286 512 242.322 0 658.285-294.839 658.285-512S900.608 0 658.286 0zm0 877.714c-161.573 0-512-221.769-512-365.714 0-144.018 350.427-365.714 512-365.714 161.572 0 512 217.16 512 365.714s-350.428 365.714-512 365.714z"/><path d="M658.286 292.571a219.429 219.429 0 1 0 0 438.858 219.429 219.429 0 0 0 0-438.858zm0 292.572a73.143 73.143 0 1 1 0-146.286 73.143 73.143 0 0 1 0 146.286z"/></svg>'
          }),
          h('button', {
            class: 'download-button',
            onClick: () => download(),
            title: 'download',
            innerHTML:
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor"><path d="M828.976 894.125H190.189c-70.55 0-127.754-57.185-127.754-127.753V606.674c0-17.634 14.31-31.933 31.933-31.933h63.889c17.634 0 31.932 14.299 31.932 31.933v95.822c0 35.282 28.596 63.877 63.877 63.877h511.033c35.281 0 63.877-28.595 63.877-63.877v-95.822c0-17.634 14.298-31.933 31.943-31.933h63.878c17.635 0 31.933 14.299 31.933 31.933v159.7c0 70.566-57.191 127.751-127.754 127.751zM249.939 267.51c12.921-12.92 33.885-12.92 46.807 0l148.97 148.972V94.893c0-17.634 14.302-31.947 31.934-31.947h63.876c17.638 0 31.946 14.313 31.946 31.947v321.589l148.97-148.972c12.922-12.92 33.876-12.92 46.797 0l46.814 46.818c12.922 12.922 12.922 33.874 0 46.807L552.261 624.93c-1.14 1.138-21.664 13.684-42.315 13.693-20.877.01-41.88-12.542-43.021-13.693L203.122 361.135c-12.923-12.934-12.923-33.885 0-46.807l46.817-46.818z"/></svg>'
          })
        ]),
        h(
          'div',
          {
            ref: mermaidElement,
            class: 'mermaid-wrapper'
          },
          svgCode.value
            ? // mermaid
              h('div', { class: 'mermaid-content', innerHTML: svgCode.value })
            : // loading
              h(LoadingIcon, { class: 'mermaid-loading', height: 96 })
        )
      ])
    ]
  }
})
