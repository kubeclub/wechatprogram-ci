import WechatCI from "../src/main";
import { cwd } from 'process';
import path from 'path';
import { stat, existsSync, unlinkSync } from 'fs';

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


