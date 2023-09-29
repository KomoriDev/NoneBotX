# 配置 GO-CQHTTP

::: danger 本章节极有可能已经过时！！！
由于目前腾讯严打机器人登录，且QQ服务器与客户端正在互相配合切换架构中，按照本章节的步骤可能仍无法登录，且目前各框架登录方法仍在迭代中，非常建议自行查找相关资料。

参考：

- [关于签名服务](https://mirai.mamoe.net/topic/2373/%E5%85%B3%E4%BA%8E%E7%AD%BE%E5%90%8D%E6%9C%8D%E5%8A%A1)
- [无法登录的临时处理方案](https://mirai.mamoe.net/topic/223/%E6%97%A0%E6%B3%95%E7%99%BB%E5%BD%95%E7%9A%84%E4%B8%B4%E6%97%B6%E5%A4%84%E7%90%86%E6%96%B9%E6%A1%88)
- [fix-protocol-version](https://github.com/cssxsh/fix-protocol-version)
- [unidbg-fetch-qsign](https://github.com/fuqiuluo/unidbg-fetch-qsign)
- [qsign](https://github.com/MrXiaoM/qsign)

:::

::: tip 我是否需要 go-cqhttp？

Hibiscus 本身只负责处理消息，需要借助 go-cqhttp 与 QQ 进行通信。如果你只想在除 QQ 以外的平台进行适配，可以跳过该配置。

:::

## 下载

下载 [dev 版的 go-cqhttp](https://github.com/Mrs4s/go-cqhttp/actions/workflows/ci.yml)。

![dev](/images/before/dev-gocq.webp)

![artifact](/images/before/ci-artifact.webp)

:::: tip 该下哪个版本呢？

<div align="center">我猜猜……当前系统应该用：</div>

<NameByPlatform />

<div align="center" style="font-size: 8px">结果根据浏览器 UA 得出，仅供参考</div>

::: details 更多信息

<curtain>虚假的</curtain>太长不看版（假定你不知道需要的架构）：

- 一定要看清是 **amd64** 还是 **arm64**！！！
- 如果你要在一般的个人电脑或者装有 Windows Server 的服务器上运行，请优先尝试 `windows_amd64` 版本；
- 如果你要在装有 Linux 发行版的个人电脑/服务器上运行，请优先尝试 `linux_amd64` 版本；
- 如果你要在“树莓派”或智能手机等 ARM 设备上运行，请优先尝试 `linux_arm64` 版本，若无法运行则再尝试 `linux_arm` 版本；
- 如果你要在 Apple M 系列芯片的电脑上运行，请选择 `darwin_arm64` 版本，否则请选择 `darwin_amd64` 版本。

Go-CQHTTP 的 CI 产物命名大致如下：

| 平台名称 | 对应系统 |
| :------: | :------: |
| windows  | Windows  |
|  linux   |  Linux   |
|  darwin  |  MacOS   |

| 架构名称 | 体系 | 位数 | 别名/种类          |
| :------: | :--: | :--: | :----------------- |
|  amd64   | x86  |  64  | x86_64, x64        |
|  arm64   | arm  |  64  | aarch64, armv8     |
|   386    | x86  |  32  | i?86 (? = 3,4,5,6) |
|   arm    | arm  |  32  | armv7, armhf, ...  |

上表没有的平台/架构则需要自行编译源码。

[Go-CQHTTP 的版本说明](https://docs.go-cqhttp.org/guide/quick_start.html#%E4%B8%8B%E8%BD%BD)

:::

::::

::: tip 无法点击下载？
GitHub Actions 的产物文件**必须**登录 GitHub 账号才能进行下载。
:::

如果要在别的机器上运行，下载目标机器架构版本的文件后通过 Windows 远程桌面/scp/Xftp 等软件程序上传到目标机器即可。

## 解压

从 GitHub Actions 下载的产物文件是 zip 压缩包。

- Windows 下请使用自己熟悉的解压软件自行解压；
- Linux 下在命令行中输入 `unzip [文件名]` 进行解压。

::: tsukkomi 眼花缭乱
Go-CQHTTP 正式版提供各种格式打包的文件，如果你不确定请选择后缀为 `.zip` 或 `.tar.gz` 的文件。
:::

## 首次启动

::: tip 准备工作
对于 Windows 用户，如果不在命令行中运行，请先双击 `go-cqhttp_*.exe`（即你实际获取到的程序文件），根据提示生成运行脚本，之后**请直接使用运行脚本**；

对于非 Windows 用户，直接使用程序本体（不带后缀），如果出现 `Permission denied` 请 `chmod +x [程序文件名]`。
:::

正常启动后应该看到这样的提示：

```bash :no-line-numbers
未找到配置文件，正在为您生成配置文件中！
请选择你需要的通信方式:
> 0: HTTP通信
> 1: 云函数服务
> 2: 正向 Websocket 通信
> 3: 反向 Websocket 通信
请输入你需要的编号(0-9)，可输入多个，同一编号也可输入多个(如: 233)
您的选择是:
```

::: tsukkomi
这里的 `0-9`（即一位数字）指的是 `go-cqhttp` 可以识别的输入值（不一定有效），在这个限制下允许配置多个同一类型的通信端；上方列出的 `0, 1, 2, 3` 为有效值。
:::

本文档仅使用单个**反向 Websocket 通信**，因此输入 `3` 回车。

```bash :no-line-numbers
您的选择是:3
默认配置文件已生成，请修改 config.yml 后重新启动!
```

此时关闭窗口/按 `Ctrl+C` 结束程序然后编辑配置。

## 配置

现在需要修改你的配置文件，标明部分作为提示。

- Go-CQHTTP 的[配置信息](https://docs.go-cqhttp.org/guide/config.html#%E9%85%8D%E7%BD%AE%E4%BF%A1%E6%81%AF)文档；
- 第 27 行 签名服务器配置可参考：[#2245](https://github.com/Mrs4s/go-cqhttp/discussions/2245)、[Docker 版 QSign](https://hub.docker.com/r/xzhouqd/qsign)
  或 [Bilibili视频教程](https://www.bilibili.com/video/BV1JW4y1o7vB/?share_source=copy_web&vd_source=2b607adeb8e16af6519b5c3856756355)；
- 将第 56 行 的上报数据类型改为 `array`（可选）；
- 将第 135 行 universal 设置为 `ws://127.0.0.1:8080/onebot/v11/ws`。 <curtain>什么都 8080 只会害了你自己（</curtain>

::: details config.yml

```yaml{5,6,27,56,135}
# 示例版本：dev-d85d697
# go-cqhttp 默认配置文件

account: # 账号相关
  uin: 1233456 # QQ账号
  password: '' # 密码为空时使用扫码登录（扫码登录仅支持 Android Watch 协议，可能已不可用）
  encrypt: false  # 是否开启密码加密
  status: 0      # 在线状态 请参考 https://docs.go-cqhttp.org/guide/config.html#在线状态
  relogin: # 重连设置
    delay: 3   # 首次重连延迟, 单位秒
    interval: 3   # 重连间隔
    max-times: 0  # 最大重连次数, 0为无限制

  # 是否使用服务器下发的新地址进行重连
  # 注意, 此设置可能导致在海外服务器上连接情况更差
  use-sso-address: true
  # 是否允许发送临时会话消息
  allow-temp-session: false

  # 数据包的签名服务器
  # 兼容 https://github.com/fuqiuluo/unidbg-fetch-qsign
  # 如果遇到 登录 45 错误, 或者发送信息风控的话需要填入一个服务器
  # 示例:
  # sign-server: 'http://127.0.0.1:8080' # 本地签名服务器
  # sign-server: 'https://signserver.example.com' # 线上签名服务器
  # 服务器可使用docker在本地搭建或者使用他人开放的服务
  sign-server: '-'
  # 签名服务器认证 Bearer Token
  # 使用开放的服务可能需要提供此 Token 进行认证
  sign-server-bearer: '-'
  # 如果签名服务器的版本在1.1.0及以下, 请将下面的参数改成true
  is-below-110: false
  # 签名服务器所需要的apikey, 如果签名服务器的版本在1.1.0及以下则此项无效
  # 本地部署的默认为114514
  key: '114514'
  # 在实例可能丢失（获取到的签名为空）时是否尝试重新注册
  # 为 true 时，在签名服务不可用时可能每次发消息都会尝试重新注册并签名。
  # 为 false 时，将不会自动注册实例，在签名服务器重启或实例被销毁后需要重启 go-cqhttp 以获取实例
  # 否则后续消息将不会正常签名。关闭此项后可以考虑开启签名服务器端 auto_register 避免需要重启
  auto-register: false
  # 是否在 token 过期后立即自动刷新签名 token（在需要签名时才会检测到，主要防止 token 意外丢失）
  # 独立于定时刷新
  auto-refresh-token: false
  # 定时刷新 token 间隔时间，单位为分钟, 建议 30~40 分钟, 不可超过 60 分钟
  # 目前丢失token也不会有太大影响，可设置为 0 以关闭，推荐开启
  refresh-interval: 40

heartbeat:
  # 心跳频率, 单位秒
  # -1 为关闭心跳
  interval: 5

message:
  # 上报数据类型
  # 可选: string,array
  post-format: string // [!code --]
  post-format: array // [!code ++]
  # 是否忽略无效的CQ码, 如果为假将原样发送
  ignore-invalid-cqcode: false
  # 是否强制分片发送消息
  # 分片发送将会带来更快的速度
  # 但是兼容性会有些问题
  force-fragment: false
  # 是否将url分片发送
  fix-url: false
  # 下载图片等请求网络代理
  proxy-rewrite: ''
  # 是否上报自身消息
  report-self-message: false
  # 移除服务端的Reply附带的At
  remove-reply-at: false
  # 为Reply附加更多信息
  extra-reply-data: false
  # 跳过 Mime 扫描, 忽略错误数据
  skip-mime-scan: false
  # 是否自动转换 WebP 图片
  convert-webp-image: false
  # download 超时时间(s)
  http-timeout: 15
  # 签名服务超时时间(s)
  sign-server-timeout: 60

output:
  # 日志等级 trace,debug,info,warn,error
  log-level: warn
  # 日志时效 单位天. 超过这个时间之前的日志将会被自动删除. 设置为 0 表示永久保留.
  log-aging: 15
  # 是否在每次启动时强制创建全新的文件储存日志. 为 false 的情况下将会在上次启动时创建的日志文件续写
  log-force-new: true
  # 是否启用日志颜色
  log-colorful: true
  # 是否启用 DEBUG
  debug: false # 开启调试模式

# 默认中间件锚点
default-middlewares: &default
  # 访问密钥, 强烈推荐在公网的服务器设置
  access-token: ''
  # 事件过滤器文件目录
  filter: ''
  # API限速设置
  # 该设置为全局生效
  # 原 cqhttp 虽然启用了 rate_limit 后缀, 但是基本没插件适配
  # 目前该限速设置为令牌桶算法, 请参考:
  # https://baike.baidu.com/item/%E4%BB%A4%E7%89%8C%E6%A1%B6%E7%AE%97%E6%B3%95/6597000?fr=aladdin
  rate-limit:
    enabled: false # 是否启用限速
    frequency: 1  # 令牌回复频率, 单位秒
    bucket: 1     # 令牌桶大小

database: # 数据库相关设置
  leveldb:
    # 是否启用内置leveldb数据库
    # 启用将会增加10-20MB的内存占用和一定的磁盘空间
    # 关闭将无法使用 撤回 回复 get_msg 等上下文相关功能
    enable: true
  sqlite3:
    # 是否启用内置sqlite3数据库
    # 启用将会增加一定的内存占用和一定的磁盘空间
    # 关闭将无法使用 撤回 回复 get_msg 等上下文相关功能
    enable: false
    cachettl: 3600000000000 # 1h

# 连接服务列表
servers:
  # 添加方式，同一连接方式可添加多个，具体配置说明请查看文档
  #- http: # http 通信
  #- ws:   # 正向 Websocket
  #- ws-reverse: # 反向 Websocket
  #- pprof: #性能分析服务器
  # 反向WS设置
  - ws-reverse:
      # 反向WS Universal 地址
      # 注意 设置了此项地址后下面两项将会被忽略
      universal: ws://your_websocket_universal.server // [!code --]
      universal: ws://127.0.0.1:8080/onebot/v11/ws // [!code ++]
      # 反向WS API 地址
      api: ws://your_websocket_api.server
      # 反向WS Event 地址
      event: ws://your_websocket_event.server
      # 重连间隔 单位毫秒
      reconnect-interval: 3000
      middlewares:
        <<: *default # 引用默认中间件
```

:::

## 使用

双击运行脚本/在命令行执行程序，根据提示的信息完成设备验证。

```bash :no-line-numbers
[INFO]: 登录成功 欢迎使用: Hibiscus
```

出现这样的提示且没有出现错误时, 基础配置就完成了。

::: warning
如果需要保持 go-cqhttp 在断开 SSH 连接后后台运行，请配合 `tmux`/`pm2`/`screen`/`systemd` 等程序/服务。
:::

### 跳过启动的五秒延时

使用命令行参数 `-faststart` 即可跳过启动的五秒钟延时。

::: tip 提示
**使用启动脚本的用户请编辑启动脚本添加参数**，启动脚本还不会识别外部的命令行参数。
:::

::: code-group

```bash :no-line-numbers [Windows]
.\go-cqhttp.exe -faststart
```

```bash :no-line-numbers [Linux]
./go-cqhttp -faststart
```

:::
