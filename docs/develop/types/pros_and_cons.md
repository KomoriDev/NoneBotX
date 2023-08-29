# 优点和缺点

上一节让您初步了解了 Python 中的类型检查是什么样子的。您还看到了向代码添加类型的优点之一的示例：类型提示有助于**捕获某些错误**。其他优点包括：

- 类型提示有助于记录您的代码。传统上，如果您想记录函数参数的预期类型，您将使用文档字符串。这是可行的，但由于文档字符串没有标准（尽管有 [PEP 257]），它们不能轻松地用于自动检查。

- 类型提示**改进了 IDE 和 linter**。它们使静态推理代码变得更加容易。这反过来又允许 IDE 提供更好的代码完成和类似的功能。通过类型注释，PyCharm 知道这 `text` 是一个字符串，便可以据此给出具体建议

- 类型提示可帮助您**构建和维护更简洁的体系结构**。编写类型提示的行为迫使您考虑程序中的类型。虽然 Python 的动态特性是其重要资产之一，但意识到依赖鸭子类型、重载方法或多返回类型是一件好事。

当然，静态类型检查并不全是桃子和奶油。您还应该考虑一些缺点：

- 添加类型提示需要开发人员花费时间和精力。尽管它可能会花费更少的时间进行调试，但您将花费更多的时间输入代码。

- 类型提示**在现代 Python 中效果最好**。注解是在 Python 3.0 中引入的，并且可以在 Python 2.7 中使用类型注释。尽管如此，诸如变量注释和延迟评估类型提示之类的改进意味着您将有更好的使用 Python 3.6 甚至Python 3.7进行类型检查的体验。

- 类型提示会对启动时间造成轻微的影响。如果您需要使用 `typing` 模块，导入时间可能会很长，尤其是在短脚本中。

::: details 计算导入时间
稍后您将了解该 `typing` 模块，以及在大多数情况下添加类型提示时它的必要性。导入模块必然需要一些时间，但是需要多少时间呢？

要了解这一点，请创建两个文件：`empty_file.py` 应该是一个空文件，而 `import_typing.py` 应该包含以下行：

```py :no-line-numbers
import typing
```

在 Linux 上，使用 Python 3.12 支持的 `perf` 实用程序可以很容易地计算 `typing` 导入花费的时间：

```bash :no-line-numbers
$ perf stat -r 1000 python3.6 import_typing.py

 Performance counter stats for 'python3.6 import_typing.py' (1000 runs):

 [ ... extra information hidden for brevity ... ]

       0.045161650 seconds time elapsed    ( +-  0.77% )
```

因此运行该 `import typing.py` 脚本大约需要 45 毫秒。当然，这并不是所有时间都花在导入上 `typing`。其中一些是启动 Python 解释器的开销，所以让我们与在空文件上运行 Python 进行比较：

```bash :no-line-numbers
$ perf stat -r 1000 python3.6 empty_file.py

 Performance counter stats for 'python3.6 empty_file.py' (1000 runs):

 [ ... extra information hidden for brevity ... ]

       0.028077845 seconds time elapsed    ( +-  0.49% )
```

根据此测试，在 Python 3.6 上导入模块 `typing` 大约需要 17 毫秒。

Python 3.7 中宣传的改进之一是启动速度更快。让我们看看结果是否不同：

```bash :no-line-numbers
$ perf stat -r 1000 python3.7 import_typing.py
 [...]
       0.025979806 seconds time elapsed    ( +-  0.31% )

$ perf stat -r 1000 python3.7 empty_file.py
 [...]
       0.020002505 seconds time elapsed    ( +-  0.30% )
```

事实上，总体启动时间减少了约 8 毫秒，导入 `typing` 的时间从 17 毫秒减少到约 6 毫秒，几乎快了 3 倍。

### 使用 timeit

其他平台上也有类似的工具。Python 本身附带了 `timeit` 标准库中的模块。通常，我们会直接使用 `timeit` 上面的计时。然而，`timeit` 很难可靠地计时导入，因为 Python 很聪明，只导入模块一次。考虑以下示例：

<v-termynal forward-button restart-button lazy>
  <vt-input>python3.6 -m timeit "import typing"</vt-input>
  <vt-text>10000000 loops, best of 3: 0.134 usec per loop</vt-text>
</v-termynal>

当您得到结果时，您应该对结果持怀疑态度：0.1 微秒比测量值快了 100000 倍以上！实际上 `timeit` 所做的是运行该 `import typing` 语句 3000 万次，而 Python 实际上只导入typing一次。

为了获得合理的结果，你可以告诉timeit只运行一次：

<v-termynal forward-button restart-button lazy>
  <vt-input>python3.6 -m timeit -n 1 -r 1 "import typing"</vt-input>
  <vt-text>1 loops, best of 1: 9.77 msec per loop</vt-text>
  <vt-input>python3.7 -m timeit -n 1 -r 1 "import typing"</vt-input>
  <vt-text>1 loop, best of 1: 1.97 msec per loop</vt-text>
</v-termynal>

### 使用 importtime

Python 3.7 中还有一个新的命令行选项，可用于计算导入需要多长时间。使用 `-X importtime` 您将获得有关所有导入的报告：

```bash :no-line-numbers
$ python3.7 -X importtime import_typing.py
import time: self [us] | cumulative | imported package
[ ... some information hidden for brevity ... ]
import time:       358 |        358 | zipimport
import time:      2107 |      14610 | site
import time:       272 |        272 |   collections.abc
import time:       664 |       3058 |   re
import time:      3044 |       6373 | typing
```

这显示了类似的结果。导入 `typing` 大约需要 6 毫秒。如果您仔细阅读该报告，您会发现大约一半的时间花费在导入 `typing` 所依赖的`collections.abc` 和 `re` 模块上。

:::

::: tsukkomi ~~现在使用类型检查还来得及吗~~
幸运的是，Python 支持**渐进类型**的概念，意思是您可以逐渐将类型引入代码中。没有类型提示的代码将被静态类型检查器忽略。因此，您可以开始向关键组件添加类型，只要它能为您增加价值就可以继续。
:::

## 经验

关于是否向项目添加类型的一些经验是：

- 如果您刚刚开始学习 Python，您可以放心地等待类型提示，直到您有更多经验。

- 类型提示在简短的一次性脚本中几乎没有什么价值。

- 若您决定要将自己的程序发布到 PyPI，类型提示会增加很多价值。使用您的库的其他代码需要这些类型提示来对其进行正确的类型检查。有关使用类型提示的项目示例，请参阅 Black 或 Mypy。

希望您现在已经了解类型检查在 Python 中的工作原理以及您是否愿意在自己的项目中使用它。

在本指南的其余部分中，我们将更详细地介绍 Python 类型系统，包括如何键入使用没有类型提示的库的检查代码，以及如何在运行时使用注释。

[PEP 257]: https://peps.python.org/pep-0257/
