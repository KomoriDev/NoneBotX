# 你好类型

在本节中，您将了解如何向函数添加类型提示。通过声明变量的类型，编辑器和一些工具能给你提供更好的支持。

整个 NoneBot 都基于这些类型提示构建，它们带来了许多优点和好处。

但即使你不会用到它，了解一下类型提示也会让你从中受益。

## 最小实例

让我们从一个简单的例子开始：

```py
def get_full_name(first_name, last_name):
    full_name = first_name.title() + " " + last_name.title()
    return full_name

print(get_full_name("john", "doe"))
```

运行这段程序将输出：

```bash
John Doe
```

这个函数做了下面这些事情：

- 接收 `first_name` 和 `last_name` 参数。
- 通过 `title()` 将每个参数的第一个字母转换为大写形式。
- 中间用一个空格来拼接它们。

现在是我们的第一个类型提示的时候了！要将有关类型的信息添加到函数中，只需注释其参数和返回值，如下所示：

```py {2}
def get_full_name(first_name: str, last_name: str) -> str:
    full_name = first_name.title() + " " + last_name.title()
    return full_name

print(get_full_name("john", "doe"))
```

在语法方面，这和声明默认值是不同的，例如：

```py
first_name="john", last_name="doe"
```

这两者不一样。

在风格方面，[PEP 8] 建议如下：

::: tip 提示
您可以使用 [Black] 快速格式化您的代码。
:::

- 对冒号使用正常规则，即冒号之前没有空格，冒号之后有一个空格：`text: str`。
- `=` 将参数注释与默认值组合时，请在符号周围使用空格：`last_name: str = "doe"`。
- 在 `->` 周围使用空格：`def get_full_name(...) -> str`。

像这样添加类型提示不会产生运行时效果：它们只是提示，不会自行强制执行。例如，如果我们对无效的参数使用错误的类型，代码仍然可以运行，不会出现任何问题或警告：

## 申明类型

### 简单类型

在刚刚的 `headline` 方法中，我们申明了第一个 **简单类型**。不只是 `str`、`bool`，你能够声明所有的标准 Python 类型。

比如以下类型：

- `int`
- `float`
- `bytes`

```py
def get_items(
    item_a: str,
    item_b: int,
    item_c: float,
    item_d: bool,
    item_e: bytes
):
    return item_a, item_b, item_c, item_d, item_d, item_e
```

### 嵌套类型

有些容器数据结构可以包含其他的值，比如 `dict`、`list`、`set` 和 `tuple`。它们内部的值也会拥有自己的类型。

你可以使用 Python 的 `typing` 标准库来声明这些类型以及子类型。它专门用来支持这些类型提示。

#### 列表

让我们来定义一个由 `str` 组成的 `list` 变量。

::: code-group

```py [3.8+]
from typing import List

def process_items(items: List[str]):
    for item in items:
        print(item)
```

```py :no-line-numbers [3.10+]
def process_items(items: list[str]):
    for item in items:
        print(item)
```

:::

#### 元组和集合

声明 `tuple` 和 `set` 的方法也是一样的：

::: code-group

```py [3.8+]
from typing import Set, Tuple

def process_items(items_t: Tuple[int, int, str], items_s: Set[bytes]):
    return items_t, items_s
```

```py [3.10+]
def process_items(items_t: tuple[int, int, str], items_s: set[bytes]):
    return items_t, items_s
```

:::

这表示：

- 变量 `items_t` 是一个 `tuple`，其中的前两个元素都是 `int` 类型, 最后一个元素是 `str` 类型。
- 变量 `items_s` 是一个 `set`，其中的每个元素都是 `bytes` 类型。

#### 字典

定义 `dict` 时，需要传入两个子类型，用逗号进行分隔。

第一个子类型声明 `dict` 的所有键，第二个子类型声明 `dict` 的所有值：

::: code-group

```py [3.8+]
from typing import Dict

def process_items(prices: Dict[str, float]):
    for item_name, item_price in prices.items():
        print(item_name)
        print(item_price)
```

```py [3.10+]
def process_items(prices: dict[str, float]):
    for item_name, item_price in prices.items():
        print(item_name)
        print(item_price)
```

:::

这表示：

- 变量 `prices` 是一个 `dict`：
  - 这个 `dict` 的所有键为 `str` 类型（可以看作是字典内每个元素的名称）。
  - 这个 `dict` 的所有值为 `float` 类型（可以看作是字典内每个元素的价格）。

### 类作为类型

你也可以将类声明为变量的类型。

假设你有一个名为 `Person` 的类，拥有 `name` 属性：

```py {1,2,3}
class Person:
    def __init__(self, name: str):
        self.name = name


def get_person_name(one_person: Person):
    return one_person.name
```

接下来，你可以将一个变量声明为 `Person` 类型：

```py {6}
class Person:
    def __init__(self, name: str):
        self.name = name


def get_person_name(one_person: Person):
    return one_person.name
```

然后，你将再次获得所有的编辑器支持

~~理论上，这里应该有一张图片~~

[PEP 8]: https://peps.python.org/pep-0008/
[Black]: https://github.com/psf/black
