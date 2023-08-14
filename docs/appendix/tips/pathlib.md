# pathlib 为什么是神？路径解析推荐

当你在写机器人的时候，想必或多或少都有遇到过关于路径的问题吧。  
而当你在 <ruby>CSDN<rp>(</rp><rt>床上等你</rt><rp>)</rp></ruby> 搜索了一番以后，
你知道，在 Python 中都是用 os.path 来解析路径的。所以，你写出了这样的代码。

:::tip
以下情节多少有点夸张，不过也不完全夸张。
:::

```python
import os
import os.path

# 得到文件所在目录下"资源"文件夹路径，如果不存在则创建它
source_folder = os.path.dirname(__file__) + r"/资源"
source_folder = os.path.join(os.path.dirname(__file__), "资源")
if not os.path.exists(source_folder):
    os.makedirs(source_folder)

# 获取这些文件中所有 jpg png 格式文件的文件名
source_name = [
    os.path.split(p)[1][-4] for p in os.listdir(source_folder)
    if os.path.splitext(p)[1] in [".jpg", ".png"]
]
source_name = [
    os.path.splitext(os.path.split(p)[1])[0] for p in os.listdir(source_folder)
    if os.path.splitext(p)[1] in [".jpg", ".png"]
]

# 将一个绝对路径的文件复制到根目录同名的压缩包里面
from zipfile import Zipfle
file = "/a/b/c/d.txt"
compress_file = os.path.splitext(os.path.split(p)[1])[0] + ".zip"
with Zipfile(compress_file, "w") as myzip:
    myzip.write(file)

# 读取文件，否则创建文件
if os.path.exists(os.path.join(source_folder, "config.json")):
    with open(os.path.join(source_folder, "config.json"), "r", encoding="UTF-8") as f:
        config = json.load(f)
else:
    with open(os.path.join(source_folder, "config.json"), "w", encoding="UTF-8") as f:
        json.dump({"config": {}}, f)
```

说实话，这一点都不 Pythonic，不是吗？
难道就没有更优雅的写法了吗？

当然有啊，那就是 `pathlib`

## pathlib 是什么

> pathlib 提供表示文件系统路径的类，其语义适用于不同的操作系统。

你可能听不太懂，我们还是直接举例吧。我们把上面的例子，用 pathlib 重新写一遍

```python
from pathlib import Path

# 得到文件所在目录下"资源"文件夹路径，如果不存在则创建它
source_folder = Path(__file__).parents / "资源"
source_folder.mkdir(exist_ok=True)

# 获取这些文件中所有 jpg png 格式文件的文件名
source_name = [p.stem for p in source_folder.iterdir() if p.suffix in [".jpg", ".jpeg", ".png"]]

# 将一个绝对路径的文件复制到根目录同名的压缩包里面
from zipfile import Zipfle
file = "/a/b/c/d.txt"
compress_file = Path(Path(file).name).with_suffix(".zip")
compress_file = Path(file).name
with Zipfile(compress_file, "w") as myzip:
    myzip.write(file)

# 读取文件，否则创建文件
config_path = source_folder / "config.json"
if config_path.exists:
    config = json.loads(config_path.read_text(encoding="UTF-8"))
else:
    config = config = {"config": {}}
    config_path.write_text(config, encoding="UTF-8")
```

先说一说直观上的东西：

```python
Path("a", "b")
Path() / "a" / "b"
```

在 Windows 和 Linux 上，路径的分隔符其实是不一样的。

- 在 Windows 上，分隔符是反斜杠 `\`，代码中使用时需要对其进行转义，即`some_path = "C:\\xxx\\xxx.txt"`
- 在 Linux/macOS 上，分隔符是正斜杠 `/`，例如 `some_path = "/home/xxx/xxx.txt"`

但是在 Path 中，你可以直接通过 Path 重定义 `/` 运算符 来做到路径的解析。  
而让你通过 `str(Path())` 来获取路径字符串的时候，`Path` 将根据所在系统自动判断是否 `/` 还是 `\`

## Path 多到爆表的属性

当你在使用 Path 来表示你的路径的时候，你会有相当多的属性来帮助你

:::tip
因为 `Path` 类会自动选择是 Windows 用的的 `WindowsPath` 还是 Unix 用的的 `PosixPath`，
所以最后显示出来的应该是 `WindowsPath` 或者 `PosixPath`，而不是 `Path`。
:::

```python
>>> p = Path('a/b/c/d.txt')
>>> p.parent # 所在文件夹
Path('a/b/c')
>>> p.name # 名字
'd.txt'
>>> p.stem # 名字（不带后缀）
'd'
>>> p.suffix # 后缀
'.txt'
>>> p.suffixes # 后缀s (如 .tar .gz)
['.txt']
```

## Path 类有的多到爆表的方法

```python
p = Path('a/b/c')
f = p / "d.txt"

f.is_dir() # 是否是文件夹
f.is_file() # 是否是文件
f.exists() # 是否存在
f.rename("e.txt") # 将 "d.txt" 重命名为 "e.txt"
f.read_text(encoding="UTF-8") # 以 "UTF-8" 编码读取文件
f.read_bytes() # 以二进制形式读取文件
f.write_text("F", encoding="UTF-8") # 以 "UTF-8" 编码写入文件
f.write_bytes(b"F") # 以二进制形式写入文件
with f.open("r") as fp: ... # 打开文件，就像内置 open 一样
f.stat().st_size # 获取文件大小

# 创建文件夹，如果父级文件没创建，也创建父级文件夹
# 如果文件夹已经存在，那就存在了，也不会报错
p.mkdir(parents=True, exists_ok=True)
p.iterdir() # 以 iter 的形式获取文件夹里的文件


```

## 所以，我到底应该什么时候使用呢ta呢？

首先，假设你只是写一个不需要变更的路径，如： `./static/font/xxx.ttf`。  
那么你就直接写字符串就行了，
因为你只是将这个路径传给其他第三方库，而并不需要操作路径，或者读取/写入文件。

pathlib 更多的是用在那些你需要**操作路径、文件操作**的地方，
所以，不要一看到路径就用 pathlib。
