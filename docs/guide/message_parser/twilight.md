# Twilight

:::danger
本章还没有写完且可能会过时，本章所适用的 Ariadne 版本请参考第一小节。
:::

## Twilight 是什么

`Twilight` 是 Ariadne 使用的一种标准消息链匹配工具。（有点类似于 v4 的 Kanata，但其增加了类似 argparse 的操作）

:::tsukkomi ???
`Twilight` 这个名字取自于 `My little Pony` 中的 `Twilight Sparkle`。

Friendship is magic!

<curtain>来点暮光闪闪涩图<curtain> 人不能，至少不应该</curtain></curtain>
:::

## 创建 Twilight

:::warning
Twilight 的使用方法一致在跟随 Ariadne 的版本迭代进行改进。
因此在参照本文或官方文档的内容时，请时刻注意文档适用的 Ariadne 版本以及你自己所使用的 Ariadne 版本。

如无特殊标注，本章中例子适用的 Ariadne 版本范围为 `^0.7.0`（即 `>=0.7.0, <0.8.0`）。
:::

以下演示 Twilight 的两种创建方法：

::::code-group
:::code-group-item from_command

```python
from graia.ariadne.message.parser.twilight import Twilight


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[Twilight.from_command("涩图来 {at} {any}")],
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
:::code-group-item Match

```python
from graia.ariadne.message.element import At
from graia.ariadne.message.parser.twilight import (
    FullMatch,
    SpacePolicy,
    Twilight,
    WildcardMatch,
)


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[
            Twilight(
                FullMatch("涩图来").space(SpacePolicy.FORCE),
                "at" @ ElementMatch(At).space(SpacePolicy.FORCE),
                ParamMatch() @ "sth1",
                "sth2" << ParamMatch(),
                WildcardMatch() >> "sth3",
            ),
        ]
    )
)
async def test(app: Ariadne, group: Group):
    pass
```

:::
::::

:::warning
上述代码中的匹配参数是强行创造需求，无实际意义。
:::

### 代码解析

上面的代码中展示了两种 Twilight 的创建方式，下面我们分别说说这两种创建方式具体发生了什么。

#### `Twilight.from_command()` 方法

`from_command` 顾名思义，就是从命令模板中生成 Twilight。
在上面的例子中，我们给他输入了这样一串字符串：`涩图来 {at} {any}`

怎么样，是不是觉得一目了然？
这条字符串的意思就是，我们需要一条命令，
该命令以“**涩图来**”作为前缀，同时他还需要两个参数，其中一个名为 `at`，另一个名为 `any`。

于是我们就得到了如下的 Twilight 实例：

```python
>>> Twilight.from_command('涩图来 {at} {any}')
<Twilight: [ParamMatch('PARAM', space='FORCE', flags=), ParamMatch('PARAM', space='NOSPACE', flags=)]>
```

可以看到，我们的 `{at}` 和 `{any}` 变成了两个 `ParamMatch`，而什么是 `ParamMatch` 呢？请看后面一节。

#### 直接使用 `Twilight()`

在这个这个例子中，没有使用任何 Twilight 的方法，而是直接传入了一个含有多个 Match 的列表来实例化了一个 Twilight 类，
同时传入了 3 个 **XxxxxMatch**，并且其中的 `FullMatch` 和 `ElementMatch` 都各自有一个 `.space()`。

并且，存在了以下 4 种奇奇怪怪的用法：

- `"at" @ ElementMatch(At)`
- `ParamMatch() @ "sth1"`
- `"sth2" << ParamMatch()`
- `WildcardMatch() >> "sth3"`

这又是在干什么呢？其实，他们是用来指定参数名称的，具体作用我们后面会讲到。

那么这样创建的 Twilight 实例又长什么样呢？让我们来看一看：

```python
>>> Twilight(
...     FullMatch("涩图来").space(SpacePolicy.FORCE),
...     "at" @ ElementMatch(At).space(SpacePolicy.FORCE),
...     "any" @ WildcardMatch(),
... )
<Twilight: [ElementMatch(<class 'graia.ariadne.message.element.At'>, space='FORCE', flags=), WildcardMatch('.*', space='PRESERVE', flags=)]>
```

有个问题，刚刚我们使用 `Twilight.from_command()` 生成的 Twilight 中有两个 `ParamMatch`，
`ParamMatch`、`ElementMatch`、`FullMatch`、`WildcardMatch` 这几个玩意都是
**XxxxxMatch** 这样的格式，**XxxxxMatch** 到底是什么？下一节我们就来好好讲一讲。

### 原理分析

所以 Twilight 的实现原理是什么，
为什么它可以在匹配成功的时候才调用我们的函数呢（在上面的例子就是当收到的消息为 `涩图来` 的时候才会发送图片）？

这就得说一说 Dispatcher 了。

先看看 Twilight 的定义：

```python
class Twilight(Generic[T_Sparkle], BaseDispatcher):
    """暮光"""
