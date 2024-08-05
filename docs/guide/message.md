---
outline: [2, 3]
---

# 涩图 の 加工

在不同平台中，一条消息可能会有承载有各种不同的表现形式，它可能是一段纯文本、一张图片、一段语音、一篇富文本文章，也有可能是多种类型的组合等等。

所以，本章主要教会你构造形形<ruby>~~色色~~<rp>(</rp><rt>不可以色色</rt><rp>)</rp></ruby>的消息 <Curtain>你也不想你的涩图 Bot 没有图吧</Curtain>

## 回顾

在之前的教程中，我们教会了如何获得用户信息。在本章中，我们教会你如何发送构造消息，那么，先来看看上一章是如何发送消息的

::: code-group

```py [NoneBot Native]
await matcher.finish(MessageSegment.image("xxx.jpg"))
```

```py [NoneBot Alconna]
await UniMessage.image("xxx.jpg").finish()
```

:::

相信大家肯定会对其中的 `MessageSegment` 很感兴趣， 这是什么？这个怎么用？怎么通过这个发送图片？那么本章就来讲讲 `MessageSegment`

## 认识消息类型

### 消息序列 `Message`

在 NoneBot 中，消息序列 `Message` 的主要作用是用于表达“一串消息”。由于消息序列继承自 `List[MessageSegment]`，所以 `Message` 的本质是由若干消息段所组成的序列。因此，消息序列的使用方法与 List 有很多相似之处，例如切片、索引、拼接等。

---

### 消息段 `MessageSegment`

~~顾名思义，<ruby>消息段<rp>(</rp><rt>MessageSegment</rt><rp>)</rp></ruby>是一段消息。~~ 但是由于绝大多数的平台都有着独特的消息类型，因此这些独特的内容往往需要由对应的**协议适配器**所提供

看到这里，你可能会有疑问：**为什么消息段需要由协议适配器提供？**

这是因为，不同平台中的消息类型有着不同的表现形式，例如：

- QQ 群中的消息段可能由 `MessageSegment.at`、`MessageSegment.image`、`MessageSegment.text` 等等组成
- Telegram 中的消息段可能由 `MessageSegment.location`、`MessageSegment.venue`、`MessageSegment.poll` 等等组成

<Mark>这也意味着，你需要导入对应的协议适配器中的消息序列和消息段后才能使用其特殊的工厂方法。</Mark>

你也觉得很麻烦对吧，没关系，我们有 Alconna

## 如果你要发涩图，就不能只发涩图

一张好的涩图，不仅仅是一张图，它还需要有文字描述，那么，我们如何构造这样的消息呢？

### 直接构造

::: code-group

```py [NoneBot Native]
from nonebot import on_command
from nonebot.adapter.onebot.v11 import Message, MessageSegment

matcher = on_command("来张涩图")

@matcher.handle()
async def _():
    message = Message([
        "你要的涩图",
        MessageSegment.image("https://xxx.chat/logo.png"),
        "标签: ？；画师：？"
    ])
    await matcher.finish(message)
```

```py [NoneBot Alconna]
from nonebot_plugin_alconna import Command
from nonebot_plugin_alconna.uniseg import Image, UniMessage

matcher = Command("来张涩图").build(use_cmd_start=True)

@matcher.handle()
async def _():
    message = UniMessage([
        "你要的涩图",
        Image(url="https://xxx.chat/logo.png"),
        "标签: ？；画师：？"
    ])
    await UniMessage(message).finish()

    # 或者使用 链式 发送
    await (
        UniMessage.text("你要的涩图")
        .image("https://xxx.chat/logo.png")
        .text("标签: ？；画师：？")
        .finish()
    )
```

:::

### 使用消息模板

::: code-group

```py [NoneBot Native]
from nonebot import on_command
from nonebot.adapter.onebot.v11 import Message, MessageSegment

matcher = on_command("来张涩图")

@matcher.handle()
async def _():

    message = Message.template("你要的涩图 {} 标签: {}；画师：{}").format(
        MessageSegment.image("https://xxx.chat/logo.png"),
        "?", "?"
    )
    await matcher.finish(message)

```

```py [NoneBot Alconna]
from nonbot_plugin_alconna import Command
from nonebot_plugin_alconna.uniseg import Image, UniMessage

matcher = Command("来张涩图").build(use_cmd_start=True)

@matcher.handle()
async def _():
    message = UniMessage.template("你要的涩图 {} 标签: {}；画师: {}").format(
        Image(url="https://xxx.chat/logo.png"),
        "?", "?"
    )
    await UniMessage(message).finish()

    # 或者使用 链式 发送
    await (
        UniMessage.text("你要的涩图")
        .image("https://xxx.chat/logo.png")
        .text("标签: ？；画师：？")
        .finish()
    )
```

:::

这样，当用户输入 `/来张涩图` ， Bot 便会发送一张 ~~精美的~~ 涩图以及关于它的详细信息

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>/来张涩图</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" tagType="bot" avatar="/avatar/hibiscus.webp">
    你要的涩图
    <img src="https://koishi.chat/logo.png" style="margin: 10px" alt="涩图.png"/>
    标签: Koishi；画师：<Curtain>某不知名内鬼</Curtain>
  </chat-msg>
  <chat-msg name="ddl" avatar="/avatar/ddl.webp" tag="群主" tagType="owner" tagBgColor="#48301e" tagColor="#f98a3f">？</chat-msg>
  <!-- <chat-toast>ddl 已将 Komorebi 移出群聊</chat-toast> -->
</chat-window>
