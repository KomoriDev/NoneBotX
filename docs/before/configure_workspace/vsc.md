# Visual Studio Code 的安装与配置

## 下载安装

打开 [VS Code 官网](https://code.visualstudio.com/) 下载安装包安装。
Windows 安装时记得勾选 **"添加到 PATH"**（Add to PATH），
否则以后在终端里敲 `code .` 会得到一句冷冰冰的 `command not found`。

安装完成后，在任意项目目录下执行 `code .` 即可用 VS Code 打开当前目录。

## 中文插件安装

打开扩展面板（`Ctrl+Shift+X`），搜索安装 **Chinese (Simplified) (简体中文) Language Pack**，
安装后按提示重启即可切换为中文界面。

## Python 相关插件的安装与配置

> Python + Pylance ( + Ruff )

搜索并安装以下扩展：

- **Python**（`ms-python.python`）：必装，提供代码补全、调试、运行等核心功能
- **Pylance**：类型检查与补全的增强（安装 Python 扩展时会一并安装）
- **Ruff**（`charliermarsh.ruff`）：Python 的 lint 与格式化工具，装一个顶俩

在设置（`Ctrl+,`）中搜索 `editor.formatOnSave` 并勾选，即可在保存时自动格式化代码。

### Black 安装与配置（可选）

如果你更习惯 Black 的格式化风格，可以安装 **Black Formatter**（`ms-python.black-formatter`）扩展，
并在设置中将默认格式化工具切换为 Black。

不过本文推荐直接用 Ruff：一条命令同时搞定 lint 和格式化，省心。

## 常用插件的安装与配置

- **Error Lens**：把报错直接怼到代码行尾，错误一眼就能看到
- **GitLens**：查看每一行代码是谁写的（方便甩锅）
- **Material Icon Theme**：让文件图标变得好看（没有实际作用，但心情愉悦）
- **autoDocstring**：自动生成 docstring

## 如何配合虚拟环境使用

使用 uv 在项目目录初始化项目后（`uv init` 会自动创建 `.venv`），
VS Code 会自动检测到项目里的 `.venv` 并提示你选择解释器。

如果没自动提示，按 `Ctrl+Shift+P` 打开命令面板，输入 **Python: Select Interpreter**，
选择 `.venv` 目录下的 Python 即可。

## 常用快捷键

| 快捷键           | 功能           |
| ---------------- | -------------- |
| `Ctrl+Shift+P`   | 命令面板       |
| 「Ctrl+Shift+`」 | 打开终端       |
| `Ctrl+F5`        | 运行（不调试） |
| `F5`             | 调试           |
| `Ctrl+S`         | 保存（废话）   |
