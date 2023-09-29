# 终端复用

:::warning 注意
本章节是给那些想要在 Linux 服务器上部署机器人的朋友们看的
假设你是 Windows 服务器，可以直接跳过
:::

用 Windows 时，我们可以开几个命令窗口，一个运行 mirai，一个运行 Python  
但是在 Linux 上，情况就有所不同了  
一旦断开与服务器的连接，当前的终端会被关闭，里面运行的任务不能继续运行  
你肯定想过怎么样才能让命令在断开连接的时候也能运行  
这当然可以，你可能需要的是**终端复用器**

## 什么是“终端复用”？

终端复用器（Terminal Multiplexer）是用于复用多个虚拟终端的应用软件，允许用户在一个终端窗口中访问多个单独的登陆会话，或者从终端分离和重新连接会话。  
说人话就是创造几个虚拟的终端，你在上面跑任务，断开连接也能跑的那种

有很多终端复用器，不过在本教程就用 `tmux` 为例

:::tip
你也可以使用 `screen` 来进行终端复用  
但介于 `screen` 已经在 `RHEL8` 中被移除  
所以我们将会介绍 `tmux`
:::

## 安装

:::code-group

```sh [Ubuntu / Debian]
# 非 root 用户记得前面加 sudo
apt install tmux
```

```sh [CentOS 8 / Rocky Linux 8]
# 非 root 用户记得前面加 sudo
dnf install tmux
```

```sh [CenOS 7]
# 非 root 用户记得前面加 sudo
yum install tmux
```

:::

## 如何使用？

介绍常用命令

```sh
# 新建一个叫做 `graia` 的会话并进入
tmux new -s graia
# 进入 `graia` 会话
tmux attach -t graia
```

一个新建，一个进入  
你现在只需要记得上面这两个命令就好了

在新建完之后，你就会发现你进入到一个新的终端  
你现在这个终端运行一下 `MCL`  
然后，按下 `Ctrl + B`，再按下 `C`  
欸？又变成新的窗口了  
这个时候你再按一下 `Ctrl + B`，`P`  
又回到了 `Mirai-Console` 里面了  
这个就是窗口的快捷键

还是先给介绍一下常用的一些窗口快捷键：

> - Ctrl + B , C 新建窗口
> - Ctrl + B , N 跳到下一个窗口
> - Ctrl + B , P 跳到上一个窗口
> - Ctrl + B , [0-9] 跳转到第 n 个窗口
