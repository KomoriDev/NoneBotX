<div class="origin">

# 东西要分类好

</div>

<div class="classic">

# 项目结构

</div>

在正式编写涩涩插件之前，我们需要先了解一下插件的概念。

## 插件结构

在 NoneBot 中，插件就是一个 [模块（module）](https://docs.python.org/zh-cn/3/glossary.html#term-module)。NoneBot 会在导入时对这些模块做一些特殊的处理使得他们成为一个插件。插件间应尽量减少耦合，可以进行有限制的相互调用，NoneBot 能够正确解析插件间的依赖关系。

### 单文件插件

一个普通的 `.py` 文件即可以作为一个插件，例如创建一个 `foo.py` 文件：

```txt :no-line-numbers
📂 plugins
└── 📜 foo.py
```

这个时候模块 foo 已经可以被称为一个插件了 ~~尽管它还什么都没做。~~

### 包插件

一个包含 `__init__.py` 的文件夹即是一个常规 Python [包（package）](https://docs.python.org/zh-cn/3/glossary.html#term-regular-package)，例如创建一个 `foo` 文件夹：

```txt :no-line-numbers
📂 plugins
└── 📂 foo
    └── 📜 __init__.py
```

这个时候包 `foo` 同样是一个合法~~却没用~~的插件，插件内容可以在 `__init__.py` 文件中编写。

## 配置结构

当我们使用 `nb-cli` 创建了一个 `Hibiscus` 后，我们可以在 `pyproject.toml` 中找到有关 NoneBot 的配置

```toml :no-line-numbers

[tool.nonebot]
adapters = [
    { name = "OneBot V11", module_name = "nonebot.adapters.onebot.v11" },
    { name = "Console", module_name = "nonebot.adapters.console" }
]
# 适配器加载列表

plugins = []
# 加载的插件列表（一般是安装的第三方插件）

plugin_dirs = ["hibiscus/plugins"]
# 插件加载目录列表（自动搜索指定目录下的插件，不会主动递归查找子目录）

builtin_plugins = ["echo"]
# 内置插件列表

```
