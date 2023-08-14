# 谁在找我

:::warning
以下使用场景，只能在 **Graia Saya** 模块中才有所体现
:::

我们来仔细对比一下 **Graia Saya** 与 `BCC` 中对于 listener 的用法

```python
# BCC
@bcc.receiver(GroupMessage)
# saya
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
```

你会发现，`channel.use` 传入的事件是一个 `List[Events]`，
而不像 `bcc.receiver` 一样，是一个 `Events`。

事实上，`BCC` 的广播确实是支持多类型的<curtain>虽然 bcc.receiver 不行</curtain>

:::tip
以下例子全部都只能在 `saya` 中使用。
假设你用的是 `bcc.receiver`，还是跳过这一章节吧。
:::

## 举个例子

```python
from typing import Union


@channel.use(ListenerSchema(listening_events=[GroupMessage, NudgeEvent]))
async def hello(app: Ariadne, group: Group, member: Member, event: Union[GroupMessage, NudgeEvent]):
    if isinstance(event, NudgeEvent) or At(app.account) in event.message:
        await app.send_message(group, MessageChain("找我干肾么"))
```

当然，以上还只是最简答的例子。更多的例子是同时包含 `FriendMessage` 和 `GroupMessage` 这种情况，不是吗？
但是问题来了， `GroupMessage` 的情况下，你能获取 Group 和 Member 这两个类，
而在 `FriendMessage` 的情况下，你只能获取到 Friend 这个类。

```python
@channel.use(ListenerSchema(listening_events=[GroupMessage, FriendMessage]))
async def test(app: Ariadne, group: Group, friend: Friend, message: MessageChain):
    ...
```

如果你这样做，不管是接收 `GroupMessage` 还是 `FriendMessage`，你都会因为无法成功解析其中一个 `type hint` 而产生报错

但是，既然都用了 Ariadne 了，你肯定不想跟个傻子一样，通过**获取事件本身**来获取你所需要的参数，不是吗？那么就有了下面这些例子。

::::code-group
:::code-group-item Python3.8 ~ Python3.9

```python
from typing import Union

@channel.use(ListenerSchema(listening_events=[GroupMessage, FriendMessage]))
async def hello(app: Ariadne, sender: Union[Group, Friend], message: MessageChain):
    if str(message) == "你好":
        await app.send_message(sender, MessageChain("你好，怎么了？"))
```

:::
:::code-group-item python3.10+

```python
@channel.use(ListenerSchema(listening_events=[GroupMessage, FriendMessage]))
async def hello(app: Ariadne, sender: Group | Friend, message: MessageChain):
    if str(message) == "你好":
        await app.send_message(sender, MessageChain("你好，怎么了？"))
```

:::
::::

现在，Ariadne 已经支持了如下的 `type hint`

- typing.Union (在 `Python 3.10+` 中，`Union[a, b]` 与 `a | b` 等价)
- typing.Optional （与 `Union[a, None]` `a | None` 等价）
- typing.Annotated （`Python3.9` 新功能）

<loading />
