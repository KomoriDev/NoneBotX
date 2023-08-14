# 看完了吗，我撤回了

通过之前的章节，想必大家都已经懂了怎么合理的发送~~涩图~~消息了。

然后当你哪一天闲的没事干（~~没事瞎折腾~~）翻历史记录的时候，
就会发现群里的历史图片，除了群友的弔图，就只剩下机器人发的涩图了（bushi）。
你很清楚，在这种情况下，明眼人一眼就能看出来 bot 的身份了！

牙白 desu 捏，必须给想个法子！

## 撤回消息

为了确保**涩图**能够传承下去，我们需要懂得撤回涩图。  
那涩图怎么撤回呢？怎么才能知道你要撤回的是哪一条消息呢？

第一个问题其实挺好解决的，假设你真的会无聊翻阅 `Ariadne` 的 `docstring` 的话，你应该很快就会知道撤回的方法：

```python
app.recall_message()  # 实际使用时请不要忘记 await
```

但问题是，该怎么样才能他知道，你要撤回的消息是什么呢？

### Source —— 消息的识别 ID

在讲这些之前，先给大家扯点别的，
假设（是的，又是假设）你还记得[消息链是什么链](./message_chain.md#如何操作-messagechain)中曾经介绍过的`MessageChain.only`方法吗？

如果你还记得，就会发现很诡异的事情：

```python
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def test(app: Ariadne, message: MessageChain):
    print(message.only(Plain))
```

```sh
2022-01-14 00:42:38.651 | INFO     | graia.ariadne.model:log_group_message:106 - 114514: [GraiaCommunity(1919810)] GraiaX(10086) -> '测试'
False
```

`False`?! 明明只有测试两个字，但为什么却显示了 False？
会不会是 only 方法的问题呢？

让我们单独测试一下：

```python
>>> msg = MessageChain("测试")
>>> msg.only(Plain)
True
```

咦？看起来并不是 only 的问题哦，那是什么问题呢？

这时我们就要仔细地看一下我们接收到的 MessageChain 了：

```python
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def test(app: Ariadne, message: MessageChain):
    print(message.__repr__())
```

```python
# 输出结果如下
MessageChain([Source(id=1366023, time=datetime.datetime(2022, 1, 13, 16, 42, 38, tzinfo=datetime.timezone.utc)), Plain(text='测试')])
```

你会惊奇地发现，你接收到的消息中，除了代表着文本的 Plain，在最前面还有一个 Source！

并且不只是纯文本，所有收到的消息的最开始，都会有一个 `Source` 元素！
这就是每一条消息独立的消息 ID（每个群、每个私聊会话中的消息 ID 都是独立的）。

而发送消息时使用的 `app.send_message()`、`app.send_group_message()` 和 `app.send_friend_message()`，
他们的返回值类型为 `BotMessage`，这也是 `app.recall_message()` 方法所需的参数！

有了消息 ID，我们就可以通过 `app.recall_message()` 方法撤回消息了：

```python
await app.recall_message(source)  # 通过 Source 撤回消息
# await app.recall_message(source.id, target=target_id)  # （已废弃）通过 Source 中的消息 ID 及好友 QQ 号/群号撤回消息
# active_message = await app.send_message(...)
await app.recall_message(active_message)  # 通过 ActiveMessage 撤回 bot 自己发的消息
```

:::tip
这里介绍一个获取消息 ID 相对简单的方法

```python
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def test(app: Ariadne, message: MessageChain, source: Source):
    if message.display == "撤回测试":
        await app.recall_message(source)
```

:::

## 异步延迟

### 情景导入

通过以上理论，你分分钟写出了一个带撤回功能的涩图机器人，比如这样：

```python
import aiohttp

@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchContent("涩图来")],
    )
)
async def test(app: Ariadne, message: MessageChain):
    async with Ariadne.service.client_session as session:
        async with session.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg") as r:
            data = await r.read()
    b_msg = await app.send_group_message(group, MessageChain(Image(data_bytes=data)))
    time.sleep(120)
    await app.recall_message(b_msg)
```

这确实成功了，可是当你满怀激动的将你的 bot 给群友用了之后，却是这样的局面：

<chat-window title="Graia Framework Community">
  <chat-toast>下午 3:38</chat-toast>
  <chat-msg name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">涩图来</chat-msg>
  <chat-img name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp" src="/images/guide/ero_pic_1.webp"></chat-img>
  <chat-msg name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640">涩图来</chat-msg>
  <chat-msg name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640">？我涩图呢</chat-msg>
  <chat-msg name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640"><a>@GraiaX</a> 我涩图呢</chat-msg>
  <chat-msg name="GraiaX" onright>涩图来</chat-msg>
  <chat-msg name="GraiaX" onright>az?</chat-msg>
  <chat-toast>下午 3:40</chat-toast>
  <chat-img name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp" src="/images/guide/ero_pic_2.webp"></chat-img>
  <chat-toast>下午 3:42</chat-toast>
  <chat-img name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp" src="/images/guide/ero_pic_3.webp"></chat-img>
</chat-window>

你可以猜一下是什么原因吗？

### 关于异步

还记得我们在[来点网上的涩图](./image_from_internet.html#为啥要用-aiohttp)讲过，我们为什么要使用异步吗？

```python{14}
import aiohttp

@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchContent("涩图来")],
    )
)
async def test(app: Ariadne, message: MessageChain):
    async with Ariadne.service.client_session as session:
        async with session.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg") as r:
            data = await r.read()
    b_msg = await app.send_group_message(group, MessageChain(Image(data_bytes=data)))
    time.sleep(120)
    await app.recall_message(b_msg)
```

`time.sleep()` 方法是一种同步办法，即在 sleep 的这段时间里面**整个程序都会停止不动**！  
牙白 desu 捏，那怎么办呢？

很简单，实际上，Python 的异步标准库 `asyncio` 已经帮你想好这个问题了。
他提供了异步用的休眠函数 `asyncio.sleep()`，你只需要做一下小小的替换就好了：

```python{14}
import aiohttp

@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchContent("涩图来")],
    )
)
async def test(app: Ariadne, message: MessageChain):
    async with Ariadne.service.client_session as session:
        async with session.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg") as r:
            data = await r.read()
    b_msg = await app.send_group_message(group, MessageChain(Image(data_bytes=data)))
    await asyncio.sleep(120)
    await app.recall_message(b_msg)
```

:::interlink EroEroBot
本章完整示例可在 [EroEroBot/modules/recall_message.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/modules/recall_message.py) 找到。
:::
