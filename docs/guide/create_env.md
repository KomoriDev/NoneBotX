# 要致富，先撸树

> 罗马不是一夜建成，机器人也不是一日造好。—— :older_man:

::: danger 注意

- 在本章节中，我们假设你已了解计算机和命令行的初级知识；
- 本文档将会使用 `PDM` 作为依赖和虚拟环境管理工具；
- 请确保你的 Python 版本 >= 3.8；
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

安装完成后，你可以在命令行使用 `nb` 命令来使用脚手架。如果出现无法找到命令的情况（例如出现 `Command not found` 字样），请参考 [pipx 文档](https://pypa.github.io/pipx/) 检查你的环境变量。

## 创建项目

使用脚手架来创建一个项目：

```shell :no-line-numbers
nb create
```

这一指令将会执行创建项目的流程，你将会看到一些询问：

1. 项目模板

   ```shell :no-line-numbers

   [?] 选择一个要使用的模板: (Use ↑ or ↓ to choose, Enter to submit)
     bootstrap (初学者或用户)
   ❯ simple (插件开发者)

   ```

   ::: tip 单选界面
   使用键盘“↑”“↓”键选择，按回车（Enter）键确认。

   如果终端支持，整个交互式界面也支持鼠标点击操作。
   :::

   这里我们选择 `simple` 模板，它是一个适用于**插件开发**的模板，为我们的<curtain>涩图</curtain>机器人提供了最基础的配置。

   ::: tsukkomi 没有中文？
   `nb-cli` 支持检测你的环境是否为中文并选用中文输出（虽然还是缺一点翻译），如果没有中文，说明你的当前语言配置没有中文。

   如果遇到乱码，请配置你的终端编码选项，不能配置就换一个终端。

   对于类 `bash` 环境，你可以手动指定语言环境变量强迫 `nb` 使用中文。

   ```shell :no-line-numbers
   LC_ALL=zh_CN.UTF-8 nb
   ```

   :::

2. 项目名称

   ```shell :no-line-numbers

   [?] 项目名称: Hibiscus

   ```

   ::: tip 输入界面
   使用键盘输入内容，按回车（Enter）键确认。
   :::

   这里我们以 `Hibiscus` 作为项目名称。你可以根据自己的需要来命名。 <curtain>Komorebi: 中文名『木槿』，好听点（</curtain>

   然而请不要使用诸如 `nonebot` 这样的名字作为项目名（会影响模块导入而出问题）。

3. 驱动器

   ```shell :no-line-numbers

   [?] 要使用哪些驱动器? (Use ↑ or ↓ to choose, Space to select, Enter to submit)
   ❯ ○ None (None 驱动器)
     ● FastAPI (FastAPI 驱动器)
     ○ Quart (Quart 驱动器)
     ○ HTTPX (HTTPX 驱动器)
     ○ websockets (websockets 驱动器)
     ○ AIOHTTP (AIOHTTP 驱动器)

   ```

   ::: tip 多选界面
   使用键盘“↑”“↓”键选择，**按空格（Space）键选中/取消选中**，按回车（Enter）键确认。

   如果终端支持，整个交互式界面也支持鼠标点击操作。
   :::

   这里直接默认选择回车即可。

4. 适配器

   ```shell :no-line-numbers

   [?] 要使用哪些适配器? (Use ↑ and ↓ to move, Space to select, Enter to submit)
     ● OneBot V11 (OneBot V11 协议)
     ○ 钉钉 (钉钉协议)
     ○ 飞书 (飞书协议)
     ○ Telegram (Telegram 协议)
     ○ QQ 频道 (QQ 频道官方机器人)
     ○ 开黑啦 (开黑啦协议适配)
     ○ mirai2 (为 nonebot2 添加 mirai_api_http2.x的兼容适配器)
     ○ OneBot V12 (OneBot V12 协议)
   ❯ ● Console (基于终端的交互式适配器)
     ○ GitHub (GitHub APP & OAuth APP integration)
     ○ Ntchat (pc hook的微信客户端适配)
     ○ Minecraft (MineCraft通信适配，支持Rcon)
     ○ BilibiliLive (b站直播间ws协议)
     ○ Walle-Q (内置 QQ 协议实现)
     ○ 大别野 (米游社大别野官方Bot适配)
     ○ RedProtocol (RedProtocol 适配)

   ```

   ::: tip 多选界面
   使用键盘“↑”“↓”键选择，**按空格（Space）键选中/取消选中**，按回车（Enter）键确认。

   如果终端支持，整个交互式界面也支持鼠标点击操作。
   :::

   这里选择 OneBot V11 和 Console。其中 OneBot V11 适配器用于与实际平台或测试开发工具对接，Console 适配器则用于测试文本交互。

   ::: tip 测试开发环境

   使用测试开发工具可以有效避免实际账号在开发过程中出现风控<curtain>喜报</curtain>等意外情况。

   - NoneBot Console Adapter 是一款基于终端的交互式适配器，使得开发者可以方便地在终端中与聊天机器人进行交互，
     快速调试聊天机器人的功能，无需依赖其他平台或工具。

   - [Matcha](https://github.com/A-kirami/matcha) 是一个基于 OneBot 协议的辅助开发工具，能够进行更丰富的模拟聊天交互，同时提供一系列的开发辅助功能。
     它旨在降低开发者的调试与测试的负担，从而更有效率的专注于功能开发。

   :::

5. 插件目录

   ```shell :no-line-numbers

   [?] 请输入插件存储位置: (Use ↑ and ↓ to choose, Enter to submit)
   ❯ 1) 在 "hibiscus" 文件夹中
     2) 在 "src" 文件夹中

   ```

   ::: tip 单选界面
   使用键盘“↑”“↓”键选择，按回车（Enter）键确认。

   如果终端支持，整个交互式界面也支持鼠标点击操作。
   :::

   实际使用中随意，本文档中选用 `hibiscus` 文件夹。

6. 其他选项

   ```shell :no-line-numbers

   [?] 立即安装依赖? (Y/n) Yes
   [?] 创建虚拟环境? (Y/n) Yes

   ```

   ::: tip Yes/No 界面
   使用键盘输入“y”或“n”选择是否进行某项操作，按回车（Enter）键确认。

   提示中大写的选项为默认选项，不填写直接回车时使用此默认值。
   :::

   这里我们选择了创建虚拟环境，nb-cli 在之后的操作中将会自动使用这个虚拟环境。如果你不需要自动创建虚拟环境或者已经创建了其他虚拟环境，nb-cli 将会安装依赖至当前激活的 Python 虚拟环境。

7. 选择内置插件

   ```shell :no-line-numbers

   [?] 要使用哪些内置插件? (Use ↑ or ↓ to choose, Space to select, Enter to submit)
   ❯ ● echo
     ○ single_session

   ```

   ::: tip 多选界面
   使用键盘“↑”“↓”键选择，**按空格（Space）键选中/取消选中**，按回车（Enter）键确认。

   如果终端支持，整个交互式界面也支持鼠标点击操作。
   :::

   这里我们选择 `echo` 插件作为示例。这是一个简单的复读回显插件，可以用于测试你的机器人是否正常运行<curtain>，不过不太推荐用于实际聊天，小心被群友调戏</curtain>。

8. 大功告成！

   ```shell :no-line-numbers

   完成!
   使用 poetry 或 pdm 等依赖管理工具添加以下包:
     nonebot2[fastapi] nonebot-adapter-onebot nonebot-adapter-console
   运行以下命令来启动你的机器人:
     cd Hibiscus
     nb run --reload

   ```

   如果看到这些提示，说明你已经成功完成了重要的一步。

   **现在进入机器人目录**：

   ```shell :no-line-numbers

   cd Hibiscus

   ```

   **之后所有操作都在这个项目目录中进行。**

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

3. 选择 Python

   ```shell :no-line-numbers
   pyproject.toml already exists, update it now.
   Please enter the Python interpreter to use
   0. /usr/bin/python (3.11)
   1. .../Hibiscus/.venv/bin/python (3.11)  # 这是 nb-cli 创建的虚拟环境，实际路径因人而异，故只保留关键部分，输入序号来选择这个
   2. /usr/bin/python3.11 (3.11)
   Please select (0): 1
   ```

4. 杂项

   ```shell :no-line-numbers
   Is the project a library that is installable?
   If yes, we will need to ask a few more questions to include the project name and build backend [y/n] (n):
   License(SPDX name) (MIT):                               # 项目的开源协议
   Author name (Komorebi):                                 # 作者名称。请尽量不要使用中文
   Author email (mute231010@gmail.com):                    # 作者邮箱
   Python requires('*' to allow any) (>=3.8): >=3.8        # 项目的 Python 版本
   Project is initialized successfully
   ```

5. 将 NB-CLI 安装的包纳入管理

   ```shell :no-line-numbers
   # 实际添加的包请参考 nb-cli 的成功提示
   pdm add nonebot2[fastapi] nonebot-adapter-onebot nonebot-adapter-console
   ```

至此，一个基于 PDM 管理依赖的 Python 项目便初始化完毕

## 运行项目

在项目创建完成后，你可以在**项目目录**中使用以下命令来运行项目：

```shell :no-line-numbers

  nb run

```

你现在应该已经运行起来了你的第一个 NoneBot 项目了！请注意，生成的项目中使用了 `FastAPI`
驱动器、`OneBot V11` 适配器和 `Console` 适配器，你之后可以自行修改配置或安装其他适配器。

## 尝试使用

在项目运行起来后，`Console` 适配器会在你的终端启动交互模式，也可以选择配置 Matcha ~~或使用实际账号（不推荐）~~。

你可以直接在输入框中输入 `/echo hello world` 来测试你的机器人是否正常运行。

<chat-window title="NoneBot">
  <chat-msg name="Komorebi" avatar="/avatar/komorebi.jpg" onright>/echo hello world</chat-msg>
  <chat-msg name="Hibiscus" tag="机器人" avatar="/avatar/ero.jpg">hello world</chat-msg>
</chat-window>

按一次 `Ctrl+C` 可退出 `Console` 交互界面，再按一次即可结束运行机器人。
