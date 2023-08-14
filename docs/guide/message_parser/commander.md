# Commander

:::warning
虽然现在还有一大堆没写，但是还要扯一句，现阶段 **Commander** 并不怎么适合给
**Ariadne** 使用，即<curtain>强制缝合不可取 desu</curtain>
:::

## `Commander` 是什么

在看完了前面的章节后，想必你立马把 **Commander** 拖到翻译软件里面，看看结果是什么，
但当你扔到翻译软件一看：

|  翻译  | 反向翻译                                         |
| :----: | :----------------------------------------------- |
| 指挥官 | commander                                        |
|  司令  | commander, commanding officer                    |
| 指挥员 | commander                                        |
|  指挥  | conductor, commander, director, dictate          |
|  舰长  | captain, commander, commodore, warship's captain |

<curtain>什么碧蓝航线（划掉）</curtain>

事实上，这个词由 `command`（命令）和 `-er`（的东西<a href="https://zh.wiktionary.org/wiki/-er" target="_blank" title="来自维基词典"><sup>[1]</sup></a>）组成，说白了他就是一个`命令解析器`。

与前文介绍的 `基础消息链处理器` 及 `Twilight` 与下文介绍的 `Alconna`
相比，**Commander** 特点是基于 **pydantic** 进行命令处理。

:::tip
说实话，有一点点像 `Twilight.from_command`。
:::

## 使用 Commander

首先，我们来创建一个 **Commander** 实例：

```python
from creart import create
from graia.ariadne.message.commander import Commander

cmd = create(Commander)
```

然后使用装饰器注册命令：

### 在 Saya 模块中使用

在 **main.py** 中：

```python{1,3}
from graia.ariadne.message.commander.saya import CommanderBehaviour, CommandSchema

saya.install_behaviours(CommanderBehaviour(cmd))
```

在模块中：

```python{1}
@channel.use(CommandSchema(".涩图 {tag}"))
async def setu(tag: str):
    ...
```

### 在 Broadcast 模块中使用

```python{1}
@cmd.command(".涩图 {tag}")
async def setu(tag: str):
    ...
```

## 命令样式

