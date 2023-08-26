# 快速上手

## 你好，来张涩图

现在，我们来尝试编写第一个插件，让我们在插件目录下创建一个 `hello.py` 插件

```py :no-line-numbers
# plugins/hello.py
from nonebot.plugin import on_message
from nonebot.internal.adapter import Event

hello_setu = on_message()


@hello_setu.handle()
async def hello_handle(event: Event):
    message = event.get_message()
    # await hello.send(f"不要说{message}，来张涩图")
    await hello.finish(f"不要说{message}，来张涩图")
```

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>你好</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">不要说你好，来张涩图</chat-msg>
</chat-window>

值得注意的是，在执行 `finish` 方法时，NoneBot 会在向机器人用户发送消息内容后抛出异常来结束事件响应流程。也就是说，在 `finish` 被执行后，后面的程序是不会被执行的（类似于 `return`）。如果你需要回复机器人用户消息但不想事件处理流程结束，可以使用注释的部分中展示的 `send` 方法。

::: tip 提示
如果使用了 `Matcher` 的简写形式，我们可以通过 `matcher` 参数来调用事件响应器操作。

```py
# plugins/hello.py
from nonebot.matcher import Matcher
from nonebot.plugin import on_message
from nonebot.internal.adapter import Event

@on_message().handle()
async def hello_handle(event: Event, matcher: Matcher):
    message = event.get_message()
    await matcher.finish(f"不要说{message}，来张涩图")
```

:::

::: details 你好，来张涩图 <img src="/images/guide/wangwang.webp" alt="Doge" class="face"/>

<Comment />

:::

所以说了这么多，`on_message` 是什么？

## 初识事件响应器

事件响应器（Matcher）是用于对接收到的事件进行响应的重要工具。通过定义简单的规则，事件响应器可以帮助你捕获特定类型的事件，并执行相应的操作。

例如，在 Hello 插件中，我们创建了一个名为 `hello_setu` 的事件响应器。它会检查事件是否满足一些条件（`on_message` 是一个消息事件响应器，它会响应**所有**消息事件），如果满足，就会触发预先定义的操作（`hello_handle`）。这是插件与用户交互的基础。

## 辅助函数

NoneBot 提供了许多方便的工具，来帮助你更优雅地向别人要涩图，被称为 “事件响应器辅助函数” （下称 “辅助函数” ）这些辅助函数不仅简化了 <ruby>代码编写<rp>(</rp><rt>索要涩图</rt><rp>)</rp></ruby> 的过程，还提高了代码的可读性。

接下来，我们将详细介绍这些辅助函数，并展示如何使用它们来创建你所需的事件响应器。无论你是否有编程经验，这些工具都能够帮助你更轻松地开发插件，让你专注于功能实现而不是纠结于代码细节。

## 创建事件响应器

我们直接使用 `on_command()` 辅助函数来创建一个事件响应器：

```py
from nonebot import on_command

setu = on_command("来张涩图")
```

这样，我们就获得一个名为 `setu` 的事件响应器了，这个事件响应器会对 `/来张涩图` 开头的消息进行响应。

::: tip 提示

如果一条消息中包含 “@机器人” 或以 “机器人的昵称” 开头，例如 `@bot /来张涩图` 时，为了方便命令匹配，`@bot` 会被自动去除，即事件响应器收到的信息内容为 `来张涩图`。 同时，`event.is_tome()` 将会返回 `True`，表示该事件与机器人相关。

:::

### 添加参数

在辅助函数中，我们可以添加一些参数来对事件响应器进行更加精细的调整，例如事件响应器的优先级、匹配规则等。例如：

```py
from nonebot import on_command
from nonebot.rule import to_me


setu = on_command(
    "来张涩图",
    aliases={"来张色图"},
    rule=to_me(),
    priority=10,
    block=True
)

```

在上述代码中，我们在 `on_command` 辅助函数中添加了两个命令，并将 `to_me` 设置为 `True`。  
这样，我们就获得了一个可以响应 `来张涩图` 和 `来张色图` 的两个命令，同时需要 `@bot` 才会响应的事件响应器。

::: tip 提示
需要注意的是，不同的辅助函数有不同的可选参数。在使用辅助函数之前，您可以参考编辑器的提示，以了解不同函数的可选参数。
:::

## 常用辅助函数

通过导入不同的辅助函数，你可以轻松创建不同类型的事件响应器。接下来，我们将介绍一些常用的辅助函数，让你更好地掌握它们的用法。

::: tip 提示

你可以尝试使用下列的示例代码创建插件，亲身体验一下这些辅助函数的用法。

:::

### on_message

`on_message` 是一个消息事件响应器，它会响应所有消息事件。

```py
from nonebot import on_message
from nonebot.matcher import Matcher

@on_message().handle()
async def _(matcher: Matcher):
    await matcher.finish("on_message!")
```

