(function () {
    /**
     *  创建chrome插件，简单去掉百度搜索的广告
     *  主要根据广告通用的类名和内容为'广告' 两个字去删除节点
     *  由于百度的的广告是异步加载的，然而插件是dom加载完成就执行了，所以需要手动的刷新一下，很不方便
     *  解决办法：通过设置一个定时器来模拟手动刷新
     *
     *  目前只能针对当前页 加载到下一页还是需要手动刷新一下,对于点击页码和点击上下页还需要修改
     *
     *  让页码点击事件后强制刷新达到初始化的目的，从而实现了点击上下文和点击页码都可以去广告的目的
     * */

    let ad = {
        baidu: function () {

            // 右侧区域广告
            let cr = document.querySelector('.cr-offset');
            if (cr) cr.remove();

            // 删除顶部和底部强制显示的广告
            const temp = 'display: block !important; visibility: visible !important;';

            let cnt = document.querySelector('#content_left');
            let css_first = cnt.firstElementChild.style.cssText;
            let css_last = cnt.lastElementChild.style.cssText;

            if (css_first === temp) cnt.firstElementChild.remove();
            if (css_last === temp) cnt.lastElementChild.remove();


            // 删除有该类名的广告列表
            let outer = document.querySelectorAll('.ec_tuiguang_ppouter');
            if(outer.length > 0) {
                for(let i = 0; i < outer.length;i++){
                    console.log('进入了ec_tuiguang_ppouter')
                    outer[i].parentNode.parentNode.parentNode.remove()
                }
            }

            // 删除有该类名的广告列表
            let link = document.querySelectorAll('.ec_tuiguang_pplink');
            if(link.length > 0) {
                for(let i = 0; i < link.length;i++){
                    console.log('进入了ec_tuiguang_pplink')
                    link[i].parentNode.parentNode.parentNode.remove()
                }
            }


            // 将第二次ajax加载出的数据中的广告需要再次清除
            setTimeout(function () {
                let after = document.querySelectorAll('#content_left .result[id="1"] .f13 span.m');
                for (let i=0 ;i<after.length; i++) {
                    if (after[i].innerText === '广告'){
                        after[i].parentNode.parentNode.remove();
                        console.log(`${+new Date()}, 第${i+1}次清除ajax异步数据中的广告`)
                    } else
                        console.log('没有执行第二次ajax清除')
                }
            }, 2000)
        },


        // 去除微博首页的广告，下拉后异步加载的数据暂时无法去掉
        weibo: function(){
            // 这里是微博的广告，不过就只有一点
            console.log('进入weibo');
            let wb = document.querySelector('.WB_feed div[data-mark]');
            if (wb) wb.remove();
        },

        // 去除知乎首页的广告，下拉后异步加载的数据暂时无法去掉
        zhihu: function () {
            console.log('进入zhihu');
            let zh = document.querySelector('.TopstoryItem--advertCard');
            if (zh) zh.remove();
        },

        // 通过设置定时器来达到手动刷新的效果
        removeAd: function () {
            // 初始化执行
            let time1 = setTimeout(ad.baidu, 0);
            let time2 = setTimeout(function(){}, 1000);

            // 监听搜索button的点击事件
            document.querySelector('#su').addEventListener('click', function () {
                time1 = setTimeout(ad.baidu, 1000);
            });

            // 监听输入框的input事件
            document.querySelector('#kw').addEventListener('input', function () {
                time2 = setTimeout(ad.baidu, 1000);
            });


            // 监听上一页、下一页的click事件
            // 这里页码和上下页都是li列表，所以这里需要用到事件代理，将li节点上的点击事件代理到父节点上
            // 让页码点击事件后强制刷新达到初始化的目的
            document.querySelector('#page').addEventListener('click', function () {
                location.reload()
            });

        }
    };

    // 执行
    if(window.location.href.indexOf('baidu') > -1){
        ad.removeAd();
    }

    if (window.location.href.indexOf('weibo') > -1) {
        ad.weibo();
    }
    if (window.location.href.indexOf('zhihu') > -1) {
        ad.zhihu();
    }


})();