<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'

import NotFound from './custom404.vue'

const randomMsg = [
  '涩图机器人文档真的没有涩图',
  '瞎了？试试深色模式',
  '阿祖，别刷新了，阿妈叫你洗碗了',
  '都几点了，还在看，赶快睡觉',
  '据不完全统计，社区有半数以上的人玩原',
  'sdıʇ ǝsɹǝʌǝɹ ɐ sı sıɥʇ',
  '建议每天撸码先来一句 pdm/poetry update，享受最新 bug',
  '你是过来看文档的还是看 TIPS 的',
  'Loading 是停不下来的',
  '切记，撸码要适度',
  '请大声喊出我的名字吧！',
  '撸码与 duang 不可兼得',
  '不要停下来啊（指写文档）',
  '可能抄到最后你会发现，大家的机器人重合度高的离谱',
  'ariadne 跟 sagiri-bot 的关系，有点像是 59 跟 59改',
  '塔塔开，一自摸塔塔开',
  '如果文档看不懂，那么你没有看懂文档',
  '要来试一试下一代的新玩具 Avilla 吗',
  '你这 bot 是金子做的还是服务器是金子做的',
  'fut.set_result("KEEP_ALIVE")',
  '欢迎来到 NoneBotX！这里是治疗低血压的最好的地方',
  '年轻的开发者哟，你掉的是这个 VSCode 还是 PyCharm 呢',
  '因为社区都去写自己的 bot 了，所以文档咕了',
  '因为社区都去玩原了，所以文档咕了',
  '因为社区都去 nonememe 看热闹了，所以文档咕了',
  '因为社区都想咕咕咕，所以文档咕了',
  'Literal[2122222222111221212111111111112]',
  'ModuleNotFoundError: No module named \'NoneBotX\'', // prettier-ignore
  '看看你的 type checker',
  '什么超级魔法',
  'async def f(): time.sleep(10)',
  '不要以为加个 async 就是异步了',
  '你让 rf 给 Alconna 加个 feature 不就行了',
  '好康，是新魔法哦',
  '[其他消息]',
  '基操勿6',
  '不是 excel？？不是 excel？？',
  '新人欢迎我们',
  '泻药，阿巴阿巴阿巴',
  'A60曾经说过，有人对着ABot发情',
  '谁有时间读你们这破文档啊',
  '轰击策略警告.jpg',
  'poetry? 打得过 pdm 吗',
  '是 FuzzyDispatcher 而不是 FurryDispatcher！',
  'from typing_extensions import Annotated',
  '没看到的话马上把你们扬了',
  '你们怎么天天造轮子',
  'NEXT UI!',
  '这是两只仓鼠吗，尾巴好长',
  '事物发展的道路是曲折的。新事物的发展总要经历一个由小到大，由不完善到比较完善的过程。新事物不可避免地存在着弱点和不完善的地方，人们对新事物的认识也有一个过程。旧事物在开始时往往比较强大，总是顽强抵抗和极力扼杀新事物。新事物不可能一蹴而就，必然经历曲折的过程。多体谅一点 Block',
  '两个 K* 人在N* 群交换 G* 群号'
]
const random = ref('')

onMounted(() => {
  random.value = randomMsg[Math.floor(Math.random() * randomMsg.length)]
})

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <div class="doc-after">
        <div class="tips">
          <strong>Tip: </strong>
          <span>{{ random }}</span>
        </div>
        <div class="ccbyncsa">
          本文档使用
          <a href="https://opensource.org/license/mit/" target="_blank"> MIT License </a>
          协议进行共享，详情见
          <a href="https://github.com/KomoriDev/NoneBotX" target="_blank">README</a>。
        </div>
      </div>
    </template>
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
.doc-after {
  margin-top: 50px;
  text-align: center;

  .ccbyncsa,
  .tips {
    color: var(--vp-c-text-2);
    font-size: 0.85rem;

    a {
      color: var(--vp-c-brand);

      &:hover {
        color: var(--vp-c-brand-dark);
      }
    }
  }
}
</style>
