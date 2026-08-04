# LLBot 的安装与配置（Milky 协议）

<p style="display: inline-flex">
  <a href="https://github.com/LLOneBot/LuckyLilliaBot">
    <img src="https://img.shields.io/badge/Github-black?logo=Github" style="margin-right: 5px" alt="Github" />
  </a>
  <a href="https://t.me/luckylillia">
    <img src="https://img.shields.io/badge/Telegram-blue?logo=Telegram" alt="Telegram" />
  </a>
</p>

想必各位都听说过"协议端"和"应用端"的故事 <curtain>~~反正文档里没写过~~</curtain>，简单来说：

- **协议端**负责与 QQ 服务器通信，本文档使用 **LLBot**；
- **应用端**负责编写机器人业务逻辑，也就是 **NoneBot2**；
- 两者之间通过**通信协议**对接，本文档使用 **Milky**。

## LLBot 是什么

**LLBot**（全称 LuckyLilliaBot，幸运莉莉娅）是一个基于 NTQQ 的 QQ 机器人框架，由 LLOneBot 团队维护，支持 Windows / macOS / Linux / Docker 部署。

LLBot 通过两种方式将 QQ 的功能暴露出来：

1. 通过 PMHQ 挂载 QQ（**有头模式**，需要拉起官方 QQ 客户端）；
2. 直接完整实现 NTQQ 协议（**无头模式**，不依赖 QQ 客户端）。

然后再封装成标准协议，通过 WS / HTTP 等形式暴露出来，供应用端使用。

## 为什么是 Milky 而不是 OneBot

**Milky** 是基于 HTTP / WebSocket 通信的新时代 QQ 机器人应用接口标准（[milky.ntqqrev.org](https://milky.ntqqrev.org/)），它对 OneBot 11 的设计理念进行了全面反思和改进：

- **全面兼容**：旨在覆盖绝大多数 QQ 特性，适配多种应用场景；
- **简单易用**：对协议端和应用端实现均友好，去除不必要的复杂性；
- **清晰规范**：接口 100% 强类型，拒绝模棱两可的类型定义。

> ~~OneBot 是什么，真不熟（~~

LLBot 实际上也支持 OneBot 11 和 Satori 协议，但本文档默认使用 Milky——NoneBot 官方为它提供了 `nonebot-adapter-milky` 适配器，包管理器一条命令就能装。

<sub>超小声：喜欢 Satori 的可以看看 [Entari](https://github.com/ArcletProject/Entari)（</sub>

## 下载

[点我跳转官方文档哦](https://luckylillia.com/guide/choice_install)

### Desktop 桌面版（推荐新手）

前往 [LuckyLilliaBot Releases](https://github.com/LLOneBot/LuckyLilliaBot/releases) 下载 `LLBot-Desktop-win-x64.zip`，解压到固定目录（比如 `D:\LLBot`），双击 `llbot.exe` 启动，点击启动，按提示登录。

:::: warning 系统要求

- Windows Server 2012 / Windows 10 及以上；
- 有头模式需要 64 位**官方原版** NTQQ，且不要安装第三方 QQ 插件。
  ::::

### CLI 命令行版 / Docker

- CLI 版支持 Windows / macOS / Linux，前往官方文档[快速安装](https://luckylillia.com/guide/choice_install)页面按系统选择即可；
- 服务器部署可以使用 Docker 镜像，官方文档同样有说明。

## 登录

- **有头模式**：必须由 LLBot 拉起 QQ，扫码登录即可；
- **无头模式**：不需要 QQ 客户端，二维码的网址和文件路径会打印在终端上，也可以访问 WebUI 登录。

:::: danger 无头模式有风险
无头模式有掉线风险，号体质不佳的慎用。

启用方式：修改 `bin/pmhq/pmhq_config.json`，将 `headless` 设置为 `true`。
::::

LLBot 自带 WebUI（默认 `http://localhost:3080`），可以可视化配置和查看实时日志。

## 配置 Milky

在 WebUI 的 `Bot 配置` 中启用 Milky，填入 HTTP 配置（端口与 token）并保存；
或者直接修改配置文件 `bin/llbot/data/config_<你的QQ号>.json`（登录前可改 `default_config.json`）：

```json
{
  "milky": {
    "enable": true,
    "reportSelfMessage": false,
    "http": {
      "port": 3010,
      "prefix": "",
      "accessToken": ""
    }
  }
}
```

:::: tip
Milky 的 **WS 和 HTTP 实际上是共用一个端口**的。
::::

## 对接 NoneBot2

### 创建项目

使用 `nb create` 创建项目时：

1. 适配器选择 **nonebot-adapter-milky**；
2. 驱动取消勾选 `fastapi`，勾选 **httpx** 和 **websockets**（或者只选 **aiohttp**）；
3. 项目管理器选择 **uv**。

### 配置连接

在项目根目录的 `.env` 中添加（参考 [adapter-milky](https://github.com/nonebot/adapter-milky) 的说明）：

```bash
MILKY_CLIENTS='
[
  {
    "host": "localhost",
    "port": "3010",
    "access_token": "xxx",
    "secure": false
  }
]
'
```

**port 需要和 LLBot 的 Milky HTTP 端口一致，access_token 需要和 LLBot 配置的 token 一致。**

### 启动

```bash :no-line-numbers
nb run
```

连接成功后，NoneBot 日志会显示 Bot 已连接。

## 社群

遇到问题可以加入 LLBot 官方社群：

- Telegram: <https://t.me/luckylillia>
- QQ 群: [545402644](https://qm.qq.com/q/3k5fzILp7y)
