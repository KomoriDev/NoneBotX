# 类型系统

::: info 相关链接
RealPython: <https://realpython.com/python-type-checking/>  
FastAPI Docs: <https://fastapi.tiangolo.com/>
:::

所有编程语言都有 [类型系统]，用于定义可以使用哪些对象类别以及如何处理它们。例如，类型系统可以定义数字类型，其中的 `42` 就是一个**数字类型**的对象示例。

## 动态打字

Python 是一种动态类型语言。这意味着 Python 解释器仅在代码运行时进行类型检查，并且变量的类型允许在其生命周期内更改。下面的示例演示了 Python 具有动态类型：

```py
>>> if False:
...     1 + "two"  # 该行永远不会运行，因此不会引发 TypeError
... else:
...     1 + 2
...
3

>>> 1 + "two"  # 现在这是类型检查，并且引发 TypeError
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

## 静态类型

动态类型的反面是静态类型。静态类型检查是在不运行程序的情况下执行的。在大多数静态类型语言中，例如 C 和 Java，它们都是在编译程序时完成的。

对于静态类型，尽管可能存在将变量转换为不同类型的机制，但通常不允许变量更改类型。

让我们看一个静态类型语言的简单示例。以 Java 举例：

```java
String thing;
thing = "Hello";
```

第一行声明变量名在编译时 `thing` 绑定到 String 类型，在第二行中，`thing` 分配了一个字符串 `Hello`。它永远不能为它分配一个不是 String 对象的值。例如，如果您稍后说 `thing = 28.1` 编译器会因类型不兼容而引发错误。

Python 将[永远是一种动态类型语言](https://peps.python.org/pep-0484/#non-goals)。然而，[PEP 484] 引入了类型提示，这使得对 Python 代码进行静态类型检查成为可能。

与大多数其他静态类型语言中类型的工作方式不同，类型提示本身不会导致 Python 强制执行类型。顾名思义，类型提示只是建议类型。还有其他工具（稍后您将看到）使用类型提示执行静态类型检查。

## 鸭子打字

谈论 Python 时经常使用的另一个术语是 [鸭子类型]。这个绰号来自短语 “如果它像鸭子一样行走并且像鸭子一样嘎嘎叫，那么它一定是鸭子”。

鸭子类型是与动态类型相关的概念，其中对象的类型或类不如它定义的方法重要。使用鸭子类型，你根本不需要检查类型。相反，您需要检查给定方法或属性是否存在。

例如，您可以在任何定义 `__len__()` 方法的 Python 对象上调用 `len()` ：

```py
>>> class TheHobbit:
...     def __len__(self):
...         return 95022
...
>>> the_hobbit = TheHobbit()
>>> len(the_hobbit)
95022
```

调用 `len()` 方法实际上等价于调用 `__len__()` 方法，它们都返回方法的返回值。

```py
def len(obj):
    return obj.__len__()
```

要调用 `len(obj)`，唯一的限制是 `obj` 必须定义了 `__len__()` 方法。`obj` 可以是不同类型的对象，如字符串、列表、字典或者其他类型的对象。在进行静态类型检查时，Python 代码支持鸭子类型的一定程度。稍后您将了解更多关于鸭子类型的信息。

[类型系统]: https://en.wikipedia.org/wiki/Type_system
[PEP 484]: https://peps.python.org/pep-0484/
[鸭子类型]: https://en.wikipedia.org/wiki/Duck_typing
