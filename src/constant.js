const process = require('process');

module.exports = {
  // appid
  appid: process.env.appId || '',

  // project path
  projectPath: process.env.projectPath || '',

  // privateKeyPath
  privateKeyPath: process.env.privateKeyPath || '',


  // basePath
  basePath: process.cwd() || process.env.pwd || '',

  // 小程序类型， 有【miniProgram, miniProgramPlugin, miniGame, miniGamePlugin】四种类型
  type: 'miniProgram', 

  // ignores
  ignores: ['node_modules/**/*'],

  // 二维码地址
  qrcodePath: '',

  // 二维码类型，支持image或者base64格式
  qrcodeFormat: process.env.qrcodeFormat || 'image',

  // manifest路径
  // 描述
  desc: process.env.dest || '',

  // 是否压缩
  minify: true,

  // 是否输出
  debugger: true,

  // 线程数
  threads: 2,

  // 版本
  version: '',

  // 名称
  name: process.env.name || '',

  // 源manifest
  sourceManifest: process.env.sourceManifest || '',

  // 目标manifest
  destManifest: process.env.destManifest || '',
}