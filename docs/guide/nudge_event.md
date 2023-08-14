# 不要再戳了~

在看了前两章后，你应该已经得到了一个**每发送一次"你好"就会嚷嚷要涩图的机器人**。

不过，这样还是有点太诡异了<curtain>不是吗？</curtain>。
事实上，QQ 除了群消息外还有其他类型的事件，如戳一戳、消息撤回等等等等……

下面教大家如何使用戳一戳事件（`NudgeEvent`）

::::warning
此处的“戳一戳”所指的是手机 QQ 客户端中**双击头像**的功能，而不是私聊发送戳一戳表情（对应 PC 的**窗口抖动**）

接收 NudgeEvent 需要 Mirai 使用如下 3 种登陆协议中的一种：

- ANDROID_PHONE
- IPAD
- MACOS

即使你不需要“戳一戳”这个功能，我们也**十分建议**你使用以上三种登陆协议。
因为他们是现阶段支持功能最多的协议。

由于腾讯经常抽风，不知道什么时候就登不上或者发不出消息，你可以看看[这里](/before/install_mirai.md#mirai-出现问题-报错-怎么办)
::::

以下是一段示例代码：（注释为与群消息事件的对比）

:::danger 警告
为了防止部分读者日常叛逆，再次说明，从章开始，如无特殊说明，所有示例代码均使用 Saya 的方式编写。  
使用 Saya 进行模块加载后，不可以将所有代码全部堆在同一个文件里！！！
:::

```python
# 本部分示例需使用 Saya 进行加载
from graia.ariadne.app import Ariadne
from graia.ariadne.event.mirai import NudgeEvent
from graia.ariadne.message.chain import MessageChain
from graia.ariadne.model import Friend, Group
from graia.saya import Channel
from graia.saya.builtins.broadcast import ListenerSchema

channel = Channel.current()


# 此处注释的意思是用法类比，不是说这里可以用 GroupMessage
# @channel.use(ListenerSchema(listening_events=[GroupMessage]))
@channel.use(ListenerSchema(listening_events=[NudgeEvent]))
async def getup(app: Ariadne, event: NudgeEvent):
    if isinstance(event.subject, Group) and event.supplicant is not None:
        await app.send_group_message(event.supplicant, MessageChain("你不要光天化日之下在这里戳我啊"))
    elif isinstance(event.subject, Friend) and event.supplicant is not None:
        await app.send_friend_message(event.supplicant, MessageChain("别戳我，好痒！"))
```

:::tip

1. 对于 **NudgeEvent** 应使用 `event: NudgeEvent` 获取事件实例来获得相关信息
2. 此处之所以使用独立判断 `event.subject` 的类型，是避免对陌生人的戳一戳进行回应而导致封号

:::

此时运行机器人，然后在群里戳一下他，你就会得到如下结果

<chat-window title="Graia Framework Community">
  <chat-toast>GraiaX 👉 戳了戳 EroEroBot 的腰</chat-toast>
  <chat-msg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp">你不要光天化日之下在这里戳我啊</chat-msg>
</chat-window>

:::tip
有关什么是 Broadcast，各种 Event 又是什么，请参阅[这里](/before/QA.html#_3-什么是-broadcastcontrol)
:::

:::warning
如果你并没有看见 Python 控制台输出 `NudgeEvent` 事件的相关信息，请不要慌张。
因为 `Ariadne` 的 log 默认状态下只会输出 `MessageEvent`。
:::

:::interlink
<https://graia.cn/ariadne/feature/params/>

**EroEroBot:**  
本章完整示例可在 [EroEroBot/modules/nudge_event.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/modules/nudge_event.py) 找到。
:::