### on_notice

`on_notice` 是一个通知事件响应器，它会响应所有通知事件。

```py
from nonebot import on_notice
from nonebot.matcher import Matcher

@on_notice().handle()
async def _(matcher: Matcher):
    await matcher.finish("on_notice!")
```

### on_request

`on_request` 是一个请求事件响应器，它会响应所有请求事件。

```py
from nonebot import on_request
from nonebot.matcher import Matcher

@on_request().handle()
async def _(matcher: Matcher):
    await matcher.finish("on_request!")
```

### on_command

`on_command` 是一个消息事件响应器，它会响应所有以指定命令开头的消息事件。

::: warning 注意

`on_command` 受到配置项中的 COMMAND_START 的影响，需要在命令前额外加上 `command_start` 才能触发响应。

默认配置下，`on_command` 只会对以 `/` 开头的消息事件进行响应。

:::

```py
from nonebot import on_command
from nonebot.matcher import Matcher

# 响应所有以 "/来张涩图" 开头的消息事件
@on_command("来张涩图").handle()
async def _(matcher: Matcher):
    await matcher.finish("涩图.jpg")
```

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>/来张涩图</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">涩图.jpg</chat-msg>
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>/来张涩图 xxx</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">涩图.jpg!</chat-msg>
</chat-window>

### on_shell_command

`on_shell_command` 是一个消息事件响应器，它会响应所有以指定命令开头的消息事件，并且支持 `shell_like` 解析参数。

`ArgumentParser` 参考文档: [argparse]

::: warning 注意

`on_shell_command` 受到配置项中的 `COMMAND_START` 的影响，需要在命令前额外加上 `command_start` 才能触发响应。

`默认配置下，on_shell_command` 只会对以 `/` 开头的消息事件进行响应。
:::

```py
from nonebot.matcher import Matcher
from nonebot.rule import ArgumentParser
from nonebot.plugin import on_shell_command

# 创建一个参数解析器
parser = ArgumentParser()
parser.add_argument("arg", type=str, help="arg help")

# 响应所有以 "/来张涩图" 开头的消息事件
@on_shell_command("shell", parser=parser).handle()
async def _(matcher: Matcher):
    await matcher.finish("涩图.jpg!")
```

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>/来张涩图</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">涩图.jpg</chat-msg>
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>/来张涩图 xxx</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">涩图.jpg</chat-msg>
</chat-window>

### on_startwith

`on_startswith` 是一个消息事件响应器，它会响应所有以指定内容开头的消息事件。

```py
from nonebot import on_startswith
from nonebot.matcher import Matcher

# 响应所有以 "start" 开头的消息事件
@on_startswith("start").handle()
async def _(matcher: Matcher):
    await matcher.finish("on_startswith!")
```

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>start</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">on_startswith!</chat-msg>
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>startxxx</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">on_startswith!</chat-msg>
</chat-window>

### on_endwith

`on_endswith` 是一个消息事件响应器，它会响应所有以指定内容开头的消息事件。

```py
from nonebot import on_endswith
from nonebot.matcher import Matcher

# 响应所有以 "end" 开头的消息事件
@on_endswith("end").handle()
async def _(matcher: Matcher):
    await matcher.finish("on_endswith!")
```

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>end</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">on_endswith!</chat-msg>
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>xxxend</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">on_endswith!</chat-msg>
</chat-window>

### on_fullmatch

`on_fullmatch` 是一个消息事件响应器，它会响应所有与指定内容完全一致的消息事件。

```py
from nonebot import on_fullmatch
from nonebot.matcher import Matcher

# 响应所有完全匹配 "full" 的消息事件
@on_fullmatch("full").handle()
async def _(matcher: Matcher):
    await matcher.finish("on_fullmatch!")
```

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>full</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">on_fullmatch!</chat-msg>
</chat-window>

### on_keyword

`on_keyword` 是一个消息事件响应器，它会响应所有包含指定内容的消息事件。

```py
from nonebot import on_keyword
from nonebot.matcher import Matcher

# 响应所有包含 "key" 的消息事件
@on_keyword("key").handle()
async def _(matcher: Matcher):
    await matcher.finish("on_keyword!")
```

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>key</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">on_keyword!</chat-msg>
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>xxxkeyxxx</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">on_keyword!</chat-msg>
</chat-window>

### on_regex

`on_regex` 是一个消息事件响应器，它会响应所有匹配指定正则表达式的消息事件。

```py
from nonebot import on_regex
from nonebot.matcher import Matcher

# 响应所有匹配 "regex" 的消息事件
@on_regex(r"regex").handle()
async def _(matcher: Matcher):
    await matcher.finish("on_regex!")
```

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>regex</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">on_regex!</chat-msg>
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>xxxregexxxx</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">on_regex!</chat-msg>
</chat-window>

[argparse]: https://docs.python.org/3/library/argparse.html
