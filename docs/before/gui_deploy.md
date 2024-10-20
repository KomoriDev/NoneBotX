# 通过 Re:NoneBot GUI 一键部署 （以 Lagrange.Onebot 为例）

<p style="display: inline-flex">
  <a href="https://github.com/NonebotGUI/nonebot-flutter-gui">
    <img src="https://img.shields.io/badge/Github-black?logo=Github" style="margin-right: 5px" alt="Github" />
  </a>
</p>
  <img src="https://socialify.git.ci/NoneBotGUI/nonebot-flutter-gui/image?description=1&descriptionEditable=%E2%9C%A8%E6%96%B0%E4%B8%80%E4%BB%A3Nonebot%E5%9B%BE%E5%BD%A2%E5%8C%96%E7%95%8C%E9%9D%A2%E2%9C%A8&font=Jost&language=1&logo=https%3A%2F%2Fnbgui.top%2Fimage%2Ficon.png&name=1&owner=1&pattern=Plus&stargazers=1&theme=Auto" alt="nonebot-flutter-gui" width="640" height="320" />

---

## 安装依赖

::: tip
Re:NoneBot GUI 并不提供 `nb-cli` 的安装，请在使用前先安装 `nb-cli`
:::

### Windows

本软件运行需要安装 Microsoft Visual C++ Redistributable 依赖，如无法打开请尝试从此处下载安装运行后使用。
[https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)

### Linux

请使用以下命令安装依赖(以 Debian 系为例)

```bash
sudo apt-get install appindicator3-0.1 libappindicator3-dev libnotify-dev
```

---

## 下载

前往 [Github Releases](https://github.com/NonebotGUI/nonebot-flutter-gui/releases) 下载 `v1.1.0` 或者更新版的 Re:NoneBot GUI

![alt](/images/before/nfg_releases.png)

---

## 部署

启动软件，在侧边栏中找到 `快速部署` 并选择 `Lagrange.Onebot`

![alt](/images/before/nbgui_fastdeploy.png)

填好相关配置并选择存放 Bot 的目录，如果您的网络环境无法访问 github 可以使用镜像站下载，完成后点击下方按钮进入下一步

![alt](/images/before/nbgui_fastdeploy2.png)

在下拉框中选择时候当前系统的 release 并下载

![alt](/images/before/nbgui_fastdeploy3.png)

下载完成后点击 `部署` 按钮，并等待部署完成，其中请确保网络正常连接

等待控制台内显示 `部署完成` 后即可

![alt](/images/before/nbgui_fastdeploy4.png)

---

## 启动

回到主页并点击你刚才部署完成的 Bot 即可跳转到 Bot 控制台,点击下方的启动按钮即可启动你的 Bot 本体

![alt](/images/before/nbgui_fastdeploy5.webp)

来到协议端控制台，启动后扫描控制台中的登录二维码，即可连接至 NoneBot

![alt](/images/before/nbgui_fastdeploy6.png)

---

## 安装插件

Re:NoneBot GUI 内置了插件商店，能够一键安装插件

位于 `Bot控制台-管理CLI-插件商店` 下

![alt](/images/before/nbgui_store.webp)
