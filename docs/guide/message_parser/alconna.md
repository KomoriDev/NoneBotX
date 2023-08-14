# Alconna

:::tsukkomi 注
本章节由 **Alconna** 作者本人编辑，所以你将会看到

- 令人窒息的浓度
- 画风突变的标题
- 意义不明的日语翻译 ~~熟肉反生~~

不过放心，梗都有相关注释<curtain>什么梗百科</curtain>

<!-- prettier-ignore-start -->

> [**「わかります。」**](<https://zh.moegirl.org.cn/%E9%95%BF%E9%A2%88%E9%B9%BF(%E5%B0%91%E5%A5%B3%E6%AD%8C%E5%89%A7>)

<!-- prettier-ignore-end -->

:::

**Alconna**，全称 [**Arclet-Alconna**](https://github.com/ArcletProject/Alconna)，
是由 [**Arclet Project**](https://github.com/ArcletProject) 维护的一个功能强大的 **命令** 解析器，
简单一点来讲就是杂糅了多种 CLI 模块（如 `click`、`fire` 等）风格的命令解析库（迫真）。

:::tip TIPS

1. **Alconna** 由两个[尼希语](http://tieba.baidu.com/p/7268094994) 单词组成，`alco` 和 `conna`
2. **ArcletProject** 是一个新生社区，欢迎各位来[交流♂](https://jq.qq.com/?_wv=1027&k=PUPOnCSH)

:::

## 凡事都要先安装

:::warning

**本文默认您使用的 `Alconna-Graia` 为 @latest 版本，若不符合请及时更新**

:::

:::: code-group
::: code-group-item pdm

```bash
pdm add arclet-alconna-graia>=0.14.0, arclet-alconna-ariadne>=0.14.0
pdm add graiax-shortcut
```

:::
::: code-group-item poetry

```bash
poetry add arclet-alconna-graia>=0.14.0, arclet-alconna-ariadne>=0.14.0
poetry add graiax-shortcut
```

:::
::: code-group-item pip

```bash
pip install arclet-alconna-graia>=0.14.0, arclet-alconna-ariadne>=0.14.0
pip install graiax-shortcut
```

:::
::::

## [缭乱！外星大魔王](https://zh.moegirl.org.cn/%E7%BC%AD%E4%B9%B1!Victory_Road)

开发涩涩Bot时，我们难免会有一个涩图搜索功能的需求。假设该功能命令如下：

```sh
setu搜索 CONTENT
```

这里我们规定用户输入的 `content` 参数只能是一个图片消息（[Image](https://ariadne.api.graia.cn/message/element/#graia.ariadne.message.element.Image)）或者一个图片链接（URL）。

我们默认使用 **SauceNAO** 的 api，但有时候我们也想使用别的搜图引擎而且能自定义参数：

```sh
use API:[saucenao|ascii2d|ehentai|iqdb|tracemoe] = saucenao
count NUM:int = 1
--similarity VAL:float = 0.5
--timeout SEC:int = 60
```

这样的命令大致如下所示：

```sh
setu搜索 XXX
setu搜索 XXX use ascii2d
setu搜索 XXX -s 0.8
setu搜索 XXX use ehentai --timeout 60
```

如果使用 **Twilight** 去做，选项之间的处理会比较复杂。

这个时候，~~天空一声巨响，Alconna 闪亮登场~~，我们可以使用 **Alconna** 来实现我们想要的功能：

```python
from arclet.alconna import Alconna, Args, CommandMeta, Option, Arg, OptionResult
from arclet.alconna.ariadne import ImgOrUrl

api_list = ["saucenao", "ascii2d", "ehentai", "iqdb", "tracemoe"]
SetuFind = Alconna(
    "setu搜索",
    Args['content', ImgOrUrl],
    Option("use", Args['api', api_list], help_text="选择搜图使用的 API"),
    Option("count", Args(Arg("num", int)), help_text="设置每次搜图展示的最多数量"),
    Option("--similarity|-s", Args.val[float], help_text="设置相似度过滤的值", default=OptionResult(args={"val": 0.5})),
    Option("--timeout|-t", Args["sec", int], help_text="设置超时时间", default=OptionResult(args={"sec": 60})),
    meta=CommandMeta(
        "依据输入的图片寻找可能的原始图片来源",
        usage="可以传入图片, 也可以是图片的网络链接",
        example="setu搜索 [图片]",
    ),
)
```

如此一来，一个命令就创建好了。

接下来，在你的机器人中添加一个用来执行 `setu搜索` 命令的监听器：

```python
from arclet.alconna.graia import alcommand, Match, assign, Query


@alcommand(SetuFind, private=False)
@assign("use.api", "saucenao", or_not=True)
async def ero_saucenao(
    app: Ariadne,
    group: Group,
    content: Match[str],
    max_count: Query[int] = Query("count.num"),
    similarity: Query[float] = Query("similarity.args.val"),
    timeout: Query[int] = Query("timeout.sec", -1),
):
    ...  # setu搜索的处理部分，使用saucenao



@alcommand(SetuFind, private=False)
@assign("use.api", "ascii2d")
async def ero_ascii2d(
    app: Ariadne,
    group: Group,
    content: Match[str],
    max_count: Query[int] = Query("count.num"),
    similarity: Query[float] = Query("similarity.args.val"),
    timeout: Query[int] = Query("timeout.sec", -1),
):
    ...  # setu搜索的处理部分，使用ascii2d
```

准备就绪，对着你的机器人~~发情~~发号施令吧：

<chat-window title="聊天记录">
  <chat-msg name="群菜鸮" avatar="https://q4.qlogo.cn/g?b=qq&nk=2948531755&s=640">
    setu搜索<br />
    <img alt="涩图" style="margin-top: 5px" src="/images/guide/ero_pic_1.webp"/>
  </chat-msg>
  <chat-msg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp"><chat-quote name="群菜鸮">setu搜索</chat-quote>正在搜索，请稍后</chat-msg>
  <chat-msg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp">工口发生~</chat-msg>
  <chat-msg name="群菜龙" avatar="https://q4.qlogo.cn/g?b=qq&nk=2544704967&s=640">草</chat-msg>
  <chat-msg name="群菜鸡" avatar="https://q4.qlogo.cn/g?b=qq&nk=1450069615&s=640">草</chat-msg>
  <chat-msg name="群菜鸮" avatar="https://q4.qlogo.cn/g?b=qq&nk=2948531755&s=640">草</chat-msg>
</chat-window>

## [直面灾厄](https://zh.moegirl.org.cn/%E6%98%8E%E6%97%A5%E6%96%B9%E8%88%9F/%E9%9B%86%E6%88%90%E6%88%98%E7%95%A5/%E5%82%80%E5%BD%B1%E4%B8%8E%E7%8C%A9%E7%BA%A2%E5%AD%A4%E9%92%BB#%E9%9A%BE%E5%BA%A6%E5%88%86%E7%BA%A7)

~~左：莱塔尼亚权杖 右：荒地龙舌兰~~

要想写好一个 Alconna，你首先需要理清楚自己的**命令结构**。

一般，你需要把命令分为四个部分：

1. 命令名称：作为一个命令的标识符
2. 命令分隔符：一般是空格，作为参数之间的区分符号
3. 命令参数：一个命令所需求的主要参数，可以为空
4. 命令选项：为命令添加额外的解释参数，或以此选择命令的不同功能

:::tip
是的，Alconna 负责的并不是**消息链解析**，而是**命令解析**。
~~虽然说 Alconna 的实现攘括了消息链解析的功能~~
:::

在上述例子中，`setu搜索` 是命令名称，`<content>` 是命令参数，而剩下的 `count` 和 `use` 都是命令选项。

一个命令可以没有命令参数，但一定要有命令名称，这样才称得上健全.jpg

若用一个类来比喻的话，命令参数就是 `__init__` 方法的参数，命令名称就是 `Class.__name__`，命令选项则是该类下的所有类方法。

以下将展示 Alconna 创建的 5 种方式：

:::tip NOTE

自 Alconna 1.3 以来，除开 typical 构建方法外，剩余四种需要安装 `arclet-alconna-tools` 才能使用。

:::

:::: code-group
::: code-group-item typical

```python{4,10}
from arclet.alconna import Args
from arclet.alconna.graia import AlconnaDispatcher

alc = Alconna("我要涩图", Args["count", int])


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item String

```python{4,10}
from arclet.alconna.graia import AlconnaDispatcher
from arclet.alconna.tools import AlconnaString

alc = AlconnaString("我要涩图 <count:int>").build()


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Format

```python{4,10}
from arclet.alconna.graia import AlconnaDispatcher
from arclet.alconna.tools import AlconnaFormat

alc = AlconnaFormat("我要涩图 {count}", {"count": int})


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Decorate

```python{4,7-10,16}
from arclet.alconna.graia import AlconnaDispatcher
from arclet.alconna.tools import AlconnaDecorate

cli = AlconnaDecorate()


@cli.command("我要涩图")
@cli.argument(Arg("count", int))
def setu(count: int):
    ...


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(setu.command)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::: code-group-item Fire

```python{5-8,11,17}
from arclet.alconna import.tools AlconnaFire
from arclet.alconna.graia import AlconnaDispatcher


def give_me_setu(count: int):
    class Config:
        command="我要涩图"
    ...


alc = AlconnaFire(give_me_setu)


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::::

### 代码解析

上面的代码中展示了五种 Alconna 的创建方式。

下面我们将一一说明这五种方法的细节。

#### 标准形式：直接使用 `Alconna(...)`

在**标准形式**中，你需要传入较多的命令组件，但同时其可以清晰地表达命令结构。

目前的命令组件有 **Option**、**Subcommand** 与 **Args**。

这样创建的 Alconna 实例又长什么样呢？

```python
>>> Alconna(
...     "我要涩图",  # command
...     Args["count", int],  # main_args
...     Option("从", Args["tag", Nargs(str)]),  # options
... )
Alconna::我要涩图(args=Args('count': int), options=[Option('从', args=Args('tag': (str+))), Option('help', ), Option('shortcut', args=Args('delete', 'name': str, 'command': str = '_')), Option('comp', )])
```

`command` 传入的便是命令名称，`main_args` 是命令参数，`options` 则是命令选项。

`Args` 是命令参数的载体，通过“键-值-默认”传入一系列参数，具体食用方法我们后面会讲到。

::: tsukkomi 注
Alconna 0.7.6 后，简易的命令构造可用如下方法：

```python
>>> alc = "我要涩图" + Option("从", Args["tag", Nargs(str)]) + Args.count[int]
```

即可以用 `+` 增加选项或子命令。

:::

#### Koishi-like：使用 `AlconnaString(...)`

<div class="tip custom-block" style="display: flex; justify-content: center; align-items: center;">
<img width=50 height=50 src="https://img.moegirl.org.cn/common/thumb/3/3f/Commons-emblem-success.svg/75px-Commons-emblem-success.svg.png" style="margin-right: 10px"/>
<span style="font-size: 15px; font-weight: bold;">
这个条目曾经被 Koishi Maintainer 巡回过。<s>终于 GraiaX 文档也到了足够让公式前来巡回的知名度了吗！？</s>
</span>
</div>

在 **Koishi-like** 方法中，你可以用类似 **Koishi** 中编写命令的格式来构造 **Alconna**。

上面的例子中，我们期望的命令是这样的一串字符串：`我要涩图 2 从 纯爱 兽耳`。

该命令以“**我要涩图**”作为前缀，同时需要一个参数，其以 `count` 为名字，并且类型为 `int`，
然后允许一个选项，其名称为“**从**”，需要不定个参数，其以 `tag` 为名字，并且每个参数类型为 `str`。

于是我们就得到了如下的 Alconna 实例：

```python
>>> AlconnaString("我要涩图 <count:int>").option("从", "从 <tag:str+>").build()
Alconna::我要涩图(args=Args('count': int), options=[Option('从', args=Args('tag': (str+))), Option('help', ), Option('shortcut', args=Args('delete', 'name': str, 'command': str = '_')), Option('comp', )])
```

可以看到，我们的 `<count:int>` 变成了 `Args['count', int]`。

::: tip

`AlconnaString` 需要通过 `.build()` 方法才能转成 `Alconna` 实例

:::

#### Format：使用 `AlconnaFormat(...)`

在**format**方法中，你可以用 **f-string** 的格式来构造 Alconna。

仍以上面的命令为例，我们相当于输入了这样一串字符串：`我要涩图 {count} 从 {*tags}`
于是我们就得到了如下的 Alconna 实例：

```python
>>> AlconnaFormat("我要涩图 {count:int} 从 {tags}", {"tags": Nargs(str)})
Alconna::我要涩图(args=Args('count': int, '从', 'tags': (str+)), options=[Option('help', ), Option('shortcut', args=Args('delete': delete, 'name': str, 'command': str = '_')), Option('comp', )])
```

::: tip

对于除首部外的字符串，`AlconnaFormat` 一律视为 `main_args` 的参数。

而当有字符串以 `-` 为前缀时，`AlconnaFormat` 会将后续字符串当作命令选项进行解析。

:::

#### Fire-Like：使用 `AlconnaFire(...)`

**Fire-like** 允许你传入任意的参数，包括函数、类、实例和模块，`Alconna` 会尝试提取命令相关参数，
并构建为 `Alconna`。

仍以上面的命令为例，我们相当于构造了一个类 `Class:我要涩图`，其需要传入 `count` 参数来实例化,
并写有一个方法 `从`，该方法接受一个不定参数 `tags`。
于是我们就得到了如下的 Alconna 实例：

```python
>>> class Setu:
...     def __init__(self, count:int):
...         self.count = count
...     def 从(self, *tags: str):
...         ...
...
>>> AlconnaFire(Setu, config={"command": "我要涩图"})
Alconna::我要涩图(args=Args('count': int), options=[Option('从', args=Args('tag': (str+))), Option('help', ), Option('shortcut', args=Args('delete', 'name': str, 'command': str = '_')), Option('comp', )])
```

## [Kirakira☆dokidoki 的 Alconna-Graia](https://zh.moegirl.org.cn/index.php?search=Kirakira+Dokidoki&title=Special:%E6%90%9C%E7%B4%A2&searchToken=9hyop5qg906tdzfb9wltw6slt)

在 **Ariadne** 乃至 **Avilla**，**Ichika** 中，你可以通过使用 **AlconnaDispatcher** 来提供消息处理服务：

```python{6}
from arclet.alconna.graia import Alconna, AlconnaDispatcher


@app.broadcast.receiver(
    GroupMessage,
    dispatchers=[AlconnaDispatcher(Alconna(...))],
)
async def _(app: Ariadne, group: Group, result: Arparma):
    ...
```

:::warning

自 `arclet-alcona-graia` 0.11.0 开始，**Alconna-Graia** 建议与 `Launart` 结合使用：

```python
from launart import Launart
from arclet.alconna.graia import AlconnaGraiaService
from arclet.alconna.ariadne import AlconnaAriadneAdapter

manager = Launart(...)
manager.add_service(AlconnaGraiaService(AlconnaAriadneAdapter))
...
```

或

```python
from launart import Launart
from arclet.alconna.graia import AlconnaGraiaService
import arclet.alconna.ariadne

manager = Launart(...)
manager.add_service(AlconnaGraiaService())
...
```

或

```python
from launart import Launart
from arclet.alconna.graia import AlconnaGraiaService

manager = Launart(...)
manager.add_service(AlconnaGraiaService("ariadne"))
...
```

您可以通过 **AlconnaGraiaService** 的 `enable_cache` 与 `cache_dir` 参数
来启用对运行时注册的 **快捷命令** 的保存功能。

:::

**AlconnaDispatcher** 目前有如下参数：

- `command`: `Alconna`本体
- `send_flag`: 输出文本的行为，默认为 `reply`，可选值为 `stay` 或 `post`
  - `'stay'`: 不处理，原样返回，不能在监听器内获取到输出信息
  - `'reply'`: `AlconnaDispatcher` 会自动将输出信息发送给命令发起者
  - `'post'`: `AlconnaDispatcher` 会广播一个 `AlconnaOutputMessage` 事件，你可以通过监听该事件来自定义输出文本的处理方法
- `skip_for_unmatch`: 当收到的消息不匹配`Alconna`时是否跳过，默认为 `True`
- `comp_session`: 补全会话的配置, 不传入则不启用补全会话
- `message_converter`: 对输出文本的处理函数

例如，当上例的 `send_flag` 为 `reply` 时，可以出现如下情况：

<chat-window title="聊天记录">
  <chat-msg name="群菜鸮" avatar="https://q4.qlogo.cn/g?b=qq&nk=2948531755&s=640">setu搜索 --help</chat-msg>
  <chat-msg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp">setu搜索 &lt;content:Image|url&gt;<br />
  依据输入的图片寻找可能的原始图片来源<br />
  用法:<br />
   可以传入图片, 也可以是图片的网络链接<br />
  可用的选项有:<br />
  # 选择搜图使用的 API<br />
    use &lt;api:'saucenao'|'ascii2d'|'ehentai'|'iqdb'|'tracemoe'&gt;<br />
  # 设置每次搜图展示的最多数量<br />
    count &lt;num:int&gt;<br />
  # 设置相似度过滤的值<br />
    --similarity &lt;val:float&gt;<br />
  # 设置超时时间<br />
    --timeout &lt;sec:int = 60&gt;<br />
  使用示例:<br />
   setu搜索 [图片]<br />
  </chat-msg>
  <chat-msg name="群菜龙" avatar="https://q4.qlogo.cn/g?b=qq&nk=2544704967&s=640">好</chat-msg>
</chat-window>

`comp_session` 主要配置关于补全会话的相关参数：

- `priority`: 补全使用的中断服务的优先级
- `tab`: 补全使用的切换提升指令的名字，默认为 `.tab`
- `enter`: 补全使用的输入内容指令的名字，默认为 `.enter`
- `exit`: 补全使用的退出会话的名字，默认为 `.exit`
- `timeout`: 补全的超时时间，默认为 30 秒

当传入有效配置后 (传入空的 `{}` 就算作有效) 时，补全会话将启用:

<ChatWindow title="聊天记录">
  <ChatMsg name="群菜鸮" avatar="https://q4.qlogo.cn/g?b=qq&nk=2948531755&s=640">setu搜索 ?</ChatMsg>
  <ChatMsg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp">以下是建议的输入:<br />
  &gt; &lt;content: str&gt;<br />
  &#42; use<br />
  &#42; count<br />
  &#42; -s<br />
  &#42; --similarity<br />
  &#42; --timeout<br />
  &#42; -t<br />
  </ChatMsg>
  <ChatMsg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp">发送 .tab 切换提示<br />
  发送 .enter [xxx] 确认输入<br />
  发送 .exit 退出补全会话<br />
  </ChatMsg>
  <ChatMsg name="群菜龙" avatar="https://q4.qlogo.cn/g?b=qq&nk=2544704967&s=640">好</ChatMsg>
</ChatWindow>

### 参数标注

**AlconnaDispatcher** 可以分配以下几种参数：

- `Alconna`: 使用的 `Alconna` 对象
- `Arparma`: `Alconna` 生成的解析结果数据容器
- `CommandResult`: `AlconnaDispatcher` 返回的特殊对象，可以获取：
  - `output`: 可能的帮助信息
  - `result`: `Arpamar`
  - `source`: 原始事件
- 匹配项，如 `Match`，`Header`
- `Duplication`: `Alconna` 提供的良好的类型补全容器
- `Stub` : `Alconna` 提供的对于组件的类型补全容器。
  - 特别的，当标注类型为 `ArgsStub` 时，其将包含所有解析到的参数
- 匹配的参数，必须保证参数名与参数类型与解析结果中的一致，如`content: str`
- etc.

### 与 Saya 配合使用

`Alconna-Graia` 在 0.0.12 更新了 **Saya** 相关的部分，包括 **AlconnaSchame** 与 **AlconnaBehaviour**，如下例：

首先，在 `main.py` 中记得创建一个 **AlconnaBehaviour** 并在 Saya 中注册，此处使用 **creart** 完成相关操作：

```python
...
from arclet.alconna.graia.saya import AlconnaBehaviour, AlconnaSchema
from arclet.alconna.graia import Match, AlconnaDispatcher
from arclet.alconna import Alconna
from creart import create
from graia.saya import Saya
from graia.saya.builtins.broadcast import ListenerSchema
...

...
saya = create(Saya)
create(AlconnaBehaviour)
...
```

然后是单个模块中的用法：

```python
channel = Channel.current()


@channel.use(AlconnaSchema(AlconnaDispatcher(Alconna("test1", Args.foo[int]))))
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def _(app: Ariadne, foo: Match[int]):
    ...


@channel.use(AlconnaSchema.from_("test2 <foo:int>"))
@channel.use(ListenerSchema(listening_events=[GroupMessage]))
async def _(app: Ariadne, foo: Match[int]):
    ...
```

:::tip

更推荐使用 **Shortcut** 编写 saya 模块：

```python{5-6}
from arclet.alconna.graia import Alconna, AlconnaDispatcher
from graiax.shortcut.saya import listen, dispatch


@listen(GroupMessage)
@dispatch(AlconnaDispatcher(Alconna(...)))
async def _(app: Ariadne, result: Arparma):
    ...
```

或者 `arclet-alconna-graia` 自带的 Shortcut 组件 **alcommand**：

```python{4}
from arclet.alconna.graia import alcommand, Alconna


@alcommand(Alconna(...), private=False, send_error=True)
async def _(app: Ariadne, result: Arparma):
    ...
```

**alcommand** 默认使用 `reply` 的 send_flag。

:::

### 匹配项

`arclet-alconna-graia` 提供三个特殊类以匹配参数：

- `Match`: 查询某个参数是否匹配，如 `foo: Match[int]`。使用时以 `Match.available` 判断是否匹配成功，以
  `Match.result` 获取匹配结果。
- `Query`: 查询某个参数路径是否存在，如`sth: Query[int] = Query("foo.bar")`；可以指定默认值如
  `Query("foo.bar", 1234)`。使用时以 `Query.available` 判断是否匹配成功，以 `Query.result` 获取匹配结果。
- `Header`: 当编写 Alconna 命令使用了头部格式化时（例如：`Alconna("{city}天气")`），该匹配项表示所有 placeholder 与其对应匹配结果的字典载体

### 便捷构造

`alcommand` 内联提供了 `AlconnaString` 的构造方法，如：

```python
@alcommand("[!|/]help <...content>;--foo #bar")
async def _(...):
    ...
```

其等价于

```python
alc = Alconna(
    ["!", "/"],
    "help",
    Args["content", AllParam],
    Option("--foo", help_text="bar"),
)


@alcommand(alc)
async def _(...):
    ...
```

另外有 `from_command`，其提供类似 `commander` 的构造方式：

```python
from arclet.alconna.graia import from_command
from graiax.shortcut.saya import listen


@listen(GroupMessage)
@from_command("call {target}")
async def _(target: At):
    ...
```

### 特殊事件

当 **AlconnaDispatcher** 的 `send_flag` 为 `post` 时，其会通过 bcc 广播一个 **AlconnaOutputMessage** 事件。

该事件可获取的参数如下：

- `output` (str): 可能的帮助信息
- `command` (Alconna): 该帮助信息对应的命令
- ...: 从源消息事件中可获取的所有参数

### 特殊类型

`arclet-alconna-ariadne` 提供了几个特定的 `Args` 类型：

- `ImgOrUrl`: 表示匹配一个 **Image** 消息元素或者是代表图片链接的字符串，匹配结果是图片的链接（str）
- `AtID`: 表示匹配一个 **At** 消息元素或者是 `@xxxx` 式样的字符串或者数字，返回数字（int）

### 特殊组件

`arclet-alconna-graia` 提供了一些特定的 **Depend** 装饰器，或 **Shortcut** 组件，如下所示：

#### fetch_name

`fetch_name` 是有头的装饰器，负责在机器人功能需要指令发送者提供名字时自动处理名称。

假设某个指令如下：

```python
Alconna("发病", Args["name", [str, At], ...])
```

我们希望若指令的 `name` 存在时，`name` 是字符串则直接使用，是 `At` 则用 at
的对象的名称，否则使用发送者的名称，那么仅使用 `fetch_name` 即可：

```python
from arclet.alconna.graia import alcommand, fetch_name


@alcommand(Alconna(...), private=False)
async def _(app: Ariadne, group: Group, name: str = fetch_name("name")):
    ...
```

`fetch_name` 的参数 `path` 表示可能作为名称参数的参数名字，默认为`"name"`。

:::tip

`fetch_name` 直接作为默认值可能会引起某些类型检查器愤怒（是谁呢？一定不是**pylance**吧）

所以推荐使用 **Shortcut** 的 **decorate**：

```python{6}
from arclet.alconna.graia import alcommand, fetch_name
from graiax.shortcut.saya import decorate


@alcommand(Alconna(...), private=False)
@decorate({"name": fetch_name()})
async def _(app: Ariadne, group: Group, name: str):
    ...
```

:::

#### match_path

`match_path` 用以在命令存在功能细化时帮助解析结果分发到具体的监听器上

假设命令如下：

```python
Alconna(
    "功能",
    Option("列出"),
    Option("禁用"),
    Option("启用"),
)
```

`列出`、`禁用`、`启用` 以及什么都不做是该命令可能的四种细分的功能。你当然可以把处理部分堆在一个监听器内，如：

```python
from arclet.alconna.graia import alcommand

cmd = Alconna(...)


@alcommand(cmd, private=False)
async def handler(app: Ariadne, group: Group, result: Arparma):
    if not result.components:
        return await app.send_group_message(group, MessageChain(result.source.get_help()))
    if result.find("列出"):
        ...
        return
    if result.find("禁用"):
        ...
        return
    if result.find("启用"):
        ...
        return
```

毫无疑问，这种写法会使得你的代码的复杂度大大增加（**Sourcery** 警告）

于是使用 `match_path`：

```python
from arclet.alconna.graia import alcommand, match_path
from graiax.shortcut.saya import decorate

cmd = Alconna(...)


@alcommand(cmd, private=False)
@decorate(match_path("$main"))
async def _(app: Ariadne, group: Group):
    return await app.send_group_message(group, MessageChain(cmd.get_help()))


@alcommand(cmd, private=False)
@decorate(match_path("列出"))
async def _(app: Ariadne, group: Group):
    ...

@alcommand(cmd, private=False)
@decorate(match_path("禁用"))
async def _(app: Ariadne, group: Group):
    ...

@alcommand(cmd, private=False)
@decorate(match_path("启用"))
async def _(app: Ariadne, group: Group):
    ...
```

`match_path` 的参数 `path` 表示分发需要匹配的选项或子命令，当 `path` 为 `$main` 时表示匹配无选项的情况。

#### match_value

`match_value` 的功能与 `match_path` 类似，但允许对匹配值进行判断。

例如某个命令携带固定参数：

```python
Alconna("test", Args["level", ["info", "debug", "error"]])
```

你当然可以把处理部分堆在一个监听器内，如：

```python
from arclet.alconna.graia import alcommand, Match

cmd = Alconna(...)


@alcommand(cmd, private=False)
async def handler(app: Ariadne, group: Group, level: Match[str]):
    if level.result == "info":
        ...
        return
    if level.result == "debug":
        ...
        return
    if level.result == "error":
        ...
        return
```

但你可以这样写：

```python
from arclet.alconna.graia import alcommand, match_value
from graiax.shortcut.saya import decorate

cmd = Alconna(...)


@alcommand(cmd, private=False)
@decorate(match_value("level", "info"))
async def _(app: Ariadne, group: Group):
    ...

@alcommand(cmd, private=False)
@decorate(match_value("level", "debug"))
async def _(app: Ariadne, group: Group):
    ...

@alcommand(cmd, private=False)
@decorate(match_value("level", "error"))
async def _(app: Ariadne, group: Group):
    ...
```

`match_value` 的参数 `or_not` 允许在参数不存在时视作匹配成功，适合在判断路径为选项参数时使用。

#### assign

`assign` 是 `match_path` 与 `match_value` 的合体并装饰器化的组件。

使用 `assign` 时必须放置在 `alcommand` 下方：

```python
from arclet.alconna.graia import alcommand, assign

cmd = Alconna(...)


@alcommand(cmd, private=False)
@assign("list")
async def _(app: Ariadne, group: Group):
    ...

@alcommand(cmd, private=False)
@assign("level", "info")
async def _(app: Ariadne, group: Group):
    ...

@alcommand(cmd, private=False)
@assign("input", "123", or_not=True)
async def _(app: Ariadne, group: Group):
    ...
```

:::tip
`path` 除了指定选项名或者子命令名称，也可以指定到具体的参数上。

例如 `foo.bar` 或 `foo.args.bar` 指向选项 `foo` 的参数 `bar`，
而 `foo.value` 指向 `foo` 本身的值，可看作是否解析到 `foo`
:::

### 前缀/后缀匹配

除开常见的命令匹配，alc-graia 也提供了简单的前缀匹配与后缀匹配。

```python
from arclet.alconna.graia import endswith, startswith
from graiax.shortcut.saya import listen


@listen(GroupMessage)
@startswith("Hello")
async def _(app: Ariadne, group: Group):
    ...

@listen(GroupMessage)
@startswith("shell", bind="message")  # bind 参数用于指定将匹配结果注入给哪个参数
async def _(app: Ariadne, group: Group, message: MessageChain):
    ...


@listen(GroupMessage)
@endswith("url", include=True)  # include 参数用于指定注入内容是匹配到的还是剩余的
async def _(app: Ariadne, group: Group, url: MessageChain):
    ...
```

得益于**NEPattern**，你可以进行如下匹配：

- 常规字符串，如 `startswith("foo")`
- 其他消息元素类型，如 `startswith(At(...))`，`startswith(Image)`
- 正则，如 `endswith("re:<[^<>]+>")`，`startswith("rep:(bar|baz)")`
- Alconna 支持的自动类型转化，如 `startswith(int)`
- 函数，如 `startswith(lambda x: x if isinstance(x, str) and x.isdigit() else None)`
- typing，如 `startswith(Dict[str, int])`
- 联合匹配，如 `startswith(['!', '/', At])`

:::tip
两个 **Shortcut** 同样存在各自的 **Decorator** 形式，为 MatchPrefix 与 MatchSuffix

:::

## [亮出你的本事吧！外星人](https://zh.moegirl.org.cn/%E6%9C%BA%E5%8A%A8%E6%88%98%E5%A3%AB%E9%AB%98%E8%BE%BE_%E9%97%AA%E5%85%89%E7%9A%84%E5%93%88%E8%90%A8%E7%BB%B4#%E6%96%B0%E4%BB%B2%E8%89%AF%E4%B8%89%E4%BA%BA%E7%BB%84/%E9%97%AA%E5%93%88%E5%AE%9A%E5%9E%8B%E6%96%87)

> **「やってみせろよ、ウチュウジンー！」**

### 组件

`Alconna` 拥有两大组件：**Option** 与 **Subcommand**。

<h4>Option</h4>

`Option` 可以传入一组 `alias`：

```python
Option("--foo", Args, alias=["-F", "--FOO", "-f"])
```

那么`-f`、`-F` 与 `--FOO`将等同于`--foo`。

另外也可以用如 `Option("--foo|-F|--FOO|-f")` 来指定别名。此时将根据长度排序选择最长的字符串作为选项名称。

<h4>Subcommand</h4>

`Subcommand` 可以传入自己的 **Option** 与 **Subcommand**：

```python
Subcommand("sub", Option("sub_opt"), Subcommand("sub_sub"), Args)
Subcommand("sub", Args, [Option("sub_opt"), Subcommand("sub_sub")])
```

此时 `sub_opt` 必须在 `sub` 被输入时才算作合法选项，即：

- `sub ... sub_opt ...` ✔
- `sub_opt ... sub ...` ❌

除此之外，**Option** 与 **Subcommand** 拥有如下共同参数：

- `help_text`: 传入该组件的帮助信息

- `dest`: 被指定为解析完成时标注匹配结果的标识符，不传入时默认为选项或子命令的名称 (name)

- `requires`: 一段指定顺序的字符串列表，作为唯一的前置序列与命令嵌套替换

  对于命令 `test foo bar baz qux <a:int>` 来讲，因为`foo bar baz` 仅需要判断是否相等, 所以可以这么编写：

  ```python
  Alconna("test", Option("qux", Args.a[int], requires=["foo", "bar", "baz"]))
  ```

  ::: tip
  requires 也可以在 name 中传入  
  譬如：

  ```python
  Option("foo bar baz qux")
  ```

  :::

- `default`: 默认值，在该组件未被解析时使用使用该值替换。

  特别的，使用 `OptionResult` 或 `SubcomanndResult` 可以设置包括参数字典在内的默认值：

  ```python
  from arclet.alconna import Option, OptionResult

  opt1 = Option("--foo", default=False)
  opt2 = Option("--foo", default=OptionResult(value=False, args={"bar": 1}))
  ```

### 选项操作

`Option` 可以特别设置传入一类 `Action`，作为解析操作

`Action` 分为三类：

- `store`: 无 Args 时，仅存储一个值，默认为 Ellipsis；有 Args 时，后续的解析结果会覆盖之前的值
- `append`: 无 Args 时，将多个值存为列表，默认为 Ellipsis；有 Args 时，每个解析结果会追加到列表中，
  当存在默认值并且不为列表时, 会自动将默认值变成列表, 以保证追加的正确性
- `count`: 无 Args 时，计数器加一；有 Args 时，表现与 STORE 相同

  当存在默认值并且不为数字时，会自动将默认值变成 1，以保证计数器的正确性

`Alconna` 提供了预制的几类 `action`：

- `store`，`store_value`，`store_true`，`store_false`
- `append`，`append_value`
- `count`

### 紧凑命令

`Alconna`，`Option` 与 `Subcommand` 可以设置 `compact=True` 使得解析命令时允许名称与后随参数之间没有分隔：

```python
from arclet.alconna import Alconna, Option, CommandMeta, Args

alc = Alconna("test", Args["foo", int], Option("BAR", Args["baz", str], compact=True), meta=CommandMeta(compact=True))

assert alc.parse("test123 BARabc").matched
```

这使得我们可以实现如下命令：

```python
>>> from arclet.alconna import Alconna, Option, Args, append
>>> alc = Alconna("gcc", Option("--flag|-F", Args["content", str], action=append))
>>> alc.parse("gcc -Fabc -Fdef -Fxyz").query("flag.content")
['abc', 'def', 'xyz']
```

::: tip

当 `Option` 的 `action` 为 `count` 时，其自动支持 `compact` 特性：

```python
>>> from arclet.alconna import Alconna, Option, Args, count
>>> alc = Alconna("pp", Option("--verbose|-v", action=count, default=0))
>>> alc.parse("pp -vvv").query("verbose.value")
3
```

:::

### 帮助信息

每个 Alconna 命令 都可以通过 `--help` 或 `-h` 触发命令的帮助信息，并且可以通过继承
`arclet.alconna.components.output.TextFormatter` 来个性化信息样式，如：

```python
from arclet.alconna import Alconna, Args
from arclet.alconna.tools import MarkdownTextFormatter

alc = Alconna("test", Args["count#这是一个注释", int], formatter_type=MarkdownTextFormatter)
alc.parse("test --help")

'''
## Unknown

指令:

**test &lt;count:int&gt;**
### 注释:
&#96;&#96;&#96;
count: 这是一个注释
&#96;&#96;&#96;
'''
```

除此之外，你可以通过 `command_manager` 获取当前程序下的所有命令：

```python
from arclet.alconna import command_manager
...
print(command_manager.all_command_help())

'''
# 当前可用的命令有:
 - foo : Unknown
 - bar : Unknown
 - baz : Unknown
 - qux : Unknown
# 输入'命令名 --help' 查看特定命令的语法
'''
```

:::tip NOTE
Alconna 可以设置 `meta.hide` 参数以不被 command_manager 打印出来。

```python
from arclet.alconna import Alconna, CommandMeta, command_manager
foo = Alconna("foo", meta=CommandMeta(hide=True))
...
print(command_manager.all_command_help())

'''
# 当前可用的命令有:
 - bar : Unknown
 - baz : Unknown
 - qux : Unknown
# 输入'命令名 --help' 查看特定命令的语法
'''
```

:::

### 配置

Alconna 有两类配置，分别是 `arclet.alconna.config` 和 `arclet.alconna.Namespace`

`config` 是一个单例，可以控制一些全局属性，如：

```python{3-4}
from arclet.alconna import config

config.fuzzy_threshold = 0.6 # 设置模糊匹配的阈值
config.command_max_count = 100 # 可存在命令最大数量
```

`Namespace` 由 `config` 管理，表示某一命名空间下的默认配置：

```python
from arclet.alconna import config, namespace, Namespace
from arclet.alconna.tools import ShellTextFormatter


np = Namespace("foo", prefixes=["/"])  # 创建 Namespace 对象，并进行初始配置

with namespace("bar") as np1:
    np1.prefixes = ["!"]    # 以上下文管理器方式配置命名空间，此时配置会自动注入上下文内创建的命令
    np1.formatter_type = ShellTextFormatter  # 设置此命名空间下的命令的 formatter 默认为 ShellTextFormatter

config.namespaces["foo"] = np  # 将命名空间挂载到 config 上
```

`config` 同时也提供了默认命名空间配置与修改方法：

```python
from arclet.alconna import config, namespace, Namespace


config.default_namespace.prefixes = [...]  # 直接修改默认配置

np = Namespace("xxx", prefixes=[...])
config.default_namespace = np  # 更换默认的命名空间

with namespace(config.default_namespace.name) as np:
    np.prefixes = [...]
```

:::tip NOTE
内置选项的名称也可以通过 `Namespace` 进行配置：

```python
with namespace("bar") as np1:
  np1.builtin_option_name["help"] = {"帮助", "-h"}  # 传入的是字符串集合
```

则此时处于 `bar` 命名空间下的命令可以通过 `XXX 帮助` 而非 `XXX --help` 获取命令帮助

:::

### 半自动补全

半自动补全是 Alconna 1.2.0 中新增加的特性，为用户提供了推荐后续输入的功能。

补全默认通过 `--comp` 或 `-cp` 触发：（命名空间配置可修改名称）

```python
from arclet.alconna import Alconna, Args, Option

alc = Alconna("test", Args["abc", int]) + Option("foo") + Option("bar")
alc.parse("test --comp")
alc.parse("test f --comp")

'''
output

以下是建议的输入：
* <abc: int>
* --help
* -h
* -sct
* --shortcut
* foo
* bar

以下是建议的输入：
* foo
'''
```

### 补全会话

补全会话基于半自动补全，提供了交互操作补全的接口

补全会话通过创建 `CompSession` 并进入上下文触发：

```python
from arclet.alconna import Alconna, Args, Option, CompSession

alc = Alconna("test", Args["abc", int]) + Option("foo") + Option("bar")

with CompSession(alc) as comp:
    alc.parse("test")
if comp.available:
    print("current completion:", comp.current())
    print("next completion:", comp.tab())
    with comp:
        res = comp.enter(["1"])

assert res.matched
```

### 快捷指令

快捷指令顾名思义，可以为基础指令创建便捷的触发方式

一般情况下你可以通过 `Alconna.shortcut` 进行快捷指令操作 (创建，删除)；

```python
>>> from arclet.alconna import Alconna, Args
>>> alc = Alconna("setu", Args["count", int])
>>> alc.shortcut("涩图(\d+)张", {"args": ["{0}"]})
'Alconna::setu 的快截指令: "涩图(\\d+)张" 添加成功'
>>> alc.parse("涩图3张").query("count")
3
```

`shortcut` 的第一个参数为快捷指令名称，第二个参数为 `ShortcutArgs`，作为快捷指令的配置

```python
class ShortcutArgs(TypedDict, Generic[TDC]):
    """快捷指令参数"""

    command: NotRequired[TDC]
    """快捷指令的命令"""
    args: NotRequired[list[Any]]
    """快捷指令的附带参数"""
    fuzzy: NotRequired[bool]
    """是否允许命令后随参数"""
```

当 `fuzzy` 为 False 时，传入 `"涩图1张 abc"` 之类的快捷指令将视为解析失败

::: tip

快捷指令允许三类特殊的 placeholder:

- `{%X}`: 只用于 `command`，如 `setu {%0}`，表示此处填入快截指令后随的第 X 个参数。

  例如，若快捷指令为 `涩图`，配置为 `{"command": "setu {%0}"}`，则指令 `涩图 1` 相当于 `setu 1`

- `{*}`: 只用于 `command`，表示此处填入所有后随参数，并且可以通过 `{*X}` 的方式指定组合参数之间的分隔符。
- `{X}`: 用于 `command` 与 `args`， 表示此处填入可能的正则匹配的组：
  - 若 `command` 中存在匹配组 `(xxx)`，则 `{X}` 表示第 X 个匹配组的内容
  - 若 `command` 中存储匹配组 `(?P<xxx>...)`，则 `{X}` 表示名字为 X 的匹配结果

:::

除此之外，通过内置选项 `--shortcut` 可以动态操作快捷指令。

### 使用模糊匹配

模糊匹配是 Alconna 0.8.0 版本新增加的特性，通过在 Alconna 中设置其 CommandMeta 开启。

模糊匹配会应用在任意需要进行名称判断的地方，如**命令名称**，**选项名称**和**参数名称**（如指定需要传入参数名称）。

```python{3}
from arclet.alconna import Alconna, CommandMeta

alc = Alconna("test_fuzzy", meta=CommandMeta(fuzzy_match=True))
alc.parse("test_fuzy")
# output: test_fuzy is not matched. Do you mean "test_fuzzy"?
```

### 自定义语言文件

Alconna 的 i18n 支持使用了 [`Tarina.lang`](https://github.com/ArcletProject/Tarina/blob/main/src/tarina/lang.py)

其语言文件配置位于 [`arclet.alconna.i18n`](https://github.com/ArcletProject/Alconna/tree/dev/src/arclet/alconna/i18n) 下

您可以通过 `tarina.lang.select` 切换语言配置，也可以通过 `tarina.lang.set` 对单一文本进行修改。

```python{2, 5-8}
from arclet.alconna import Alconna, CommandMeta, config, Option
from tarina import lang


alc = Alconna("!command", meta=CommandMeta(raise_exception=True)) + Option("--bar", "foo:str")
lang.set(
    "analyser", "param_unmatched",
    "以下参数没有被正确解析哦~\n: {target}\n请主人检查一下命令是否正确输入了呢~\n不然给你一招雪菜猩红风暴~",
)
alc.parse("!command --baz abc")

'''
output:

ParamsUnmatched: 以下参数没有被正确解析哦~
: --baz
请主人检查一下命令是否正确输入了呢~
不然给你一招雪菜猩红风暴~
'''
```

(~~[你毫无疑问是个雪菜推呢~](https://zh.moegirl.org.cn/LoveLive!%E7%B3%BB%E5%88%97#%E6%B5%81%E8%A1%8C%E7%9A%84%E6%A2%97)~~<Curtain><a href="https://zh.moegirl.org.cn/%E4%B8%8A%E5%8E%9F%E6%AD%A5%E6%A2%A6" target="_blank">大西亚步梦</a>：诶</Curtain>
)

## [总会有参数的](https://zh.moegirl.org.cn/%E6%9C%BA%E5%8A%A8%E6%88%98%E5%A3%AB%E9%AB%98%E8%BE%BE_%E9%97%AA%E5%85%89%E7%9A%84%E5%93%88%E8%90%A8%E7%BB%B4#%E6%96%B0%E4%BB%B2%E8%89%AF%E4%B8%89%E4%BA%BA%E7%BB%84/%E9%97%AA%E5%93%88%E5%AE%9A%E5%9E%8B%E6%96%87)

> **「何とでもなるはずだパラメータ！」**

### Args

**Args** 在 Alconna 中有非常重要的地位，甚至称得上是核心，比 Alconna 重要十倍甚至九倍。

其通常以 `Args[key1, var1, default1][key2, var2][Arg(key3, var3), Arg(key4, var4, default4)][...]` 的方式构造一个 Args。

其中，key 一定是字符串，而 var 一般为参数的类型，default 为具体的值或者 **arclet.alconna.args.Field**。

#### key

`key` 的作用是用以标记解析出来的参数并存放于 **Arparma** 中，以方便用户调用。

其有三种为 Args 注解的标识符，为 `?`、`/` 与 `!`。标识符与 key 之间建议以 `;` 分隔：

- `!` 标识符表示该处传入的参数应不是规定的类型，或不在指定的值中。
- `?` 标识符表示该参数为可选参数，会在无参数匹配时跳过。
- `/` 标识符表示该参数的类型注解需要隐藏。

另外，对于参数的注释也可以标记在 `key` 中，其与 key 或者标识符 以 `#` 分割：

`foo#这是注释;?` 或 `foo?#这是注释`

#### var

var 负责命令参数的类型检查与类型转化

var 可以是以下几类：

- 存在于 `nepattern.pattern_map` 中的类型/字符串，用以替换为预制好的 **BasePattern**
- 字符串
  - 若字符串以 `"re:"` 打头，表示将其转为正则解析表达式，并且返回类型为匹配字符串
  - 若字符串以 `"rep:"` 打头，表示将其转为特殊的 `RegexPattern`，并且返回类型为 `re.Match`
  - 其他字符串将作为直接的比较对象
- 列表，其中可存放 **BasePattern**、类型或者任意参数值，如字符串或者数字
- `Union`、`Optional`、`Literal` 等会尝试转换为 `List[Type]`
- `Dict[type1，type2]`、`List[type]`、`Set[type]`
- 一般的类型，其会尝试比较传入参数的类型是否与其相关
- **AnyOne**、**AllParam**，作为泛匹配的标识符
- 预制好的字典，表示传入值依据该字典的键决定匹配结果
- `Annotated[type, Callable[..., bool], ...]`，表示为某一类型添加校验器
- `Callable[[P], T]`，表示会将传入的参数 P 经过该调用对象并将返回值 T 作为匹配结果
- ...

内置的类型检查包括 `int`、`str`、`float`、`bool`、`'url'`、`'ip'`、`'email'`、`list`、`dict`、`tuple`、`set`、`Any` 、`bytes`、`hex`、`datetime` 等。

若 `Arg` 只传入了 `key`，则 `var` 自动选择 `key` 的值作为比较对象

:::tip

另外，`Alconna` 提供了两类特殊的类型用以实现限制功能：

- **MultiVar**：将该参数标记为需要获取可变数量或指定数量的数据，通过填入 `flag: int | Literal['+', '*']` 实现
- **KeyWordVar**：将该参数标记为需要同时写入参数名才认定为合法参数，默认形式为 `key=arg`，可指定分隔符

当 **MultiVar** 与 **KeyWordVar** 一起使用时， 该参数表示为需要接收多个 `key=arg` 形式的数据， 类似 `**kwargs`

:::

#### Field

`Field` 放置于 `default` 位，用以指定此处 Arg 的默认值、别名与补全信息等。

若传入的 **default** 值不是 `ArgField`，程序会自动生成。

### BasePattern

**BasePattern** 是 Alconna 中对正则解析的拓展，负责实际对传入参数的检查与类型转换。

例如我想把如 `'sth1/sth2/sth3/sth4'` 的参数在解析后变成类似 `['sth1', 'sth2', 'sth3', 'sth4']` 这样子。

那么我可以这样编写一个 BasePattern：

```python
from nepattern import BasePattern, PatternModel

my_list = BasePattern(
    "(.+/.*)",
    model=PatternModel.REGEX_CONVERT,
    origin=list,
    converter=lambda x: x.split('/'),
    alias='my_list',
    accepts=[str],
)
```

并在创建 Alconna 时使用：

```python
...
alc = Alconna(".command", Args["foo", my_list])
```

此时输入 `'.command usr/bin/python'`，则 `foo` 将被解析为 `['usr', 'bin', 'python']`

#### Arg

**Arg** 是 **Args** 的最小单位：

```python
Args[Arg(k1, v1), Arg(k2, v2), ...]
```

**Arg** 初始化时可以传入：

- name: 参数名
- value: 参数类型
- field: 参数域
- seps: 参数分隔符
- notice: 参数注释
- flags: 参数标识符

**Arg** 可以通过传入 `seps` 指定该参数如何与后续数据区分，也可通过 **Args** 的 `separators` 参数统一设置

### Arparma

`Alconna.parse` 会返回由 **Arparma** 承载的解析结果。

`Arpamar` 会有如下参数：

- 调试类

  - matched: 是否匹配成功
  - error_data: 解析失败时剩余的数据
  - error_info: 解析失败时的异常内容
  - origin: 原始命令，可以类型标注

- 分析类
  - header_match: 命令头部的解析结果，包括原始头部、解析后头部、解析结果与可能的正则匹配组
  - main_args: 命令的主参数的解析结果
  - options: 命令所有选项的解析结果
  - subcommands: 命令所有子命令的解析结果
  - other_args: 除主参数外的其他解析结果
  - all_matched_args: 所有 Args 的解析结果

`Arparma` 同时提供了便捷的查询方法 `query()`，会根据传入的 `path` 查找参数并返回

`path` 支持如下：

- `main_args`，`options`，...: 返回对应的属性
- `args`: 返回 all_matched_args
- `main_args.xxx`，`options.xxx`，...: 返回字典中 `xxx`键对应的值
- `args.xxx`: 返回 all_matched_args 中 `xxx`键对应的值
- `options.foo`，`foo`: 返回选项 `foo` 的解析结果 (OptionResult)
- `options.foo.value`，`foo.value`: 返回选项 `foo` 的解析值
- `options.foo.args`，`foo.args`: 返回选项 `foo` 的解析参数字典
- `options.foo.args.bar`，`foo.bar`: 返回选项 `foo` 的参数字典中 `bar` 键对应的值
  ...

同样, `Arparma["foo.bar"]` 的表现与 `query()` 一致

### Duplication

**Duplication** 用来提供更好的自动补全，类似于 **ArgParse** 的 **Namespace**，经测试表现良好（好耶）。

普通情况下使用，需要利用到 **ArgsStub**、**OptionStub** 和 **SubcommandStub** 三个部分，

仍以上方命令为例，其对应的 Duplication 应如下构造：

```python
from arclet.alconna import ArgsStub, Duplication, OptionStub

class MyDup(Duplication):
    my_args: ArgsStub
    从: OptionStub  # 选项与子命令对应的stub的变量名必须与其名字相同
```

并在解析时传入 Duplication：

```python
result = alc.parse("我要涩图 2", duplication=MyDup)
>>> type(result)
<class MyDup>
```

:::tip

同样，在 **AlconnaDispatcher** 中也可以使用 **Duplication**，你只需要如下操作：

```python{7-8}
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group, dup: MyDup):
    print(dup.my_args.availabe)
```

亦或者，你可以直接使用 **Stub** 作为参注解：

```python{7-8}
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[AlconnaDispatcher(alc)],
    )
)
async def test(app: Ariadne, group: Group, y_args: ArgsStub):
    print(my_args.availabe)
```

:::

**Duplication** 也可以如 **Namespace** 一样直接标明参数名称和类型：

```python{3-5}
from typing import Tuple

from arclet.alconna import Duplication


class MyDup(Duplication):
    count: int
    tag: Tuple[str, ...]
```

该用法下需要确保属性存在

## [居然是整活？](https://zh.moegirl.org.cn/%E6%9C%BA%E5%8A%A8%E6%88%98%E5%A3%AB%E9%AB%98%E8%BE%BE_%E9%97%AA%E5%85%89%E7%9A%84%E5%93%88%E8%90%A8%E7%BB%B4#%E6%96%B0%E4%BB%B2%E8%89%AF%E4%B8%89%E4%BA%BA%E7%BB%84/%E9%97%AA%E5%93%88%E5%AE%9A%E5%9E%8B%E6%96%87)

> **「コッケイナだと！」**

### 元素匹配

一定要记住，Alconna 是支持元素匹配的（Plain 元素或 Source 等元素除外）。

假设某个命令需要传入名字，但你也想能够直接用 **@** 来指定目标, 那么可以直接这么写：

```python{4}
from arclet.alconna import Alconna, Args
from graia.ariadne.message.element import At

ill = Alconna(
    ["EroEro", "!"],
    "发病",
    Args["target", [At, str]],
)
```

### 头部 Pattern

Alconna 的 **command** 同样可以接受 **类型** 或者 **BasePattern**：

```python{4-5}
from typing import Annotated

from arclet.alconna import Alconna, CommandMeta

number = Alconna(int, meta=CommandMeta("输入数字"))
digit = Alconna(Annotated[int, lambda x: x>0], meta=CommandMeta("输入正整数"))
```

At 等元素同样可以放置于 **prefixes** 里：

```python{4}
from arclet.alconna import Alconna, Args
from graia.ariadne.message.element import At

ill = Alconna(
    [At(123456789)],
    "发病",
    Args["target", [At, int]],
)
```

此时你需要输入 `@123456789 发病 xxxx` 才能执行命令

### Bracket Header

Alconna 对于命令头部 **command** 应用有特殊的构建规则 `bracket header`。

其可以像 **AlconnaFormat** 那样通过 `'xxx{name:type or pattern}xxx'` 来生成正则表达式，并将匹配结果传递给 `Arparma.header`。

其中 `name` 与 `type` 都可以留空, `type` 留空时当作`'str'`。

类似 `.r100` 或者 `查询XX人品` 的指令，这么写就好了：

```python{4}
from arclet.alconna import Alconna
from arclet.alconna.graia import alcommand, Header

dice = Alconna(".r{dice_roll:int}?d{dice_max:int}")


@alcommand(dice)
async def roll_dice(app: Ariadne, group: Group, header: Header):
    dice_count = header.result.get('dice_max')
    print(dice_count)
    ...
```

同样，标明了 `type` 的 bracket 能够进行类型转换:

```python{10}
from arclet.alconna import Alconna
from arclet.alconna.graia import alcommand, Header

dice = Alconna(".r{dice_roll:int}?d{dice_max:int}")


@alcommand(dice)
async def roll_dice(app: Ariadne, group: Group, header: Header):
    dice_count = header.result.get('dice_max')
    assert isinstance(dice_count, int)
    ...
```

### 自定义分隔符

你可以传入一个 `separator` 的参数，来作为命令参数之间的分隔符。

类似 `告诉我 谁是xxx和xxx` 的指令，这么写就好了：

```python{5}
from typing import Tuple
from arclet.alconna import Alconna, Args, Option, MultiVar, Arg
from arclet.alconna.graia import alcommand, Match

who = Alconna("告诉我") + Option("谁", Args(Arg('targets', MultiVar(str), seps="和")), separator="是")

@alcommand(who, private=False)
async def find(app: Ariadne, group: Group, targets: Match[Tuple[str, ...]]):
    print(targets.result)
    ...
```

### 多行匹配

基于 `Arg` 的 `separators` 与 `MultiVar` 或泛匹配，我们很容易可以写出在线编译代码的命令：

```python{4}
from arclet.alconna import Alconna, Arg, AllParam
from arclet.alconna.graia import alcommand, Match

coder = Alconna("run", Arg("codes", AllParam, seps='\n'))

@alcommand(coder, private=False)
async def _(app: Ariadne, codes: Match[list]):
    ...
```

这样便可以进行如下操作：

<chat-window title="聊天记录">
  <chat-msg name="RF" avatar="https://q4.qlogo.cn/g?b=qq&nk=3165388245&s=640">run<br />
  import sys<br />
  print(sys.version_info)<br />
  </chat-msg>
  <chat-msg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp">sys.version_info(major=3, minor=8, micro=6, releaselevel='final', serial=0)</chat-msg>
  <chat-msg name="群菜鸡" avatar="https://q4.qlogo.cn/g?b=qq&nk=1450069615&s=640">怎么是3.8（</chat-msg>
  <chat-msg name="群菜龙" avatar="https://q4.qlogo.cn/g?b=qq&nk=2544704967&s=640">怎么是3.8（</chat-msg>
</chat-window>

### 减少 Option 的使用

利用 `?` 标识符与 `KeyWordVar`，我们可以在 **Args** 中模拟出一个 option：

```python{3}
from arclet.alconna import Alconna, Args, Kw

alc = Alconna("cut_img", Args["--width?", Kw @ int, 1280]["--height?", Kw @ int, 720])
alc.parse("cut_img --height=640")

>>> matched=True, head_matched=True, main_args={"--width": 1280, "--height":640}
```

<p align="center" style="font-size: 30px"><strong>前面的区域，以后再来探索吧</strong></p>

> **「わかります」**

<loading />

::: interlink
<https://arclet.top/docs/tutorial/alconna>
:::
