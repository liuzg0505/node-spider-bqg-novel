"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * 获取 刘慈欣《朝闻道》txt
 */
{
    const puppeteer = require('puppeteer');
    const fs = require('fs');
    const path = require('path');
    // 配置信息
    const site = 'https://www.513gp.org/book/3975/index.html';
    const chapterSitePrefix = 'https://www.513gp.org/book/3975/';
    const chapter1 = 'https://www.513gp.org/book/3975/205789.html';
    const timeout = 30 * 60 * 1000;
    const localChromePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
    const dataFolder = './data/novel';
    const dataFullpath = path.join(__dirname, dataFolder);
    const txtFileName = 'zhaowendao.txt';
    const txtFileFullpath = path.join(__dirname, dataFolder, txtFileName);
    // 获取当前数据
    const getCurrentTxtData = () => {
        const txtData = fs.readFileSync(txtFileFullpath, { encoding: 'utf-8' });
        const fileTxt = txtData.toString();
        // console.log('当前数据:');
        // console.log(fileTxt);
        return fileTxt;
    };
    // 覆盖txt内容
    const updateTxtFile = (data) => {
        fs.writeFileSync(txtFileFullpath, data, { encoding: 'utf-8' });
    };
    // 初始化 - 创建文件夹和文件
    const initFolderAndFile = () => {
        // 创建数据文件夹
        if (!fs.existsSync(dataFullpath)) {
            console.log('创建数据文件夹:', dataFullpath);
            fs.mkdirSync(dataFullpath);
        }
        // 创建存储小说的txt文件
        if (!fs.existsSync(txtFileFullpath)) {
            console.log('创建存储小说的txt文件:', txtFileFullpath);
            const initData = '';
            updateTxtFile(initData);
        }
    };
    initFolderAndFile();
    // 创建浏览器page对象
    const createPage = () => __awaiter(void 0, void 0, void 0, function* () {
        const browser = yield puppeteer.launch({
            headless: false,
            slowMo: 100,
            executablePath: localChromePath,
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
    // 处理章节列表数据
    const handleChapterList = (page) => __awaiter(void 0, void 0, void 0, function* () {
        const list = yield page.$$eval('.booklist>span>a', (links) => {
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
        const { browser, page } = yield createPage();
        let idx = 0;
        yield page.on('load', () => __awaiter(void 0, void 0, void 0, function* () {
            const pageUrl = page.url();
            console.log(`获取第${idx + 1}章内容... url:`, pageUrl);
            // 删除广告
            yield page.$$eval('.google-auto-placed', (el) => {
                el.map((v) => {
                    v.remove();
                });
            });
            yield page.$$eval('#p_ad_t3', (el) => {
                el.map((v) => {
                    v.remove();
                });
            });
            // 获取章节标题
            // const title = await page.$eval('.chaptertitle>h1', (el: any) => {
            //   return el.innerText;
            // });
            const title = list[idx].title;
            const contents = yield page.$$eval('div#BookText', (texts) => {
                return texts.map((v) => {
                    v = v.innerText.replace(/<br>/gi, '\r\n').replace(/&nbsp;/gi, 's');
                    return v;
                });
            });
            contents.unshift(title);
            txt += contents.join('\r\n') + '\r\n \r\n ----- \r\n';
            idx++;
            if (idx >= list.length) {
                yield browser.close();
                updateTxtFile(txt);
                console.log(`文件下载完毕，详细请查看${txtFileFullpath}`);
            }
            else {
                yield page.goto(list[idx].url, { timeout: timeout });
            }
        }));
        yield page.goto(list[0].url, { timeout: timeout });
    });
    // 获取章节列表
    const getChapters = (chapterSiteUrl) => __awaiter(void 0, void 0, void 0, function* () {
        console.log('获取章节列表...');
        const { browser, page } = yield createPage();
        yield page.on('load', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log(1111, page.url());
            const pageUrl = page.url();
            const list = yield handleChapterList(page);
            list.map((v) => {
                if (!v.url.startsWith('http')) {
                    v.url = chapterSitePrefix + v.url;
                }
                return v;
            });
            console.log('章节列表获取成功');
            console.log(list);
            yield browser.close();
            getChapterTxt(list);
        }));
        yield page.goto(chapterSiteUrl, { timeout: timeout });
    });
    getChapters(site);
    /* const grabNovel = async () => {
      const browser = await puppeteer.launch({
        headless: false,
        slowMo: 100,
        executablePath: localChromePath,
        // args: [`--window-size=1000,1200`],
      });
      const page = await browser.newPage();
      await page.setViewport({
        width: 800,
        height: 1000,
      });
      console.log('页面加载中....');
      await page.on('load', async () => {
        console.log('页面加载完毕，正在处理信息...');
        // 删除广告
        await page.$$eval('.google-auto-placed', (el: any) => {
          el.map((v: any) => {
            v.remove();
          });
        });
        await page.$$eval('#p_ad_t3', (el: any) => {
          el.map((v: any) => {
            v.remove();
          });
        });
        const title = await page.$eval('.chaptertitle>h1', (el: any) => {
          return el.innerText;
        });
        const contents = await page.$$eval('div#BookText', (texts: any) => {
          return texts.map((v: any) => {
            v = v.innerText.replace(/<br>/gi, '\r\n').replace(/&nbsp;/gi, 's');
            return v;
          });
        });
        contents.unshift(title);
        const txt = contents.join('\r\n') + '\r\n \r\n \r\n';
  
        // console.log(' ============================================ ');
        // console.log(txt);
        // console.log(' ============================================ ');
        const currentTxt = getCurrentTxtData();
        const newTxt = currentTxt + txt;
        updateTxtFile(newTxt);
        console.log(`文件下载完毕，详细请查看${txtFileFullpath}`);
        await browser.close();
      });
      await page.goto(chapter1, { timeout: timeout });
    }; */
    // grabNovel()
    //   .then(() => {
    //     console.log('正在获取小说文本...');
    //   })
    //   .catch((err: any) => {
    //     console.log('获取出错:', err.message);
    //   });
}
