# 无内鬼，来点加密压缩包

:::danger 重要警告
以下篇章教学的东西将成为**真正意义上**能够发送**真正意义上的**涩图的功能，
请务必在看本章节的时候摸着自己的良心，不要干出任何违法的事情。

本文档不会涉及**任何**教你制作加密压缩包的教程<curtain>自己探索去</curtain>
:::

:::warning
有种草草收尾的感觉。。。
:::

众所周知，QQ 因为某种原因，是不能出现那种很涩的图片的，
不过呢，我们可以通过一些奇奇怪怪的方法来绕过这些限制。
比如说，群文件<img src="/images/guide/wangwang.webp" class="face">。

<chat-window title="Graia Framework Community">
    <chat-msg name="GraiaX" onright>来一打紧身衣涩图</chat-msg>
    <chat-msg name="GraiaX">
        <chat-file
            name="EroEroBot"
            filename="secret.zip"
            filesize="6.33MB"
            fileicon="/images/guide/compressed_file.webp"
            href="https://www.bilibili.com/video/BV1GJ411x7h7"
        />
    </chat-msg>
</chat-window>

斯巴拉西，这是什么梦寐以求的功能啊！那就让我们赶快进入今天的涩涩创想吧！

## 文件操作（上传）

首先，又到了我们经典的举例子时间~

```python{18-20}
...
import aiohttp
from graia.ariadne.message.parser.base import DetectPrefix


@channel.use(
    ListenerSchema(
        listening_events=[GroupMessage],
        decorators=[DetectPrefix("涩图来")]
    )
)
async def upload_file(app: Ariadne, group: Group, message: MessageChain):
    if str(message) != "紧身衣":
        return  # 因为这只是一个简单的教程，所以我们就指定tag好了

    # 破天荒出现的秘密文件desu
    url = "https://raw.githubusercontent.com/GraiaCommunity/EroEroBot/master/data/secret.pdf"
    async with aiohttp.request("GET", url=url) as r:
        secret_pdf = await r.read()
    await app.upload_file(data=secret_pdf, target=group, name="紧身衣.pdf")
```

说真的，挺简单的，这里唯一的重点，就是这个 `app.upload_file`，
当然，仅仅是这一个例子还是不太够，我们要更深入一点：

```python{3,6-7}
async def upload_file(
    self,
    data: Union[bytes, io.IOBase, os.PathLike],  # 要上传的数据/数据流
    method: Union[str, UploadMethod, None] = None,  # 上传方法，不用管
    target: Union[Friend, Group, int] = -1,  # 要上传的群
    path: str = "",  # 群文件路径
    name: str = "",  # 文件名字
) -> "FileInfo":
```

:::tip
`Mirai` **只支持**群文件，**并不支持**好友文件的发送及管理<br />
target 的 `Type Hint` 有 `Friend` 的原因仅仅是因为 `万一哪一天支持了` 而出现的
:::

首先是最重要的 `data`，说白了就是文件的二进制数据，不过要注意，你写一个文件路径进去是不行的，你只能传数据/数据流进去。

:::tip
可能有些小白可能看不懂这个 `Union[bytes, io.IOBase, os.PathLike]` 是什么意思，
所以在这里给大家介绍一下 `data` 可以传入的几种类型（并不全面 desu）：

- `bytes`
- `io.BytesIO` `io.StringIO`
- `typing.BinaryIO` （如 `open("secret.txt")`）
- `pathlib.Path` （`pathlib`，好东西，建议去学学）

:::

然后是 `path` 和 `name`，事实上这个很容易理解：

- `path` 就是你要上传到的文件夹
- `name` 就是你上传文件的名字

:::tip TIPS
事实上，你可以通过 `path="sese/setu.jpg"` 的方式，来达到与
`path="sese", name="setu.jpg"` 相同的效果。

因为 QQ 的限制，群文件并不能做到文件夹里有文件夹，所以
`path="sese/sese/setu.jpg"` 会被识别成 `path="sese" name="sese/setu.jpg"`。

不过如果填写 `path="sese/sese" name="setu.jpg"`，
将会直接将 `path` 和 `name` 传递给 `mah`。

还是因为 QQ 的限制，群文件名不能带有 `\/:*?"<>|`。
:::

## 文件类型

然后，最后，就是返回值 `FileInfo`。

大致是长这样：

```python{4,9}
class FileInfo(AriadneBaseModel):
    name: str  # 文件名
    path: str  # 路径
    id: Optional[str]  # 文件 ID
    parent: Optional["FileInfo"]  # 文件所在目录，如果没有这个属性则说明在根目录
    contact: Optional[Union[Group, Friend]]  # 文件所在位置 (群组)
    is_file: bool  # 是否为文件
    is_directory: bool  # 是否为目录
    download_info: Optional[DownloadInfo]  # 下载信息
```

讲一下画高亮的部分：

1. `id`：QQ 使用 `文件 ID` 作为文件的唯一识别码<curtain>要不然你用 QQ 群文件怎么会允许同名群文件</curtain>。<br />
   事实上，后面会讲的一切操作（如重命名，移动文件），都会需要 `文件 ID`。

2. `download_info`：如变量名所说，这个就是下载信息，这其中包含了包括文件 MD5 等一系列下载所需要的东西。

   ```python
   class DownloadInfo(AriadneBaseModel):
       sha: str  # 文件 SHA256
       md5: str  # 文件 MD5
       download_times: int  # 下载次数
       uploader_id: int  # 上传者 QQ 号
       upload_time: datetime  # 上传时间
       last_modify_time: datetime  # 最后修改时间（如重命名则为修改）
       url: Optional[str]  # 下载 url
   ```

## 批量下载

事实上，我们已经大致了解了群文件的大致构造了，那就让我们来做一个批量下载群文件中图片的代码例子吧~

```python
# 全是缩进警告
async def download_setu(app: Ariadne, group: Group):
    os.makedirs("download", exist_ok=True)  # 创建一个 download 文件夹
    async with Ariadne.service.client_session as session:
        async for file in app.get_file_iterator(group):
            if file.name.split(".")[-1] not in ["jpg", "jpeg", "png"]:
                continue
            download_info = (await app.get_file_info(group, file.id, with_download_info=True)).download_info
            async with session.get(download_info.url) as r:
                with open(f"download/{file.name}", "wb") as f:
                    while chunk := await r.content.read(8192):  # 注意，此处使用了海象运算符
                        f.write(chunk)
```

:::interlink
上面这个例子使用了海象运算符 `:=`，有关海象运算符可以看看[这篇来自 Python 官方的文档](https://docs.python.org/zh-cn/3/whatsnew/3.8.html?highlight=%E6%B5%B7%E8%B1%A1)（中文）。

顺带一提，海象运算符是 Python 3.8 新增的功能。

**EroEroBot:**  
本章部分例子可在 [EroEroBot/modules/file_operation.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/modules/file_operation.py) 找到。
:::

:::tip
事实上，获取 `DownloadInfo` 需要额外调用 API，
所以在遍历的情况下，我们不太建议将 `getFileIterator` 的 `with_download_info` 参数设置为 `True`，
要不然会让速度变慢（假设你群文件全是图片的话可能情况就又不相同了）。

建议不要下载太快，要不然可能群文件相关 API 会被风控哦~
:::
