<script setup lang="ts">
import { ref } from 'vue'
import contributingChat from '@/chatComponents/appendix/contributingChat.vue'

const volume = ref(100)
</script>

# NoneBotX 贡献指南

首先，感谢大家为 NoneBotX 贡献代码
本张旨在引导你更规范地向 NoneBotX 提交贡献，请务必认真阅读。

**我们欢迎一切贡献！并对每个愿意贡献的人表示衷心的感谢！💖**

## 提交 Issue

在提交 Issue 前，我们建议你先查看 [已有的 Issues](https://github.com/KomoriDev/NoneBotX/issues)，以防重复提交。

## Pull Request

NoneBotX 使用 pnpm 管理项目依赖，由于 pre-commit 也经其管理，所以在此一并说明。

下面的命令能在已安装 pnpm 的情况下帮你快速配置开发环境。

```bash
# 安装依赖
pnpm install
# 安装 pre-commit git hook
pre-commit install
```

### 使用 GitHub Codespaces（Dev Container）

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/KomoriDev/NoneBotX)

### 使用 GitPod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#/https://github.com/KomoriDev/NoneBotX)

### Commit 规范

请确保你的每一个 commit 都能清晰地描述其意图，一个 commit 尽量只有一个意图。

NoneBotX 的 commit message 格式遵循 [gitmoji](https://gitmoji.dev/) 规范，在创建 commit 时请牢记这一点。

### 工作流概述

`master` 分支为项目的开发分支，在任何情况下都请不要直接修改 `master` 分支，而是 fork 本仓库后，向本仓库的 master 分支发起 Pull Request。注意遵循先前提到的 commit message 规范创建 commit。我们将在 code review 通过后通过 squash merge 方式将您的贡献合并到主分支。

### 撰写文档

NoneBotX 社区文档使用 [vitepress](https://vitepress.dev/)，它有一些 [Markdown 特性](https://vitepress.dev/guide/markdown) 可能会帮助到你。

如果你需要在本地预览修改后的文档，可以使用 pnpm 安装文档依赖后启动 dev server，如下所示：

```bash
pnpm install
pnpm dev
```

NoneBotX 社区文档并没有具体的行文风格规范，但我们建议你尽量写得简单易懂。

以下是比较重要的编写与排版规范。目前 NoneBotX 文档中仍有部分文档不完全遵守此规范，如果在阅读时发现欢迎提交 PR。

1. 中文与英文、数字、半角符号之间需要有空格。例：`NoneBot 是跨平台 Python 异步聊天机器人框架`
2. 若非英文整句，使用全角标点符号。例：`现在你可以看到机器人回复你：“Hello, World !”。`
3. 直引号 `「」` 和弯引号 `“”` 都可接受，但同一份文件里应使用同种引号。
4. **不要使用斜体**，你不需要一种与粗体不同的强调。除此之外，你也可以考虑使用 vuepress 提供的[扩展](https://vitepress.dev/guide/markdown#custom-containers)或 [NoneBotX 的组件](#nonebotx-组件)。

以上由[社区创始人 richardchien 的中文排版规范](https://stdrc.cc/style-guides/chinese)补充修改得到。

如果你需要编辑器检查 Markdown 规范，可以在 VSCode 中安装 markdownlint 扩展。

## NoneBotX 组件

### 黑幕

#### 输入

```markdown
<Curtain>这是一个黑幕</Curtain>

::: tip
<Curtain>这是 TIP 下的黑幕</Curtain>
~~更多用法自行探索~~
:::
```

#### 输出

<Curtain>这是一个黑幕</Curtain>

::: tip
<Curtain>这是 TIP 下的黑幕</Curtain>
~~更多用法自行探索~~
:::

### 告示

::: tip
更多用法请见：[VitePress](https://vitepress.dev/guide/markdown#custom-containers)
:::

除了 vitepress 提供的之外，NoneBotX 还提供了额外的告示

#### 输入

```md
::: tsukkomi
This is a tsukkomi
:::
```

#### 输出

::: tsukkomi
This is a tsukkomi
:::

### 加载

#### 输入

```markdown
<p align="center" style="font-size: 25px"><strong>前面的区域，以后再来探索吧</strong></p>
<loading />
```

#### 输出

<p align="center" style="font-size: 25px"><strong>前面的区域，以后再来探索吧</strong></p>
<loading />

### 音量条

#### 作者：

#### 输入

```markdown
<script setup lang="ts">
const volume = ref(100)
</script>

<volume-bar v-model=volume>贴心的音量条：</volume-bar>
```

#### 输出

<volume-bar v-model=volume>贴心的音量条：</volume-bar>

### QQ 聊天框

#### 输入

```markdown
<q-window title="QQ 聊天">
  <q-text self name="Komorebi" avatar="/avatar/komorebi.webp">这是一条消息</q-text>
  <q-text name="NCBM" avatar="/avatar/ncbm.webp">这是一条消息</q-text>
  <q-text is-bot name="男娘" tag-content="小男娘" avatar="/avatar/nanniang.webp"
    >这是一位南梁</q-text
  >
  <q-image
    is-bot
    name="男娘"
    tag-content="小男娘"
    avatar="/avatar/nanniang.webp"
    src="/avatar/nanniang.webp"
  ></q-image>
  <q-reply
    is-bot
    name="男娘"
    tag-content="小男娘"
    avatar="/avatar/nanniang.webp"
    target="男娘"
    reply-text="test"
    reply-image-url="/avatar/nanniang.webp"
    reply-image-alt="男娘身材照"
  >
    这是男娘的照片
  </q-reply>
  <q-tip><a>男娘</a>撤回了一条消息</q-tip>
  <q-voice
    is-bot
    name="男娘"
    tag-content="小男娘"
    avatar="/avatar/nanniang.webp"
    src="http://music.163.com/song/media/outer/url?id=5221167.mp3"
    @click="cheated = true"
  ></q-voice>
  <q-tip v-if="cheated == true">你被骗了</q-tip>
  <q-text name="Komorebi" avatar="/avatar/komorebi.webp" onright>看看男娘</q-text>
  <q-forward
    is-bot
    name="男娘"
    title="男娘"
    tag-content="小男娘"
    avatar="/avatar/nanniang.webp"
    :contents="['小男娘：男娘身材照', '小男娘: [图片]', '小男娘: [图片]', '小男娘: [图片]']"
  />
  <q-file
    is-bot
    name="男娘"
    tag-content="小男娘"
    avatar="/avatar/nanniang.webp"
    file-name="secret.zip"
    file-size="6.33MB"
    file-icon-url="/images/guide/compressed_file.webp"
    href="https://www.bilibili.com/video/BV1GJ411x7h7"
  />
</q-window>
```

#### 输出

<contributing-chat :volume="volume" />
