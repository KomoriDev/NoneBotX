# 哦嗨哟，欧尼酱

想必每一个二刺螈都曾今都会幻想过 —— 每天早上**女仆/只存在于美好幻想的可爱妹妹**叫你起床。

然后，自从你学习了如何写出一个机器人，就想能不能通过机器人脚本来间接实现这个幻想呢？

<volume-bar>懂得都懂：</volume-bar>

<chat-window title="Graia Framework Community">
  <chat-toast>上午 07:30</chat-toast>
  <chat-msg name="Hanser" avatar="/avatar/hanser.webp"><a style="text-decoration: none">@GraiaX</a> おはよう</chat-msg>
  <chat-voice name="Hanser" avatar="/avatar/hanser.webp" audio-src="/voices/欧尼酱快起床.m4a"></chat-voice>
  <chat-toast>上午 11:30</chat-toast>
  <chat-msg name="GraiaX" onright>哦嗨哟</chat-msg>
</chat-window>

:::tip
你可能会问上面这位叫你起床的是谁，  
这位是 [Hanser](https://zh.moegirl.org.cn/Hanser)，B站账号是[这个](https://space.bilibili.com/11073)。
:::

想想就得劲<curtain>虽然一个 At 跟语音八成不能成功叫你起床</curtain>。  
那么，就开始我们今天的艺术创想吧（bushi）

## 什么是 Graia Scheduler？

**Graia Scheduler** 是一个基于 asyncio，设计简洁，代码简单的计划任务库。

## 安装 Graia Scheduler

:::tip 注意
在写本章文档的时候，**Graia Scheduler** 的版本为 `0.0.7`  
而最新版本为 <img src="https://img.shields.io/pypi/v/graia-scheduler?color=2970b6&amp;style=flat-square" alt="PyPI版本" style="vertical-align: middle">
:::

:::tip
假设你之前安装 Ariadne 时使用的是以下 3 种选项中的一种，那么你可以直接跳过本小节。

- `graia-ariadne[full]`
- `graia-ariadne[graia]`
- `graia-ariadne[standard]`

:::

::::code-group
:::code-group-item poetry

```sh
poetry add graia-scheduler
```

:::
:::code-group-item pip

```sh
pip install graia-scheduler
```

::::

## 初始化 Graia Scheduler

在你的代码中加入这些：

:::tip
假如你使用了 `saya = create(Saya)` 则请直接跳到下一小节，**create** 与 **Saya** 会帮你自动处理好的。
:::

```python
from graia.scheduler import GraiaScheduler


sche = create(GraiaScheduler)
```

## 一个最简单的例子

以**每分钟都在群里发垃圾消息的机器人**为例子：

```python
from graia.scheduler import timers
from graia.scheduler.saya import SchedulerSchema


@channel.use(SchedulerSchema(timers.every_minute()))
async def every_minute_speaking(app: Ariadne):
    await app.send_group_message(1919810, MessageChain("我又来了"))
```

## 通过 crontab 来设定时间

在上面的例子中，你一定会发现，timers 中绝大多数 timer 都是**每隔一段间隔后触发**的模式，
这明显跟我们**让机器人每天早上 7 点半准时叫我们起床**相违背。

> 假设你是在例如树莓派什么的地方运行，最好先检查一下你有没有设置好时区。  
> 否则你的机器人可能会在协调世界时的早上 7 点半（北京时间 15 点半）叫你起床。

难道我们还要每天掐着点算什么时候启动机器人吗？

当然不是，有一个特殊的 timer 可以解决这个问题，那就是 `timers.crontabify`！
该方法支持传入一个 `crontab` 时间格式来进行时间计算，
`crontab` 具体语法你可以看一下[菜鸟教程对 crontab 的讲解](https://www.runoob.com/linux/linux-comm-crontab.html)。

:::tip
**看清楚了，方法是 `timers.crontabify` 而不是 `timers.croniter`！**  
事实上，**Graia Scheduler** 所使用的 crontab 语法分析库支持将**秒**作为第六个参数导入，如：

```python
#每天7点30分30秒发送消息
@channel.use(SchedulerSchema(timers.crontabify("30 7 * * * 30")))
```

:::

<chat-window title="Graia Framework Community">
  <chat-toast>上午 07:30</chat-toast>
  <chat-msg name="Hanser" avatar="/avatar/hanser.webp"><a style="text-decoration: none">@GraiaX</a></chat-msg>
  <chat-voice name="Hanser" avatar="/avatar/hanser.webp" audio-src="/voices/起床搬砖辣.m4a"></chat-voice>
</chat-window>

:::interlink
<https://graia.cn/ariadne/extra/scheduler/>

**EroEroBot:**  
本章完整示例可在 [EroEroBot/modules/scheduler.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/modules/scheduler.py) 找到。
:::
