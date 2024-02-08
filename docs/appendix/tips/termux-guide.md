# Termux 下进行部署/开发

:::info 提示
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
自本节开始，之后所有内容都是针对**非**容器环境进行指导。
:::

### 镜像源

目前版本的 Termux 提供了便捷更换镜像源的方法。

```shell :no-line-numbers
pkg i -u termux-tools  # 如果你的 Termux 不是新配置的，最好更新一下 termux-tools
termux-change-repo  # 运行镜像源切换助手
```

助手程序提供了一套易读的 TUI 界面，可以使用方向键、空格键、Tab 键、回车键以及屏幕点击进行选择操作。

```plain :no-line-numbers
    termux-change-repo
Do you want to choose a mirror group or a single mirror? Select with space.
# 你要选镜像组（同一地区的一批镜像站）还是单个镜像站？按空格键选择。

(*) Mirror group    # 在同一地区的几个镜像中自动挑选（推荐）。
( ) Single mirror   # 指定一个镜像往死里薅
```

这里直接回车/点击 `OK` 选择，进入镜像组选择界面：

```plain :no-line-numbers
    termux-change-repo
Which group of mirrors do you want to use? Select with space.
# 你想用哪个镜像组？按空格键选择。

(*) All mirrors                 # 全球的镜像站点
( ) Mirrors in Asia             # 全亚洲（不含中国和俄罗斯）的镜像站点
( ) Mirrors in China            # 全中国的镜像站点
( ) Mirrors in Europe           # 全欧洲的镜像站点
( ) Mirrors in North America    # 全北美的镜像站点
( ) Mirrors in South America    # 全南美的镜像站点
( ) Mirrors in Russia           # 全俄罗斯的镜像站点
```

这里光标移到 `Mirrors in China` 一项，按空格键/点击屏幕选中（以项首括号内出现 `*` 为准），回车/点击 `OK` 确认。

等待程序运行结束后，包管理器就可以使用设置的镜像源进行下载了。

:::tsukkomi 小声哔哔
（截至 2024.2.8）写到这里的时候还有点担心会不会出现某些不正确问题，结果看完镜像组内容才发现多虑了（

~~笑死，根本没有台湾省的镜像（~~
:::

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

:::tsukkomi 小声哔哔
Termux 官方也提供了基于 Arch 系的 `pacman/libalpm` 包管理程序的环境底包 ~~，不过看这个教程的应该都用不上（（（~~
:::

### Kono 滚动更新 da！

<Loading />

## Rust 构建工具的安装

:::warning **不要在 Termux 基本环境中使用官方的安装脚本/RustUp 安装脚本来安装/管理 Rust 工具！！！**
官方的安装脚本/RustUp 安装脚本**都不支持** Termux 基本环境！

如果使用，轻则无法安装，重则环境爆炸！
:::

<Loading />

## Python 环境的安装配置

<Loading />

### 多用 `pip`

<Loading />

### 装不上包.jpg

<Loading />

## 附录：部分 Python 第三方包无法通过 `pip` 安装的解决方案

### `pycares`（被 nonebot2[aiohttp] 依赖）

```shell :no-line-numbers
pkg i c-ares
cd 项目文件夹名
PYCARES_USE_SYSTEM_LIB=1 .venv/bin/pip install nonebot2[aiohttp]
```
