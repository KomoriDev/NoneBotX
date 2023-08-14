# 消息链是什么链

:::danger
**本章不太全，等待补充**
:::

在之前的教程中，我们教会了大家怎么接收到各种类型的消息（如被禁言的时候），
但之前的教程并不能让我们**在群友要看涩图的时候发涩图**，而是**无论群友干什么都在索取涩图**。

在这本章，我们将会教大家如何**发涩图**。
首先来回顾一下，在[第一节](./hello_ero.md)中我们是通过什么办法来发送的消息

```python
await app.send_message(group, MessageChain(
    f"不要说{message.display}，来点涩图"
))
```

相信大家肯定会对其中的 `MessageChain`（即 **消息链**）很感兴趣，
这是什么？这个怎么用？怎么通过这个发送图片？那么本章就来讲讲 `MessageChain`。

## 什么是 MessageChain

首先要明确一点，QQ 消息并不只有纯文本，还可以包括如 At，图片等消息，
而消息链（MessageChain）正是为了适应 QQ 这种富文本消息所诞生的产物。

## 什么是消息元素

像是“@xxx”， “图片”， “App消息”，就是 MessageChain 的消息元素，
所有元素都可在 `graia.ariadne.message.element` 中找到，
以下是一些常见的消息元素：

```python
At(114514)  # @114514
AtAll()  # @全体成员
Poke(PokeMethods.ChuoYiChuo)  # 戳一戳方法
Image(path=...)  # 图片，这个我们后面的章节还会提及
Face(127)
```

## 怎么构建 MessageChain

我们先来康康 MessageChain 的三种构建办法：

```python
>>> MessageChain([Plain("你好")])
>>> MessageChain(Plain("你好"))
>>> MessageChain("你好")  # 仅限纯文本
```

这三种方法都是调用 `MessageChain` 的 `create` 方法进行构建：

1. 方法先用文本元素 `Plain` 来构建一个文本消息，并将文本消息装在一个 list 中
2. 方法是不传递列表，直接传入任意数量的元素进去
3. 就更直接了，直接传入纯字符串进行构建(该方法仅支持纯文本)

第一种方法是最基本的构建方法，也是 v4 唯一合法的构建方法。
而剩下两种则是 **Graia Ariadne** 新增的方法，以帮助用户能够更加简单的创建消息链。

:::tip
v4、v4p 等缩写词语的意思可以在[这里](/before/terms)找到。
:::

当然，实际上 `create` 方法并没有严格限定方法就必须是这三类中的一类，他们可以任意组合，
比如下面的骚操作：

```python
>>> MessageChain("你好", At(1919810), [Plain(", 你是不是喜欢"), At(114514)])
```

:::warning 注意一下
这只是举例，千万不要在你的业务代码中写出这么离谱的玩意儿
<br /><curtain>否则<more-info words="蓝玻璃块"><img alt="BlueGlassBlock is wathcing you" src="/images/guide/BGB_watching.webp" style="border-radius:6px"></more-info>大概率会提刀撒了你（撒日朗）</curtain>
:::

## 如何操作 MessageChain

说实话，就像 Python 的 str 一样， MessageChain 提供的方法有亿点点多。

这边推荐你去看一下这篇官方教程，~~这个社区文档作者就是逊啦，什么都不教的！~~

