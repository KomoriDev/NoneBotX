<script setup>
import { ref } from 'vue'

let cheated = ref(false)
</script>

# 你还看上涩图了.jpg

在 NoneBot 事件处理流程中，获取事件信息并做出对应的操作是非常常见的场景。本章节中我们将介绍<Mark>如何通过依赖注入获取事件信息</Mark>

## 获取用户 ID

有时候，不是什么人都能看涩图的，因此，我们需要先得到用户信息，再决定是否要分享。

::: code-group

```py [NoneBot Native]
from nonebot.internal.adapter import Event
from nonebot.adapter.onebot.v11 import MessageSegment

matcher = on_command("来张涩图")

@matcher.handle()
async def _(event: Event):
    user_id = event.get_user_id()
    if user_id == "1234567890":
        await matcher.finish("你太坏了，不给你看")
    await matcher.finish(MessageSegment.image("xxx.jpg"))
```

```py [NoneBot Alconna]
from nonebot_plugin_alconna import Command, MsgTarget, UniMessage

matcher = Command("来张涩图").build(use_cmd_start=True)

@matcher.handle()
async def _(msg_target: MsgTarget):
    if msg_target.id == "1234567890":
        await UniMessage("你太坏了，不给你看").finish()
    await UniMessage.image("xxx.jpg").finish()
```

:::

这样，我们便可以实现：

<chat-window title="NoneBot Console">
  <chat-msg name="Komorebi（ID:1234567890）" avatar="/avatar/komorebi.webp" onright>/来张涩图</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">你太坏了，不给你看</chat-msg>
  <chat-msg name="NCBM" avatar="/avatar/ncbm.webp">/来张涩图</chat-msg>
  <chat-img
    name="Hibiscus"
    tag="机器人"
    avatar="/avatar/hibiscus.webp"
    src="/images/guide/shining-1.png"
    @click="cheated = true"
    v-if="cheated == false"
  ></chat-img>
  <chat-toast v-if="cheated == true">Hibiscus 撤回了一张涩图</chat-toast>
  <chat-msg v-if="cheated == true" name="Hibiscus" tag="机器人" avatar="/avatar/hibiscus.webp">你被骗了（
    <!-- <chat-img src="/images/guide/cheated.jpg"></chat-img> -->
    <img src="/images/guide/cheated.jpg" style="margin-top: 10px" alt="你被骗了.jpg"/>
  </chat-msg>
</chat-window>
