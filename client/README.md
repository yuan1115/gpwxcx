# 微信小程序项目目录

这里介绍的是该项目的框架结构，如果想查看微信小程序详细开发文档请移步至[这里](https://developers.weixin.qq.com/miniprogram/dev/)

## 一、目录结构

```
client
├── pages            
│   ├── about        关于我们     
│   ├── article      我参与的文章
│   ├── detail       文章详情
│   ├── find         发现
│   ├── index        首页
│   ├── newsList     文章列表 
│   ├── qa           活动
│   ├── search       搜索文章列表页 
│   ├── user         个人中心
│   └── webUrl       外链承载页
├── static           静态文件目录
│   └── image        静态图片
├── template         模板目录（存放模板）
│   ├── footer.wxml  公共底部模板 
│   ├── newsList.wxml文章列表模板
│   └── qxalert.wxml 自定义的询问窗模板
├── utils            封装的函数目录
│   ├── action.js    功能性函数 
│   ├── alert.js     弹窗函数
│   └── util.js       
├── vendor           第三方库
│   ├── font         字体图标库
│   ├── wafer2       wafer2库 
│   ├── wxParse      小程序支持html库
│   └── README.md
├── app.js           
├── app.json
├── app.wxss
├── config.js
└── README.md
```

## 二、文件结构

>小程序包含一个描述整体程序的 app 和多个描述各自页面的 page。

文件结构请参照[这里](https://developers.weixin.qq.com/miniprogram/dev/framework/structure.html)
