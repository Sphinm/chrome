# chrome
简单去掉百度搜索的广告


```
这是一个针对百度搜索的广告去除的简单工具，起因是我们中午一起答题的时候一个同事找到了一个开源项目使用OCR识别截图并百度搜索答案，当时我们觉得可强大了，这还能有谁抢得过我们呐~可是并没有那么美好，开源项目的OCR识别文字的准确率很高，但是百度搜索却不尽如人意，有很多广告和无关内容，干扰我们答题，所以我下午就写了一个这个插件，其实很简单的，希望明天能和同事一起完成自动答题。

```
  
    首先chrome插件需要有一个manifest文件，用来配置一些默认参数，这是一种离线缓存的方式，接着我们需要大小两个logo，index.html文件可要可不要，再就是主要的功能函数。如图所示：
    
    ![chrome.png](http://upload-images.jianshu.io/upload_images/1394028-912d3d5967444bb0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    
    
    
    
## 使用方式
   1. 下载该插件文件并解压到你的本地，然后打开chrome浏览器，输入chrome://extensions/ ，选中开发者模式，
    
    ![扩展程序.png](http://upload-images.jianshu.io/upload_images/1394028-b38d5af67b73a877.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
    
   
    
    2. 接着打开浏览器访问百度的相关页面即可，实现效果如下
    
    ![after.png](http://upload-images.jianshu.io/upload_images/1394028-daa0d1fac85449ea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
