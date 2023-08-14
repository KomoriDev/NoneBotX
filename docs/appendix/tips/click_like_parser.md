# 代码行为优化 —— 尝试以下click-like的写法

:::tip
这一章节是笔者突然热血来潮写的
:::

在 [关于 saya 的介绍](/guide/message_parser/) 中，我们提到了这样一个现象

```python
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def ero(app: Ariadne, group: Group, message: MessageChain):
    if message.display == "涩图来":
        ...
    elif message.display == "涩图去":
        ...
```

为了让这样的写法能够降低一点，Ariadne 出现了很多官方/第三方的 dispatcher 来解决这个问题。
很高兴，我们的用户也的的确确用了这些东西。

但是，在后面的，笔者发现，很多人，其实是没有意识到分开写的精髓。
让我们来好好探究这方面吧

:::tip
以下案例改编自真实情节<sup>[[1]](https://github.com/SAGIRI-kawaii/sagiri-bot/pull/330)</sup>
:::

## 梦的开始 —— 一个本子下载器

你想做一个本子下载器，然后，你开始思考这个本子下载器该怎么触发

```sh
bz rank
bz random [-H24|-D7|-D30]
bz search [-forward] {关键词}
bz download [-forward] {本子号}
```

然后，顺着这个思路，你写出了这样的 dispatcher，这这样一个函数

:::tip
可能有同学好奇为什么不用 `Commander` 而是 `Twilight`，
还记得吗，这个例子改编自真实情节。
:::

```python
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[
            Twilight(
                [
                    FullMatch("bz"),
                    UnionMatch("download", "search", "random", "rank")
                    @ "operation",
                    ArgumentMatch("-forward", action="store_true", optional=True)
                    @ "forward_type",
                    UnionMatch("-H24", "-D7", "-D30", optional=True) @ "rank_time",
                    WildcardMatch() @ "content",
                ]
            )
        ]
    )
)
async def bz(
    app: Ariadne,
    group: Group,
    member: Member,
    operation: RegexResult,
    forward_type: ArgResult,
    rank_time: RegexResult,
    content: RegexResult
):
    operation_str = str(operation.result)
    if operation_str == "search":
        ...
    elif operation_str == "rank":
        ...
    elif operation_str == "search":
        ...
    elif operation_str == "download":
        ...
```

咱们先不聊这个 `dispather` 太长这个问题（毕竟我们的重点不是这个）

虽然说你用了 `Twilight` 这类消息链匹配器来使得适配字符串方面你可以剩下很多心。
但是很明显，这样的代码并不是我们想要的，`if...elif...elif` 这个来来回回的，
跟那 `if 涩图来... elif 涩图去...` 不就没有任何区别了。

## 试试 `click-like` 的方法

> Click 是一个利用很少的代码以可组合的方式创造优雅命令行工具接口的 Python 库。 它是高度可配置的，但却有合理默认值的“命令行接口创建工具”。

```python
import click

@click.command()
@click.option('--count', default=1, help='Number of greetings.')
@click.option('--name', prompt='Your name', help='The person to greet.')
def hello(count, name):
    """Simple program that greets NAME for a total of COUNT times."""
    for x in range(count):
        click.echo('Hello %s!' % name)

if __name__ == '__main__':
    hello()
```

这是 click 官方的例子，虽然说 Ariadne 现在并不能做到类似的东西，但是，
这种分类的方法值得我们学习下

我们可以将这四个指令分成四个函数（以下方法究极省略）

```python
@channel.use(...FullMatch("bz rank"))
async def bz_rank(...):
    ...

@channel.use(...FullMatch("bz search"))
async def bz_search(...):
    ...

@channel.use(...FullMatch("bz random"))
async def bz_random(...):
    ...

@channel.use(...FullMatch("bz download"))
async def bz_download(...):
    ...

```

然后下一个问题就出现了，可能函数与函数之间，会有很多相同的代码，怎么办？  
那你直接将这些实现包装成一个类不就行了？

```python

class Bz:

    def __init__():
        ...

    def encrypt():
        ...

    async def request():
        ...

    async def search():
        ...

    async def download():
        ...

    async def rank():
        ...

```

<loading />

## 某外星来客的写法

仍然以中这个命令为例子

```sh
bz rank
bz random [-H24|-D7|-D30]
bz search [-forward] {关键词}
bz download [-forward] {本子号}
```

如果你阅读了 [Alconna —— 外 星 来 客](/guide/message_parser/alconna.md) 章节，
你应该知道这个命令怎么去编写：

```python
from arclet.alconna import Alconna, Args, Option
from arclet.alconna.graia import alcommand, assign

bz = Alconna(
    "bz",
    Option("rank"),
    Option("random", Args["mode", ["-H24", "-D7", "-D30"]]),
    Option("search", Args["keyword", str]),
    Option("download", Args["id", str]),
    Option("-forward")
)

@alcommand(bz)
@assign("rank")
async def rank():
    ...

@alcommand(bz)
@assign("random")
async def random():
    ...

@alcommand(bz)
@assign("search")
async def search():
    ...

@alcommand(bz)
@assign("download")
async def download():
    ...
```

但同时，**Alconna-Graia** 提供了更接近 **click-like** 的写法：

```python
from arclet.alconna import Args
from arclet.alconna.graia import alc
from graia.ariadne.event.message import GroupMessage
from graiax.shortcut.saya import listen

@listen(GroupMessage)
@alc.command("bz")
@alc.option("rank")
@alc.option("random", Args["mode", ["-H24", "-D7", "-D30"]])
@alc.option("search", Args["keyword", str])
@alc.option("download", Args["id", str])
@alc.option("-forward")
async def bz():
    ...
```
