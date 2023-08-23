# 开始之前你需要知道的一些事

## 1. 什么是 NoneBot2？

NoneBot2 是一个现代、跨平台、可扩展的 Python 聊天机器人框架，它基于 Python 的类型注解和异步特性，能够为你的需求实现提供便捷灵活的支持。

## 2. NoneBot1 与 NoneBot2 的区别

NoneBot2 是一个现代、跨平台、可扩展的 Python 聊天机器人框架，而 NoneBot1 专注于 onebot 协议。NoneBot2 不是 NoneBot1 的替代品。事实上，它们都在被积极的维护着。但是，如果你想尝试一些新功能，或者想要支持更多的平台，可以考虑使用 NoneBot2。为方便赘述，本文所说的 NoneBot 都指 `NoneBot2`

> ~~NoneBot2 和 NoneBot1 的区别，就像是 VisualStudio Code 和 VisualStudio 一样~~

<div class="tip custom-block" style="padding-top: 8px">

只是想尝试一下吗？跳至 [快速入门].

</div>

## 3. 我应该先看官方文档还是社区文档？

<p align="center" style="font-size: 30px"><strong>前面的区域，以后再来探索吧</strong></p>

<loading />

:::warning

- 当你遇到不懂且文档没有给出解释的技术名词时，请尝试结合例子来自行理解。
- 本文档也不会介绍 NoneBot 的所有用法

:::

当然，你也可以直接阅读本文档，遇到不清楚的内容再查阅官方文档，阅读时请善用搜索功能。

## 4. 关于 Go-CQHTTP

请容许我先介绍一下：

- [Mirai]，Mirai，是一个高性能，高可扩展性的 QQ 协议库
- [Go-CQHTTP]，基于 Mirai 以及 MiraiGo 的 OneBot Golang 原生实现

简单来说，`NoneBot2` 是通过 `go-cqhttp` 间接连接到 QQ 服务器的。

<loading />

## 5. 关于风控

在使用机器人的时候，你可能会遇到这些问题：

- 明明显示消息发送成功了，但是群友们 / 朋友没有接收到机器人发送的消息
- 在登录的时候， **go-cqhttp** 报错，报错内容涉及“code 45”等
- ……

以上发生的这类事件，我们一般称之为<ruby>风控 <rp>(</rp><rt style="font-size:0.75em">~~喜 报~~</rt><rp>)</rp></ruby>

被风控一般有如下原因：

- 你机器人所管理的账号被多人举报了
- 你发的涩图实在是太涩了
- 你机器人发送消息过于不像人(如高频率消息等)
- 你机器人发送的内容跟传销一样
- ……

风控一直都是 QQ 机器人开发者们十分头疼的问题  
不管是刚开始的新手还是老手，风控面前人人平等  
所以，当你遇到这个问题的时候，无能狂怒并不能帮你解决这个问题  
你需要做的，只有积极配合，耐心地等待，或者换一个号（虽然刚注册的账号更容易封禁）

::: tip
当你遇到什么 bug 的时候，最好搞清楚是哪里的 bug  
再向那边的仓库提交 issue <curtain>腾讯的 bug 例外，因为你压根没地方提交 issue</curtain>
:::

## 6. Python 包管理器的选择

<loading />

:::danger ~~异端~~
是的，不推荐直接使用 pip（希望你不会因此炸掉系统环境和其他项目），  
也不推荐自己直接用 virtualenv 或 venv。
:::

## 当你遇到问题的时候

鉴于 QQBot 社区的特殊性，我们建议你遵循以下步骤：

1. 查看 [官方文档]
2. 如果你发现官方文档没有提及……
   1. 如果模块名以 `nonebot` 开头，立刻到 [交流群] 里问
   2. 否则，去翻对应的文档（或者 `Stack Overflow` 之类的地方，同时善用搜索引擎 <curtain>不过请远离 CSDN</curtain>）

:::warning

1. **请学会使用搜索引擎**
2. 当你在群聊中提出问题的时候，请附上**完整的报错**跟**报错部分的代码**。
   要不然你只会收获我们的问号。<curtain>什么闭眼开车</curtain>

> 请注意, 开发者并没有义务回复您的问题，您应该具备基本的提问技巧。
> 有关如何提问，请阅读[《提问的智慧》]

:::

<div id="baidu"></div>

![baidu]

[快速入门]: ../guide/create_env.md
[Mirai]: https://github.com/mamoe/mirai
[Go-CQHTTP]: https://github.com/Mrs4s/go-cqhttp
[官方文档]: https://nonebot.dev
[交流群]: https://jq.qq.com/?_wv=1027&k=5OFifDh
[《提问的智慧》]: https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md
[baidu]: /images/before/baidu.webp
