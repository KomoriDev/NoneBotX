# NoneBotX 贡献指南

首先，感谢大家为 NoneBotX 贡献代码  
本张旨在引导你更规范地向 NoneBotX 提交贡献，请务必认真阅读。

**我们欢迎一切贡献！并对每个愿意贡献的人表示衷心的感谢！💖**
> 如果你喜欢这个项目，可以为本项目点亮⭐️，这是对我们最大的鼓励。

## 新贡献者指南

要了解项目概况，请阅读 [README](README.md)。以下是一些帮助你开始第一次开源贡献的资源：

- [如何为开源做贡献](https://opensource.guide/zh-hans/how-to-contribute/)
- [寻找在 GitHub 上贡献开源的方法](https://docs.github.com/zh/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)
- [设置 Git](https://docs.github.com/zh/get-started/quickstart/set-up-git)
- [GitHub 流](https://docs.github.com/zh/get-started/quickstart/github-flow)
- [协作处理拉取请求](https://docs.github.com/zh/pull-requests/collaborating-with-pull-requests)

## 撰写/修正文档
如果你在文档中发现了错误，欢迎随时提出问题或发起 Pull Request（PR）。

一旦你提交了 PR，GitHub 会自动构建网站并将临时预览部署到 Netlify 上。

## 风格

文档并没有具体的行文风格规范，但我们建议你尽量写得简单易懂。

以下是比较重要的编写与排版规范。目前 NoneBotX 文档中可能仍有部分章节不完全遵守此规范，如果在阅读时发现欢迎提交 PR。

1. 中文与英文、数字、半角符号之间需要有空格。例：`NoneBotX 是 NoneBot 的社区文档，由社区贡献！`
2. 若非英文整句，使用全角标点符号。例：`现在你可以看到机器人回复你：“Hello, World !”。`
3. 直引号 `「」` 和弯引号 `“”` 都可接受，但同一份文件里应使用同种引号。
4. **不要使用斜体**，你不需要一种与粗体不同的强调。除此之外，你也可以考虑使用 vitepress 提供的[扩展](https://vitepress.dev/guide/markdown)。
5. 文档中应以 “我们” 指代机器人开发者，以 “用户” 指代机器人的使用者，以 “开发者” 指代机器人的插件开发者。

以上由[社区创始人 richardchien 的中文排版规范](https://stdrc.cc/style-guides/chinese)补充修改得到。

如果你需要编辑器检查 Markdown 规范，可以在 VSCode 中安装 markdownlint 扩展。

### Commit 规范

请确保你的每一个 commit 都能清晰地描述其意图，一个 commit 尽量只有一个意图。

NoneBotX 的 commit message 格式遵循 [gitmoji](https://gitmoji.dev/) 规范，在创建 commit 时请牢记这一点。

## 代码空间

### 使用 GitHub Codespaces（Dev Container）

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/KomoriDev/NoneBotX)

### 使用 GitPod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#/https://github.com/KomoriDev/NoneBotX)

## 本地开发

通过以下命令安装依赖项

```shell
pnpm install
```

下面的命令启动一个本地开发服务器并打开一个浏览器窗口。大多数更改会实时反映在无需重新启动服务器的情况下。

```shell
pnpm run
```

此命令会生成静态内容，可以使用任何静态内容托管服务进行提供。

```shell
pnpm build
```

## 持续集成（CI）

在提交 PR 后，GitHub 将构建网站，然后将结果发送到 Netlify 进行预览。成功构建后，URL 将添加到 PR 的评论中。

在将代码推送到主分支时，将触发构建，然后将生成的文件发送到 Netlify 以发布到生产环境。

