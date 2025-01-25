# 那我问你

在前面的插件中，我们要想查看涩图，只需发送指令，但 Bot 并不能根据参数进行筛选。
如果我们想要实现此类对话模式，就<Mark>需要使用会话控制</Mark>

## 询问并获取用户输入

::: code-group

```py [NoneBot Native]
from nonebot.params import CommandArg, ArgPlainText

matcher = on_command("来张涩图")

@matcher.handle()
async def _(args: Message = CommandArg()):
    if type := args.extract_plain_text():
        await matcher.finish(f"正在寻找「{type}」涩图...")

@matcher.got("type", prompt="请输入你喜欢的类型")
async def got_type(type: str = ArgPlainText()):
    await matcher.finish(f"正在寻找「{type}」涩图...")
```

```py [NoneBot Alconna]
# plugin_waiter 为 alconna 依赖，无需再次安装
from nonebot import require
from nonebot.adapters import Event

require("nonebot_plugin_waiter")
require("nonebot_plugin_alconna")
from nonebot_plugin_waiter import waiter
from nonebot_plugin_alconna import Command, Match

matcher = Command("来张涩图 [type:str]").build(use_cmd_start=True)

@matcher.handle()
async def _(type: Match[str]):
    if type.available:
      await matcher.finish(f"正在寻找「{type.result}」涩图...")

    await matcher.send("请输入你喜欢的类型")

    @waiter(waits=["message"], keep_session=True)
    async def check(event: Event):
        return event.get_plaintext()

    resp = await check.wait(timeout=60)
    if resp == "猎奇":
      await matcher.finish("暂不支持此类型的涩图")
    await matcher.finish(f"正在寻找「{type.result}」涩图...")
```

:::

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>/来张涩图</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" tagType="bot" avatar="/avatar/hibiscus.webp">
    请输入你喜欢的类型
  </chat-msg>
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>大黑塔</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" tagType="bot" avatar="/avatar/hibiscus.webp">
    正在寻找<a href="#番外-你的头顶为什么尖尖的">「大黑塔」</a>涩图...
  </chat-msg>
</chat-window>

## 番外 - 你的头顶为什么尖尖的

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>/你的头顶怎么尖尖的</chat-msg>
  <chat-msg name="黑塔" tag="全肯定Bot" tagType="customization" avatar="/avatar/heita.webp">
    那我问你，你是男的女的
  </chat-msg>
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>女的</chat-msg>
  <chat-voice
    name="黑塔"
    tag="全肯定Bot"
    tagType="customization"
    avatar="/avatar/heita.webp"
    audioSrc="/voices/heita_isfemale.m4a"
  />
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.webp" onright>男的</chat-msg>
  <chat-voice
    name="黑塔"
    tag="全肯定Bot"
    tagType="customization"
    avatar="/avatar/heita.webp"
    audioSrc="/voices/heita_ismale.m4a"
  />
</chat-window>