```

从本质上来说，Twilight 是一种 **Dispatcher**，他继承了 BCC 的 **BaseDispatcher** 类。  
当把他作为 **Dispatcher** 传给 **BCC** 时，假设 **BCC** 接收到了我们指定的事件（如：**GroupMessage**），
**BCC** 就会把 **GroupMessage** 中的消息链交给 **Twilight** 进行解析，当 **Twilight** 解析失败的时候，
他就会抛出 `ExecutionStop` 错误，然后 **BCC** 捕获到该错误就不会调用我们注册的函数了。

## XxxxxMatch?

:::tip
下面部分内容来自 Ariadne 官方文档。

本章所有需要 import 的类出消息元素（Elemen）外，  
均来自 `graia.ariadne.message.parser.twilight` 中。
:::

想必你已经迫不及待了吧，首先，解答一下刚刚提出的问题 **XxxxxMatch** 到底是什么？

**Match** 是一类组成 Twilight 的基本元素，他是 Twilight 的基础，
用来表示我们需要匹配的各种参数，如文本、消息元素等等，
通过不同组合的 **Match**，就可以让我们轻松地匹配我们想要的东西了。

:::tsukkomi
~~好像说了什么，又好像没说的样子~~
:::

那么就让我们来康一康目前 Ariadne 有哪些 **Match** 吧。
首先需要声明一下，`Match` 类本身仅为**抽象基类**，无法被直接实例化，他有以下几种变体：

- `RegexMatch`: 正则表达式匹配
- `FullMatch`: 严格全匹配（匹配字符串）
- `UnionMatch`: 多重全匹配（匹配时满足其传入的多个字符串中的一个即为匹配成功）
- `ElementMatch`: 消息元素匹配（如 `At`、`Image`等）
- `WildcardMatch`: 泛匹配（任意匹配/贪婪匹配，包括空格等）
- `ParamMatch`: 泛匹配（任意匹配，可通过引号与空格确定匹配起止）
- `ArgumentMatch`: 参数匹配（即：`-t xx`、`--type xx` 等）

那么就让我们分别介绍一下每一种 **Match** 吧~

### 共有选项

先等一下，在此之前，我需要向大家介绍一下大部分 `XxxxxMatch` 都有的 `optional` 选项。
这个选项的真假代表了这个 `XxxxxMatch` 是否是**可选项**

举个栗子

```python
Twilight(
    FullMatch("涩图"),
    FullMatch("来", optional=True),
)
```

以上栗子可以同时通过 `涩图` 和 `涩图来` 触发

### RegexMatch

`RegexMatch` 是 Twilight 的基础，它可以匹配指定的正则表达式。

创建一个 UnionMatch 的方法如下：

```python
>>> RegexMatch(r"\d+")
```

另外，下面即将介绍到的 `FullMatch`、`UnionMatch`、`ParamMatch`、`WildcardMatch`
都是基于 `RegexMatch` 的包装类（即 `RegexMatch` 拥有的方法及选项，这几种 Match 也可以用噢）。

#### `flags` 方法

你可以通过该方法设置正则表达式的匹配标记，例如：

```python
>>> RegexMatch(r"\d+ # digits").flags(re.X)  # 设置 re.VERBOSE 标记
```

:::interlink
什么？你不会正则？那你可以去学学噢~  
要是你想去学的话，你可以看看[这篇来自 Python 官方的文档](https://docs.python.org/zh-cn/3/howto/regex.html)（中文）。
:::

#### `space` 方法

这是一个比较有用的方法，通过这个方法，你可以设置匹配的时候要求这个 Match
的匹配内容后面是否需要空格。

该方法的使用例如下：

```python
>>> from graia.ariadne.message.parser.twilight import SpacePolicy
>>> RegexMatch(r"\d+").space(SpacePolicy.NOSPACE)
>>> RegexMatch(r"[a-z]+").space(SpacePolicy.FORCE)
>>> RegexMatch(r"[A-Z]+").space(SpacePolicy.PRESERVE)
```

其中 `SpacePolicy` 具有如下常量:

- `NOSPACE`: 不附带尾随空格（即该 Match 的匹配内容后面必须不是空格）
- `PRESERVE`: 预留尾随空格（即该 Match 的匹配内容后面有没有空格都没关系）
- `FORCE`: 强制需要尾随空格（即该 Match 的匹配内容后面必须有空格）

:::tip
`PRESERVE` 和 `FORCE` 的情况下，不管尾随了多少个空格，都会被去掉 desu
:::

### FullMatch

相信通过前面几章的用例，你已经大概了解了 FullMatch 具体怎么用了吧，这里就不过多介绍了。

由于 FullMatch 继承自 RegexMatch，因此他也具有 `flags` 和 `space` 方法。

### UnionMatch

在前面，我们提到 UnionMatch 是**多重全匹配**，意即匹配时满足其传入的多个字符串中的一个即为匹配成功。

创建一个 UnionMatch 的方法如下：

```python
>>> tmp_list = ["你可以匹配我", "或者我", "我也可以"]
>>> UnionMatch("你可以匹配我", "或者我", "我也可以")
>>> UnionMatch(*tmp_list)  # 请注意星号
>>> UnionMatch("你可以匹配我", "或者我", "我也可以", optional=True)
>>> UnionMatch(*tmp_list, optional=True)  # 请注意星号
```

相比 FullMatch 和 RegexMatch，UnionMatch 多了一个 `optional` 的选项，
当该选项设置为 **True** 时，表示该 UnionMatch 为可选。

### ElementMatch

ElementMatch 可以用来匹配各种在消息链中可以与文字共存的消息元素，
譬如：At、Image、AtAll、Face、MarketFace。

创建一个 ElementMatch 的方法如下：

```python
>>> ElementMatch(At)
>>> ElementMatch(At, optional=True)
```

同样的 ElementMatch 也具有 `optional` 选项。

### WildcardMatch

泛匹配/贪婪匹配/任意匹配，创建时无需传入任何参数。
并且他对要匹配的字符串的长度没有任何要求，就算是 `""` 也算匹配成功，使用时需多多注意。

**请注意**，一般情况下请不要将放于其他 Match 的前面，否则可能会出现意外问题。

### ParamMatch

泛匹配/任意匹配，他与 WildcardMatch 相似，但他要求至少一个字符，
并且可以匹配到被引号包含起来的含空格的字符串。

例如，有一个 Twilight（以下两种创建 Twilight 的方式等价）：

::::code-group
:::code-group-item from_command 方式

```python
Twilight.from_command("歌词 {lyrics} 好耶")
```

:::
:::code-group-item Match 方式

```python
Twilight(
    FullMatch("歌词").space(SpacePolicy.FORCE),
    "lyrics" @ ParamMatch().space(SpacePolicy.FORCE),
    FullMatch("好耶"),
)
```

::::

那么，这个 Twilight 可以成功匹配到下面这几种字符串：

- `歌词 我有一只小毛驴我从来都不骑 好耶`
- `歌词 "我有一只小毛驴 我从来都不骑" 好耶`
- `歌词 '我有一只小毛驴 我从来都不骑' 好耶`

请注意，上述中的引号仅可使用 **竖直** 的英文（半角）引号，即 `"` 与 `'`，不可使用括号或中文（全角）的引号

