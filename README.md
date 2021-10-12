### 预期结果

```
cross-env AppId=xxx Type=miniProgram ProjectPath=. PrivateKey=hello wechat-ci upload
```

### npm 如何引用本地包

要引用组件我们通常通过`npm install`命令引入，但是如果本地组件未发布到仓库中，那么我们`npm install`将报包找不到的错误,

如果我们需要引入本地包，可以使用类似`npm install --save ..`这个命令来引入本地包