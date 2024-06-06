# NapCat 使用教程

<p style="display: inline-flex">
  <a href="https://github.com/NapNeko/NapCatQQ">
    <img src="https://img.shields.io/badge/Github-black?logo=Github" style="margin-right: 5px" alt="Telegram" />
  </a>
</p>
  <img src="https://socialify.git.ci/NapNeko/NapCatQQ/image?description=1&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FNapNeko%2FNapCatQQ%2Fmain%2Flogo.png&name=1&stargazers=1&theme=Auto" alt="NapCatQQ" width="640" height="320" />

## 下载

前往 [Github Releases](https://github.com/NapNeko/NapCatQQ/releases/latest) 下载最新版 NapCatQQ

![alt](/images/before/napcat_release.png)

:::: tip 该下哪个版本呢？

<div align="center">我猜猜……当前系统应该用：</div>

<NameByPlatform />

<div align="center" style="font-size: 8px">结果根据浏览器 UA 得出，仅供参考（amd64即为x64）</div>

::: details 更多信息

<curtain>虚假的</curtain>太长不看版（假定你不知道需要的架构）：

- 一定要看清是 **x64** 还是 **arm64**！！！
- 如果你要在一般的个人电脑或者装有 Windows Server 的服务器上运行，请直接下载 `win32.x64` 版本；
- 如果你要在装有 Linux 发行版的个人电脑/服务器上运行，请优先尝试 `linux.x64` 版本；
- 如果你要在“树莓派”或智能手机等 ARM 设备上运行，请优先尝试 `linux.arm64` 版本

:::

::::

## 解压

从 GitHub 下载的产物文件是 zip 压缩包。

- Windows 下请使用自己熟悉的解压软件自行解压；
- Linux 下在命令行中输入 `unzip [文件名]` 进行解压。

---

# 启动前需要了解的三两事 （来自 NapCat 官方文档）

::: warning
NapCat 是基于 PC NTQQ 客户端本体实现的 QQ Bot 框架，所以说需要提前安装好和 NapCatQQ 对应的 QQ 版本才能运行 NapCat。

NapCat 在线时，你不能使用 PC QQ 客户端实现人机合一，但是可以选择同步登录移动客户端，如果想要在 PC 上人机合一请使用 LLOneBot

NapCat 不同于协议实现，是基于 QQ 客户端，QQ 客户端上干不了的事，NapCat >\_< 当然也是不行的!
:::

## 安装QQ

由于 NapCat 是基于 QQ 客户端实现，所以需要先安装 QQ 客户端

Linux下无桌面环境安装 QQ 使用以下命令（ 以 debian 系为例）

```
sudo apt install libgbm1 libasound2
sudo apt install ./qq.deb
```

## 启动！

::: details Windows

我们安装好对应版本 QQ 后，大多数情况下，只需要解压 NapCat，并将其放到你想的的任何地方。但注意，路径不能包含空格。然后，双击 napcat.bat 就可以运行啦！

等等! 如果你出现乱码可以尝试双击 napcat-utf8.bat 启动。

如果上面的方法还是不行，可以尝试用 Powershell 启动：

启动 PowerShell，运行 powershell ./napcat.ps1 或者 napcat.bat，如果出现乱码，可以尝试运行 napcat-utf8.ps1 或 napcat-utf8.bat。

如果运行不了，可以尝试 powershell.exe -ExecutionPolicy Bypass -File ".\napcat.ps1"。

**推荐直接点击 bat 运行，因为 PowerShell 自身会占用 20 MB 左右的内存。**

:::
::: details Linux 一键脚本

墙裂推荐！

curl -o napcat.sh https://fastly.jsdelivr.net/gh/NapNeko/NapCat-Installer@master/script/install.sh && sudo bash napcat.sh

:::
::: details Linux 非 Docker
终端运行

```
chmod u+x ./napcat.sh
./napcat.sh
```

请勿用`sh napcat.sh`启动，可能会出现路径问题而无法启动。
:::
::: details 快速登录（无需扫码）
如果你已经成功登录过官方 QQ 或者 NapCatQQ，可以加参数 `-q <你的QQ>` 进行快速登录而无需扫码，如 `napcat.bat -q 1234567` 或者 `napcat.sh -q 1234567`。
:::

## ~~你先别急，还有~~配置

::: tip
在登录过后，将会在 `config` 目录下找到名为 `onebot11_<你的QQ号>.json` 的文件，如 `onebot11_1234567.json`；如果没有此文件可以复制 `onebot11.json` 重命名为 `onebot11_<你的QQ号>.json`。
:::
如果是对接 Nonebot 的话，配置这个项目即可（别忘了创建 Nonebot 时选择 `Onebot V11`适配器）

- `reverseWs`：反向Websocket服务

::: details 示例
{
"httpHost": "",
"enableHttp": false,
"httpPort": 3000,
"wsHost": "",
"enableWs": false,
"wsPort": 3001,
"enableWsReverse": true,
"wsReverseUrls": [
"ws://127.0.0.1:8080/onebot/v11/ws"
],
"enableHttpPost": false,
"httpPostUrls": [],
"enableHttpHeart": false,
"httpSecret": "",
"messagePostFormat": "array",
"reportSelfMessage": false,
"debug": false,
"enableLocalFile2Url": true,
"heartInterval": 30000,
"token": "",
"musicSignUrl": ""
}
:::
::: tip
详细的配置请前往 [官方文档](https://napneko.github.io/zh-CN/guide/config) 查看
:::

## 连接

同时启动 Nonebot 和 NapCatQQ，当Nonebot控制台出现`Connection Opened`字样时即代表连接成功， Enjoy it！
