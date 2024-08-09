# 兄弟别冲了呀

在我们编写插件的时候, 难免会碰到一些需要针对用户个体做出响应的情况, 比如: 好感系统, 游戏账户绑定, 或者限制使用频率之类。

所以, 本章会手把手教你构建一个你自己的<ruby>用户<rp>(</rp><rt>~~涩涩~~</rt><rp>)</rp></ruby>系统。<Curtain>~~防止你的群友冲死~~</Curtain>

## 认识 ORM

> 对象关系映射 (英语: Object Relational Mapping, 简称ORM, 或O/RM, 或O/R mapping), 是一种程序设计技术, 用于实现面向对象编程语言里不同类型系统的资料之间的转换。从效果上说, 它其实是创建了一个可在编程语言里使用的"虚拟对象数据库"。  
> —— 维基百科

简单来说, orm 就是对数据库的封装, 使得我们可以像操作对象一样操作数据库。

而在 NoneBot 中, 官方提供了一个插件 [plugin-orm](https://github.com/nonebot/plugin-orm) 它以 [sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) 为基础, 为我们提供了数据库支持。

## 安装 ORM 插件

首先, 让我们为插件声明依赖项

```shell
pdm add nonebot-plugin-orm
```

然后让我们在插件代码中向 NoneBot 声明插件依赖

```python
from nonebot import require

require('nonebot_plugin_orm')
```

嗯! 让我们来运行一下试试吧!

::: danger 哎呀
好像出错了呢

```shell
ValueError: 必须指定一个默认数据库 (SQLALCHEMY_DATABASE_URL 或 SQLALCHEMY_BINDS[""]). 可以通过 `pip install nonebot-plugin-orm[default]` 获得开箱即用的数据库配置.
```

:::
::: details 详细日志

```shell {18}
08-09 21:19:27 [ERROR] uvicorn | Traceback (most recent call last):
  File "/venv/python3.9/site-packages/starlette/routing.py", line 732, in lifespan
    async with self.lifespan_context(app) as maybe_state:
  File "/venv/python3.9/lib/python3.9/contextlib.py", line 181, in __aenter__
    return await self.gen.__anext__()
  File "/venv/python3.9/site-packages/nonebot/drivers/fastapi.py", line 153, in _lifespan_manager
    await self._lifespan.startup()
  File "/venv/python3.9/site-packages/nonebot/internal/driver/_lifespan.py", line 42, in startup
    await self._run_lifespan_func(self._startup_funcs)
  File "/venv/python3.9/site-packages/nonebot/internal/driver/_lifespan.py", line 36, in _run_lifespan_func
    await cast(ASYNC_LIFESPAN_FUNC, func)()
  File "/venv/python3.9/site-packages/nonebot_plugin_orm/__init__.py", line 75, in init_orm
    _init_orm()
  File "/venv/python3.9/site-packages/nonebot_plugin_orm/__init__.py", line 102, in _init_orm
    _init_engines()
  File "/venv/python3.9/site-packages/nonebot_plugin_orm/__init__.py", line 182, in _init_engines
    raise ValueError(
ValueError: 必须指定一个默认数据库 (SQLALCHEMY_DATABASE_URL 或 SQLALCHEMY_BINDS[""]). 可以通过 `pip install nonebot-plugin-orm[default]` 获得开箱即用的数据库配置.

08-09 21:19:27 [ERROR] uvicorn | Application startup failed. Exiting.
```

:::
哦! 这是因为我们还没有配置数据库! 但是不用担心, [plugin-orm](https://github.com/nonebot/plugin-orm) 为我们提供了一种可以开箱即用的配置 `nonebot-plugin-orm[default]`。  
不过我们不希望用户都强制使用这个配置, 所以我们要将这个依赖项声明在`dev`依赖里。
::: tip
上文中的报错里也有提示, 不过我们不使用 `pip`, 我们使用 `pdm`
:::

```shell
pdm add nonebot-plugin-orm[default] -d
```

很好! 现在我们的插件可以正常加载了!

不过我们还没有正式的开始构建我们的用户系统。在下一节中, 我们来学习定义一个数据库模型 `Models`。
