<script setup>
import { ref } from 'vue'

let cheated = ref(false)
</script>

<div class="origin">

# 你还看上涩图了.jpg

</div>

<div class="classic">

# 获取事件信息

</div>

在 NoneBot 事件处理流程中，获取事件信息并做出对应的操作是非常常见的场景。本章节中我们将介绍<Mark>如何通过依赖注入获取事件信息</Mark>

## 获取用户 ID

有时候，不是什么人都能看涩图的，因此，我们需要先得到用户信息，再决定是否要分享。

::: code-group

```py [NoneBot Native]
from nonebot.internal.adapter import Event
from nonebot.adapters.onebot.v11 import MessageSegment

matcher = on_command("来张涩图")

@matcher.handle()
async def _(event: Event):
    user_id = event.get_user_id()
    if user_id == "1234567890":
        await matcher.finish("你太坏了，不给你看")
    await matcher.finish(MessageSegment.image("xxx.jpg"))
```

```py [NoneBot Alconna]
from nonebot.internal.adapter import Event
from nonebot_plugin_alconna import Command, UniMessage

matcher = Command("来张涩图").build(use_cmd_start=True)

@matcher.handle()
async def _(event: Event):
    user_id = event.get_user_id()
    if user_id == "1234567890":
        await UniMessage("你太坏了，不给你看").finish()
    await UniMessage.image("xxx.jpg").finish()
```

:::

这样，我们便可以实现：

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi（ID:1234567890）" avatar="/avatar/komorebi.webp" onright>/来张涩图</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" tagType="bot" avatar="/avatar/hibiscus.webp">你太坏了，不给你看</chat-msg>
  <chat-msg name="NCBM" avatar="/avatar/ncbm.webp">/来张涩图</chat-msg>
  <chat-img
    name="Hibiscus"
    tag="机器人"
    tagType="bot"
    avatar="/avatar/hibiscus.webp"
    src="/images/guide/shining-1.png"
    @click="cheated = true"
    v-if="cheated == false"
  ></chat-img>
  <chat-toast v-if="cheated == true">Hibiscus 撤回了一张涩图</chat-toast>
  <chat-msg v-if="cheated == true" name="Hibiscus" tag="机器人" tagType="bot" avatar="/avatar/hibiscus.webp">
    你被骗了（
      <!-- <chat-img src="/images/guide/cheated.jpg"></chat-img> -->
    <img src="/images/guide/cheated.jpg" style="margin-top: 10px" alt="你被骗了.jpg"/>
  </chat-msg>
</chat-window>

## 更多信息

不同的平台有不同的事件，比如：在 [OneBot V11](https://github.com/botuniverse/onebot-11) 规范中，消息事件（[`MessageEvent`](https://github.com/botuniverse/onebot-11/blob/master/event/message.md)）的 `sender` 字段提供了发送者信息。而 Telegram 消息的 [`MessageEvent`](https://core.telegram.org/bots/api#chat) 提供了 `chat` 字段。因此，我们可以通过注入各个平台的 `MessageEvent`来获取用户信息

::: tip
对于 Bot 的跨平台适配，我们可以使用 [NoneBot Plugin UserInfo](https://github.com/noneplugin/nonebot-plugin-userinfo) 插件来跨平台获取用户信息
:::

::: code-group

```py [NoneBot Native]
from nonebot import on_command
from nonebot.adapters.onebot.v11 import MessageEvent as OneBotMessageEvent
from nonebot.adapters.telegram import MessageEvent as TelegramMessageEvent

matcher = on_command("来张涩图")

@matcher.handle()
async def _(event: OneBotMessageEvent | TelegramMessageEvent):
    # 使用 isinstance 判断事件
    if isinstance(event, OneBotMessageEvent):
        # OneBot V11
        nickname = event.sender.nickname
        await matcher.finish(f"收到 QQ 消息，用户：{nickname}。发放普通涩图")
    else:
        # Telegram
        username = event.chat.username
        await matcher.finish(f"收到 Telegram 消息，用户：{username}。发放 R18G")
```

```py [NoneBot Alconna]
from nonebot.adapters.onebot.v11 import MessageEvent as OneBotMessageEvent
from nonebot.adapters.telegram import MessageEvent as TelegramMessageEvent
from nonebot_plugin_alconna import Command, UniMessage

matcher = Command("来张涩图").build(use_cmd_start=True)

@matcher.handle()
async def _(event: OneBotMessageEvent | TelegramMessageEvent):
    # 使用 isinstance 判断事件
    if isinstance(event, OneBotMessageEvent):
        # OneBot V11
        nickname = event.sender.nickname
        await UniMessage(f"收到 QQ 消息，用户：{nickname}。发放普通涩图").finish()
    else:
        # Telegram
        username = event.chat.username
        await UniMessage(f"收到 Telegram 消息，用户：{username}。发放 R18G").finish()
```

```py [Alconna + UserInfo]
from nonebot_plugin_alconna import Command, UniMessage
from nonebot_plugin_userinfo import EventUserInfo, UserInfo

matcher = Command("来张涩图").build(use_cmd_start=True)

@matcher.handle()
async def _(user_info: UserInfo = EventUserInfo()):
    username = user_info.user_name
    await UniMessage(f"用户：{username}").finish()
```

:::
