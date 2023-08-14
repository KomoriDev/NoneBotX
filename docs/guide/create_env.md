# 要致富，先撸树

> 罗马不是一夜建成，机器人也不是一日造好。—— :older_man:

## 注意事项

1. **本文档将会默认你至少学过一点点 `Python`，假设你连 Python 都不会，建议至少学点 Python 基础再来看。**
2. **本文档将假设你具有一定的英语阅读能力<curtain>通过 XX 翻译也行</curtain>，并能对工具软件的提示作出自己的决定。**
3. **本文档将会使用 `PDM` 作为依赖和虚拟环境管理工具。**
   :::warning
   关于为什么用 `PDM`，你可以看这里 :point_right: [看这](/before/QA#_6-python-包管理器的选择)
   :::

4. **本文档将使用 `Graia Ariadne` 0.7.15 及以上的版本**，Ariadne 在 0.7.0 进行了一次大的
   Breaking Change，因此本文档不适用 0.7.0 以下的 Ariadne，也不再提供旧版的使用方法及示例。

   :::tip 小贴士（bushi）

   - 从 0.5.x 和 0.6.x 版本的 Ariadne 迁移至 0.7.x 请参考[这里](https://graia.cn/ariadne/migrate/amnesia_port/)
   - **0.7.6 及以下版本的 Ariadne 存在一些 Bug，不推荐使用噢。**
   - **0.7.15 的 Ariadne 不能自己创建 loop 和 bcc 了，所以本文档的所用的 Ariadne 版本为 0.7.15+**
   - 有关什么是 Ariadne，请参阅[这里](/before/QA#_2-什么是-ariadne)
   - 一般情况下本文档会随着 **Ariadne** 版本的更新而更新，所以**强烈推荐**你直接安装最新版本（latest），现在 **Ariadne** 的最新版本为
     <a href="https://pypi.org/project/graia-ariadne/#history"><img src="https://img.shields.io/pypi/v/graia-ariadne?color=2970b6&amp;label=&amp;style=flat-square" alt="PyPI版本" style="display:inline;vertical-align:text-bottom"></a>

   :::

5. 虽然 `Ariadne` 支持
   <img src="https://img.shields.io/pypi/pyversions/graia-ariadne?color=2970b6&amp;label=Python&amp;style=flat-square" alt="Python版本" style="display:inline;vertical-align:text-bottom">
   ，但为了**最佳体验**，我们建议你最好升级到 `Python3.9+` 以保证能够享受到全部功能。
6. **本文档部分内容可能未及时更新或不全**，因此你可以在本文档的一些页面见到如下的提示框，他们通常指向相关的文档/示例。
   :::interlink
   <https://graia.cn/ariadne/>
   :::

## 创建项目

新建一个项目文件夹，这里我们就叫 `EroEroBot` 吧 （<curtain>PeroPero 震怒</curtain>）

:::interlink EroEroBot
本章完整示例可在 [EroEroBot/main-base.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/main-base.py) 找到。  
你可以在[此处](https://github.com/GraiaCommunity/EroEroBot/releases/tag/release)下载预配置好的模板（不定期更新）。
:::

创建好后进入该文件夹内：

```sh
# 这个是 Linux 环境下通过终端创建并进入文件夹的命令
mkdir EroEroBot
cd EroEroBot
```

如果你是 Windows 用户

1. 创建一个空文件夹 `EroEroBot`（别跟我说你连这个都不会）
2. 进入该文件夹，同时按下 `Shift` 和 鼠标右键，选择 `在此处打开 Powershell 窗口`  
   如果是 Windows 11 用户且安装有 Windows Terminal，可直接右键，选择 `在终端中打开`

:::warning

然后输入 `pdm init` 开始创建环境，你就会看到类似下面的提示：

> 过长的行请手动往右滚动查看

```sh
❯ pdm init
Creating a pyproject.toml for PDM...
Would you like to create a virtualenv with C:\Users\GraiaX\AppData\Local\Programs\Python\Python311\python.EXE? [y/n]
(y): y # 输入 y 并按下回车以使用系统环境中的 Python 创建虚拟环境
Virtualenv is created successfully at D:\Projects\PythonProjects\EroEroBot\.venv
Is the project a library that is installable?
If yes, we will need to ask a few more questions to include the project name and build backend [y/n] (n): y # 输入 y 并按下回车
Project name (EroEroBot): # 项目名称。默认使用给当前文件夹的名字，所以直接按下回车即可
Project version (0.1.0): # 项目版本。如无特殊需要保持默认直接按下回车即可
Project description ( ): # 项目描述。如无特殊需要保持默认直接按下回车即可
Which build backend to use?
0. pdm-backend
1. setuptools
2. flit-core
3. hatchling
4. pdm-pep517
Please select (0): # 选择构建器。如无特殊需要保持默认直接按下回车即可
License(SPDX name) (MIT): AGPL-3.0-Only
# 输入项目的开源协议，由于 Graia Project 的部分包以及 Mirai 都为 AGPL3 协议且 GPL 具有传染性，因此我们这里也要使用 AGPL3，输入 `AGPL-3.0-Only` 并按下回车
Author name (GraiaCommunity): # 作者名称。请尽量不要使用中文
Author email (admin@graiax.cn): # 作者邮箱
Python requires('*' to allow any) (>=3.11): # 项目的 Python 版本。如无特殊需要保持默认直接按下回车即可
Project is initialized successfully # 至此，一个基于 PDM 管理依赖的 Python 项目便初始化完毕
```

完成之后，你的项目文件夹内应该会出现一个 `pyproject.toml` 文件。

:::tip
为了防止后续添加依赖时等待太久，可以修改 `pyproject.toml` 来添加国内镜像加速站，打开该文件后添加如下内容即可：

```toml
[[tool.pdm.source]]
# 这里以清华源举例，你也可以使用其他源
name = "tuna-tsinghua"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
verify_ssl = true
```

或者你也可以使用命令 `pdm config pypi.url https://pypi.tuna.tsinghua.edu.cn/simple`
为所有使用 PDM 管理的项目设置全局的镜像源。
:::

## 启用虚拟环境并安装 `Graia Ariadne`

在配置好环境之后，你需要给你的项目创建一个虚拟环境并安装 **Graia Ariadne**，在项目根目录执行如下命令：

```sh
pdm add graia-ariadne[standard]
```

:::tip

- `graia-ariadne[graia]`
  - `graia-saya` —— 模块化（[东西要分类好](/guide/saya.md)）
  - `graia-scheduler` —— 定时任务（[哦嗨哟，欧尼酱](/guide/scheduler.md)））
- `graia-ariadne[standard]` 或 `graia-ariadne[full]`
  - `richuru`
  - `graia-saya` —— 模块化（[东西要分类好](/guide/saya.md)）
  - `graia-scheduler` —— 定时任务（[哦嗨哟，欧尼酱](/guide/scheduler.md)）
- `graia-ariadne[fastapi]`
  - `uvicorn[standard]`
  - `fastapi`

:::

::::details 命令输出

```sh
❯ pdm add graia-ariadne[standard]
Adding packages to default dependencies: graia-ariadne
🔒 Lock successful
Changes are written to pyproject.toml.
Synchronizing working set with lock file: 34 to add, 0 to update, 0 to remove

  ✔ Install async-timeout 4.0.2 successful
  ✔ Install colorama 0.4.6 successful
  ✔ Install aiosignal 1.3.1 successful
  ✔ Install creart 0.2.2 successful
  ✔ Install attrs 23.1.0 successful
  ✔ Install croniter 1.4.1 successful
  ✔ Install charset-normalizer 3.2.0 successful
  ✔ Install creart-graia 0.1.5 successful
  ✔ Install graia-broadcast 0.22.1 successful
  ✔ Install idna 3.4 successful
  ✔ Install graia-saya 0.0.17 successful
  ✔ Install frozenlist 1.4.0 successful
  ✔ Install importlib-metadata 6.8.0 successful
  ✔ Install graia-amnesia 0.7.1 successful
  ✔ Install graia-ariadne 0.11.5 successful
  ✔ Install graia-scheduler 0.1.5 successful
  ✔ Install mdurl 0.1.2 successful
  ✔ Install loguru 0.6.0 successful
  ✔ Install launart 0.6.3 successful
  ✔ Install markdown-it-py 3.0.0 successful
  ✔ Install aiohttp 3.8.5 successful
  ✔ Install packaging 23.1 successful
  ✔ Install python-dateutil 2.8.2 successful
  ✔ Install richuru 0.1.1 successful
  ✔ Install six 1.16.0 successful
  ✔ Install typing-extensions 4.7.1 successful
  ✔ Install rich 13.5.2 successful
  ✔ Install win32-setctime 1.1.0 successful
  ✔ Install statv 0.3.2 successful
  ✔ Install zipp 3.16.2 successful
  ✔ Install pygments 2.15.1 successful
  ✔ Install multidict 6.0.4 successful
  ✔ Install pydantic 1.10.12 successful
  ✔ Install yarl 1.9.2 successful
Installing the project as an editable package...
  ✔ Install EroEroBot 0.1.0 successful

🎉 All complete!

```

::::
