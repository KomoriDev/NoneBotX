# Git 的安装与配置

1. Git 是什么，有什么用
2. Git 怎么安装
3. Git 怎么用

## What?

> Git 是什么，他有什么用？

作为一个完整的项目，你的机器人也好、工作也好，抑或是大型作业（课程设计说的就是你）或毕设，
都会存在大量的代码改动。

但是，我们不可能凭脑袋记住所有代码改动。有时候突发奇想改改这个文件，又改改那个文件，
当改多了之后一运行，诶，出 :bug:BUG:bug: 了，然后想撤销改动但已经忘记改了哪些地方了。

这时候就能体现出对代码进行版本管理的重要性了，
我们可以在每次对某一个问题进行修复、增加新特性之后给当前所有项目代码打一个快照（**Commit**），
改动之后与这个快照对比就知道改动了哪些内容了，这就是版本管理的作用。

代码的版本管理工具也被叫做 VCS（Version Control System，版本控制系统），在
PyCharm 里 Git 位于 VCS 相关的按钮或面板中。

目前常见的版本管理工具主要有 SVN（Subversion）和 Git，个人项目通常用 Git
为主，而开发者们也更喜欢在 GitHub、GitLab 等基于 Git 的平台上上传和管理代码。

当我们对通过 Git 管理的项目中的代码进行更改之后，就可以通过命令或者各种 GUI
对比查看更改的内容、更改的文件列表，或者退回到某次 Commit 的状态。

如下图为通过 VS Code 查看本文档的 Commit 历史记录、已更改但未提交（**Commit**）的文件列表、某次
Commit 的更改内容，以及通过命令查看已更改但**未 Commit** 的文件列表和某次 Commit 的更改内容。

![Git图例](/images/before/git/vcs.webp)

:::tsukkomi
嗯，**Commit** 并没有一个规定的翻译，通常可能会称为**提交**，建议一个 commit 尽量只有一个意图。

如果上面的图看不清，你可以右键/长按图片并选择在新标签页中打开。
:::

## 安装 Git

:::tsukkomi 小建议
建议在阅读完前面的[IDE 的选择](./select_ide)后再阅读本节，
假如你打算使用 VS Code 的话，在 Git 的安装过程中需要更改一项配置，
假如你不打算使用 VS Code 的话，你可以直接阅读本节忽略这项配置。
:::

打开 [Git 的官网下载页面](https://git-scm.com/downloads)，根据你的系统类型点击下载链接下载。以
Windows 为例，在官网下载页面点击 “Windows”，在新弹出的页面下点击 **64-bit Git for Windows Setup**
下载安装包。

:::: tip
假如你使用的是 Linux 系统，那么你只需要使用系统的包管理器安装即可

```bash
brew install git      // 安装了 Homebrew 的 Linux/macOS
sudo apt install git  // Debian / Ubuntu / 其它使用 'apt' 进行包管理的环境
sudo yum install git  // Centos 6/7
sudo dnf install git  // Centos 8 / 其它使用 'dnf' 进行包管理的环境
sudo pacman -S git    // Arch Linux / 其它使用 'pacman' 进行包管理的环境
```

::::

以 Windows 为例，运行安装包，同意用户协议并点击 Next，安装程序会询问 Git
要使用的默认编辑器，假如你使用的是 VS Code，你可以修改此处设置（如图）。

![使用 VSC 作为默认编辑器](/images/before/git/vsc.webp)

点击几次 Next 之后，安装程序会询问你文件行尾要使用的换行符（EOL），建议选择第二个“Checkout
as-is, commit Unix-style line endings”，即从远端拉取文件时保持文件设置，提交时如果文件中行尾使用的
**\r\n** 那么 Git 会自动帮你转换为 **\n**

![使用 VSC 作为默认编辑器](/images/before/git/eol.webp)

再点击一两次 Next 之后，安装程序会询问你对于 `git pull` 的行为，**强烈建议**选择第二个“Rebase”（如图），
至于原因嘛，实在不好解释，有需要可以去网上搜索，之后一直 Next 就可以安装了。

![使用 VSC 作为默认编辑器](/images/before/git/pull.webp)

## How?

:::tsukkomi
由于作者太懒了，所以你可以看看下面两个链接：

- [Git 官方文档](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)
- [菜鸟教程](https://www.runoob.com/git/git-tutorial.html)

:::

## 小提示

- 使用 VSCode 只提交特定的片段

  ![使用 VSCode 只提交特定的片段](/images/before/git/vsc_partial_stage.webp)

  点击编辑界面上行号旁边指示文件更改的颜色条，下面展开的就是当前部分的更改。
  你可以在此处选择暂存/取消暂存、丢弃或者什么都不管。
