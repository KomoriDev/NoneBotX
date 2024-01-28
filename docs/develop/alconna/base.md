# Alconna 插件

[nonebot-plugin-alconna] 是一类提供了拓展响应规则的插件。 该插件使用 [Alconna] 作为命令解析器， 是一个简单、灵活、高效的命令参数解析器, 并且不局限于解析命令式字符串。

该插件提供了一类新的事件响应器辅助函数 `on_alconna`，以及一系列依赖注入函数。

基于 `Alconna` 的特性，该插件同时提供了一系列便捷的消息段标注。用于在 `Alconna` 中匹配所有除 `text` 外的其他消息段，也可用于快速创建各适配器下的消息段。所有标注位于 `nonebot_plugin_alconna.adapters` 中。

## 凡事都要先安装

在使用前请先安装 `nonebot-plugin-alconna` 插件至项目环境中，可参考获取商店插件来了解并选择安装插件的方式。如：

在**项目目录**下执行以下命令：

::: code-group

```bash [nb-cli]
nb plugin install nonebot-plugin-alconna
```

```bash [pdm]
pdm add nonebot-plugin-alconna
```

```bash [poetry]
poetry add nonebot-plugin-alconna
```

```bash [pip]
pip install nonebot-plugin-alconna
```

:::

## 导入插件

由于 `nonebot-plugin-alconna` 作为插件，因此需要在使用前对其进行加载并导入其中的 `on_alconna` 来使用命令拓展。使用 `require` 方法可轻松完成这一过程。

```py :no-line-numbers
from nonebot import require

require("nonebot_plugin_alconna")

from nonebot_plugin_alconna import on_alconna
```

## 使用插件

<Loading/>

[nonebot-plugin-alconna]: https://github.com/nonebot/plugin-alconna
[Alconna]: https://github.com/ArcletProject/Alconna
