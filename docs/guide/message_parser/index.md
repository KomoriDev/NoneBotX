# 来点 xxx 涩图

&#91;>\_<&#93;: 真的好多东西啊，好难写，哭唧唧

:::danger 警告
在阅读本章之前，请先了解什么是**Dispatcher**，参阅[这里](/before/QA.html#_3-什么是-broadcastcontrol)

本章进度： <progress value="90" max="100"></progress> 90%

因为文档的作者们也没有完全搞懂每一种消息适配器，
所以这章大概就是这么个情况。

下面你将看到：

- 戛然而止的句子
- 除了例子什么都没有的介绍
- 明明说了下面讲解一下原理但是却什么没有的谎言
- 只有“敬请期待”的介绍

:::

在看了之前的教程，你应该写出一个简单的涩图机器人了。

```python
import aiohttp

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def ero(app: Ariadne, group: Group, message: MessageChain):
    if message.display == "涩图来":
        async with Ariadne.service.client_session as session:
            async with session.get("https://i1.hdslb.com/bfs/archive/5242750857121e05146d5d5b13a47a2a6dd36e98.jpg") as r:
                data = await r.read()
        await app.send_message(group, MessageChain(
            Image(data_bytes=data)
        ))
```

你有没有觉得，每次都要用 `if` 来判断实在有点难受（比如缩进太多或者匹配如 `涩图来 {涩图tag} {涩图数量}` 这样需要二级三级命令的地方）。

::::details 举个栗子

```python
if message.display != "涩图来":
    return

# 缩进多
# 匹配 "涩图来 {涩图tag} {涩图数量}" 且 {涩图数量} 可选
if message.startswith("涩图来"):
    message = message.removeprefix("涩图来")
    message = message.lstrip()  # 请少一点链式调用
    message_list = message.split()
    if len(message_list) == 2:
        tag = message_list[0]
        num = int(message_list[1])
    elif len(message_list) == 1：
        tag = message_list[0]
        num = 1
    else:
        ...
```

::::

什么？你有解决办法？难道跟上面的栗子差不多？那你真的很机车欸~ 不管不管，反正伦家就是有点难受想要把知识塞给你啦。 o(≧口≦)o

如果你饱受多层嵌套 `if` 的话，那不妨阅读一下本章，我们将给各位介绍一下支持 Ariadne 的消息链匹配器**们**吧。

目前支持 Ariadne 的消息链匹配器有以下：

- [基础消息链处理器](./base_parser.md)
- [Twillght](./twilight.md)
- [Commander](./commander.md)
- [Alconna](./alconna.md)

<style lang="scss" scoped>
progress {
    -webkit-appearance: none;
    background-color: var(--vp-custom-block-danger-border);
    border: 0;
    border-radius: 7px;
}

progress::-webkit-progress-bar {
    background-color: var(--vp-custom-block-danger-border);
    border-radius: 7px;
}

progress::-webkit-progress-value {
    background: currentColor;
    border-radius: 7px;
}

progress::-moz-progress-bar {
    background: currentColor;
    border-radius: 7px;
}
</style>
