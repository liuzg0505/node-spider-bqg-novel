"use strict";
/**
 * 获取 新笔趣阁 https://www.xbiquge.la 小说
 * 下载为txt文件
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// 单行进度打印
const singleLog = require('single-line-log2').stdout;
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
// const pinyin = require('pinyin');
// 配置信息
const bqgConfig = require('./bqgConfig');
// const a = true;
// if (a) {
//   process.exit();
// }
// 开始函数
const start = (config, novelConfig) => {
    console.log(`================ 开始 ${novelConfig.name} ================`);
    config.startTime = +new Date();
    // 小说配置信息 - 读取小说配置
    const bugConfig = novelConfig;
    if (!bugConfig.txtFileName) {
        bugConfig.txtFileName = bqgConfig.getPinYin(bugConfig.name) + '.txt';
    }
    console.log('小说配置信息:', bugConfig);
    // 小说目录页
    const site = bugConfig.indexUrl;
    // 目录每一章链接的前缀
    const chapterSitePrefix = bugConfig.chapterUrlPrefix;
    // 小说文件名
    const txtFileName = bugConfig.txtFileName;
    const txtFileFullpath = path.join(__dirname, config.dataFolder, txtFileName);
    // 目录页小说书名作者等信息
    const novelInfoCls = bugConfig.novelInfoCls;
    // 目录页每一章的a标签的css选择器
    const linkCls = bugConfig.linkCls;
    // 要移除的广告标签的css选择器 （每一章内容区域内的广告和不需要的部分）
    const adCls = bugConfig.adCls;
    // 章节标题类名 css选择器
    const titleCls = bugConfig.titleCls;
    // 每一章内容区域 css选择器
    const contentCls = bugConfig.contentCls;
    // 获取当前txt内容
    const getCurrentTxtData = () => {
        const txtData = fs.readFileSync(txtFileFullpath, { encoding: 'utf-8' });
        const fileTxt = txtData.toString();
        // console.log('当前数据:');
        // console.log(fileTxt);
        return fileTxt;
    };
    // 覆盖txt内容
    const updateTxtFile = (data) => {
        const curCon = getCurrentTxtData();
        fs.writeFileSync(txtFileFullpath, curCon + data, { encoding: 'utf-8' });
    };
    // 初始化 - 创建文件夹和文件
    const initFolderAndFile = () => {
        const dataFullpath = path.join(__dirname, config.dataFolder);
        // 创建数据文件夹
        if (!fs.existsSync(dataFullpath)) {
            console.log('创建数据文件夹:', dataFullpath);
            fs.mkdirSync(dataFullpath);
        }
        // 创建存储小说的txt文件
        if (!fs.existsSync(txtFileFullpath)) {
            console.log('创建存储小说的txt文件:', txtFileFullpath);
            fs.writeFileSync(txtFileFullpath, '', { encoding: 'utf-8' });
        }
    };
    initFolderAndFile();
    // 创建浏览器page对象
    const createPage = () => __awaiter(void 0, void 0, void 0, function* () {
        const browser = yield puppeteer.launch({
            // 是否创建无头浏览器
            headless: true,
            // 步骤延时，有助于观察浏览器的每一步操作
            // slowMo: 100,
            executablePath: config.localChromePath,
        });
        const page = yield browser.newPage();
        yield page.setViewport({
            width: 800,
            height: 1000,
        });
        return {
            browser,
            page,
        };
    });
    // 处理小说名称等信息
    const handleNovelInfo = (page) => __awaiter(void 0, void 0, void 0, function* () {
        const info = yield page.$eval(novelInfoCls, (dm, config) => {
            return dm.innerText + config.paraSplit;
        }, config);
        fs.writeFileSync(txtFileFullpath, info, { encoding: 'utf-8' });
    });
    // 处理章节列表数据
    const handleChapterList = (page) => __awaiter(void 0, void 0, void 0, function* () {
        const list = yield page.$$eval(linkCls, (links) => {
            return links.map((v, i) => {
                return {
                    _index: i,
                    url: v.getAttribute('href'),
                    title: v.innerText,
                };
            });
        });
        return list;
    });
    // 获取每一章的内容
    const getChapterTxt = (list) => __awaiter(void 0, void 0, void 0, function* () {
        let txt = '';
        const len = list.length;
        const { browser, page } = yield createPage();
        let idx = 0;
        yield page.on('load', () => __awaiter(void 0, void 0, void 0, function* () {
            const pageUrl = page.url();
            // console.log(`获取第${idx + 1}/${len}章内容... url:`, pageUrl);
            // 单行进度打印
            singleLog(`正在获取第 ${idx + 1}/${len} 章内容...\n`);
            // 删除广告
            adCls.map((cls) => __awaiter(void 0, void 0, void 0, function* () {
                yield page.$$eval(cls, (el) => {
                    el.map((v) => {
                        v.remove();
                    });
                });
            }));
            // 获取章节标题
            // const title = await page.$eval(titleCls, (el: any) => {
            //   return el.innerText;
            // });
            const title = `第${idx + 1}章 ` + list[idx].title;
            const contents = yield page.$$eval(contentCls, (texts) => {
                return texts.map((v) => {
                    v = v.innerText.replace(/<br>/gi, '\r\n').replace(/&nbsp;/gi, 's');
                    return v;
                });
            });
            contents.unshift(title + config.titleSplit);
            const chapterTxt = contents.join('\r\n \r\n') + config.paraSplit;
            updateTxtFile(chapterTxt); // 每个章节文本获取完就拼接进去
            // txt += chapterTxt; // 一次性拼接所有章节文本
            idx++;
            // if (idx >= list.length)
            if (idx >= list.length) {
                yield browser.close();
                // updateTxtFile(txt); // 一次性拼接所有章节文本
                console.log(`文件下载完毕，详细请查看${txtFileFullpath}`);
                config.endTime = +new Date();
                const time = config.endTime - config.startTime;
                console.log(`处理时间:${time}ms`);
                console.log(`================ 结束 ${novelConfig.name} ================`);
            }
            else {
                yield page.goto(list[idx].url, { timeout: config.pageTimeout });
            }
        }));
        yield page.goto(list[0].url, { timeout: config.pageTimeout });
    });
    // 获取章节列表
    const getChapters = (chapterSiteUrl) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('获取章节列表...');
        const { browser, page } = yield createPage();
        yield page.on('load', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(page.url());
            // const pageUrl = page.url();
            yield handleNovelInfo(page);
            const list = yield handleChapterList(page);
            list.map((v) => {
                if (!v.url.startsWith('http')) {
                    v.url = chapterSitePrefix + v.url;
                }
                return v;
            });
            console.log('章节列表获取成功，章节数:', list.length);
            console.log('第一章名称: ', list[0].title);
            console.log('最后一章名称: ', list[list.length - 1].title);
            // console.log(list);
            yield browser.close();
            console.log('开始获取每一章内容...');
            getChapterTxt(list);
        }));
        yield page.goto(chapterSiteUrl, { timeout: config.pageTimeout });
    });
    getChapters(site);
};
// start(bqgConfig.config, bqgConfig.configLldq);
// start(bqgConfig.config, bqgConfig.configWjy);
// start(bqgConfig.config, bqgConfig.configQingFu);
// start(bqgConfig.config, bqgConfig.configSzqlgxjj); 
// start(bqgConfig.config, bqgConfig.configYrqxzyz);
// 仙逆
// start(bqgConfig.config, bqgConfig.configXN);
// 大奉打更人
// start(bqgConfig.config, bqgConfig.configDFDGR);
// 七界传说
// start(bqgConfig.config, bqgConfig.configQJCS);
// 儒道至圣
// start(bqgConfig.config, bqgConfig.configRDZS);
// 大王饶命
// start(bqgConfig.config, bqgConfig.configDWRM);
// 万族之劫
// start(bqgConfig.config, bqgConfig.configWZZJ);
// 首辅娇妻有空间
// start(bqgConfig.config, bqgConfig.configSFJQYKJ);
// 十方武圣
start(bqgConfig.config, bqgConfig.configSFWS);
