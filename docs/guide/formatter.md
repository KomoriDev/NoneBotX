# /斜眼笑（`Formatter`）

:::warning
~~虽然 **Mirai** 支持商城表情，但是 **Mirai Api Http** 不支持！~~  
**Mirai Api Http** 已在 2.5.0 版本支持且 **Graia Ariadne** 也在 0.5.3 提供了支持。  
**注意：仅支持接收，不支持发送！**
:::

:::tip
你知道吗，这章很水
:::

想必大家在 QQ 聊天的时候，或多或少都会用到 QQ 的一些表情包（如
<img
    src="/images/guide/huaji.webp"
    alt="滑稽"
    class="face"
/>
和
<img
    src="/images/guide/wangwang.webp"
    alt="Doge"
    class="face"
/>
）。不可否认，这些 QQ 自带的表情符号已经成为 QQ 日常交流中不可缺少的一部分。

不过，当你想要通过 `Ariadne` 来构造这样充满表情符号的句子时，问题就大的去了：

你的目标：

<chat-window>
  <chat-msg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp">来点涩图<img
    src="/images/guide/wangwang.webp" alt="Doge"
    class="face"
  /></chat-msg>
</chat-window>

你的构造：

```python
MessageChain("来点涩图", Face(277))
```

这还算比较好的，但要是你想做到下面的效果呢？

<chat-window>
  <chat-msg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp">
    在新的一年里，祝你<br />
    身<img src="/images/guide/wangwang.webp" alt="Doge" class="face" />体<img src="/images/guide/wangwang.webp" alt="Doge" class="face" />健<img src="/images/guide/wangwang.webp" alt="Doge" class="face" />康<br/>
    万<img src="/images/guide/wangwang.webp" alt="Doge" class="face" />事<img src="/images/guide/wangwang.webp" alt="Doge" class="face" />如<img src="/images/guide/wangwang.webp" alt="Doge" class="face" />意
  </chat-msg>
</chat-window>

你的构造：

```python
MessageChain(
    "在新的一年里，祝你\n",  # 这里有没有逗号均可
    "身", Face(277), "体", Face(277), "健", Face(277), "康\n",  # 这里有没有逗号均可
    "万", Face(277), "事", Face(277), "如", Face(277), "意\n",  # 这里有没有逗号均可
)
```

牙白，牙白，红豆泥牙白 desu 捏~ 那该怎么办好呢？

当然有有办法！

<h2>所以 Formatter 是什么？</h2>

通俗来讲，`Formatter` 差不多就是一个给 `MessasgeChain` 用的 `str.format`，使用方法如下：

```python
from graia.ariadne.message.formatter import Formatter

Formatter(
    "在新的一年里，祝你\n"  # 注意这里没有逗号，等于上下两个字符串直接连在一起
    "身{doge}体{doge}健{doge}康\n"  # 注意这里没有逗号
    "万{doge}事{doge}如{doge}意").format(doge=Face(277)
)
```

你看这样子是不是方便多了？

:::interlink
**EroEroBot:** 本章完整示例可在 [EroEroBot/modules/formatter.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/modules/formatter.py) 找到。

**相关链接:** <https://graia.cn/ariadne/extra/msg-chain-tool/>
:::
