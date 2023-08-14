# 异步画~~涩~~图

:::danger
知道拼积木吗？现在这一章差不多可以认为是零件乱放。

<hr />

**蓝玻璃块（`Ariadne`的主要维护者）认为现在这个功能是重复造轮子**  
**该功能已经在[`Unsync`](https://pypi.org/project/unsync/)中实现**
:::

在看了那么多篇文档，想必你正打算或者已经做了一个**带有 Pillow（PIL）等画图工具的制图**的模组了吧~

但是，你有没有发现，随着你制图功能被调用的越来越多，你的 bot 又双叒叕卡了。

可能会吓得你赶紧去寻找问题出现的原因，随着你不断的收集数据及测试，
你最终会发现，原来是你的制图功能用时太久了。
太久也就算了，关键是在制图期间，**任何其他代码都在等待制图完成**。

:::tip 关于异步

有关于异步的介绍之前在[《来点网上的涩图》](/guide/image_from_internet#为啥要用-aiohttp)这一节其实已经初步讲过了，你可以点击链接跳转查看

:::

:::warning
以下办法通常情况下并不能帮你解决制图慢的问题，
只是将这个办法从同步变成了异步（即治标不治本）。
:::

假设你真的想要加快制图的速度，并且愿意牺牲一点点撸码体验，
那么建议你去试试 `opencv-python` 之类的库。

> 虽然 `opencv-python` 的使用方法一点也不 Pythonic，但就速度与内存占用而言比 Pillow 猛多了

除了使用 OpenCV 等性能更好的库，如果你用来运行 Bot 的设备性能足够（尤其是内存够），那么你也可以选择使用
Playwright 或 Selenium 等使用无头浏览器的库来调用Edge、Chrome、Firefox
等浏览器用于截图。

并且 Playwright 支持异步操作，因此在浏览器截图期间，你的 Bot 也可以正常运行

:::tsukkomi
假设你会一点 HTML 和 CSS，通过 HTML + CSS 进行布局不比硬算坐标方便多了？

感兴趣的话，就来康康 [Graiax Text2img Playwright](/before/introduction/project/t2i/playwright)
吧~

Graiax Text2img Playwright 会在后台常驻一个浏览器，以便在需要制图时快速响应，这需要占用一定的内存资源。
:::

## 快速实例

::::code-group
:::code-group-item 原来的

```python
from io import BytesIO

from graia.ariadne.message.element import Image
from PIL import Image as IMG
# 切记，PIL 的 Image 跟 ariadne 的 Image Element 名字重了


def make_pic(size = (100, 100), color = (255, 0, 0)):
    img = IMG.new("RGB", size, color)
    img.save(b := BytesIO(), "JPEG")  # 注意，此处使用了海象运算符
    return b.getvalue()


@channel.use([GroupMessage])
async def drawing(group: Group):
    pic = make_pic()
    await app.send_message(group, MessageChain(Image(pic)))

```

:::
:::code-group-item 用 io_bound

```python
from io import BytesIO

from graia.ariadne.message.element import Image
from graia.ariadne.util.async_exec import io_bound, cpu_bound
from PIL import Image as IMG
# 切记，PIL 的 Image 跟 ariadne 的 Image Element 名字重了


@io_bound
def make_pic(size = (100, 100), color = (255, 0, 0)):
    img = IMG.new("RGB", size, color)
    img.save(b := BytesIO(), "JPEG")  # 注意，此处使用了海象运算符
    return b.getvalue()


@channel.use([GroupMessage])
async def drawing(group: Group):
    pic = await make_pic()
    await app.send_message(group, MessageChain(Image(pic)))
```

:::
:::code-group-item 用 asyncio.to_thread

```python
import asyncio
from io import BytesIO

from graia.ariadne.message.element import Image
from PIL import Image as IMG
# 切记，PIL 的 Image 跟 ariadne 的 Image Element 名字重了


def make_pic(size = (100, 100), color = (255, 0, 0)):
    img = IMG.new("RGB", size, color)
    img.save(b := BytesIO(), "JPEG")  # 注意，此处使用了海象运算符
    return b.getvalue()


@channel.use([GroupMessage])
async def drawing(group: Group):
    pic = await asyncio.to_thread(make_pic())
    await app.send_message(group, MessageChain(Image(pic)))
```

:::
::::

:::tip
`io_bound` 跟 `asyncio.to_thread()` 除了使用方法可能有所不同外，本质其实没有多大区别。
不过假设你使用的是 `Python3.8`，那就没有 `asyncio.to_thread()`
:::

## 这是什么？

在什么都没改动时，我们使用 `pic = make_pic()`
来调用了 `make_pic()` 函数。然后我们使用 `io_bound` 装饰器装饰了
`make_pic()` 函数，这时下面调用的时候就变成了 `pic = await make_pic()`。

这就成功地把 `make_pic()` 函数变成了异步函数，他与直接在 `def` 前加一个 `async`
不同，`io_bound` 装饰器会把这个函数放在一个新的线程中独立运行，因此在运行该函数时，就不会影响主线程了惹~

除了使用 `io_bound` 装饰器之外，上面还提到了 `asyncio.to_thread()`，而 `io_bound` 装饰器与
`asyncio.to_thread()` 所做的内容没有本质上的区别，因此在 `Python 3.9` 及更新的版本，你也可以使用
`asyncio.to_thread()`（但不要滥用噢~）。

除了 `io_bound` 装饰器以外，**Ariadne** 还提供了 `cpi_bound` 装饰器。与 `io_bound`
不同的是 `cpi_bound` 是把函数放在一个新的进程中运行，而不是新线程，其更适合 CPU
密集型的工作。

## 应该什么时候用？

先说结论

- 如果你的函数造成的延迟你**几乎感觉不到**，那你就直接用
- 如果你的函数是做 **I/O 密集型** 的工作或者是在运行途中可以 **释放 GIL 锁**，那你就用 `io_bound`
- 如果你的函数是做 **CPU 密集型** 的工作且运行途中 **不可以释放 GIL 锁**，那你就用 `cpu_bound`

然后我们来仔细讲一讲为什么...

**I/O 密集型** 是指设备的 CPU 性能相比硬盘、内存等 I/O（输入/输出）设备要好得多，程序运行时一直在
CPU 一直在等待处理 I/O 操作（CPU 占用并不高）。
或者当你的函数所做的一系列操作即使达到了该函数的性能极限时也没有大量吃掉
CPU 性能时，也就意味着运行该函数的过程中可以偶尔暂停下来释放 GIL 锁给别的线程使用。

假设使用 `io_bound` 装饰了一个制图函数 `make_pic()`，则该函数是运行在独立的线程中的，那么当我们主线程收到消息时，
待制图函数所在的线程完成当前行的计算后，可以暂停下来释放 GIL 锁，把 GIL
锁让给更需要及时响应的主线程。但因为主线程中的`pic = await make_pic()`
一直等待制图函数结束把结果返回，但协程的特性决定了主线程不会一直在这里等着卡住，
而是会边等边做别的事，因此主线程会先处理接收到的消息，待处理完成后再把
GIL 锁还给制图函数所在的线程以继续制图。

> 所以假设你用 `io_bound` 装饰的函数内某一行的操作持续长时间占用 CPU，整个程序还是会因此而卡住。
> 那么这时候你可能需要使用 `cpu_bound` 了。

**CPU 密集型** 是指设备的硬盘或内存性能比 CPU 要好得多，程序运行时 CPU 一直在高强度计算，连 I/O
操作的时间都基本可以忽略。那么此时因为 CPU 一直在高强度计算，那么多线程状态下 GIL 锁是无法释放出来的，
因此需要使用多进程来让占用 CPU 的函数在独立的进程中运行由系统调度，来避免在计算时整个程序在这个函数处卡住无响应。

## GIL 锁是什么？

前面一直提到 GIL 锁，那么 GIL 锁是什么？

GIL 锁既全局解释器锁（Global Interpreter Lock），为了保证线程安全而导入的解释器锁。

:::tsukkomi PEP703!!!
可喜可贺，可喜可贺，Python 终于计划打算可能要准备移除 GIL 了（buff 叠满）。

参考资料：[PEP 703即将被正式接受，移除GIL的这一天竟然真的要来了？](https://www.bilibili.com/video/BV1ph4y1c7ue)
:::

### 为什么引入 GIL 锁？

:::tip
以下内容可能有错误，仅供参考。

以下是一些关于 GIL 的参考视频（UP 主：码农高天）：

- [PEP 703即将被正式接受，移除GIL的这一天竟然真的要来了？](https://www.bilibili.com/video/BV1ph4y1c7ue)
- [【python】这一天终于要来了？万恶之源GIL要被移除了？](https://www.bilibili.com/video/BV1Hs4y1t7PK)
- [【python】天使还是魔鬼？GIL的前世今生。一期视频全面了解GIL！](https://www.bilibili.com/video/BV1za411t7dR)

:::

Python 的内存回收机制在加载资源时，会对资源做标记，对应一个数字，这个数字的大小代表这个资源还能被线程调用多少次，
每次被调用时这个数字都会减 1，当数字归零时则资源会被自动释放。

在没有 GIL 锁的情况下，Python 可以允许多线程运行，但是这可能会造成一些问题。

比如，当两个线程同时调用到一个资源，会出现两种情况：

1. 一个资源的标记值为 1，当这个资源被两个线程同时调用，就会发生 `1-2=-1`，导致 Python 无法释放这些资源，因为他们的值不等于0。
2. 这个资源标记值刚好为 2，当这个资源被两个线程同时调用，就会发生 `2-2=0` ，资源就被强制释放掉了。

情况 1 会造成内存泄漏，情况 2 可能会造成程序崩溃。

再比如 Python 上运行着8个线程，这些线程都在向其他线程请求资源，但是大家都没有资源，只能一直等待，形成死锁。

以上无论是哪种情况都不是我们希望看到的。而 GIL 锁的引入正好解决了这个问题，代码运行时，解释器只能允许持有
GIL 许可的代码进入线程运行，当线程完成任务或者达到一定时间就释放掉它的 GIL 许可，终止线程。

如果 Python 想实现真正的多线程，就需要移除 GIL 锁，但有一些 C 等非 Python 语言的库会依赖 GIL
特性，这也对移除 GIL 造成了很大的阻碍。

:::interlink
**相关链接:** <https://graia.cn/ariadne/extra/async-exec/>
:::
