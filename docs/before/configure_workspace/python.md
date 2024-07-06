# Python 环境搭建

## 版本选择

对于一个新创建的项目，理论上应使用较新的 Python 版本（毕竟你以后可能都不会想升级版本了）。

对于面对 NoneBot 的项目，应尽可能使用 3.10 及以上的 Python 版本，目前 Python 最新版本为 3.12.x。

再不济（比如用的是 Windows 7 系统）也请务必保证所使用的 Python 版本大于 3.9
（NoneBot 对 Python 版本的最低要求是 Python 3.9）

### 关于 Windows 7

虽然 Python 3.9+ 停止了对 Windows 7 的支持，
但如果真的要运行，也不是没有办法。比如
[这里](https://github.com/adang1345/PythonWin7)
就提供了能在 Windows 7 上运行的 Python 3.9+ 安装包/可运行文件。
（不过运行的时候会不会出现其他 bug 什么的就不知道了）

## 配置解释器

- [Windows](#windows)
- [Linux](#linux)
- [MacOS](#macos)

### Windows

**我们强烈建议直接从 [Python 官网](https://www.python.org/) 下载安装包。**

~~因为 Python 官网在国外，访问速度与下载速度都会受到较大影响，需要你自己克服一下（~~

:::tsukkomi 吐槽 - 关于微软商店版 Python

```bash :no-line-numbers
winget install Python.Python.3.10
```

上面这条命令会安装微软商店版的 Python。

如果没有安装微软商店版 Python，实际使用中可能会遇到执行 `python.exe` 时跳转到微软商店的情况 <curtain>Fxxk List 喜加一</curtain>。

微软商店版 Python 的存储目录与官网版本区别**很大**，即便通常情况下几乎没有查看 Python
存储目录的需求，部分程序也会因为无法适应这种特殊环境而运作异常。

> [相关文章 -《迷惑行为：Win10 中的 Python》](https://shuhari.dev/blog/2019/11/win10-store-python)

:::

假如你用的是 Windows 7（与 Windows Server 2012 等效）或者 Windows XP
之类的老古董，<ruby-curtain up="墙裂">强烈</ruby-curtain>建议更新你的系统，因为
Python 3.9 已经不支持 Windows 7 了，更别说 XP 了~

### Linux

通常来说，Linux 系的系统都自带了 Python（**前提是有系统组件依赖 Python**），无非版本的新与旧。

以 Ubuntu 为例，各主流 Ubuntu 版本自带的 Python 版本关系如下所示：

- 20.04 LTS：Python 3.8
- 21.04：Python 3.9
- 22.04 LTS：Python 3.10
- 24.04 LTS: Python 3.12

NoneBot 本体推荐使用 Python 3.9 及以上版本， ~~因此如果你使用的系统自带的
Python 满足要求，就不用单独安装 Python 了。~~ 当然我们还是推荐使用最新正式版的上一个版本（如最新正式版 3.12
期间推荐使用 3.11），这样通常可以支持更多插件。

而假如系统自带的 Python 版本较低或不自带 Python，那么你可以尝试在系统的软件包管理器中搜索有没有新版
Python。

:::code-group

```bash :no-line-numbers [Ubuntu (apt)]
sudo apt search "python3\."
sudo apt install python3.10 python-is-python3
```

```bash :no-line-numbers [Arch Linux (pacman)]
sudo pacman -S python
```

```bash :no-line-numbers [Fedora (dnf)]
sudo dnf install python
```

:::

:::tsukkomi 版本太新的烦恼 <curtain>新啊，很新啊</curtain>
部分 Linux 发行版默认只提供尽可能新的 Python 版本（如 Fedora, Arch<curtain>~~, Termux
（这货的兼容性需要一篇文章专门描述）~~</curtain> 等）<curtain>，
这种时候某些兼容不好的传统派 Python 库就有可能会在安装过程中创飞你</curtain>。
:::

:::tsukkomi 小心 CentOS
和前面那些不同，目前 CentOS 的稳定版已经处在濒死状态（CentOS 8
已于 2021 年 12 月 31 日结束支持，CentOS 7 也将在 2024 年 6 月 30
日结束支持）。其软件仓库亦非常老旧，使用近几年的新东西也很麻烦。
如果条件允许还是换成 Debian 或者 Ubuntu 吧（最好尽可能新<curtain>，别整个
16, 18 版的 Ubuntu 之类的，也别在服务器上折腾 Arch（本文默认读者折腾不起）</curtain>）。

<curtain>你要用 CentOS Stream 那当我没说（</curtain>
:::

假如系统软件包管理器提供了 `pyenv` 的话，我们推荐使用这个管理多版本 Python，用法可以自行搜索。

:::warning 从源代码安装只能是最后的退路
尽管源码包的预设基本能保证安装可用的 Python，但你通常**不应该**用默认编译配置（**因为会缺 SSL
等相关模块导致网络访问寄掉等一系列问题**），而且很多发行版都会针对自身特性打一堆补丁。
:::

### macOS

你可以在 [Python 官网](https://www.python.org/)
下载安装包安装，当然你也可以选择通过 Homebrew 安装：

```bash :no-line-numbers
brew install python3
```

## 测试 Python 安装

1. 打开命令提示符（Windows）或终端（Linux/macOS）。
2. 输入 `python --version` 命令。
3. 如果 Python 安装成功，将会显示当前安装的 Python 版本号。

![screenshot](/images/before/python/pyenv_test.webp)
