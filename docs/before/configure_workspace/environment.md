---
prev:
  text: 'VS Code 的安装与配置'
  link: '/before/configure_workspace/vsc'
next:
  text: 'Git 的安装与配置'
  link: './git.md'
---

# 虚拟环境 & 包管理器（uv）

在 Python 开发中，**虚拟环境**和**包管理器**是两个至关重要的工具，它们都用于管理项目依赖项并保持项目环境的隔离性。

**虚拟环境**可以将特定项目及其依赖项隔离在一个独立的环境中，避免不同项目之间依赖项冲突。

**包管理器**用于安装、卸载、更新和分组项目所需的依赖项。

## 为什么是 uv

早年间的方案是 `pip` + `venv` 各管一摊，后来又有 `poetry`、`pdm` 等后起之秀，
而现在社区的主流已经变成了 **uv**：

- 用 Rust 写的，安装依赖快到飞起（不是比喻，是真的快）
- 一个工具同时管理**虚拟环境**、**依赖**和 **Python 本体版本**（`uv python install 3.12` 甚至能帮你装 Python）
- 由 Astral 公司维护，更新非常活跃，如今社区的新项目基本都在用它
  所以本文档统一使用 uv 作为虚拟环境与包管理器。

## 安装 uv

::::code-group

```powershell :no-line-numbers [Windows (PowerShell)]
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

```powershell :no-line-numbers [Windows (winget)]
winget install --id=astral-sh.uv -e
```

```bash :no-line-numbers [macOS / Linux]
curl -LsSf https://astral.sh/uv/install.sh | sh
```

::::

如果你已经安装了 `pipx`，也可以直接：

```bash :no-line-numbers
pipx install uv
```

安装完成后**重启终端**，输入 `uv --version` 确认安装成功。

:::: info
自 Ubuntu 23.04 起，系统的 Python 禁止使用 pip 安装任何库了（PEP 668），
仅支持 `apt install python3-xxx`。不过 uv 会自己管理虚拟环境和 Python 版本，
跟系统的这个限制井水不犯河水（乐）。
::::

## uv 常用指令

:::: tip
以下只是浅浅地列举常用的 uv 指令，供新手入坑。
~~其实你只要掌握了 `uv --help` 就等于掌握了下面的所有指令（确信~~
::::

```bash
# 初始化新的项目（自动创建 pyproject.toml 与 .venv 虚拟环境）
uv init
uv init --python 3.12   # 指定 Python 版本（本文标准）

# 安装 / 卸载依赖（会自动同步进虚拟环境）
uv add package1 package2
uv remove package1

# 根据 pyproject.toml 安装全部依赖
uv sync

# 运行项目（自动进入虚拟环境）
uv run python main.py

# 管理 Python 本体版本（uv 连 Python 都能帮你装）
uv python install 3.12   # 安装指定版本的 Python
uv python pin 3.12       # 锁定项目的 Python 版本
```

### 分组

uv 使用 PEP 735 标准的 `dependency-groups` 来对依赖分组：

```bash
# 将依赖安装到 dev 组
uv add --dev package

# 安装到自定义 GROUP 组
uv add --group GROUP package

# 只安装某组依赖
uv sync --group GROUP
```

### 换源

在项目的 `pyproject.toml` 中配置：

```toml
[tool.uv]
index-url = "https://pypi.tuna.tsinghua.edu.cn/simple"
```

或者设置环境变量 `UV_DEFAULT_INDEX`。

### 运行项目

```python
# main.py
print("Hello uv")
```

```bash
# 输入
uv run python main.py
# 输出
Hello uv
```

## 配合编辑器

uv 创建的虚拟环境位于项目目录下的 `.venv` 文件夹中，
VS Code 会自动识别它，无需额外配置。

关于编辑器的配置，详见[VS Code 的安装与配置](./vsc.md)。
