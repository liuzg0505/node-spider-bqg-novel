# node-spider-bqg-novel

> nodejs 爬虫，爬取网站小说
> 
> nodejs + ts + puppeteer
> 
> 本工具只供平时学习用
> 
> 爬取指定文章需要先分析网页结构和 html 标签，再适度修改代码
>
> 最新版参考 grabRanWen.ts 或 grabQiuYuGe.ts ， 没有全局安装ts编译的，可以修改为js再执行是一样的
> 
> 根目录新建 bin 文件夹，ts编译的js文件会生成到 bin 里面，爬取的文件会生成到 bin/data/novel/ 里面
> 
> puppeteer 中文api文档
> https://my.oschina.net/reamd7/blog/1634846?spm=a2c6h.12873639.article-detail.23.32892e562nV4LB#pagesetuseragentuseragent

## 安装

```shell
npm install
```

## 运行

```shell
# 在 package.json 里面配置scripts命令
npm start
# or
npm run get:rw
# or
npm run get:qyg
```

## 配置puppeteer

> 修改 bqgConfig.ts

```
关注 bqgConfig.ts 中 config 对象的 localChromePath，参考里面的注释说明
mac和windows有区别
```

