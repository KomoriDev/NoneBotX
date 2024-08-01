---
outline: [2, 3]
---

# 涩图 の 加工

在不同平台中，一条消息可能会有承载有各种不同的表现形式，它可能是一段纯文本、一张图片、一段语音、一篇富文本文章，也有可能是多种类型的组合等等。

所以，本章主要教会你构造形形色色的消息 <Curtain>你也不想你的涩图 Bot 没有图吧</Curtain>

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

## 玩转消息序列

### 构造消息

::: code-group

```python [NoneBot Native]
from nonebot.adapters.onebot.v11 import Message, MessageSegment

# Message
msg1 = Message("正在准备涩图...")
# MessageSegment
msg2 = Message(MessageSegment.text("正在准备涩图..."))
# List[MessageSegment]
msg2 = Message([MessageSegment.at("123"), MessageSegment.text("正在准备涩图...")])
```

```python [NoneBot Alconna]
from nonebot_plugin_alconna import At, UniMessage

msg1 = UniMessage("正在准备涩图...")
msg2 = UniMessage([At("user", "123"), "正在准备涩图..."])

# UniMessage 上同时存在便捷方法，令其可以链式地添加消息段：
msg = UniMessage.text("正在准备涩图...").at("124")
assert msg == UniMessage(["正在准备涩图...", At("user", "124")])
```

:::

### 拼接消息

`str`、`Message`、`MessageSegment` 对象之间可以直接相加，相加均会返回一个新的 `Message` 对象。

::: code-group

```python [NoneBot Native]
# 消息序列与消息段相加
Message([MessageSegment.text("text")]) + MessageSegment.text("text")
# 消息序列与字符串相加
Message([MessageSegment.text("text")]) + "text"
# 消息序列与消息序列相加
Message([MessageSegment.text("text")]) + Message([MessageSegment.text("text")])
# 字符串与消息序列相加
"text" + Message([MessageSegment.text("text")])
# 消息段与消息段相加
MessageSegment.text("text") + MessageSegment.text("text")
# 消息段与字符串相加
MessageSegment.text("text") + "text"
# 消息段与消息序列相加
MessageSegment.text("text") + Message([MessageSegment.text("text")])
# 字符串与消息段相加
"text" + MessageSegment.text("text")
```

```python [NoneBot Alconna]
# 消息序列与消息段相加
UniMessage("text") + Text("text")
# 消息序列与字符串相加
UniMessage([Text("text")]) + "text"
# 消息序列与消息序列相加
UniMessage("text") + UniMessage([Text("text")])
# 字符串与消息序列相加
"text" + UniMessage([Text("text")])
# 消息段与消息段相加
Text("text") + Text("text")
# 消息段与字符串相加
Text("text") + "text"
# 消息段与消息序列相加
Text("text") + UniMessage([Text("text")])
# 字符串与消息段相加
"text" + Text("text")
```

:::

### 消息模板

::: code-group

```python [NoneBot Native]
from nonebot.adapters.onebot.v11 import Message, MessageSegment

msg = Message.template("{} {}").format(MessageSegment.at(123), "这是你要的涩图")
assert msg == Message(MessageSegment.at(123), MessageSegment.text(" "), "这是你要的涩图")
```

```python [NoneBot Alconna]
# UniMessage.template 同样类似于 Message.template。
# 这里额外说明 UniMessage.template 的拓展控制符
from nonebot_plugin_alconna import At, Text, UniMessage

msg1 = UniMessage.template("{:At(user, target)} 这是你要的涩图").format(target="123")
assert msg1 == UniMessage([At("user", "123")], Text("这是你要的涩图"))
msg2 = UniMessage.template("{:At(type=user, target=id)} 这是你要的涩图").format(id="123")
assert msg1 == UniMessage([At("user", "123")], Text("这是你要的涩图"))
msg3 = UniMessage.template("{:At(type=user, target=123)} 这是你要的涩图").format()
assert msg1 == UniMessage([At("user", "123")], Text("这是你要的涩图"))
```

:::

### 检查消息段

我们可以通过 `in` 运算符或消息序列的 `has` 方法来：

::: code-group

```python [NoneBot Native]
# 是否存在消息段
MessageSegment.text("text") in message
# 是否存在指定类型的消息段
"text" in message
```

```python [NoneBot Alconna]
# 是否存在消息段
Text("text") in message
# 是否存在指定类型的消息段
Text in message
```

:::

我们还可以使用消息序列的 only 方法来检查消息中是否仅包含指定的消息段：

::: code-group

```python [NoneBot Native]
# 是否都为 "test"
message.only(MessageSegment.text("test"))
# 是否仅包含指定类型的消息段
message.only("text")
```

```python [NoneBot Alconna]
# 是否都为 "test"
message.only("test")
# 是否仅包含指定类型的消息段
message.only(Text)
```

:::

### 获取消息纯文本

::: code-group

```python [NoneBot Native]
from nonebot.adapters.onebot.v11 import Message, MessageSegment

# 判断消息段是否为纯文本
MessageSegment.text("text").is_text()
>>> True

# 提取消息纯文本字符串
Message(
  [
    MessageSegment.at(123)
    MessageSegment.text("纯文本消息")
  ]
).extract_plain_text()
>>> "纯文本消息"
```

```python [NoneBot Alconna]
# 提取消息纯文本字符串
UniMessage([At("user", "1234"), "纯文本消息"]).extract_plain_text()
>>> "纯文本消息"
```

:::
