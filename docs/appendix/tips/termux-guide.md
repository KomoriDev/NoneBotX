# Termux 下进行部署/开发

:::info 提示
[Termux Wiki](https://wiki.termux.com/wiki/Main_Page) 是个好东西，建议好好看看。

此类环境较为特殊，在一般的操作流程中更容易出现问题。本教程旨在尽可能减少可能遇到的问题。
:::

## 优先使用 PRoot / ChRoot 等容器环境

Termux 本身提供了一套与常见 GNU/Linux 发行版相仿的操作环境（后文称为**基本环境**），然而由于基于一套不常规的平台，实际使用上更容易遇到麻烦。

相比之下，容器环境可以在基本环境的基础上运行一套相对更完整的 Linux 环境，从而达到与普通 Linux
更接近的体验，也更不容易遇到问题。<curtain>（原教旨 GNU/Linux 用户可能因为名称使用而震怒）</curtain>

具体操作可以自行搜索<curtain>（建议左转[哔哩哔哩](https://www.bilibili.com)）</curtain>。

:::warning 警告
如果你已经正确配置并掌握了容器环境，后面的内容就~~雨女无瓜~~了。
:::

## 官方包管理器与软件源

:::warning 警告
自本节开始，之后所有内容都是针对 **非容器环境** 进行指导。
:::

### 镜像源

目前版本的 Termux 提供了便捷更换镜像源的方法。

```shell :no-line-numbers
pkg i -u termux-tools  # 如果你的 Termux 不是新配置的，最好更新一下 termux-tools
termux-change-repo  # 运行镜像源切换助手
```

助手程序提供了一套易读的 TUI 界面，可以使用方向键、空格键、Tab 键、回车键以及屏幕点击进行选择操作。

```txt :no-line-numbers
    termux-change-repo
Do you want to choose a mirror group or a single mirror? Select with space.
# 你要选镜像组（同一地区的一批镜像站）还是单个镜像站？按空格键选择。

(*) Mirror group    # 在同一地区的几个镜像中自动挑选（推荐）。
( ) Single mirror   # 指定一个镜像往死里薅
```

这里直接回车/点击 `OK` 选择，进入镜像组选择界面：

```txt :no-line-numbers
    termux-change-repo
Which group of mirrors do you want to use? Select with space.
# 你想用哪个镜像组？按空格键选择。

(*) All mirrors                 # 全球的镜像站点
( ) Mirrors in Asia             # 全亚洲（不含中国大陆和俄罗斯）的镜像站点
( ) Mirrors in Chinese Mainland # 全中国大陆的镜像站点
( ) Mirrors in Europe           # 全欧洲的镜像站点
( ) Mirrors in North America    # 全北美的镜像站点
( ) Mirrors in Oceania          # 全大洋洲的镜像站点
( ) Mirrors in South America    # 全南美的镜像站点
( ) Mirrors in Russia           # 全俄罗斯的镜像站点
```

这里光标移到 `Mirrors in Chinese Mainland` 一项，按空格键/点击屏幕选中（以项首指示括号内出现
`*` 为准），回车/点击 `OK` 确认。

等待程序运行结束后，包管理器就可以使用设置的镜像源进行下载了。

### 包管理器

Termux 默认基于 Debian 系的 `apt/dpkg` 包管理程序，并提供了一个更高级的封装 `pkg`。

`pkg` 的基本用法如下：

```shell :no-line-numbers
pkg i 张三 李四  # 安装“张三”“李四”这俩包，其中 i 为 install（安装）的简写别名
pkg up  # 更新系统中的包，其中 up 为 upgrade（升级）的简写别名
pkg i -u 张三 李四  # 单独更新“张三”“李四”这俩包，其中 -u 为 --upgrade（升级）的对应短选项
pkg un 张三 李四  # 卸载“张三”“李四”这俩包，其中 un 为 uninstall（卸载）的简写别名
pkg se 包子 猫不理  # 搜索“包子”“猫不理”这俩关键词，其中 se 为 search（搜索）的简写别名
```

:::warning 安装软件包请**优先考虑 Termux 软件仓库**
由于平台本身的特殊性，很多软件需要针对 Termux 平台特殊处理才能正常安装。Termux
软件仓库作为官方的解决方案，可以充分保证软件的可用性。

如果你想安装某个东西，首先用 `pkg search` 搜一下有没有现成的包，如果没有再考虑其它途径。
:::

### Kono 滚动更新 da！

尽管 Termux 的默认包管理器是基于 Debian 系的 `apt/dpkg` 的，然而软件仓库使用滚动更新的策略，使得其拥有接近
Fedora/Arch 的新潮软件，而代价则是无法使用许多没有跟上更新的第三方包（这种情况在 Termux 软件仓库引入 `numpy`
等难以本地编译的包后有所改善）。

### LibC 相关说明

:::warning 警告，这不是新手区！
如果你看不懂这个部分，建议直接跳过<curtain>，免得人菜瘾大照这个整没整好还反过来怪教程有问题（（（</curtain>。
:::

Termux 基本环境上动态链接的可执行文件使用了 Android 系统内置的 Bionic C 库——既不是 `glibc`，也不是
`musl libc`，各种平台差异导致 Termux 上的二进制程序往往需要专门编译。

:::tip 高级技巧
Termux 也提供了可选的 GLibC 支持，其 GLibC 环境与基本环境相对独立，详见 [termux/glibc-packages](https://github.com/termux/glibc-packages/)。

Termux GLibC 环境的体验更接近 PRoot/ChRoot 容器，基本可以直接使用动态链接 GLibC 的二进制程序。<curtain>如果你~~有幸~~配置好并能成功使用
GLibC 环境，后面的内容你也不用看了（</curtain>

截至 2024.06.29，目前尚无 GLibC 软件仓库的镜像源，因此下载软件包时可能速度缓慢。
:::

## Rust 构建工具的安装

:::danger **不要在 Termux 基本环境中使用官方的安装脚本/RustUp 安装脚本来安装/管理 Rust 工具！！！**
官方的安装脚本/RustUp 安装脚本**都不支持** Termux 基本环境！

**如果使用，轻则无法安装，重则环境爆炸！**
:::

使用如下命令安装 Rust 构建工具：

```shell :no-line-numbers
pkg i binutils rust
```

至于装 Ru~~aaaaaa~~st 的原因嘛……有那么几个 Python 包是有 Rust 代码要编译的……

## Python 环境的安装配置

使用如下命令安装 Python：

```shell :no-line-numbers
pkg i python
```

`pip` 会随 `python` 一起安装，且默认 `python` 就是 `python3`，`pip` 就是 `pip3`。

### 多用 `pip`

与一般的发行版不同的是，<curtain>我不惮以最大的恶意揣测，可能为了节省软件仓库的维护成本，</curtain>Termux
包管理器并不管理绝大多数 Python 包，而是直接让 pip 进行管理。

### 装不上包.jpg

:::info 隋唐小测
下列预构建包可以在 Termux 基本环境使用的有哪些？

```txt :line-numbers
aiohttp-3.9.3-cp311-cp311-manylinux_2_17_aarch64.manylinux2014_aarch64.whl
aiohttp-3.9.3-cp311-cp311-manylinux_2_17_ppc64le.manylinux2014_ppc64le.whl
aiohttp-3.9.3-cp311-cp311-manylinux_2_17_s390x.manylinux2014_s390x.whl
aiohttp-3.9.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl
aiohttp-3.9.3-cp311-cp311-manylinux_2_5_i686.manylinux1_i686.manylinux_2_17_i686.manylinux2014_i686.whl
aiohttp-3.9.3-cp311-cp311-musllinux_1_1_aarch64.whl
aiohttp-3.9.3-cp311-cp311-musllinux_1_1_i686.whl
aiohttp-3.9.3-cp311-cp311-musllinux_1_1_ppc64le.whl
aiohttp-3.9.3-cp311-cp311-musllinux_1_1_s390x.whl
```

答案是——<curtain>『一 个 没 有』！！！</curtain>
:::

Termux 上动态链接的可执行文件使用了 Android 系统内置的 Bionic C 库——既不是 `glibc`（对应
`manylinux`），也不是 `musl libc`（对应 `musllinux`），详见 [LibC 相关说明](#libc-相关说明)。

对于无法本地编译的 Python 包，可见[附录](#附录-部分-python-第三方包无法通过-pip-安装或安装后运行不正常的解决方案)。

## NB-CLI 与 NoneBot2 的安装

理想情况下，以[搭建环境](/guide/create_env.md)为基础，按照本篇文章进行按需调整，是可以安装成功的。

初次安装可能由于网络等原因导致失败，先重试一两次再说（

## 附录：部分 Python 第三方包无法通过 `pip` 安装或安装后运行不正常的解决方案

### 在 Termux 官方源中的包

:::info 提示
此类包被纳入官方源的主要原因通常是**本地编译困难或缓慢**且很常用。

使用 `pkg` 安装的 Python 包只会安装到内置包目录，在虚拟环境中使用需要更新虚拟环境以允许访问虚拟环境外部安装的包：

```shell :no-line-numbers
cd 项目文件夹名
python -m venv --upgrade --system-site-packages .venv
```

~~当然如果你乐意把包内容复制到虚拟环境中我也不拦着（~~
:::

- `numpy`: `pkg i python-numpy`
- `matplotlib`: `pkg i matplotlib`
- `opencv-python`: `pkg i opencv-python`
- `bcrypt`: `pkg i python-bcrypt`
- `cryptography`: `pkg i python-cryptography`
- `greenlet`: `pkg i python-greenlet`
- `lxml`: `pkg i python-lxml`
- `pillow`: `pkg i python-pillow`
- `scipy`: `pkg i python-scipy`
- `torch`: `pkg i python-torch python-torchaudio python-torchvision`
- `pycairo`: `pkg i pycairo`
- `grpcio`: `pkg i python-grpcio`
- `arrow`: `pkg i python-pyarrow`
- `msgpack`: `pkg i python-msgpack`

### 不在 Termux 官方源中的包

- `pycares`（被 `nonebot2[aiohttp]` 依赖）

  先进入项目的虚拟环境（如果有），然后执行如下操作来安装：

  ```shell :no-line-numbers
  pkg i c-ares
  PYCARES_USE_SYSTEM_LIB=1 pip install nonebot2[aiohttp]
  ```

- `uvloop`（被 `nonebot2` 依赖）

  0. 进入项目的虚拟环境（如果有）；
  1. 通过 `pkg i libuv` 安装 Termux 的 libuv 库；
  2. 通过 `pip download uvloop` 下载 uvloop 的安装包，并解压和 cd 进去；
  3. 编辑 `setup.py`，将 `self.use_system_libuv` 的值从 `False` 改成 `True`；
  4. 在 uvloop 文件夹中使用 `pip install .` 安装（**不要忘记最后的点**）。
