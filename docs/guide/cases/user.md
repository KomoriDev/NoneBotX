# 兄弟别冲了呀

在我们编写插件的时候，难免会碰到一些需要针对用户个体做出响应的情况，比如: 好感系统，游戏账户绑定，或者限制使用频率之类。

所以，本章会手把手教你构建一个你自己的<ruby>用户<rp>(</rp><rt>~~涩涩~~</rt><rp>)</rp></ruby>系统，用于限制用户使用命令的频率。<Curtain>~~防止你的群友冲死~~</Curtain>

## 认识 ORM

简单来说，ORM 就是对数据库的封装，使得我们可以像操作对象一样操作数据库。

而在 NoneBot 中，官方提供了一个插件 [plugin-orm](https://github.com/nonebot/plugin-orm) 它以 [sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) 和 [alembic](https://github.com/sqlalchemy/alembic) 为基础，为我们提供了完善的数据库支持。

### 我为什么使用 ORM？

~~不想说废话，直接举例子~~

假设我们有一个用户管理系统，其中包含一个 `User` 表，结构包含 `id`，`username`，`email`，`age` 四个字段

任务是：让 Bot 输出所有年龄大于30岁的用户。

:::code-group

```python [Plugin ORM]
from nonebot import on_command

from sqlalchemy.orm import Mapped, mapped_column, select
from nonebot_plugin_orm import Model, async_scoped_session

class User(Model):

    __tablename__ = 'User'

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(100))
    age: Mapped[int]

cmd = on_command("查询")

@cmd.handle()
async def _(session: async_scoped_session):
    stmt = select(User).where(User.age > 30)
    users = session.execute(stmt).scalars().all()
    for user in users:
        await cmd.send(user.username, user.email)
    await cmd.finish()

```

```python [手搓 SQL]
import aiosqlite
from nonebot import get_driver, on_command

driver = get_driver()

# 先写个类
class DBManager():

  async def connect(self):
    # 手动连接数据库
    self.conn = await aiosqlite.connect(':memory:')   # 这里使用内存数据库作为例子
    self.cursor = await self.conn.cursor()
    self.create_table()

  async def disconnect(self):
    # 手动断开数据库
    await self.conn.close()

  async def create_table(self):
    await self.cursor.execute('''
    SELECT name FROM sqlite_master WHERE type='table' AND name='User'
    ''')
    result = await self.cursor.fetchone()

    # 如果表不存在，则创建表
    if not result:
        await self.cursor.execute('''
        CREATE TABLE User (
            id INTEGER PRIMARY KEY,
            username VARCHAR(50),
            email VARCHAR(100),
            age INTEGER
        )
        ''')
    else:
        pass

db = DBManager()

@driver.on_startup
async def open_database():
  db.connect()

@driver.on_shutdown
async def close_database():
  db.close_connect()


cmd = on_command("查询")

@cmd.handle()
async def _():
    cursor.execute('SELECT username, email FROM User WHERE age > 30')
    users = cursor.fetchall()
    for user in users:
        await cmd.send(user[0], user[1])
    await cmd.finish()
```

:::

~~哪个省时省力相信你还是分得清的~~

## 安装 ORM 插件

首先，经典的安装环节

::: tip

[plugin-orm](https://github.com/nonebot/plugin-orm) 只提供了 ORM 功能，我们需要在安装命令后面加上 `sqlite` 另行安装数据库后端

:::

```shell
pdm add nonebot-plugin-orm[sqlite]
```

然后让我们在插件代码中向 NoneBot 声明插件依赖

```python
from nonebot import require

require('nonebot_plugin_orm')
```

很好！现在我们的插件可以正常加载了！

不过我们还没有正式的开始构建我们的用户系统。在下一节中，我们来学习定义一个数据库模型 `Models`。

## 定义数据库模型

要定义一个我们自己的数据库模型，我们首先需要导入 Model 基类

```python
from nonebot_plugin_orm import Model
```

然后我们需要继承这个类，并且在类中声明我们需要的字段。

::: tip
在 MySQL 中，需要为 String 类型字段指定长度

```py
user_id: Mapped[str] = mapped_column(String(32))
```

:::

```python
from datetime import datetime

from nonebot_plugin_orm import Model
from sqlalchemy.orm import Mapped, mapped_column

class User(Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[str]
    last_use: Mapped[datetime]
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())
```

在上面的代码中，我们定义了一个名为 `User` 的类，然后我们定义了 `id`、`user_id`、`last_use` `created_at` 这四个字段。

首先，让我们关注 `id` 字段，它被声明为一个整数类型，并且被设置为主键。

```python
class User(Model):
    id: Mapped[int] = mapped_column(primary_key=True) # [!code focus]
    user_id: Mapped[str]
    last_use: Mapped[datetime]
    created_at: Mapped[datetime] = mapped_column(default=datetime.now())  # [!code focus]
```

`created_at` 字段被声明为 `datetime` 类型，并且将当前时间设置为默认值。

其中 `Mapped` 是 [sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) 提供的用于将 `Python` 类型映射到数据库类型的特殊类型标注。
::: tip
`Mapped` 不是万能的，有时我们需要手动告知 [sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) 应该将 `Python` 类型映射到什么数据库类型。  
比如 `dict` 类型，我们需要手动使用 `JSON` 类进行映射。

```python
from sqlalchemy import JSON

example: Mapped[dict] = mapped_column(JSON)
```

:::
`mapped_column` 是 [sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) 提供的用于更加自定义定义列的方法。比如在上面的代码中，我们设置了 `primary_key=True`，这将告知 [sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) 这个字段为主键。
::: tip
`mapped_column` 有很多功能，比如设置字段类型，默认值，是否索引，是否唯一等等。详细可以去查看 [sqlalchemy](https://github.com/sqlalchemy/sqlalchemy) 的 [文档](https://docs.sqlalchemy.org/en/20/orm/mapping_api.html#sqlalchemy.orm.mapped_column)。
:::

然后根据刚才介绍的 `Mapped` 的功能，我们可以得知 `user_id` 和 `last_use` 分别被映射到数据库的字符串和时间类型。

让我们来验证一下吧！

```python
from sqlalchemy.schema import CreateTable

print(CreateTable(MyUser.__table__))
```

```sql
CREATE TABLE nonebot_plugin_test_myuser (
        id INTEGER NOT NULL,
        user_id VARCHAR NOT NULL,
        last_use DATETIME NOT NULL,
        CONSTRAINT pk_nonebot_plugin_test_myuser PRIMARY KEY (id)
)
```

嗯！看起来不错！

不过似乎又有什么报错？

```shell
nonebot_plugin_orm.exception.AutogenerateDiffsDetected: 检测到新的升级操作:
[('add_table',
  Table('nonebot_plugin_test_myuser', MetaData(), Column('id', Integer(), table=<nonebot_plugin_test_myuser>, primary_key=True, nullable=False), Column('user_id', String(), table=<nonebot_plugin_test_myuser>, nullable=False), Column('last_use', DateTime(), table=<nonebot_plugin_test_myuser>, nullable=False), schema=None))]
```

::: details 详细日志

```shell {30-32}
08-09 22:56:51 [ERROR] nonebot | Application startup failed. Exiting.
Traceback (most recent call last):
  File "<string>", line 11, in <module>
  File "/venv/lib/python3.9/site-packages/nonebot/__init__.py", line 335, in run
    get_driver().run(*args, **kwargs)
  File "/venv/lib/python3.9/site-packages/nonebot/drivers/none.py", line 56, in run
    loop.run_until_complete(self._serve())
  File "/venv/lib/python3.9/asyncio/base_events.py", line 634, in run_until_complete
    self.run_forever()
  File "/venv/lib/python3.9/asyncio/base_events.py", line 601, in run_forever
    self._run_once()
  File "/venv/lib/python3.9/asyncio/base_events.py", line 1905, in _run_once
    handle._run()
  File "/venv/lib/python3.9/asyncio/events.py", line 80, in _run
    self._context.run(self._callback, *self._args)
  File "/venv/lib/python3.9/site-packages/nonebot/drivers/none.py", line 60, in _serve
    await self._startup()
> File "/venv/lib/python3.9/site-packages/nonebot/drivers/none.py", line 68, in _startup
    await self._lifespan.startup()
  File "/venv/lib/python3.9/site-packages/nonebot/internal/driver/_lifespan.py", line 42, in startup
    await self._run_lifespan_func(self._startup_funcs)
  File "/venv/lib/python3.9/site-packages/nonebot/internal/driver/_lifespan.py", line 36, in _run_lifespan_func
    await cast(ASYNC_LIFESPAN_FUNC, func)()
  File "/venv/lib/python3.9/site-packages/nonebot_plugin_orm/__init__.py", line 84, in init_orm
    await greenlet_spawn(migrate.check, alembic_config)
  File "/venv/lib/python3.9/site-packages/sqlalchemy/util/_concurrency_py3k.py", line 203, in greenlet_spawn
    result = context.switch(value)
  File "/venv/lib/python3.9/site-packages/nonebot_plugin_orm/migrate.py", line 572, in check
    raise AutogenerateDiffsDetected(f"检测到新的升级操作:\n{pformat(diffs)}")
nonebot_plugin_orm.exception.AutogenerateDiffsDetected: 检测到新的升级操作:
[('add_table',
  Table('nonebot_plugin_test_myuser', MetaData(), Column('id', Integer(), table=<nonebot_plugin_test_myuser>, primary_key=True, nullable=False), Column('user_id', String(), table=<nonebot_plugin_test_myuser>, nullable=False), Column('last_use', DateTime(), table=<nonebot_plugin_test_myuser>, nullable=False), schema=None))]
```

:::

哦！这是因为我们只定义了数据库模型，还没有为它创建迁移脚本！导致我们的数据库现在空空如也，和我们定义的数据库模型并不一致。所以 [plugin-orm](https://github.com/nonebot/plugin-orm) 阻止了我们启动机器人。

## 即刻迁移
