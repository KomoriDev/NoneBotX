# 基础消息链处理器

:::tsukkomi
本章全是例子，还都是照抄官方文档的~ ~~开摆！~~

P.s. 一些变量名称为了与本文档其他章节统一而与官方文档有所区别
:::

假设你的需求很简单，那么我相信，这些基础消息链应该就够用了。

:::tip
假设你想要理解这些处理器的原理，你可以先去看一看[不是所有人都能看涩图](/guide/depend)
:::

- `DetectPrefix`: 检测前缀是否符合
- `DetextSuffix`: 检测后缀是否符合
- `MentionMe`: 消息中有 At bot 或有 Bot 姓名/群昵称
- `Mention`: 消息中有 At 某人或有某人姓名/群昵称
- `ContainKeyword`: 检测消息链是否包含指定关键字
- `MatchContent`: 检测消息链是否与对应消息链相等
- `MatchRegex`: 检测消息链是否匹配指定正则表达式
- `MatchTemplate`: 检测消息链是否匹配指定模板
- `FuzzyMatch`: 模糊匹配，更推荐使用 FuzzyDispatcher 来进行模糊匹配操作, 因为其具有上下文匹配数量限制
- `FuzzyDispatcher`: 模糊匹配

:::tip
以上这些**消息链处理器**均位于 `graia.ariadne.message.parser.base` 中

冷知识，以下两种用法时一样的，前者使用 BCC，后者使用 Saya。

```python
# 这两者目的都是一样的
@bcc.receiver(GroupMessage, decorators=[xxx])
async def test():
    ...

@channel.use([GroupMessage], decorators=[xxx])
async def test():
    ...
```

:::

## 怎么用

作为 `Decorator`，消息链处理器有多种使用方法

1. 以 `无头修饰器` 的方式来使用。

   - 优点：能够比较方便的进行消息链的匹配
   - 缺点：不能获得数据的返回值

   ```python
   # 只有接收到的消息开头有“涩”，才会运行
   @channel.use(
       ListenerSchema(
           listening_events=[GroupMessage],
           decorators=[DetectPrefix("涩")],
       )
   )
   async def ero(app: Ariadne, group: Group, message: MessageChain):
       # 此时 `message` 参数并不会帮你把开头的“涩”消去
       ...
   ```

2. 以默认参数的方式来使用。

   - 优点：能够获取处理过后的文本
   - 缺点：如果你开了 `类型检查(type checking)`，编辑器会向你报错

   ```python
   # 只有接收到的消息开头有“涩”，才会运行
   @channel.use(
       ListenerSchema(
           listening_events=[GroupMessage],
       )
   )
   async def ero(app: Ariadne, group: Group, message: MessageChain = DetectPrefix("涩")):
       # 此时 `message` 参数会自动帮你把开头的“涩”消去
       ...
   ```

3. 以 `typing.Annotated` 来使用

   - 优点：能够获取处理过后的文本的同时，`类型检查(type checking)` 不会报错
   - 缺点：如果是 `Python 3.8`，需要安装 `typing-extension` 第三方库来导入

   ```python
   from typing import Annotated # Python3.9+
   from typing_extension import Annotated # Python3.8

   # 只有接收到的消息开头有“涩”，才会运行
   @channel.use(
       ListenerSchema(
           listening_events=[GroupMessage],
       )
   )
   async def ero(app: Ariadne, group: Group, message: Annotated[MessageChain, DetectPrefix("涩")]):
       # 此时 `message` 参数会自动帮你把开头的“涩”消去
       ...
   ```

:::tip
你可能还是会有点蒙蔽，但是没关系，之后的**所有消息链处理器**我们都会给出一个例子
:::

## 消息链处理器介绍

### DetectPrefix

检测前缀，实例化时传入后缀**字符串**即可。  
用法： `DetectPrefix(target)` 其中 `target` 是前缀（可以为 `str` 或者 `Iterable[str]`(如`["a", "b"]`)）

:::tip
`Quote` 和 `Source` 虽然也在消息链里面，  
但是他们并不会被去掉哦<curtain>只有"涩"消失的世界完成了</curtain>。
:::

:::details 用法实战

<h3>用法1</h3>

作为 `Decorator`, 放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# 消息必须以 "涩" 开头
# 如 "涩你" "涩涩"
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[DetectPrefix("涩")],
    )
)
async def on_message(app: Ariadne, group: Group, message: MessageChain):
    # 此时的 message 事实上还是有前面的 "涩"
    await app.send_message(group, MessageChain("涩？涩什么"))
    ...
