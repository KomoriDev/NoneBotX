# IDE 的选择

> 参考自 Well404 的[博客](http://blog.well404.top/2023/02/28/开发环境配置/)

::: warning 声明（~~叠甲×3~~）
本教程并不是一个十分严谨、客观且适用于所有人的环境组合，
如果你的开发环境也很好用那么你大可不必切换到不熟悉的开发环境，
毕竟自己用的舒服才是最重要的。
:::

::: warning 声明（~~叠甲×4~~）

> Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux.

我知道，就严格意义上来讲，vsc 并不能称之为 IDE，而是一个 code editor。
但介于现代编辑器和 IDE 的界限已经很模糊了，而且笔者确实不知道到该如何形容，
所以我们就假装 vsc 是 IDE 吧
:::

1. 什么是 IDE？
2. pyc 和 vsc 的区别
3. pyc 不支持 pdm，需要用 poetry
4. 刚入门推荐 pyc，有基础建议 vsc

## 什么是 IDE？

集成开发环境（IDE，Integrated Development Environment），其本来是指辅助程序猿写代码的一系列软件的合集。
不过我们通常都会特指写代码时所用的编辑器（其具有语法高亮、代码补全、代码检查、代码格式化等功能）。

对于 Python 程序猿来说，常用的 IDE 通常有以下两个：

- [JetBrains PyCharm](https://www.jetbrains.com/pycharm/)（以下简称 pyc）
- [Visual Studio Code](https://code.visualstudio.com/)（以下简称 vsc）[^1]

:::tip

- PyCharm社区版 和 VSC 都是免费的，百度搜到要付费下载的都是<MoreInfo words="假的" width=300px><div style="background: var(--vp-c-bg); border:3px solid var(--vp-custom-block-tip-text); border-radius: 10px">比如下面这种<img src="/images/before/vscode_paid.webp" alt="VSCode Professional" style="vertical-align:top"/></div></MoreInfo>
  (PyCharm 确实有付费的 `Professional` 版本，不过对于**初学者**的你来讲，现在还暂时没必要)
- PyCharm 和 VSC 都需要经过一定的配置才用得舒服，并没有做到开箱即用
  (如果硬要比谁更能开箱即用，你可以接着往下看)

:::

## PyCharm 与 Visual Studio Code 的区别？

由于 PyCharm 拥有丰厚的历史底蕴，其功能繁多，配置也多，
新手刚接触的时候常常会遇到工作区没有设置或设置错误、
虚拟环境没有设置或设置错误导致一堆错误的问题，同时 PyCharm
的储存空间和内存占用也是非常可观的。因此除非你是 PyCharm
的老用户，否则并不推荐使用 PyCharm 进行开发。

而 VS Code 是微软开发的开源**免费**跨平台编辑器，
在设置正确的情况下其功能和使用体验与 PyCharm
相当，但想要做到舒服使用 VS Code 也需要进行较多的配置。

### PyCharm?

对于新手而言，PyCharm 几乎开箱即用的体验非常合适，
它无须进行过多的配置即可拥有满足日常使用的语法高亮、代码格式化、代码检查、语法检查等功能，
**只要你眼睛不瞎**（指忽略所有标红、标黄等警告和提示），那么 PyCharm 能帮助你养成良好的编程习惯，
改善你的代码风格。

但是在 PyCharm 上使用虚拟环境时配置略微麻烦，如果你忠爱 PDM，建议左转 VS Code

### Visual Studio Code?

Visual Studio Code 简称为 **VS Code**，虽然名字里有 Visual Studio，但他与
Visual Studio **没有任何联系**。

<hr />

::::tsukkomi 喵喵喵
看完这一页，相信你已经做好选择了吧，假如你对于这两款 IDE 仍然有较多疑问，你可以通过互联网查阅相关资料。

当然，假如你既不喜欢 PyCharm 也不喜欢 VS Code，那么你也可以选择
Sublime Text、Vim/NeovIm、Jupyter Notebook/Jupyter Lab、Spyder
等 IDE，其中 Jupyter 和 Spyder 更常见于深度学习领域。  
~~真的会有人用 Jupyter 开发bot吗~~

> 鉴于 Nodepad++ 作者及其官号曾多次发表有违开源精神的言论，我们强烈不推荐你使用该编辑器。

::::

[^1]: vsc 严格意义上来讲并不能算是 IDE（详情请看本篇的第二个~~叠甲~~声明）
