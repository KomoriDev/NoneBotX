# Lagrange 使用教程

<p style="display: inline-flex">
  <a href="https://github.com/LagrangeDev/Lagrange.Core">
    <img src="https://img.shields.io/badge/Github-black?logo=Github" style="margin-right: 5px" alt="Telegram" />
  </a>
  <a href="https://t.me/+6HNTeJO0JqtlNmRl">
    <img src="https://img.shields.io/badge/Telegram-blue?logo=Telegram" alt="Telegram" />
  </a>
</p>

<img src="/images/before/lagrange.jpg" width=600 alt="感觉至上"/>

## 下载

::: warning
从 Actions 下载的 Lagrange.OneBot 需要手动安装 .NET, 你应当自行安装对应版本的 [.NET SDK](https://dotnet.microsoft.com/zh-cn/download)
:::

前往 [Github Action](https://github.com/LagrangeDev/Lagrange.Core/actions) 下载最新 Lagrange.OneBot 的构建

![alt](/images/before/lagrange.webp)
![ci-list](/images/before/lagrange_ci_list.webp)

:::: tip 该下哪个版本呢？

<div align="center">我猜猜……当前系统应该用：</div>

<NameByPlatform />

<div align="center" style="font-size: 8px">结果根据浏览器 UA 得出，仅供参考</div>

::: details 更多信息

<curtain>虚假的</curtain>太长不看版（假定你不知道需要的架构）：

- 一定要看清是 **amd64** 还是 **arm64**！！！
- 如果你要在一般的个人电脑或者装有 Windows Server 的服务器上运行，请优先尝试 `windows-amd64` 版本；
- 如果你要在装有 Linux 发行版的个人电脑/服务器上运行，请优先尝试 `linux-x64` 版本；
- 如果你要在“树莓派”或智能手机等 ARM 设备上运行，请优先尝试 `linux-arm64` 版本，若无法运行则再尝试 `linux-arm` 版本；
- 如果你要在 Apple M 系列芯片的电脑上运行，请选择 `osx-arm64` 版本，否则请选择 `osx-amd64` 版本。

---

Lagrange 的 CI 产物命名大致如下：

| 平台名称 | 对应系统 |
| :------: | :------: |
|   win    | Windows  |
|  linux   |  Linux   |
|   osx    |  MacOS   |

| 架构名称 | 体系 | 位数 | 别名/种类          |
| :------: | :--: | :--: | :----------------- |
|  amd64   | x86  |  64  | x86_64, x64        |
|  arm64   | arm  |  64  | aarch64, armv8     |
|   386    | x86  |  32  | i?86 (? = 3,4,5,6) |
|   arm    | arm  |  32  | armv7, armhf, ...  |

上表没有的平台/架构则需要自行编译源码。

:::

::::

## 解压

从 GitHub Actions 下载的产物文件是 zip 压缩包。

- Windows 下请使用自己熟悉的解压软件自行解压；
- Linux 下在命令行中输入 `unzip [文件名]` 进行解压。

## 首次运行

:::tip 准备工作
对于 Windows 用户，如果不在命令行中运行，请先双击 `Lagrange.OneBot.exe`（即你实际获取到的程序文件），生成配置文件，之后再次运行；

对于非 Windows 用户，直接使用程序本体（不带后缀），如果出现 `Permission denied`，请 `chmod +x [程序文件名]` 添加执行权限后重试。
:::

## 配置

现在需要修改你的配置文件，标明部分作为提示。

- `Implementations`：通信方式，分 `ReverseWebSocket` `ForwardWebSocket` `HttpPost` 和 `Http` 四种，选择自己需要的方式配置（推荐使用 `ReverseWebSocket`）

:::: details appsettings.json Example

::: tip
以 `//` 开头的为注释, 试图复制粘贴到实际的配置文件中时务必删除
:::

```json{25-44}
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
    },
  },
  "SignServerUrl": "https://sign.lagrangecore.org/api/sign",
  "MusicSignServerUrl": "",
  "Account": {
    "Uin": 0,           // 此处 Uin 为 0，表示使用二维码登录
    "Password": "",     // 不填写密码以使用扫码连接
    "Protocol": "Linux",
    "AutoReconnect": true,
    "GetOptimumServer": true,
  },
  "Message": {
    "IgnoreSelf": true,
    "StringPost": false,
  },
  "QrCode": {
    "ConsoleCompatibilityMode": false,
  },
  "Implementations": [
    {
      "Type": "ReverseWebSocket",
      "Host": "127.0.0.1",
      "Port": 8080,    // 请注意与 NoneBot 的 PORT 配置一致
      "Suffix": "/onebot/v11/ws",
      "ReconnectInterval": 5000,
      "HeartBeatInterval": 5000,
      "HeartBeatEnable": true,
      "AccessToken": "",
    },
    {
      "Type": "ForwardWebSocket",
      "Host": "127.0.0.1",
      "Port": 8081,
      "HeartBeatInterval": 5000,
      "HeartBeatEnable": true,
      "AccessToken": "",
    },
  ],
}
```

::::

## 拉格兰，启动！

双击运行脚本/在命令行执行程序，根据提示的信息完成设备验证。
