# Python 及包管理器的安装

## 安装 Python

### Windows

灰常简单，假如你使用的是 Windows 10 1809 及更新版本的话，请打开你的终端，然后使用以下命令安装
Python 3.10。

```bash
winget install Python.Python.3.10
```

:::info 关于微软商店版 Python
上面这条命令会安装微软商店版的 Python。

微软商店版 Python 的存储目录与官网版本区别**很大**，不过通常情况下几乎没有查看 Python 存储目录的需求。
如果你有，请左转 [Python 官网](https://www.python.org/)。

不过可能会遇到执行 `python.exe` 时跳转到微软商店的情况<curtain>Fxxk List 喜加一</curtain>。
:::

假如你用的是 LTSC 或很旧很旧的 Windows 10，那你可能只能去
[Python 官网](https://www.python.org/) 下载安装包了~

假如你用的是 Windows 7 或者 Windows XP，<ruby>强烈<rp>(</rp><rt style="font-size:0.75em"><curtain>墙 裂</curtain></rt><rp>)</rp></ruby>建议更新你的系统，因为
Python 3.9 已经不支持 Windows 7 了，更别说 XP 了~

### Linux

通常来说，Linux 系的系统都自带了 Python（有系统组件依赖 Python），无非版本的新与旧（Arch Linux 除外）。

以 Ubuntu 为例，各主流 Ubuntu 版本自带的 Python 版本关系如下所示：

- 20.04 LTS：Python 3.8
- 21.04：Python 3.9
- 22.04 LTS：Python 3.10

NoneBot 大部分包推荐使用 Python 3.8 及以上版本，因此如果你使用的系统自带的
Python 满足要求，就不用单独安装 Python 了。

而假如系统自带的 Python 版本较低或不自带 Python，那么你可以尝试在系统的软件包管理器中搜索有没有新版
Python。

::::code-group
:::code-group-item Ubuntu

```bash
sudo apt search "python3\."
sudo apt install python3.10
```

:::
:::code-group-item Arch Linux

```bash
pacman -S python
```

:::
::::

:::tsukkomi 版本太新的烦恼
部分 Linux 发行版默认只提供尽可能新的 Python 版本（如 Fedora, Arch<curtain>~~, Termux
（这货的兼容性需要一篇文章专门描述）~~</curtain> 等）<curtain>，
这种时候某些兼容不好的传统派 Python 库就有可能会在安装过程中创飞你</curtain>。
:::

假如系统软件包管理器提供了 `pyenv` 的话，我们推荐使用这个管理多版本 Python，用法可以自己搜。

:::warning 从源代码安装只能是最后的退路
尽管源码包的预设基本能保证安装可用的 Python，但你通常**不应该**用默认编译配置（因为会缺 SSL
等相关模块导致网络访问寄掉等一系列问题），而且很多发行版都会针对自身特性打一堆补丁。
:::

### macOS

你可以在 [Python 官网](https://www.python.org/)
下载安装包安装，当然你也可以选择通过 Homebrew 安装：

```bash
brew install python3
```

## PDM / Poetry 的安装

前面提到了我们选择使用 PDM 或 Poetry 进行 Python 包管理，所以接下来要安装 PDM 或 Poetry。

为了避免污染系统的 `site-packages`<curtain>（这玩意也需要一篇文章专门描述）</curtain>，我们可以先安装 `pipx` 再使用 `pipx` 安装 PDM 或 Poetry。

:::info
自 Ubuntu 23.04 起，系统的 Python 禁止使用 pip 安装任何库了，仅支持
`apt install python3-xxx` 或 `apt install python-xxx`，可喜可贺可喜可贺~
:::

```bash
python3 -m pip install pipx
pipx install pdm  # pipx install poetry
pipx upgrade-all  # 更新所有使用 pipx 安装的包
```

:::tsukkomi
因为实在太简单了，只能在安装 Python 的部分大水特水了。
:::
