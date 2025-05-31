from dataclasses import asdict

from nonebot import require
from nonebot.plugin import PluginMetadata, inherit_supported_adapters

require("nonebot_plugin_argot")
require("nonebot_plugin_waiter")
require("nonebot_plugin_alconna")
from nonebot_plugin_waiter import prompt
from nonebot_plugin_argot import Argot, ArgotExtension
from nonebot_plugin_alconna.uniseg import Text, Image, UniMessage
from nonebot_plugin_alconna import Match, Arparma, Command, store_true

from .utils import get_lolicon_image

__plugin_meta__ = PluginMetadata(
    name="色图插件",
    description="你好，来张涩图",
    usage="详见文档",
    type="application",
    homepage="https://github.com/KomoriDev/NoneBotX",
    supported_adapters=inherit_supported_adapters("nonebot_plugin_alconna"),
)

setu = (
    Command("setu")
    .option("r18", "-r|--r18", default=False, action=store_true)
    .option("tags", "-t|--tags [tags:str+]")
    .build(use_cmd_start=True, block=True, extensions=[ArgotExtension()])
)


@setu.handle()
async def _(arp: Arparma, r18: bool, tags: Match[tuple[str, ...]]):
    if tags.available:
        tags_result = "|".join(tags.result)
    else:
        if not arp.find("tags"):
            tags_result = ""
        else:
            resp = await prompt("请输入标签，空格分开", timeout=60)
            if resp is None:
                await setu.finish("等待超时")
            tags_result = "|".join(resp.extract_plain_text().split(" "))

    r18_result = 1 if r18 else 0

    data = await get_lolicon_image(r18_result, tags_result)

    await UniMessage(
        [
            Image(url=str(data.urls.original)),
            Text(f"画师: {data.author}; 标签：{', '.join(data.tags)}"),
            Argot(name="raw", segment=str(asdict(data))),
        ]
    ).finish()
