# 八嘎 hentai 无路赛

[>_<]: 因为不知道怎么样才能把script写在md里面，没办法只能用';'来硬生生把代码连起来了

<audio id="thtlb" src="/voices/太好听了8.m4a"></audio>

:::danger
本文档还没有写完<curtain>比如没准备好钉宫三连语音包，欢迎<ruby-curtain up="hentai xiong di" type="danger">
有志之士</ruby-curtain>提供</curtain>十分建议在阅读的时候不要声音拉满 + 外放 <curtain>除非你跟<more-info words="唐可可">
<img
  src="/images/guide/唐可可.webp"
  alt="太好听了吧"
  onmouseover="
    document.getElementById('thtlb').currentTime = 0;
    document.getElementById('thtlb').play();
  "
  onmouseout="
    document.getElementById('thtlb').pause();
  "
/></more-info>一样有社交牛逼症</curtain>
:::

虽然有点突然，但你是否有想过机器人能够对你[钉宫三连](https://zh.moegirl.org.cn/%E9%92%89%E5%AE%AB%E7%90%86%E6%83%A0)呢？

<chat-window title="Graia Framework Community">
  <chat-msg name="GraiaX" onright>无路赛</chat-msg>
  <chat-voice name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp" audio-src="/voices/夏娜_无路赛_钉宫理惠.m4a">别戳我，好痒</chat-voice>
</chat-window>

<volume-bar>贴心的音量条：</volume-bar>

还记得上一节我们简单的讲解消息链时候，给出了这样一种构建图片元素的办法：

```python
Image(path="./GraiaX/EroEroBot/eropic.jpg")
```

很简单，对吧，只需要传入一个 `path` ，就可以构建一个图片元素实例。
如果只有这么简单，那怎么可能专门拿出一个章节来讲解这个呢？

接下来，让我们好好讲解一下图片元素的父类 —— 多媒体元素 `MultimediaElement`

## 什么是 MultimediaElement

多媒体元素 `MultimediaElement`，是 **Graia Ariadne** 为了方便构建类似图片这种需要上传二进制数据的元素所创造的，
目前其子类包含有 `Image`、`FlashImage`、`Voice`。

下面，就让<ruby-curtain up="举例狂魔">我</ruby-curtain>给大家举几个例子：

```python
>>> path_data = "./GraiaX/EroEroBot/eropic.jpg"
>>> bytes_data: bytes = Path("./GraiaX/EroEroBot/eropic.jpg").read_bytes()
>>> base64_data: str = b64encode(bytes_data).decode()

>>> Image(path=path_data)  # 通过传入 path 字符串创建 Image 对象
>>> Image(path=Path(path_data))  # 通过传入 Path 实例创建 Image 对象
>>> Image(data_bytes=bytes_data)  # 通过传入二进制数据创建 Image 对象
>>> Image(base64=base64_data)  # 通过传入 base64 编码的二进制数据创建 Image 对象
```

## 关于发送语音的一些小问题

~~众所周知~~ tx 服务器只接受 `amr` 跟 `silk` 两种格式的语音（其中 `silk` 格式支持更高的码率）。
而语音发送一直是困扰着 `Mirai` 用户的问题之一，与隔壁（`go-cqhttp`）不同的是，隔壁内置了语音转换器帮你转换音频格式，而我们只能自力更生。

截至目前，Python 有不少第三方库能够帮你将音频转换成 `silk`

- [graiax-silkcoder](https://pypi.org/project/graiax-silkcoder/)
- [pysilk-mod](https://pypi.org/project/pysilk-mod/)
- [silk-python](https://github.com/synodriver/pysilk)
- [rsilk](https://github.com/synodriver/rsilk)
- [pilk](https://github.com/foyoux/pilk)

以下我们将会以 [**GraiaX Silkcoder**](/before/introduction/project/silkcoder)
举例（因为其是现阶段上述转换器中唯一支持 wav/pcm 以外格式的编解码器<curtain>虽然是借助 ffmpeg
这种牛刀</curtain><curtain>不过 0.3.x 开始支持 libsndfile 了，占用会超小（不到 1Mb 大概）</curtain>）

首先安装 **GraiaX Silkcoder**：

:::warning
该文档最后更新的时候，**GraiaX Silkcoder** 的版本的 0.3.0  
现在的最新版本为 <img src="https://img.shields.io/pypi/v/graiax-silkcoder?color=2970b6&amp;style=flat-square" alt="PyPI版本" style="display: inline-block; vertical-align: text-bottom">
:::

::::code-group
:::code-group-item poetry

```sh
# 普通安装
poetry add graiax-silkcoder
# 假设你的环境中没有安装 ffmpeg 但又需要 wav 以外的音频格式转换
poetry add graiax-silkcoder[ffmpeg]
# 假设你想要的音频格式被 libsndfile 支持又不想要 ffmpeg 这么大的库
poetry add graiax-silkcoder[libsndfile]
```

:::
:::code-group-item pip

```sh
# 普通安装
pip install graiax-silkcoder
# 假设你的环境中没有安装 ffmpeg 但又需要 wav 以外的音频格式转换
pip install graiax-silkcoder[ffmpeg]
# 假设你想要的音频格式被 libsndfile 支持又不想要 ffmpeg 这么大的库
pip install graiax-silkcoder[libsndfile]
```

:::
::::

快速简单地创建一个 Voice 对象：

::::code-group
:::code-group-item 0.2.6 +

```python
from graiax import silkcoder

audio_bytes = await silkcoder.async_encode("GraiaX/EroEroBot/hentai.m4a", ios_adaptive=True)
Voice(data_bytes=audio_bytes)
```

:::
:::code-group-item 0.2.0 - 0.2.5

```python
from graiax import silkcoder

audio_bytes = await silkcoder.async_encode("GraiaX/EroEroBot/hentai.m4a")
Voice(data_bytes=audio_bytes)
```

:::
:::code-group-item 0.1.x

```python
from graiax import silkcoder

audio_bytes = await silkcoder.encode("GraiaX/EroEroBot/hentai.m4a")
Voice(data_bytes=audio_bytes)
```

:::
::::

:::tip
0.2.6 + 新增的 `ios_adaptive` 参数，是为了让音频能够被 iOS 客户端的用户听到。  
（因为 iOS 客户端的只能播放 **25kbps 以下（不含）** 码率的音频）
:::

把 Voice 对象放入 MessageChain 中：

```python
>>> MessageChain.create(Voice(data_bytes=audio_bytes))
```

:::tip
详细用法请去其[Pypi 页面查看](https://pypi.org/project/graiax-silkcoder/)

这次就不能说逊了，因为这就是我写的<curtain>$h!t Mountain</curtain>  
（注：此处的“我”指该文档的主要作者 —— I Love Study(详见[鸣谢](/appendix/credit.md))）
:::

:::interlink
<https://graia.cn/ariadne/feature/msg-chain/>

**EroEroBot:**  
本章完整示例可在 [EroEroBot/modules/multimedia_message.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/modules/multimedia_message.py) 找到。
:::
