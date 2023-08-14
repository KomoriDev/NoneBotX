# 好大的奶

:::danger
本章除了例子<curtain>与乐子</curtain>啥也没写
:::

:::tsukkomi
本来这一节应该算是 MessageChain 的一个子章节，  
但是一想到平时也没什么人用，还是单独开一章罢。
:::

你可能曾经看到过这样的合并消息

<chat-window title="Graia Framework Community">
  <forward-chat
    name="EroEroBot"
    avatar="/avatar/ero.webp"
    title="群聊"
    tag="机器人"
    :contents="[
      'EroEroBot: [图片]',
      '群菜鸮: 好大的奶',
      '群菜鸡: 好大的奶'
    ]"
    counts="4" />
</chat-window>

你很兴奋，想要看一看这奶到底有多大，但很可惜，也不知道你在可惜什么，当你点开聊天记录的时候，你看到的是这种景象：

<chat-window title="转发的合并消息">
  <chatimg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp" src="/images/guide/huge_milk.webp"></chatimg>
  <chat-msg name="群菜鸮" avatar="http://q1.qlogo.cn/g?b=qq&nk=2948531755&s=640">好大的奶</chat-msg>
  <chat-msg name="群菜鸡" avatar="http://q1.qlogo.cn/g?b=qq&nk=1450069615&s=640">好大的奶</chat-msg>
  <chat-msg name="群菜龙" avatar="http://q1.qlogo.cn/g?b=qq&nk=2544704967&s=640">好大的奶</chat-msg>
</chat-window>

不知道是因为你没看到你想要看的东西，还是说你觉得这个奶完全不够大，
反正你发现你被骗了<curtain>You're Rickrolling</curtain>，
然后在下一秒，你突发奇想，能不能让机器人也整一个这个来骗人呢？

**当然可以**，我们现在就通过代码来直接复刻上面的效果：

:::tip
你可能不太能理解为什么 `MatchContent("好大的奶")` 是什么东西，
你只需要知道，当消息为"好大的奶"的时候，就会触发这个 `Listener`

假设你真的很感兴趣，也可以直接跳到[基础消息链处理器](/guide/message_parser/base_parser.md)查看哦
:::

```python
import random
from datetime import datetime

from graia.ariadne.message.element import At, Plain, Image, Forward, ForwardNode


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchContent("好大的奶")],
    )
)
async def create_forward(app: Ariadne, group: Group, member: Member):
    fwd_nodeList = [
        ForwardNode(
            target=member,
            time=datetime.now(),
            message=MessageChain(Image(path="big_milk.jpg")),
        )
    ]
    member_list = await app.get_member_list(group)
    for _ in range(3):
        random_member: Member = random.choice(member_list)
        fwd_nodeList.append(
            ForwardNode(
                target=random_member,
                time=datetime.now(),
                message=MessageChain("好大的奶"),
            )
        )
    message = MessageChain(Forward(nodeList=fwd_nodeList))
    await app.send_message(group, message)
```

因为比较简单，所以我们直接说明参数就好了：

```python
ForwardNode(
    target=member,  # 发送者的信息(Member / Friend / Stranger 都行)
    time=datetime.now(),  # 发送时间
    message=MessageChain(Image(path="big_milk.jpg")),  # 发送的消息链
)
```

:::tip
当你的 `target` 参数为 `int` 类型的时候，
你必须再输入一个 `senderName` 参数才能实例化成功。
:::

:::danger 注意
通过上面的例子你一定意识到了一个很严肃的问题：  
**你可以自己无中生有生成消息链然后传播出去**  
请不要通过该方法**传播谣言**，要不然我就要用我的靴子狠狠的踢你的屁股
:::

:::interlink
<https://graia.cn/ariadne/feature/msg-chain/>

**EroEroBot:**  
本章完整示例可在 [EroEroBot/modules/forward_message.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/modules/forward_message.py) 找到。
:::
