#微信JS SDK服务器端Node.js实现
微信官方只给出了JSSDK中的签名算法，这里将算法打包成也相应的API，并使用一个简单的网页演示了基本的实现。

##配置

使用之前，需要先将`config.js`文件中的`appId`和`secret`替换为你的应用的对应值。端口号也是在该文本中修改。

##运行

先进行扩展的安装：

```
npm install --registry=http://registry.npm.taobao.org/
```

再执行`app.js`：

```
node app.js
```

配置完成，并启动起来后，可以直接访问如下链接来测试：

```
http://ip:port/index.html
```

##链接

*   [微信JS-SDK说明文档](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html)
*   [微信 JS 接口签名校验工具](http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign)