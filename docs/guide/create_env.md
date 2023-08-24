# 要致富，先撸树

> 罗马不是一夜建成，机器人也不是一日造好。—— :older_man:

::: danger 注意

- 在本章节中，我们假设你已了解计算机和命令行的初级知识。
- 本文档将会使用 `PDM` 作为依赖和虚拟环境管理工具。

#### 前提条件

- 请确保你的 Python 版本 >= 3.8
- **我们强烈建议使用虚拟环境进行开发**，如果没有使用虚拟环境，请确保已经卸载可能存在的 NoneBot v1！！！

```shell :no-line-numbers
pip uninstall nonebot
```

:::

## 安装脚手架

确保你已经安装了 Python 3.8 及以上版本，然后在命令行中执行以下命令：

1. 安装 [pipx](https://pypa.github.io/pipx/)

   ```shell :no-line-numbers
   python -m pip install --user pipx
   python -m pipx ensurepath
   ```

2. 安装脚手架

   ```shell :no-line-numbers
   pipx install nb-cli
   ```

安装完成后，你可以在命令行使用 `nb` 命令来使用脚手架。如果出现无法找到命令的情况（例如出现 “Command not found” 字样），请参考 [pipx 文档](https://pypa.github.io/pipx/) 检查你的环境变量。

## 创建项目

使用脚手架来创建一个项目：

```shell :no-line-numbers
nb create
```

这一指令将会执行创建项目的流程，你将会看到一些询问：

1. 项目模板

   ```shell :no-line-numbers

   [?] 选择一个要使用的模板: simple (初学者或用户)

   ```

   这里我们选择 `simple` 模板，它是一个适用于**插件开发**的模板，为我们的<curtain>涩图</curtain>机器人提供了最基础的配置。

2. 项目名称

   ```shell :no-line-numbers

   [?] 项目名称: EroEroBot

   ```

   这里我们以 `EroEroBot` 为例，作为项目名称。你可以根据自己的需要来命名。 <curtain>PeroPero 震怒</curtain>

3. 其他选项 请注意，多选项使用**空格**选中或取消，**回车**确认。

   ```shell :no-line-numbers

   [?] 要使用哪些驱动器? FastAPI (FastAPI 驱动器)
   [?] 要使用哪些适配器? Console (基于终端的交互式适配器)
   [?] 立即安装依赖? (Y/n) Yes
   [?] 创建虚拟环境? (Y/n) Yes

   ```

   ::: tip 为什么使用 Console Adapter ?
   NoneBot Console Adapter 是一款基于终端的交互式适配器，使得开发者可以方便地在终端中与聊天机器人进行交互，
   快速调试聊天机器人的功能，无需依赖其他平台或工具
   :::

   这里我们选择了创建虚拟环境。因为 nb-cli 会安装依赖至当前激活的 Python 虚拟环境，也就是说会自动安装到 PDM 虚拟环境中。

4. 选择内置插件

   ```shell :no-line-numbers

   [?] 要使用哪些内置插件? echo

   ```

   这里我们选择 `echo` 插件作为示例。这是一个简单的复读回显插件，可以用于测试你的机器人是否正常运行。

## 安装包管理器

1. 安装 `PDM` 包管理器

   ```shell :no-line-numbers
   pipx install pdm
   ```

2. 初始化

   ```shell :no-line-numbers
   pdm init
   ```

稍后，你将会看到一些询问：

```shell :no-line-numbers
pyproject.toml already exists, update it now.
Would you like to create a virtualenv with ······ [y/n] (y): y        # 使用系统环境中的 Python 创建虚拟环境
Virtualenv is created successfully at ······
Is the project a library that is installable?
If yes, we will need to ask a few more questions to include the project name and build backend [y/n] (n):
License(SPDX name) (MIT): MIT                           # 项目的开源协议
Author name (Komorebi):                                 # 作者名称。请尽量不要使用中文
Author email (mute231010@gmail.com):                    # 作者邮箱
Python requires('*' to allow any) (>=3.8): >=3.8       # 项目的 Python 版本
Project is initialized successfully
```

至此，一个基于 PDM 管理依赖的 Python 项目便初始化完毕

## 运行项目

在项目创建完成后，你可以在**项目目录**中使用以下命令来运行项目：

```shell :no-line-numbers

  nb run

```

你现在应该已经运行起来了你的第一个 NoneBot 项目了！请注意，生成的项目中使用了 `FastAPI` 驱动器和 `Console` 适配器，你之后可以自行修改配置或安装其他适配器。

## 尝试使用

在项目运行起来后，`Console` 适配器会在你的终端启动交互模式，你可以直接在输入框中输入 `/echo hello world` 来测试你的机器人是否正常运行。

<chat-window title="NoneBot">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.jpg" onright>/echo hello world</chat-msg>
  <chat-msg name="EroEroBot" tag="机器人" avatar="/avatar/ero.jpg">hello world</chat-msg>
</chat-window>