- [Ariadne 文档 消息链](https://graia.cn/ariadne/feature/msg-chain/)

这边提供一些简简单单的例子：

```python
# 消息中是否有 AtAll Element
>>> AtAll in message
True/False
# 有没有人 At 机器人
>>> At(app.account) in message
True/False
# 消息里是不是只有文字（这里有个坑）
>>> message.only(Plain)
True/False
# 获取消息链中所有的图片元素
>>> imgs = message[Image]
# 快速合并两个 MessageChain 元素
>>> msg1 = MessageChain("ApplePen") + MessageChain("PineapplePen")
>>> msg2 = MessageChain("ApplePenPineapplePen")
>>> msg1 == msg2
True
# 过滤一遍消息链让其只有 Plain 和 At
>>> new_msg1 = message.include(At, Plain)
# 把 At 机器人的元素变成 "[bot]"
>>> new_msg2 = message.replace(At(app.account), Plain("[bot]"))
```

## 怎么把 MessageChain 变成其他形式

虽然 `MessageChain` 这种格式极大程度的方便了使用者进行操作，
但是很明显，在某些情况下，这玩意儿还是没有普通的字符串好使（比如格式化输出的时候）。

因此还是有将 `MessageChain` 转换为普通 `str` 的方法的。

### `display` 方法

这个应该是最简单，也是你最容易理解的办法，还记得最开始例子中的消息日志吗？

```sh
2021-12-03 10:49:45.350 | INFO     | graia.ariadne.model:log_friend_message:114 - 1919810: [GraiaX(114514)] -> '你好'
2021-12-03 10:49:45.478 | INFO     | graia.ariadne.app:sendFriendMessage:114 - [BOT 1919810] Friend(114514) <- '不要说你好，来点涩图'
```

事实上，消息日志所显示的就是 `display` 方法的返回值。
这种办法返回的字符串比较容易让人看得舒服，
不过很多消息链所承载的消息都会被消除（如图片消息直接变成"[图片]"）。
:::tip
事实上，`message.display` 跟 `str(message)` 是一样的。  
至于要选哪一个呢？ <curtain>到底要选哪个呢</curtain>

<chat-window title="Graia Framework Community">
  <chat-msg name="群菜狗" avatar="http://q1.qlogo.cn/g?b=qq&nk=731347477&s=640">
    <chat-window title="Graia Framework Community">
      <chat-msg name="GraiaX">现在是推荐 message.display 还是 str(message) 啊</chat-msg>
      <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">看你 xp</chat-msg>
    </chat-window>
  </chat-msg>
  <chat-msg name="群菜狗" avatar="http://q1.qlogo.cn/g?b=qq&nk=731347477&s=640">草哈哈哈哈</chat-msg>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">
    <chat-quote name="群菜狗">草哈哈哈哈</chat-quote>改了
  </chat-msg>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">现在是推 str(msg_chain)</chat-msg>
  <chat-msg name="GraiaX">传下去，群菜块要一统XP<curtain>什么秦始皇</curtain></chat-msg>
</chat-window>

:::

### `as_persistent_string()` 方法

首先，先给各位上一个英语课

**persistent** adj. 持久的

所以，顾名思义，这个方法就是用于**持久化保存**消息链的，
这种办法可以将消息链所承载的**所有信息**变成字符串的形式，
比如下面这样：

```python
>>> message = MessageChain("你好", At(114514, display="先辈"))
>>> message.display
'你好@先辈'
>>> message.as_persistent_string()
'你好[mirai:At:{"target":114514,"display":"\\u5148\\u8f88"}]'
```

虽然说这样储存了所有的消息，但是可读性大大降低了，所以该方法一般用于长时间保存消息链，但是要注意以下问题：

:::warning
当你使用该方法保存图片等多媒体元素（`MultimediaElement`）时候会存在两种情况：

1. 消息链中不包含图片的二进制信息，如通过`Image(url="http://example.com/1.jpg")`生成的 Image 元素
2. 消息链中包含图片的二进制信息（Base64 编码），如通过`Image(data_bytes=b"xxx")`生成的 Image 元素

第一种情况中的链接会在一段时间后就失效（别问我为什么，你问腾讯），  
不过默认情况下 `as_persistent_string()` 会帮我们下载二进制信息，因此不用过分担心：

```python
>>> message = MessageChain(Image(url="https://example.com/1.jpg"))
>>> message.as_persistent_string()
[mirai:Image:{"url":"https://example.com/1.jpg","base64":"xxxxxx=="}]
```

如上所示，将消息链转为可持久化字符串时图片会自动下载（音频同理）。
:::

:::interlink
<https://graia.cn/ariadne/feature/msg-chain/>  
:::
