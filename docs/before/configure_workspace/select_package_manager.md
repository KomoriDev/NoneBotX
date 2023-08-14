# 包管理器的选择

虽然有了虚拟环境管理器，但是在用 **PIP**
装包的时候还是可能会出现奇奇怪怪的冲突之类的问题，所以几乎每个开发者都像不喜欢
**NodeJs** 的 **NPM** 那样不喜欢 **Python** 的 **PIP**！

那 NPM 可以用 **Yarn** 和 **Pnpm** 一样，我们 Python
也要有我们自己的特色包管理器！

常见的 Python 的包管理器有 **PDM**、**Poetry**、pipenv 等。其中
**pipenv** 已经落后于时代了，因此在这里我们推荐首选 **PDM**，其次**Poetry**。

:::warning 声明（~~叠甲~~）
我们并没有认为使用 Poetry 是什么需要抵制的行为。  
不管你使用 Poetry 还是 PDM 我们都会一视同仁。  
只不过我们在此比较推荐 PDM，至于 Poetry 不作首选的原因在后面会有相应阐述。  
:::

## 为什么用 PDM 不用 Poetry

PDM 相比 Poetry 有以下几个优点：

- PDM 更遵守 PEP 规范。例如在 `pyproject.toml` 中 PDM
  不会把项目信息放在类似 `[tool.poetry]` 和 `[tool.poetry.dependencies]` 之类的不规范的小节
- PDM 可以直接使用 `pdm run main.py` 命令直接运行 Python 脚本，而不用像 Poetry
  那样要多加一个 python，即 `poetry run python main.py`
- PDM 可以像 NodeJs 的 `package.json` 中的 `scripts`
  一样指定一个快捷命令

:::warning 再次声明（~~叠甲×2~~）
我们并没有认为使用 Poetry 是什么需要抵制的行为。  
不管你使用 Poetry 还是 PDM 其他的包管理器，
我们都会一视同仁。
:::

## Poetry、PDM 和 Conda 的区别

> 参考自 Well404 的[博客](http://blog.well404.top/2022/08/17/虚拟环境/)
> （[知乎版本](https://zhuanlan.zhihu.com/p/554965293)）

相对于主流的虚拟环境管理工具（包管理器），Conda 最大的特点就是他不需要独立安装
Python，这不是指 Conda 可以取代 Python，而是指 Conda 不依赖于系统自带/自己安装的
Python。这是因为 Conda 本身就具有多 Python 版本安装与管理的功能。

老实说，将 Conda 用于虚拟环境管理非常地**大材小用**，因为 Conda 是多
Python 版本管理器，因此所有使用 Conda 的项目都可以使用任一版本的 Python
而不用在乎装多版本时环境变量切换的问题。

但也因为 Conda 本质上是多 Python 管理器，因此其每个的虚拟环境都包含一个**完整的**
**Python**，而 PDM 和 Poetry 的虚拟环境只包含少量文件，其仍然依赖于系统安装的 Python。

除此之外，Conda 也具有 PIP 那样的安装依赖的功能，但他的下载源并不是 PIP 的
**PyPi**，而是 **CondaForge** 等非 PyPi 源，因此使用 Conda
进行依赖和虚拟环境管理时，不建议使用虚拟环境内的 PIP
安装依赖，而应使用 Conda 命令。

除了安装 Python 包，Conda 还能安装一些二进制程序，例如 cuda 和 cudnn 等。

因此，笔者仅建议使用多 Python 版本进行开发或科学计算领域用户使用，
对于单版本多环境的等常规开发者来说，PDM 或 Poetry 是你更好的选择。

:::tsukkomi 提示
若无明确说明，本文档默认使用 PDM 或 Poetry 作为包管理器。你都用 Conda
了，想必你对于相关知识已有一定了解（例如新虚拟环境的安装配置与激活、安装 PyPi 包等），就不过多介绍了。

另外假如你并不是非常熟悉 Conda/Anaconda 不建议盲目安装，
否则可能会由于操作不当导致你很容易搞混不同的 Python 环境，
使用错误的方法安装包或安装在错误的环境中而使得程序无法运行。
:::

## PDM、Poetry 和 virtualenv 的区别

通过 PDM 和 Poetry 可以调用 virtualenv
**自动**创建和调用虚拟环境并在安装新包时**解决（或提示）依赖问题**。

当然你也可以自己使用 virtualenv 或 venv 创建虚拟环境，然后使用虚拟环境内的 PIP
安装包并自己计算依赖是否存在冲突等问题。
