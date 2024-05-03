# 虚拟环境 & 包管理器

在 Python 开发中，**虚拟环境**和**包管理器**是两个至关重要的工具，它们都用于管理项目依赖项并保持项目环境的隔离性。

**虚拟环境**可以将特定项目及其依赖项隔离在一个独立的环境中，避免不同项目之间依赖项冲突。

**包管理器**用于安装、卸载、更新和分组项目所需的依赖项。

## 常用工具

- 虚拟环境：
  - `venv`：Python 自带的虚拟环境工具
  - `virtualenv`：第三方虚拟环境工具，提供更多功能
- 包管理器：
  - `pip`：Python 自带的包管理器
  - `poetry`：第三方包管理器，提供更易用的语法和虚拟环境管理功能
  - `PDM`：支持最新 PEP 标准的现代 Python 包和依赖项管理器

::: tip
PDM 和 Poetry 同时兼备虚拟环境和包管理器所具备的功能，建议使用它们中的一个。  
:::

## 安装 PDM / Poetry

为了避免污染系统的 `site-packages` <Curtain>（这玩意也需要一篇文章专门描述）</Curtain>，我们可以先安装 `pipx` 再使用 `pipx` 安装 PDM 或 Poetry。

::: info
自 Ubuntu 23.04 起，系统的 Python 禁止使用 pip 安装任何库了，仅支持 `apt install python3-xxx` 或 `apt install python-xxx`，可喜可贺可喜可贺~
:::

```bash
python -m pip install --user pipx
python -m pipx ensurepath   # 将 pipx 加入虚拟环境
pipx install pdm  # pipx install poetry
pipx upgrade-all  # 更新所有使用 pipx 安装的包
```

## PDM 常用指令

::: tip
以下只是浅浅地列举常用的 PDM 指令，供新手入坑。  
~~其实你只要掌握了 `pdm -h` 就等于掌握了下面的所有指令（确信~~
:::

### 常用指令

```bash
# 初始化新的 PDM 项目
pdm init

# 查看项目依赖
pdm list [--graph]

# 查看依赖的详情
pdm show package

# 安装项目依赖
pdm install

# 安装[dev]依赖项
pdm add [-d] package1 package2

# 删除[dev]依赖性
pdm remove [-d] package1 package2

# 查看项目配置
pdm config

# 换源
pdm config pypi.url <url>
```

### 分组

```bash
# 安装项目中 GROUP 组内的依赖
pdm install -G GROUP

# 在 GROUP 组中安装依赖
pdm add -G GROUP package

# 在 dev 下 GROUP 组内安装依赖
pdm add -dG GROUP package
```

### 运行项目

```python
# main.py
print("Hello PDM")
```

```bash
# 输入
pdm run python main.py
# 输出
Hello PDM
```

### 指令别名

在项目的 `pyproject.toml` 中配置：

```toml
[tool.pdm.scripts]
start = "python main.py"        # 第一种
run = { cmd = "python main.py" }  # 第二种
```

然后，你可以直接使用 `pdm start` 来运行项目。
