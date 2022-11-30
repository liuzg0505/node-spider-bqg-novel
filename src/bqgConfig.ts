/**
 * 抓 新笔趣阁小说网的小说的一些配置
 * 给 grabBQG.ts 用
 */

const pinyin = require('pinyin');

// mac的chromium地址：
// '/Users/你的用户名/存放本项目的文件夹/node-spider-novel/node_modules/puppeteer/.local-chromium/mac-961656/chrome-mac/Chromium.app/Contents/MacOS/Chromium',
// 就是打开node_modules里面，找到puppeteer/.local-chromium/mac/chromium ，右键复制地址

// 配置信息
const config = {
  // chrome浏览器的启动文件位置
  localChromePath:
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  // 加载网页的超时时间
  pageTimeout: 30 * 60 * 1000,
  // 小说下载在哪个文件夹
  dataFolder: './data/novel',
  // 段落分隔符
  paraSplit: '\r\n \r\n ---------- \r\n \r\n',
  // 章节标题分隔符
  titleSplit: '\r\n \r\n ----------',
  // 处理耗时
  startTime: +new Date(),
  endTime: +new Date(),
};

// 获取拼音
const getPinYin = (name: String) => {
  const pys = pinyin(name, {
    style: pinyin.STYLE_NORMAL, // 设置拼音风格
    heteronym: true,
  });
  let pyStr = '';
  pys.map((v: any) => {
    pyStr += v[0];
  });
  // console.log(pyStr);
  return pyStr;
};

// 小说配置要求
interface NovelConfig {
  // 小说中文名
  name: String;
  txtFileName?: String;
  indexUrl: String;
  chapterUrlPrefix: String;
  novelInfoCls: String;
  linkCls: String;
  adCls: String[];
  titleCls: String;
  contentCls: String;
}

// 《一剑独尊》config
const configYjdz: NovelConfig = {
  name: '一剑独尊',
  txtFileName: 'yijianduzun.txt',
  indexUrl: 'https://www.xbiquge.la/23/23811',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《寸芒》config
const configCm: NovelConfig = {
  name: '寸芒',
  txtFileName: 'cunmang.txt',
  indexUrl: 'https://www.xbiquge.la/8/8102/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《微纪元》config
const configWjy: NovelConfig = {
  name: '微纪元',
  indexUrl: 'https://www.xbiquge.la/44/44569/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《流浪地球》config
const configLldq: NovelConfig = {
  name: '流浪地球',
  indexUrl: 'https://www.xbiquge.la/31/31700/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《三寸人间》config
const configScrj: NovelConfig = {
  name: '三寸人间',
  indexUrl: 'https://www.xbiquge.la/10/10489/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《轻负》config
const configQingFu: NovelConfig = {
  name: '轻负',
  indexUrl: 'https://www.xbiquge.la/91/91319/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《沈总娶了个小娇娇》config
const configSzqlgxjj: NovelConfig = {
  name: '沈总娶了个小娇娇',
  indexUrl: 'https://www.xbiquge.la/91/91014/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《伊人浅笑醉云州》config
const configYrqxzyz: NovelConfig = {
  name: '伊人浅笑醉云州',
  indexUrl: 'https://www.xbiquge.la/23/23022/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《仙逆》config
const configXN: NovelConfig = {
  name: '仙逆',
  indexUrl: 'https://www.xbiquge.la/6/6819/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《七界传说》config
const configQJCS: NovelConfig = {
  name: '七界传说',
  txtFileName: '七界传说.txt',
  indexUrl: 'https://www.xbiquge.la/53/53489/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《儒道至圣》config
const configRDZS: NovelConfig = {
  name: '儒道至圣',
  txtFileName: '儒道至圣.txt',
  indexUrl: 'https://www.xbiquge.la/0/119/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《大王饶命》config
const configDWRM: NovelConfig = {
  name: '大王饶命',
  txtFileName: '大王饶命.txt',
  indexUrl: 'https://www.xbiquge.la/14/14891/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《万族之劫》config
const configWZZJ: NovelConfig = {
  name: '万族之劫',
  txtFileName: '万族之劫.txt',
  indexUrl: 'https://www.xbiquge.la/27/27557/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《大奉打更人》config
const configDFDGR: NovelConfig = {
  name: '大奉打更人',
  txtFileName: '大奉打更人.txt',
  indexUrl: 'https://www.xbiquge.la/56/56564/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《首辅娇妻有空间》config
const configSFJQYKJ: NovelConfig = {
  name: '首辅娇妻有空间',
  txtFileName: '首辅娇妻有空间.txt',
  indexUrl: 'https://www.xbiquge.la/90/90916/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};
// 《十方武圣》config
const configSFWS: NovelConfig = {
  name: '十方武圣',
  txtFileName: '十方武圣.txt',
  indexUrl: 'https://www.xbiquge.la/56/56508/',
  chapterUrlPrefix: 'https://www.xbiquge.la',
  novelInfoCls: '#maininfo>#info',
  linkCls: '#list>dl>dd>a',
  adCls: ['.google-auto-placed', '#p_ad_t3', '#content>p:last-child'],
  titleCls: '.bookname>h1',
  contentCls: 'div#content',
};

module.exports = {
  config,
  getPinYin,
  configYjdz,
  configCm,
  configWjy,
  configLldq,
  configScrj,
  configQingFu,
  configSzqlgxjj,
  configYrqxzyz,
  configXN,
  configQJCS,
  configRDZS,
  configDWRM,
  configWZZJ,
  configDFDGR,
  configSFJQYKJ,
  configSFWS,
};
