import { cwd } from 'process';
import path from 'path';
import { existsSync, unlinkSync } from 'fs';

const { WechatCI } = require('../src/main');
describe('constructor', () => {
  test('new construct with default', () => {
    const packages = require(path.join(path.dirname(__dirname), 'package.json'));
    const wechatCI = new WechatCI({
      name: 'wechat-ci',
    });

    expect(wechatCI.options.basePath).toBe(cwd())
    expect(wechatCI.options.type).toBe('miniProgram')
    expect(wechatCI.options.projectPath).toBe(cwd())
    expect(wechatCI.options.debugger).toBe(true)
    expect(wechatCI.options.version).toBe(packages.version)
  })

  test('new construct', () => {
    const packages = require(path.join(path.dirname(__dirname), 'package.json'));
    const wechatCI = new WechatCI({
      basePath: path.dirname(__dirname),
      name: 'wechat-ci',
    });

    expect(wechatCI.options.name).toBe('wechat-ci');
    expect(wechatCI.options.version).toBe(packages.version)
    expect(wechatCI.options.projectPath).toBe(path.dirname(__dirname))
  })
})

describe('manifest', () => {
  test('generate manifest', () => {
    const wechatCI = new WechatCI({
      name: 'wechat-ci',
      basePath: __dirname,
      sourceManifest: './manifest-config.json',
      destManifest: './manifest.json'
    });
    
    if (existsSync(path.join(__dirname, './manifest.json'))) {
      unlinkSync(path.join(__dirname, './manifest.json'))
    }

    wechatCI.generateManifest();
    expect(existsSync(path.join(__dirname, './manifest.json'))).toBeTruthy()

    unlinkSync(path.join(__dirname, './manifest.json'), {force: true})
  })

  test('generate manifest with false', () => {
    const wechatCI = new WechatCI({
      basePath: __dirname,
      sourceManifest: './manifest-test.json',
    });
    
    if (existsSync(path.join(__dirname, './manifest.json'))) {
      unlinkSync(path.join(__dirname, './manifest.json'))
    }

    wechatCI.generateManifest();
    expect(existsSync(path.join(__dirname, './manifest.json'))).toBeFalsy()
  })

  test('generate manifest dest path', () => {
    const wechatCI = new WechatCI({
      basePath: __dirname,
      sourceManifest: './manifest-config.json',
      destManifest: '../manifest.json'
    });
    
    if (existsSync(path.join(__dirname, '../manifest.json'))) {
      unlinkSync(path.join(__dirname, '../manifest.json'))
    }

    wechatCI.generateManifest()
    expect(existsSync(path.join(__dirname, '../manifest.json'))).toBeTruthy()
    unlinkSync(path.join(__dirname, '../manifest.json'), {force: true})
  })
})

describe('preview', () => {
  test('preview config', () => {
    const wechatCI = new WechatCI({
      basePath: path.dirname(__dirname),
      appid: 'hello world',
      projectPath: './src',
      privateKeyPath: './secret.key',
      qrcodePath: './qrcode.jpg'
    });

    expect(wechatCI.options.appid).toBe('hello world')
    expect(wechatCI.options.projectPath).toBe(path.join(path.dirname(__dirname), './src'))
    expect(wechatCI.options.privateKeyPath).toBe(path.join(path.dirname(__dirname), './secret.key'))
    expect(wechatCI.options.qrcodePath).toBe(path.join(path.dirname(__dirname), './qrcode.jpg'))
  })
})


describe('upload', () => {
  test('upload config', () => {
    const packages = require(path.join(path.dirname(__dirname), 'package.json'));
    const wechatCI = new WechatCI({
      basePath: path.dirname(__dirname),
      appid: 'hello world',
      projectPath: './src',
      privateKeyPath: './secret.key',
      qrcodePath: './qrcode.jpg',
      desc: 'hello world',
      name: 'test upload'
    });

    expect(wechatCI.options.appid).toBe('hello world')
    expect(wechatCI.options.projectPath).toBe(path.join(path.dirname(__dirname), './src'))
    expect(wechatCI.options.privateKeyPath).toBe(path.join(path.dirname(__dirname), './secret.key'))
    expect(wechatCI.options.qrcodePath).toBe(path.join(path.dirname(__dirname), './qrcode.jpg'))
    expect(wechatCI.options.version).toBe(packages.version)
    expect(wechatCI.options.desc).toBe('hello world')
    expect(wechatCI.options.name).toBe('test upload')
  })
})