### ArgumentMatch

ArgumentMatch 是 Twilight 的一大亮点，他可以像一般的命令行程序一样，
识别诸如 `-t group` 及 `--type member` 这样的命令格式。

先来认识以下 **ArgumentMatch**，他的思路与 **RegexMatch** 不同，他基于 **argparse** 进行参数解析，
他也是目前 **Twilight** 唯一一个不是继承自 **RegexMatch** 的 **Match**。

**ArgumentMatch** 的初始化方法与 **add_argument** 非常相似。

:::interlink
有关 **add_argument** 的用法及定义，可以的点击[这里查看这篇 Python 官方的文档](https://docs.python.org/zh-cn/3/library/argparse.html#argparse.ArgumentParser.add_argument)（中文）。
:::

受限于篇幅及其理解难度，这里不详细展开（~~其实是因为作者也不太会用~~）。  
只能给出几个官方用例:

```python
>>> ArgumentMatch("-s", "--switch", action="store_true")  # 开关
>>> ArgumentMatch("-o", "--opt", type=str, choices=["head", "body"])  # 只允许 "head" 或 "body"
>>> ArgumentMatch("-m", choices=MessageChain(["choice_a", "choice_b"]))  # 注意默认是 MessageChain, 所以要这样写
```

以及几个常见用例：

```python
>>> ArgumentMatch("-t", "--type", default="group")  # 可指定默认值，即匹配不成功时使用该默认值作为匹配结果
>>> ArgumentMatch("-a", optional=True)  # 同样的，ArgumentMatch 也可以为可选项
```

:::warning
如果有多个 **ArgumentMatch**，请不要指定相同的参数！例如下面的错误示范：

```python
Twilight(
    ArgumentMatch("-t", "--type"),
    ArgumentMatch("-t", "--target"),
)
```

:::

## 参数分配与 `MatchResult`

既然 Twilight 有这么多种 Match，而且我们搞这么麻烦用没有意义呢？

**当然有！**我们可以通过**参数分配**及 `MatchResult` 来获取每一个 Match 的匹配结果，
这样就可以省去非常多的我们自己解析消息参数的时间和步骤了。

### 参数分配

首先，我们要知道何为 **参数分配** 及 `MatchResult`。

在前面几节中，我们出现了类似 `"at" @ ElementMatch(At)` 或 `"at" << ElementMatch(At)` 这样的用法，
这里的 `"at" @` 就是给 `ElementMatch(At)` 分配了一个名为 `at` 的参数名，
当然，这里也可以使用任何你喜欢的字符串。

你可能会很好奇，为什么会有 `@` 和 `<<` 这样的用法呢？其实这是 Python 自带的一个运算符，
Twilight 重载了这个运算符使其执行了 `Match.param()` 的这个方法，
也就是说 `"at" @ ElementMatch(At)` 等价于 `ElementMatch(At).param("at")`。
另外，因为 `@` 与 `<<` 都是运算符，因此也可以把 `"At"` 放到 `ElementMatch(At)` 的后面。

:::warning
请注意，位移运算符 `>>` 与 `<<` 因始终朝向字符串，即由 **Match** 指向 **str**。
:::

除了 `"at" @ ElementMatch(At)` 这样的用法外，其实我们在 `from_command()` 中也用到了参数分配噢。
我们刚刚提到 `Twilight.from_command()` 有其对应的 `Twilight([])` 方式，
易得（bushi）`Twilight.from_command("涩图来 {lyrics}")` 中的 `lyrics` 是给其对应的 `ParamMatch` 进行了参数匹配。

### `MatchResult`

我们刚刚说过，我们可以获取每一个 Match 的匹配结果，那到底该怎么做呢？

这里我们就不多说废话，老规矩，直接上实例:

::::code-group
:::code-group-item MatchResult

```python
from graia.ariadne.message.parser.twilight import (
    FullMatch,
    ParamMatch,
    RegexResult,
    Twilight,
)


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[Twilight.from_command("歌词 {lyrics1} {lyrics2} 好耶")],
    )
)
async def lyric_xxx(app: Ariadne, group: Group, lyrics1: RegexResult, lyrics2: RegexResult):
    print(lyrics1.result)
    print(type(lyrics1.result))
    print(lyrics1.result.__repr__)

    print(lyrics2.result)
    print(type(lyrics2.result))
    print(lyrics2.result.__repr__)


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[
            Twilight(
                FullMatch("歌词").space(SpacePolicy.FORCE),
                "lyrics1" @ ParamMatch().space(SpacePolicy.FORCE),
                "lyrics2" @ ParamMatch().space(SpacePolicy.FORCE),
                FullMatch("好耶"),
            ),
        ]
    )
)
async def lyric_xxx(app: Ariadne, group: Group, lyrics1: RegexResult, lyrics2: RegexResult):
    print(lyrics1.result)
    print(type(lyrics1.result))
    print(lyrics1.result.__repr__)

    print(lyrics2.result)
    print(type(lyrics2.result))
    print(lyrics2.result.__repr__)
```

:::
:::code-group-item Sparkle

```python
...
# 本方法不受推荐，也不属于 MatchResult，放在这里只是因为这样也可以获得匹配结果
# 请不要问此处的 Sparkle 是什么，他是 Twilight 的内部类，用于暴露内部的 MatchResult
# 提供 Sparkle 是为了方便你动态获取 MatchResult, 虽然并不推荐你动态创建 Twilight
from graia.ariadne.message.parser.twilight import (
    FullMatch,
    ParamMatch,
    RegexResult,
    Sparkle,
    Twilight,
)


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[Twilight.from_command("歌词 {lyrics1} {lyrics2} 好耶")],
    )
)
async def lyric_xxx(app: Ariadne, group: Group, sparkle: Sparkle):
    print(sparkle.__repr__)

    lyrics1 = sparkle["lyrics1"]
    print(lyrics1.result)
    print(type(lyrics1.result))
    print(lyrics1.result.__repr__)

    lyrics1 = sparkle["lyrics2"]
    print(lyrics2.result)
    print(type(lyrics2.result))
    print(lyrics2.result.__repr__)


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[
            Twilight(
                FullMatch("歌词").space(SpacePolicy.FORCE),
                "lyrics1" @ ParamMatch().space(SpacePolicy.FORCE),
                "lyrics2" @ ParamMatch().space(SpacePolicy.FORCE),
                FullMatch("好耶"),
            ),
        ],
    )
)
async def lyric_xxx(app: Ariadne, group: Group, sparkle: Sparkle):
    print(sparkle.__repr__)

    lyrics1 = sparkle["lyrics1"]
    print(lyrics1.result)
    print(type(lyrics1.result))
    print(lyrics1.result.__repr__)

    lyrics1 = sparkle["lyrics2"]
    print(lyrics2.result)
    print(type(lyrics2.result))
    print(lyrics2.result.__repr__)
```

:::
::::

`MatchResult` 除了他本身外还有三种变体，分别是 `RegexResult`、`ArgResult`、`ElementResult`，
这三个分别对应了 `RegexMatch` 及从其继承出来的其他几种 Match（不含 **ElementMatch**），
还有 **ArgumentMatch** 和 **ElementMatch**。

推荐你在获取匹配结果的时候首选 Match 对应的 Result, 因为这几个变体提供了对应的类型推断与代码补全, 从而防止静态检查器找你的麻烦。

`MatchResult` 及其变体们都具有以下三个属性：

- `MatchResult.matched`: 对应的 Match 对象是否匹配（当 `optional` 为 `False` 时必为 `True`，当 `optional` 为 `True` 时，可通过类似下面的例子判断匹配是否成功）

  ```python
  @channel.use(
      ListenerSchema(
          listening_events=[GroupMessage],
          inline_dispatchers=[
              Twilight(
                  FullMatch("歌词").space(SpacePolicy.FORCE),
                  "lyrics1" @ ParamMatch(optional=True).space(SpacePolicy.FORCE),
                  "lyrics2" @ ParamMatch(optional=True).space(SpacePolicy.FORCE),
                  FullMatch("好耶"),
              ),
          ],
      )
  )
  async def lyric_xxx(app: Ariadne, group: Group, lyrics1: RegexResult, lyrics2: RegexResult):
      if lyrics1.matched:
          ...
      if lyrics2.matched:
          ...
      if not lyrics1.matched and not lyrics2.matched:
          ...
  ```

- `MatchResult.origin`: 原始 Match 对象（就是 `XxxxxMatch` 本身）
- `MatchResult.result`: 匹配结果（一般为 `MessageChain`，`ElementMatch` 为 `Element`）

:::tip
虽然可能没啥用，但是假设你只需要 `MatchResult.origin`，也可以使用以下办法

```python
from graia.ariadne.message.parser.twilight import Twilight, ParamMatch


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[Twilight.from_command("歌词 {lyrics} 好耶")],
    )
)
async def lyric_xxx(app: Ariadne, group: Group, lyrics: ParamMatch):
    ...
```

:::

#### `ResultValue` 装饰器

假设我们只需要拿到匹配结果（也就是必能匹配成功拿到结果的情况下，比如将 **Twilight**
用在 **dispatcher** 里且你要拿匹配结果的 **Match** 没有设置 `optional=True` 的时候），那么可以不可以更简单一点呢？

**那必须可以啊！**

这时候我们就要祭出 `ResultValue` 装饰器了。

将 `ResultValue` 作为装饰器使用，可以直接获取匹配结果而不需要从 `MatchResult.result` 提取了。

:::tsukkomi
再也不用忍受 `MatchResult.result.display` 被标红的烦恼了！
:::

用例如下（摘录自 Ariadne 官方文档）：

```python {12}
@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        inline_dispatchers=[
            Twilight(
                FullMatch(".command"),
                "arg" @ RegexMatch(r"\d+", optional=True),
            ),
        ],
    )
)
async def reply(..., arg: MessageChain = ResultValue()):  # 保证不会被正常的流程覆盖
    ...
```

#### `ForceResult`

因为太懒了，不想写，就直接放原文吧~

<chat-window title="Graia Framework Community">
  <chat-toast>2022/6/10 星期五 下午 8:48:46</chat-toast>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">记得提一下 ForceResult</chat-msg>
  <chat-msg name="群菜狗" avatar="http://q1.qlogo.cn/g?b=qq&nk=731347477&s=640" onright><chat-quote name="群菜鸮">记得提一下 ForceResult</chat-quote>啊？这是什么</chat-msg>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">你不是说有 if xx.matched 没有类型保证吗</chat-msg>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">我弄了个有类型保证的（</chat-msg>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">当然前提是 matched</chat-msg>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">arg: ForceResult[MessageChain]</chat-msg>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">然后 arg.result 就不是 Optional[MessageChain] 了</chat-msg>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">是 MessageChain</chat-msg>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">相当于帮你走了一遍 typing.cast</chat-msg>
  <chat-msg name="群菜狗" avatar="http://q1.qlogo.cn/g?b=qq&nk=731347477&s=640" onright>那这个和 ResultValue 哪个更优捏</chat-msg>
  <chat-toast>提示：下面这个问题已修复</chat-toast>
  <chat-msg name="群菜块" avatar="http://q1.qlogo.cn/g?b=qq&nk=2907489501&s=640">草，我ResultValue好像写炸了<br />ForceResult倒是没问题</chat-msg>
</chat-window>

:::interlink
<https://graia.cn/ariadne/feature/twilight/>
:::
