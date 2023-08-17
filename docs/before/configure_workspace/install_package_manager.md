# Python 及包管理器的安装

## 安装 Python

### Windows

灰常简单，假如你使用的是 Windows 10 1809 及更新版本的话，请打开你的终端，然后使用以下命令安装
Python 3.10。

```bash
winget install Python.Python.3.10
```

假如你用的是 LTSC 或很旧很旧的 Windows 10，那你可能只能去
[Python 官网](https://www.python.org/) 下载安装包了~

假如你用的是 Windows 7 或者 Windows XP，建议你考虑以下更新系统，因为
Python 3.9 已经不支持 Windows 7 了，更别说 XP 了~

### Linux

通常来说，Linux 系的系统都自带了 Python，无非版本的新与旧（Arch Linux 除外）。

以 Ubuntu 为例，各主流 Ubuntu 版本自带的 Python 版本关系如下所示：

- 20.04 LTS：Python 3.8
- 21.04：Python 3.9
- 22.04 LTS：Python 3.10

Nonebot 大部分包推荐使用 Python 3.8 及以上版本，因此如果你使用的系统自带的
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

假如系统软件包管理器搜不到你想要的 Python 版本，那么你可以选择从源代码安装。

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
