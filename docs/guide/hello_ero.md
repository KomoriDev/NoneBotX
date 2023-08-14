# 快速上手

<h2>你好，来点涩图 —— 创建一个最小实例</h2>

1. 在文件夹下新建一个文件 `main.py`
2. 使用你喜欢的编辑器打开 `main.py` (e.g: Visual Studio Code)
3. 写入如下内容

   ```python
   from creart import create
   from graia.ariadne.app import Ariadne
   from graia.ariadne.connection.config import (
       HttpClientConfig,
       WebsocketClientConfig,
       config,
   )
   from graia.ariadne.event.message import GroupMessage
   from graia.ariadne.message.chain import MessageChain
   from graia.ariadne.model import Group
   from graia.broadcast import Broadcast

   bcc = create(Broadcast)
   app = Ariadne(
       connection=config(
           114514,  # 你的机器人的 qq 号
           "GraiaXVerifyKey",  # 填入你的 mirai-api-http 配置中的 verifyKey
           # 以下两行（不含注释）里的 host 参数的地址
           # 是你的 mirai-api-http 地址中的地址与端口
           # 他们默认为 "http://localhost:8080"
           # 如果你 mirai-api-http 的地址与端口也是 localhost:8080
           # 就可以删掉这两行，否则需要修改为 mirai-api-http 的地址与端口
           HttpClientConfig(host="http://11.45.1.4:19810"),
           WebsocketClientConfig(host="http://11.45.1.4:19810"),
       ),
   )


   @bcc.receiver(GroupMessage)
   async def setu(app: Ariadne, group: Group, message: MessageChain):
       if message.display == "你好":
           await app.send_message(
               group,
               MessageChain(f"不要说{message.display}，来点涩图"),
           )


   app.launch_blocking()
   ```

4. 保存，并且使用命令 `poetry run python main.py` 运行

   :::tip 注意
   **一定一定一定**要记得在运行之前启动并登录 `MCL (mirai-console-loader)`  
   关于 `MCL` 的配置，请看 :point_right: [这里](/before/QA.md#_4-关于-mirai)
   :::

   之后，你会看到显示如下信息输出：

   ::::details 命令输出

   ```sh
   $ poetry run python bot.py
   20yy-MM-dd HH:mm:ss.SSS | INFO     | launart.manager:launch:109 - launchable components count: 4
   20yy-MM-dd HH:mm:ss.SSS | INFO     | launart.manager:launch:110 - launch all components as async task...
   20yy-MM-dd HH:mm:ss.SSS | INFO     | launart.manager:task_done_cb:153 - [elizabeth.connection.242679293.http_client_connection] running completed.
   20yy-MM-dd HH:mm:ss.SSS | SUCCESS  | launart.manager:launch:182 - Layer #0:[http.universal_client] preparation completed.
   20yy-MM-dd HH:mm:ss.SSS | SUCCESS  | launart.manager:launch:182 - Layer #2:[elizabeth.service] preparation completed.
   20yy-MM-dd HH:mm:ss.SSS | INFO     | launart.manager:launch:187 - all components prepared, blocking start.
   20yy-MM-dd HH:mm:ss.SSS | SUCCESS  | graia.ariadne.connection.ws:_:56 - Successfully got session key
   ```

   ::::

5. 在群里发一句你好，当然你的 bot 得先在群里

   ```sh
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.model:log:64 - 1919810: [GraiaX(114514)] -> '你好'
   20yy-MM-dd HH:mm:ss.SSS | INFO     | graia.ariadne.model:log:64 - [BOT 1919810] Friend(114514) <- '不要说你好，来点涩图'
   ```

   <chat-window title="Graia Framework Community">
      <chat-msg name="GraiaX" onright>你好</chat-msg>
      <chat-msg name="EroEroBot" tag="机器人" avatar="/avatar/ero.webp">不要说你好，来点涩图</chat-msg>
   </chat-window>

:::interlink
<https://graia.cn/ariadne/quickstart/>

**EroEroBot:**  
本章完整示例可在 [EroEroBot/main-base.py](https://github.com/GraiaCommunity/EroEroBot/blob/master/main-base.py) 找到。  
你可以在[此处](https://github.com/GraiaCommunity/EroEroBot/releases/tag/release)下载预配置好的模板（不定期更新）。
:::