```

<h3>用法2</h3>

```python
# 消息必须以 "涩" 开头
# 如 "涩你" "涩涩"
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_message(app: Ariadne, group: Group, message: MessageChain = DetectPrefix("涩")):
    # 此时的 message 就没有 "涩" 了
    await app.send_message(group, message + MessageChain("？很涩吗"))
    ...

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_message(app: Ariadne, group: Group, message: Annotated[MessageChain, DetectPrefix("涩")]):
    # 此时的 message 就没有 "涩" 了
    await app.send_message(group, message + MessageChain("？很涩吗"))
    ...
```

:::

### DetectSuffix

检测后缀，实例化时传入后缀**字符串**即可。  
用法：`DetectSuffix(target)` 其中 `target` 是后缀（可以为 `str` 或者 `Iterable[str]`(如`["a", "b"]`)）

:::tip
`Quote` 和 `Source` 虽然也在消息链里面，  
但是他们并不会被去掉哦<curtain>只有"涩"消失的世界完成了</curtain>。
:::

:::details 用法实战

<h3>用法1</h3>

作为 `Decorator`, 放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# 消息必须以 "好涩" 结尾
# 如 "这个好涩"
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[DetectSuffix("好涩")],
    )
)
async def on_message(message: MessageChain):
    # 此时的 message 事实上后面还是有 "好涩"
    ...
```

<h3>用法2</h3>

```python
# 消息必须以 "好涩" 结尾
# 如 "这个好涩"
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_message(message: MessageChain = DetectSuffix("好涩")):
    # 此时的 message 就没有 "好涩" 了
    ...

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_message(message: Annotated[MessageChain, DetectSuffix("好涩")]):
    # 此时的 message 就没有 "好涩" 了
    ...
```

:::

### MentionMe

检测在聊天中提到 Bot (At Bot 或以 Bot 群昵称/自己名称 打头)。  
用法：`MentionMe()`

:::details 用法实战

<h3>用法1</h3>

放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# "@EroEroBot 在吗" "EroEroBot 在吗" "EroEroBot，帮我涩涩"
# 要求名字/At在最前面
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MentionMe()],  # 注意要实例化
    )
)
async def on_mention_me(app: Ariadne, group: Group, member: Member):
    await app.send_message(group, MessageChain(At(member.id), "叫我？"))
```

<h3>用法2</h3>

```python
# "@EroEroBot 在吗" "EroEroBot 在吗" "EroEroBot，帮我涩涩"
# 要求名字/At在最前面
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_mention_me(app: Ariadne, group: Group, member: Member, chain: MessageChain = MentionMe()):
    # 此时的 chain 就没有 "@EroEroBot" 或者 "EroEroBot" 了
    await app.send_message(group, MessageChain(At(member.id), "你叫我", chain, "？"))

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_mention_me(app: Ariadne, group: Group, member: Member, chain: Annotated[MessageChain, MentionMe()]):
    # 此时的 chain 就没有 "@EroEroBot" 或者 "EroEroBot" 了
    await app.send_message(group, MessageChain(At(member.id), "你叫我", chain, "？"))
```

:::

### Mention

检测在聊天中提到指定的人 (At 指定的人 或以 指定的人 群昵称/名称打头)。  
用法：`Mention(target)`，其中 `target` 为指定人（可以为 用户名(`str`) 或者 QQ号(`int`)）

:::details 用法实战

<h3>用法1</h3>

放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# "GraiaX 人呢" "GraiaX，今晚一起去涩涩"
# 要求名字/At在最前面
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[Mention(target=...)],  # target: int | str
    )
)
# int: 用户 QQ 号，str: 用户的名字
async def on_mention(app: Ariadne, group: Group):
    await app.send_message(group, MessageChain("你找我主人有什么事吗"))
    ...
```

<h3>用法2</h3>

```python
"GraiaX 一起去涩涩"
# 要求名字/At在最前面
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_mention(app: Ariadne, group: Group, chain: MessageChain = Mention(target=...)):
    # 这时的 chain 就没有 "@GraiaX" 或者 "GraiaX" 了
    await app.send_message(group, MessageChain("你要找我主人", chain, "吗"))
    # 会发送 "你要找我主人一起去涩涩吗"
    ...

@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def on_mention(app: Ariadne, group: Group, chain: Annotated[MessageChain, Mention(target=...)]):
    await app.send_message(group, MessageChain("你要找我主人", chain, "吗"))
    ...
```

