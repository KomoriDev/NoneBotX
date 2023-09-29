# Termux 安装 Uvicorn 时出错

假设你想要在 Termux 上安装 **Uvicorn**的过程中出现错误。这是因为
**Uvicorn** 在 Linux / Unix 环境下会安装 **uvloop**。

但是直到 uvloop 0.16.0，由于 Termux 中存在一些兼容性的问题，
所以不能通过 `pip install uvloop` 或 `pdm add uvloop` 之类的便捷方法来安装，否则会报错。（[相关问题](https://github.com/MagicStack/uvloop/issues/260)）

那么问题来了，怎么解决这个问题呢？

1. 通过 `pkg install libuv` 安装 Termux 的 libuv 库
2. 通过 `pip download uvloop` 下载 uvloop 的安装包，并解压和 cd 进去
3. 编辑 `setup.py`，将 `self.use_system_libuv` 的值从 `False` 改成 `True`
4. 在 uvloop 文件夹中使用 `pip install .` 安装（**不要忘记最后的点**）

:::tsukkomi PDM 怎么办？
你可能想要知道怎么通过 pdm 来安装 uvloop？

你可以试试在 `pdm add xxx` 之前先按上面的步骤安装。  
（请注意，第 2 步请把 uvloop 下载到项目目录内，第 4 步要把 `pip install .` 替换为 `pdm run pip install .`）

待 uvloop 安装完后再使用 `pdm add uvloop` 来添加 uvloop，这样 pdm **可能**就不会尝试重复安装 uvloop 了。  
（如果成功了，记得把 uvloop 的版本锁定，以避免 pdm 以后尝试自动升级时出错。）

如果这样做失败了，那你还是放弃吧~
:::

### 用 `BytesIO` 发送图片结果发送失败了

假设你在你的 bot 里写了一些通过 `pillow` 等图片处理库处理图片，那你应该会写出一个类似于这样的代码：

```python
# 不要跟 Ariadne 中的 Image 搞混了
from io import BytesIO
from PIL import Image as IMG

async def pic(app: Ariadne, group: Group, message: MessageChain)
    img: IMG = IMG.open(BytesIO(message[Image][0]))
    ...
    b = BytesIO()
    img.save(b, format="png")
    await app.send_group_message(group, MessageChain(Image(data_bytes=b)))
```

当你兴奋的将你的这个代码放到运行环境后，坏了，不能用。  
为什么会出现这样的问题？明明 `data_bytes` 参数支持 BytesIO 啊。

这个问题很简单，当我们翻阅 `Ariadne` 源码的时候，就能发现：

```python
    if isinstance(data_bytes, BytesIO):
        data["base64"] = b64encode(data_bytes.read())
```

是的，我的朋友，`Ariadne` 在发现 `data_bytes` 参数是 `BytesIO` 后，
就会像普通 IO 一样，通过 read 方法去获取数据。

那怎么办？我们为您提供了以下两种办法解决这个问题：

:::code-group

```python{10} [直接传递值]
# 不要跟 Ariadne 中的 Image 搞混了
from io import BytesIO
from PIL import Image as IMG

async def pic(app: Ariadne, group: Group, message: MessageChain)
    img: IMG = IMG.open(BytesIO(message[Image][0]))
    ...
    b = BytesIO()
    img.save(b, format="png")
    await app.send_group_message(group, MessageChain(Image(data_bytes=b.getvalue())))
```

```python{10} [操作文件指针]
# 不要跟 Ariadne 中的 Image 搞混了
from io import BytesIO
from PIL import Image as IMG

async def pic(app: Ariadne, group: Group, message: MessageChain)
    img: IMG = IMG.open(BytesIO(message[Image][0]))
    ...
    b = BytesIO()
    img.save(b, format="png")
    b.seek(0)
    await app.send_group_message(group, MessageChain(Image(data_bytes=b)))
```

:::

### 关于我的 Python 版本好混乱这件事

[>_<]: 你知道为什么这一篇一直没有更新吗，因为我也不会（尬

某些人（尤其是刚刚上手 Linux 的小白），会遇到「分不清自己调用的究竟是哪个 Python」的问题。然后就遇到「因为找错 Python 了导致遇到各种各样的因为版本问题而出现的 bug」

<loading />
