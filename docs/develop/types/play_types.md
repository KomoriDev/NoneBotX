# 玩转类型

到目前为止，您仅在类型提示中使用了基本类型，例如 `str`、`float` 和 `bool` 等。Python类型系统非常强大，支持多种更复杂的类型。这是必要的，因为它需要能够合理地模拟 Python 的动态鸭子类型本质。

## 一副纸牌

```py :no-line-numbers
# game.py

import random

SUITS = "♠ ♡ ♢ ♣".split()
RANKS = "2 3 4 5 6 7 8 9 10 J Q K A".split()

def create_deck(shuffle=False):
    """创建一副新的 52 张牌"""
    deck = [(s, r) for r in RANKS for s in SUITS]
    if shuffle:
        random.shuffle(deck)
    return deck

def deal_hands(deck):
    """将这副牌中的牌分给四个人"""
    return (deck[0::4], deck[1::4], deck[2::4], deck[3::4])

def play():
    """玩 4 人纸牌游戏"""
    deck = create_deck(shuffle=True)
    names = "P1 P2 P3 P4".split()
    hands = {n: h for n, h in zip(names, deal_hands(deck))}

    for name, cards in hands.items():
        card_str = " ".join(f"{s}{r}" for (s, r) in cards)
        print(f"{name}: {card_str}")

if __name__ == "__main__":
    play()
```

每张牌都表示为表示花色和等级的字符串元组。牌组表示为牌列表。`create_deck()` 创建一副常规的 52 张扑克牌，并可选择洗牌。 `deal_hands()` 处理牌组发给四名玩家的牌。

最后，`play()` 玩游戏。到目前为止，它只是通过构建洗牌并向每个玩家发牌来准备纸牌游戏。以下是典型的输出：

<v-termynal forward-button restart-button lazy>
  <vt-input>python game.py</vt-input>
  <vt-text>P4: ♣9 ♢9 ♡2 ♢7 ♡7 ♣A ♠6 ♡K ♡5 ♢6 ♢3 ♣3 ♣Q</vt-text>
  <vt-text>P1: ♡A ♠2 ♠10 ♢J ♣10 ♣4 ♠5 ♡Q ♢5 ♣6 ♠A ♣5 ♢4</vt-text>
  <vt-text>P2: ♢2 ♠7 ♡8 ♢K ♠3 ♡3 ♣K ♠J ♢A ♣7 ♡6 ♡10 ♠K</vt-text>
  <vt-text>P3: ♣2 ♣8 ♠8 ♣J ♢Q ♡9 ♡J ♠4 ♢8 ♢10 ♠9 ♡4 ♠Q</vt-text>
</v-termynal>

随着我们的进展，您将看到如何将此示例扩展为更有趣的游戏。

## 序列和映射

让我们为我们的纸牌游戏添加类型提示。换句话说，我们来注释函数 `create_deck()`、`deal_hands()` 和 `play()`。第一个挑战是您需要注释复合类型，例如用于表示一副牌的列表和用于表示牌本身的元组。

对于 `str`、`float` 和 `bool` 等简单类型，添加类型提示就像使用类型一样简单：

<v-termynal forward-button restart-button lazy>
  <vt-input prompt=">>>">name: str = "Guido"</vt-input>
  <vt-input prompt=">>>">pi: float = 3.142</vt-input>
  <vt-input prompt=">>>">centered: bool = False</vt-input>
</v-termynal>

对于嵌套类型，您可以执行相同的操作：

```py
names: list = ["Guido", "Jukka", "Ivan"]
version: tuple = (3, 7, 1)
options: dict = {"centered": False, "capitalize": True}
```

然而，这并没有真正讲述完整的故事。`names[2]`、`version[0]` 和 `options["centered"]` 的类型是什么？在这个具体例子中，您可以看到它们分别是 str、int 和 bool。但是，类型提示本身没有提供有关此的信息

还记得我们的 [嵌套类型] 吗？

:::: code-group
::: code-group-item 3.8+

```py :no-line-numbers
from typing import Dict, List, Tuple

names: List[str] = ["Guido", "Jukka", "Ivan"]
version: Tuple[int, int, int] = (3, 7, 1)
options: Dict[str, bool] = {"centered": False, "capitalize": True}
```

:::
::: code-group-item 3.10+

```py :no-line-numbers
names: list[str] = ["Guido", "Jukka", "Ivan"]
version: tuple[int, int, int] = (3, 7, 1)
options: dict[str, bool] = {"centered": False, "capitalize": True}
```

:::
::::

请注意，对于 3.8+ 的 Python，每种类型都以大写字母开头，并且它们都使用方括号来定义项目类型：

- `names` 是一个字符串列表
- `version` 是由三个整数组成的三元组
- `options` 是将字符串映射到布尔值的字典

让我们回到卡牌游戏。一张卡片由两个字符串的元组表示。你可以把它写成 `Tuple[str, str]`，这样这副牌的类型就变成了 `List[Tuple[str, str]]`。因此你可以这样注释 `create_deck()`：

```py :no-line-numbers
from typing import List, Tuple

...

def create_deck(shuffle: bool = False) -> List[Tuple[str, str]]:
    """创建一副新的 52 张牌"""
    deck = [(s, r) for r in RANKS for s in SUITS]
    if shuffle:
        random.shuffle(deck)
    return deck
```

除了返回值之外，您还将 `bool` 类型添加到可选 `shuffle` 参数中。

::: tip 元组 と 列表

元组和列表的注释不同。

元组是不可变的序列，通常由固定数量的可能不同类型的元素组成。例如，我们将一张牌表示为花色和点数的元组。一般来说，您可以为 `n` 元组编写 `Tuple[t_1, t_2, ..., t_n]`。

列表是可变序列，通常由未知数量的相同类型的元素组成，例如卡片列表。无论列表中有多少元素，注释中都只有一种类型：`List[t]`。

在许多情况下，您的函数会期望某种 [序列]，而不真正关心它是列表还是元组。在这些情况下，您应该在注释函数参数时使用 `typing.Sequence`：

:::: code-group
::: code-group-item 3.8+

```py :no-line-numbers
from typing import List, Sequence

def square(elems: Sequence[float]) -> List[float]:
    return [x**2 for x in elems]
```

:::
::: code-group-item 3.10+

```py :no-line-numbers
from typing import Sequence

def square(elems: Sequence[float]) -> list[float]:
    return [x**2 for x in elems]
```

:::

使用 `Sequence` 是使用鸭子类型的一个示例。 序列是任何支持 `len()` 和 `__getitem__()` 的东西，与其实际类型无关。

[嵌套类型]: ./hello_types#嵌套类型
[序列]: https://docs.python.org/3/glossary.html#term-sequence