:::

### ContainKeyword

检测消息链是否包含指定关键字。  
用法：`ContainKeyword(keyword)`，其中 `keyword` 为匹配关键字（`str`）

:::details 用法实战

```python
# "今晚一起涩涩吗" "让我涩涩你"
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[ContainKeyword(keyword="涩涩")],
    )
)
async def on_contain_keyword(app: Ariadne, group: Group):
    await app.send_message(group, MessageChain("好欸，涩涩"))
    ...
```

:::

### MatchContent

检测消息链是否与对应消息链相等。  
用法：`MatchContent(content)`，其中 `content` 为匹配消息（可以为 `str` 或 `MessageChain`）

:::warning
注意 Image 等元素的特殊对比规则。
:::

:::details 用法实战

```python
# "[图片]" <- 你控制台天天见的啦
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchContent(content="[图片]")],
    )
)
# 当 content 为 str 时，将会与 MessageChain.display 进行比较，当 content 为 MessageChain 时，将会与 MessageChain 进行比较
async def on_match_content(app: Ariadne, group: Group):
    await app.send_message(group, MessageChain("哦，发了什么图片，让我康康！"))
    ...
```

:::

### MatchRegex

检测消息链是否匹配指定正则表达式。  
用法：`MatchRegex(regex, flags)`，其中 `regex` 为 `str`(正则表达式)，`flags` 为 正则表达式标志（`re.RegexFlag`）（默认为 `0`）

:::warning
注意 `[]` 等特殊字符, 因为是使用 `MessageChain.display` 结果作为匹配源的。
:::

:::details 用法实战

```python
# "1" "2" "114514"
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchRegex(regex=r"\d+")],  # regex 参数为 regex 表达式
    )
)
async def on_match_regex(app: Ariadne, group: Group, message: MessageChain):
    await app.send_message(group, MessageChain("发数字干什么，是神秘钥匙吗？"))
    ...
```

:::

### MatchTemplate

检测消息链是否匹配指定模板。

遇到元素实例则检测是否相等，遇到元素类型则检测类型是否匹配。

`Plain` 实例与类型会被自动拼接起来

用法：`MatchTemplate(template)`, 其中 `template` 为匹配元素链（详见用法实战）

:::details 用法实战
放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
# 需要 "*搜图 [图片]" 才能匹配 (*为任意多字符)
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[MatchTemplate([Plain, Plain("搜图"), Image])],
    )
)
async def on_match_regex(chain: MessageChain):  # 不会改动消息链
    ...
```

:::

## FuzzyMatch

`FuzzyMatch` 启用了 **模糊匹配** 能力，就算用户打错字了也能识别 (当然中文匹配不大行）

这个只能做一下初筛，所以更建议使用 `FuzzyDispatcher` 哦.

用法：`FuzzyMatch(template, min_rate)`，其中 `template` 为模板(`str`)，`min_rate` 为最低匹配率(`float`,区间为 0 ~ 1)

:::details 用法实战
放到 `bcc.receiver` 或 `ListenerSchema` 的 `decorators` 里。

```python
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[FuzzyMatch("来张涩图", min_rate=0.8)], # min_rate 限定了最低匹配阈值
    )
)
async def on_fuzzy_match(app: Ariadne, group: Group, chain: MessageChain):  # 不会改动消息链
    if chain.display != "来张涩图":
        await app.send_message(group, MessageChain("你大概想说，“来张涩图”？"))
        return
    ...
```

:::

## FuzzyDispatcher

`FuzzyDispatcher` 提供了更强大的模糊匹配支持，包括：

- 只允许匹配率最高的进行响应
- 获取实际的匹配率

让我们试试吧！

<h3>用法</h3>

放到 `bcc.receiver` 的 `dispatchers` 里。

```python
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        dispatchers=[FuzzyDispatcher("来一张涩图", min_rate=0.6)], # min_rate 限定了最低匹配阈值
    )
)
async def on_fuzzy_match(app: Ariadne, group: Group, chain: MessageChain, rate: float):
    # 获取实际匹配率必须准确使用 `rate: float` 标注
    if rate < 0.8:
        await app.send_message(group, MessageChain("你大概想说，“来一张涩图”？"))
        return
    ... # 我们就假定 rate >= 0.8 是对的吧
```

:::interlink
<https://graia.cn/ariadne/feature/base-parser/>
:::
