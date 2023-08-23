# 名词解释及规范用法

本文用于描述与指导**本文档中标准名词的解释及规范用法**。在本文规定用途内的用词应尽可能与本文一致。

:::warning 推广规范用词的麻烦“又臭又长”
本文只要求并保证本文档内所有文章等内容遵循本文标准，不会干涉本文档外的用语。
:::

:::tip 格式说明
下文所有**加粗词**和`行内代码段`均为正确用法。

穿插的提示框充当使用提示和用词示范（实际使用时只要保持上下文格式一致就可以选择不加粗）。
:::

## NoneBot 相关

### NoneBot 本体

- **NoneBot** 用于指代[这一聊天机器人框架](https://nonebot.dev)，默认指
  **NoneBot2**，<curtain>社区内有简称 “nb”，</curtain>NoneBot2 之前还有 **NoneBot1**（区别见[Q&A](QA.md#_2-nonebot1-与-nonebot2-的区别)）；
- `nonebot2` 用于包管理器安装 NoneBot2 使用的包名；
- `nonebot` 用于编写插件代码等内容时使用的导入名<curtain>~~，也是 NoneBot1 的安装名~~</curtain>。

:::tsukkomi ？
由于 **NoneBot1** 和 **NoneBot2** 都使用 `nonebot` 作为导入名，因此一旦混装很容易出现错误。

使用 **NB-CLI** 可以很好避免混装的问题。
:::

### NoneBot 组件

- **Driver**，中文翻译为**驱动器**，用于承载框架工作；
- **Adapter**，中文翻译为**适配器**，用于与形形色色的外部接口进行交流通信；
- **Plugin**，中文翻译为**插件**，用于实现具体的交互功能；
- `MessageSegment`，中文翻译为**消息段**，用于安全快捷构造消息内容。

### NB-CLI

- **NB-CLI** 用于指代由 NoneBot 官方提供的“脚手架”<curtain>~~绞首架~~</curtain>（项目助手）；
- `nb-cli` 用于包管理器安装 NB-CLI 使用的包名；
- `nb` 指 NB-CLI 的命令行入口程序

## OneBot 相关

- **OneBot** 用于指代[这一协议标准体系](https://onebot.dev)；
- **OneBot V11** 指 **OneBot** 体系的第 11 版协议标准，此标准源自<curtain>~~上古申必~~</curtain>
  CoolQ HTTP 接口，现多用于转换 QQ 的接口以便统一对接；
- **OneBot V12** 指 **OneBot** 体系的第 12 版协议标准，此标准是一套独立的新标准（不向下兼容），追求实现多平台兼容与统一对接。

### Go-CQHTTP

- **Go-CQHTTP** 用于指代这款基于 Mirai 以及 MiraiGo 的 OneBot Golang 原生实现<curtain>，社区内有简称 “gocq”</curtain>；
- `go-cqhttp` 指 Go-CQHTTP 的可执行程序文件。

:::tsukkomi ？
**Go-CQHTTP** 在 **OneBot V11** 上拓展了不少接口，大体上可以视为 **OneBot V11** 标准的超集实现，一些开发者也将其视为“事实标准”。
:::