:::tip
如果你想直接知道 `Commander` 所支持的抽象语法，请到[官方文档](https://graia.cn/ariadne/feature/commander/#command)查看

什么，你不知道抽象语法是什么，没关系，[俺也一样](https://zh.moegirl.org.cn/%E4%BF%BA%E4%B9%9F%E4%B8%80%E6%A0%B7)
:::

这里先举一个简单的例子，这是一个 **Commander**：

```sh
[.涩图 | .涩涩] pixiv {tag}
```

他可以接受下面形式的命令：

::::code-group
:::code-group-item A

```sh
.涩图 pixiv A60
```

:::
:::code-group-item B

```sh
.涩涩 pixiv 野兽先辈
```

:::
:::code-group-item C

```sh
.涩涩 pixiv "野兽 先辈"
```

:::
::::

:::tip
对于含有空格的字符串，需要像 shell 那样使用引号包裹，否则不满足匹配规则，例如下方的文本将不会被接受

```sh
.涩涩 pixiv 野兽 先辈
```

:::

通过上面的例子可以看出来，以下3种规则是有效的：

- `[.涩图 | .涩涩]` 这种使用 **中括号**，其中使用 `|` 分隔的代表 **任选其一匹配**
- `pixiv` 这种纯文本代表 **完全匹配**
- `{tag}` 这种使用 **大括号** 括住的代表 **参数定义**，用于在函数中获取这里的值

使用大括号还可以使用像 [PEP 484](https://peps.python.org/pep-0484) 的类型标注和默认值，我们将在下文讲解。

## 参数分派，标注与默认值

上面的例子中，函数形参 `tag` 的值会自动填充为命令中 `{tag}` 位置的值，这叫做函数的**参数分派**。

在参数定义中，还可以进行类型标注和指定默认值，例如下面的例子：

```python
@cmd.command(".涩图 {pid: int = 114514}")
async def setu(pid: int): ...
```

这样就会将 `pid` 自动转换为 `int`，无法转换的将不会执行此函数，不存在时则使用默认值 `114514`。

:::warning
指定默认值，或者通过 `Slot` 指定 `default` / `default_factory` 即认为此项是可选项。

可选项后 **不可跟随** 非可选的文本与参数，但是 `wildcard` 除外。

例如下面的命令是非法的：

```sh
.涩图 {pid: int = 114514} {foo} bar
```

:::

:::warning
需要使用 `\\` 对 `[]{}` 进行转义，或使用 `r''`，只需要 `\`

```python
@cmd.command(r".command {content: List\[str\]}")
# 或
@cmd.command(".command {content: List\\[str\\]}")
```

:::

## wildcard

**wildcard** 模式类似于 `def func(*args)` 中的 `*args`。

此模式下将接收任意数量的参数，并通过类型标注逐个处理，最后会将以 Tuple 形式进行分派。

例如 `{...targets: At}` 分派类型为 `Tuple[At, ...]`，而 `{...pid: int}` 分派类型为 `Tuple[int, ...]`。

除此之外，类型标注还可以使用 `raw`，这种格式的分派类型为 `MessageChain`，即获取原来的单个消息链，例如下面的例子：

```python {3,6,11}
from typing import Tuple
# 在命令中进行类型标注需要在全局作用域中被定义
from graia.ariadne.message.element import At


@cmd.command(".record start {title: str} {...targets: At}")
def parser(title: str, targets: Tuple[At, ...]):
    ...


@cmd.command(".record append {title: str} {...chain: raw}")
def parser(title: str, chain: MessageChain):
    ..
```

## `Slot` 和 `Arg`

### `setting`

`setting` 是装饰器的参数，为一个 `str` 至 `Slot | Arg` 映射, `str` 为实际参数名，例如：

```python
@cmd.command(
    ".cmd {placeholder}",
    setting={"param": Slot("placeholder", str, "")},
)
async def func(param: str):
    ...
```

### `Slot`

`Slot` 用作为于参数重定向，他需要指定一个占位符、类型，以及可选的默认值（`default`）或默认值工厂函数（`default_factory`），例如：

```python
from graia.ariadne.message.commander import Slot


# 注意函数参数的名称
@cmd.command(
    ".涩图 {pid}",
    {"dio": Slot("pid", type=int, default=114514)},
)
async def setu(dio: int):
    ...
```

<curtain>pid：这才是我的逃跑路线哒！</curtain>

### `Arg`

`Arg` 没有拓展语法，且函数标注推断对其无效，因此 `Arg` 必须指定 `default` / `default_factory` 作为没有此参数时的默认值。

而 `Arg` 的 `type` 在单参数/无参数时可以省略, 但在多参数时必须指定，且必须为 `pytantic.BaseModel` 的子类。

该子类需要接受所有多参数的占位符的字段，且必须拥有 `chain_validator` 这个 `validator`，例如：

```python {6}
import pydantic
from graia.ariadne.message.commander import Arg, chain_validator


class ExampleModel(pydantic.BaseModel):
    _ = pydantic.validator("*", pre=True, allow_reuse=True)(chain_validator)
    name: str = ""
    tag: str = ""


Arg(
    "[.info|--info|+I] {name} {tag}",
    type=ExampleModel,
    default=ExampleModel(),
)
```

无参数时, `Arg` 的 `type` 默认为 `bool` 类型, 而 `default` 默认为 `False`，即：

```python
Arg("--option")  # 出现时结果为 True
Arg("--option", default=True)  # 出现时结果为 False
```

单参数时 `Arg` 的 `type` 可以是 `pydantic.BaseModel` 的子类或者任意类型, 默认为 `MessageChain`。

#### `Arg` 用法示例

```python
# 出现 --help 时，help 为 True
@cmd.command(
    ".record {...el: raw}",
    {"help": Arg("--help", default=False)},
)
def parse_help(help: bool):
    ...
```

## 添加转换类型

对于一些特殊的类型 ~~（以及一些特殊的用户）~~ ，你需要使用 `add_type_cast` 自定义转换函数。

例如下面将以 `.` 分隔的字符串或 `MessageChain` 转换为对应的列表类型：

```python
from pydantic.fields import ModelField


def cast_to_list(value: MessageChain, field: ModelField):
    if field.outer_type_ is List[str]:
        return value.display.split(".")
    if field.outer_type_ is List[MessageChain]:
        return value.split(".")
    return value


cmd.add_type_cast(cast_to_list)
```

这样就添加了 `List[str]` 与 `List[MessageChain]` 两种类型支持。

:::interlink
<https://graia.cn/ariadne/feature/commander/>
:::
